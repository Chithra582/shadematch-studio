"""
ShadeMatch Studio — Lyra Export Adapter
Checkpoint 3: Export — Framework Visa: Lyra

Exports the ShadeMatch Studio agent as a Lyra-compatible agent
with declarative tool registration and a standard run() entry point.
"""

from __future__ import annotations
import json
import time
import datetime
from dataclasses import dataclass, field

# ── Lyra Compatibility Shim ───────────────────────────────────────────────────
# If the lyra package is installed, import from it directly.
# Otherwise fall back to the lightweight shim below so the file
# remains importable in environments without Lyra installed.

try:
    from lyra import Agent, tool, run_agent as lyra_run  # type: ignore
    LYRA_AVAILABLE = True
except ImportError:
    LYRA_AVAILABLE = False

    # Minimal shim that lets the module load and the logic run without Lyra
    def tool(func=None, *, name: str = "", description: str = ""):
        """No-op decorator shim when Lyra is not installed."""
        def decorator(f):
            return f
        return decorator(func) if func else decorator

    class Agent:  # type: ignore
        def __init__(self, **kwargs): self.__dict__.update(kwargs)
        def run(self, prompt: str) -> str:
            return shade_agent_run(prompt)

    def lyra_run(agent, prompt: str) -> str:  # type: ignore
        return shade_agent_run(prompt)


# ── Core Logic (shared across all export adapters) ────────────────────────────

DEEP_TONES = frozenset({"sienna", "chestnut", "mahogany", "espresso"})


def derive_recommended_families(skin_tone: str, undertone: str, look_style: str) -> list[str]:
    """Pure function — mirrors src/store/useStore.ts:deriveRecommendedFamilies()."""
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
    else:  # editorial
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


# ── Lyra Tool Definitions ─────────────────────────────────────────────────────

@tool(
    name="shade_recommender",
    description=(
        "Recommends up to 4 cosmetic shade families for a user based on their skin tone, "
        "undertone (warm/cool/neutral), and look style (natural/bold/editorial)."
    ),
)
def shade_recommender(skin_tone: str, undertone: str, look_style: str) -> str:
    families = derive_recommended_families(skin_tone, undertone, look_style)
    return json.dumps({
        "recommended_families": families,
        "match_score": 94,
        "rationale": (
            f"For {undertone} undertones with a {look_style} aesthetic, "
            f"the top shade families are: {', '.join(families)}."
        ),
    }, indent=2)


@tool(
    name="profile_builder",
    description=(
        "Builds a complete BeautyProfile from user onboarding inputs: name, skin_tone, "
        "undertone, finish, coverage, skin_type, and look_style."
    ),
)
def profile_builder(
    name: str,
    skin_tone: str,
    undertone: str,
    finish: str,
    coverage: str,
    skin_type: str,
    look_style: str,
) -> str:
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


# ── Lyra Agent Definition ─────────────────────────────────────────────────────

shadeswatch_agent = Agent(
    name="shadeswatch-studio",
    version="1.0.0",
    description=(
        "ShadeMatch Studio: a personalized beauty intelligence agent that recommends "
        "cosmetic shade families based on skin tone, undertone, and style preferences."
    ),
    system_prompt=(
        "You are ShadeMatch Studio, a precision beauty intelligence agent. "
        "Help users discover their ideal shade families by collecting their skin profile "
        "and calling the shade_recommender or profile_builder tools. "
        "Explain recommendations warmly and by name — e.g. 'The Nudes family suits your "
        "warm undertones because...'."
    ),
    tools=[shade_recommender, profile_builder],
    model="claude-3-7-sonnet",
)


def shade_agent_run(prompt: str) -> str:
    """Standalone fallback runner used when Lyra is not installed."""
    # Parse basic intent from the prompt to demonstrate the logic
    prompt_lower = prompt.lower()

    # Extract undertone
    undertone = "neutral"
    if "warm" in prompt_lower:
        undertone = "warm"
    elif "cool" in prompt_lower:
        undertone = "cool"

    # Extract skin tone (first match)
    tones = ["porcelain", "ivory", "sand", "beige", "honey",
             "caramel", "sienna", "chestnut", "mahogany", "espresso"]
    skin_tone = next((t for t in tones if t in prompt_lower), "beige")

    # Extract style
    look_style = "natural"
    if "bold" in prompt_lower:
        look_style = "bold"
    elif "editorial" in prompt_lower:
        look_style = "editorial"

    families = derive_recommended_families(skin_tone, undertone, look_style)
    return (
        f"For your {skin_tone} skin with {undertone} undertones and a {look_style} style, "
        f"I recommend exploring: {', '.join(f.title() for f in families)}. "
        f"Your ShadeMatch score is 94%."
    )


# ── Entry Point ───────────────────────────────────────────────────────────────

def run(prompt: str) -> str:
    """
    Standard Lyra entry point.
    Called by the Lyra runtime as: python agent.py run "<prompt>"
    """
    if LYRA_AVAILABLE:
        return lyra_run(shadeswatch_agent, prompt)
    return shade_agent_run(prompt)


if __name__ == "__main__":
    import sys
    query = " ".join(sys.argv[1:]) if len(sys.argv) > 1 else (
        "I have sand skin with neutral undertones and love natural looks. "
        "What shade families should I start with?"
    )
    print(run(query))
