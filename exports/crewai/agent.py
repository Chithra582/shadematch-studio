"""
ShadeMatch Studio — CrewAI Export Adapter
Checkpoint 3: Export — Framework Visa: CrewAI

Exports the ShadeMatch Studio agent as a CrewAI Agent + Task setup,
with two tools: ShadeRecommenderTool and ProfileBuilderTool.
"""

from crewai import Agent, Task, Crew
from crewai.tools import BaseTool
from pydantic import BaseModel, Field
import json
import time
import datetime


# ── Tool Input Schemas ────────────────────────────────────────────────────────

class ShadeRecommenderInput(BaseModel):
    skin_tone: str = Field(..., description="User's skin tone (porcelain–espresso scale)")
    undertone: str = Field(..., description="warm | cool | neutral")
    look_style: str = Field(..., description="natural | bold | editorial")


class ProfileBuilderInput(BaseModel):
    name: str = Field(..., description="User's display name")
    skin_tone: str = Field(...)
    undertone: str = Field(...)
    finish: str = Field(..., description="matte | satin | dewy")
    coverage: str = Field(..., description="sheer | medium | full")
    skin_type: str = Field(..., description="dry | oily | combination | normal | sensitive")
    look_style: str = Field(...)


# ── Core Logic ────────────────────────────────────────────────────────────────

DEEP_TONES = {"sienna", "chestnut", "mahogany", "espresso"}


def derive_recommended_families(skin_tone: str, undertone: str, look_style: str) -> list[str]:
    families: list[str] = []

    if undertone == "warm":
        families.extend(["nudes", "corals", "bronzes"])
    elif undertone == "cool":
        families.extend(["roses", "berries", "mauves"])
    else:
        families.extend(["nudes", "roses", "neutrals"])

    if look_style == "bold":
        families.extend(["reds", "berries"])
    elif look_style == "natural":
        families.append("neutrals")
    else:
        families.extend(["mauves", "reds"])

    if skin_tone in DEEP_TONES:
        families.append("bronzes")

    seen: set[str] = set()
    result: list[str] = []
    for f in families:
        if f not in seen:
            seen.add(f)
            result.append(f)
        if len(result) == 4:
            break
    return result


# ── CrewAI Tool Definitions ───────────────────────────────────────────────────

class ShadeRecommenderTool(BaseTool):
    name: str = "shade_recommender"
    description: str = (
        "Recommends cosmetic shade families based on skin tone, undertone, and look style. "
        "Returns up to 4 ranked shade families with a match score and rationale."
    )
    args_schema: type[BaseModel] = ShadeRecommenderInput

    def _run(self, skin_tone: str, undertone: str, look_style: str) -> str:
        families = derive_recommended_families(skin_tone, undertone, look_style)
        result = {
            "recommended_families": families,
            "match_score": 94,
            "rationale": (
                f"For {undertone} undertones and a {look_style} look style, "
                f"the best shade families are: {', '.join(families)}."
            ),
        }
        return json.dumps(result, indent=2)


class ProfileBuilderTool(BaseTool):
    name: str = "profile_builder"
    description: str = (
        "Builds a complete BeautyProfile record from user onboarding inputs. "
        "Derives recommended shade families and returns a full profile object."
    )
    args_schema: type[BaseModel] = ProfileBuilderInput

    def _run(self, name: str, skin_tone: str, undertone: str,
             finish: str, coverage: str, skin_type: str, look_style: str) -> str:
        families = derive_recommended_families(skin_tone, undertone, look_style)
        profile = {
            "id": f"profile-{int(time.time())}",
            "name": name,
            "skin_tone": skin_tone,
            "undertone": undertone,
            "finish": finish,
            "coverage": coverage,
            "skin_type": skin_type,
            "look_style": look_style,
            "recommended_families": families,
            "saved_shade_ids": [],
            "created_at": datetime.datetime.utcnow().isoformat() + "Z",
        }
        return json.dumps(profile, indent=2)


# ── CrewAI Agent & Crew Setup ─────────────────────────────────────────────────

shade_agent = Agent(
    role="Beauty Intelligence Specialist",
    goal=(
        "Match users to their ideal cosmetic shade families based on their skin profile "
        "and aesthetic preferences. Provide personalised, explainable recommendations."
    ),
    backstory=(
        "ShadeMatch Studio is a precision beauty intelligence agent trained on curated "
        "cosmetic science data. It uses skin tone, undertone, and style signals to navigate "
        "a catalogue of 22 shades across 8 families — from porcelain nudes to espresso bronzes."
    ),
    tools=[ShadeRecommenderTool(), ProfileBuilderTool()],
    verbose=True,
    allow_delegation=False,
)


def create_recommendation_task(user_query: str) -> Task:
    return Task(
        description=f"Answer the following beauty query and recommend shade families: {user_query}",
        expected_output=(
            "A clear recommendation of shade families with a match score and explanation "
            "of why each family suits the user's profile."
        ),
        agent=shade_agent,
    )


def run_shade_crew(user_query: str) -> str:
    """Run the ShadeMatch Studio CrewAI crew for a given user query."""
    task = create_recommendation_task(user_query)
    crew = Crew(
        agents=[shade_agent],
        tasks=[task],
        verbose=True,
    )
    result = crew.kickoff()
    return str(result)


# ── Example Usage ─────────────────────────────────────────────────────────────

if __name__ == "__main__":
    output = run_shade_crew(
        "My name is Priya. I have caramel skin with warm undertones, "
        "prefer matte finish and full coverage. I love natural looks."
    )
    print(output)
