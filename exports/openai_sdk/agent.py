"""
ShadeMatch Studio — OpenAI SDK Export Adapter
Checkpoint 3: Export — Framework Visa: OpenAI SDK

This module exports the ShadeMatch Studio agent's core recommendation
logic as OpenAI-compatible function definitions and a runnable agent loop.
"""

from openai import OpenAI
import json

# ── Tool Schemas ──────────────────────────────────────────────────────────────

SHADE_RECOMMENDER_TOOL = {
    "type": "function",
    "function": {
        "name": "shade_recommender",
        "description": (
            "Recommends cosmetic shade families for a user based on their skin tone, "
            "undertone, and look style. Returns up to 4 ranked shade families."
        ),
        "parameters": {
            "type": "object",
            "required": ["skin_tone", "undertone", "look_style"],
            "properties": {
                "skin_tone": {
                    "type": "string",
                    "enum": [
                        "porcelain", "ivory", "sand", "beige", "honey",
                        "caramel", "sienna", "chestnut", "mahogany", "espresso"
                    ],
                    "description": "User's self-reported skin tone",
                },
                "undertone": {
                    "type": "string",
                    "enum": ["warm", "cool", "neutral"],
                    "description": "User's dominant undertone",
                },
                "look_style": {
                    "type": "string",
                    "enum": ["natural", "bold", "editorial"],
                    "description": "User's preferred aesthetic",
                },
            },
        },
    },
}

PROFILE_BUILDER_TOOL = {
    "type": "function",
    "function": {
        "name": "profile_builder",
        "description": "Builds a complete BeautyProfile from onboarding inputs.",
        "parameters": {
            "type": "object",
            "required": ["name", "skin_tone", "undertone", "finish", "coverage", "skin_type", "look_style"],
            "properties": {
                "name":       {"type": "string"},
                "skin_tone":  {"type": "string"},
                "undertone":  {"type": "string"},
                "finish":     {"type": "string", "enum": ["matte", "satin", "dewy"]},
                "coverage":   {"type": "string", "enum": ["sheer", "medium", "full"]},
                "skin_type":  {"type": "string", "enum": ["dry", "oily", "combination", "normal", "sensitive"]},
                "look_style": {"type": "string", "enum": ["natural", "bold", "editorial"]},
            },
        },
    },
}

# ── Core Logic (mirrored from src/store/useStore.ts) ─────────────────────────

DEEP_TONES = {"sienna", "chestnut", "mahogany", "espresso"}

def derive_recommended_families(skin_tone: str, undertone: str, look_style: str) -> list[str]:
    """Pure-Python mirror of the TypeScript deriveRecommendedFamilies() function."""
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

    # Deduplicate preserving order, cap at 4
    seen: set[str] = set()
    result: list[str] = []
    for f in families:
        if f not in seen:
            seen.add(f)
            result.append(f)
        if len(result) == 4:
            break
    return result


def handle_tool_call(tool_name: str, args: dict) -> str:
    """Execute the tool and return a JSON string result."""
    if tool_name == "shade_recommender":
        families = derive_recommended_families(
            args["skin_tone"], args["undertone"], args["look_style"]
        )
        return json.dumps({
            "recommended_families": families,
            "match_score": 94,
            "rationale": (
                f"For {args['undertone']} undertones with a {args['look_style']} look style, "
                f"the top families are: {', '.join(families)}."
            ),
        })

    if tool_name == "profile_builder":
        families = derive_recommended_families(
            args["skin_tone"], args["undertone"], args["look_style"]
        )
        import time
        return json.dumps({
            "id": f"profile-{int(time.time())}",
            **args,
            "recommended_families": families,
            "saved_shade_ids": [],
            "created_at": __import__("datetime").datetime.utcnow().isoformat() + "Z",
        })

    return json.dumps({"error": f"Unknown tool: {tool_name}"})


# ── Agent Loop ────────────────────────────────────────────────────────────────

def run_shade_agent(user_message: str, api_key: str | None = None) -> str:
    """
    Run the ShadeMatch Studio agent with OpenAI tool-calling.

    Args:
        user_message: Natural-language beauty query from the user.
        api_key: OpenAI API key. If None, uses OPENAI_API_KEY env var.

    Returns:
        Final assistant response string.
    """
    client = OpenAI(api_key=api_key)

    messages = [
        {
            "role": "system",
            "content": (
                "You are ShadeMatch Studio, a personalized beauty intelligence agent. "
                "Help users find their perfect cosmetic shade families based on their "
                "skin tone, undertone, and style preferences. Use the available tools "
                "to recommend shade families and build beauty profiles."
            ),
        },
        {"role": "user", "content": user_message},
    ]

    tools = [SHADE_RECOMMENDER_TOOL, PROFILE_BUILDER_TOOL]

    # Agentic loop
    while True:
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=messages,
            tools=tools,
            tool_choice="auto",
        )

        choice = response.choices[0]

        if choice.finish_reason == "stop":
            return choice.message.content or ""

        if choice.finish_reason == "tool_calls":
            messages.append(choice.message)
            for tc in choice.message.tool_calls:
                result = handle_tool_call(tc.function.name, json.loads(tc.function.arguments))
                messages.append({
                    "role": "tool",
                    "tool_call_id": tc.id,
                    "content": result,
                })
            continue

        break

    return ""


# ── Example Usage ─────────────────────────────────────────────────────────────

if __name__ == "__main__":
    reply = run_shade_agent(
        "I have a honey skin tone with warm undertones and I love bold looks. "
        "What shade families should I explore?"
    )
    print(reply)
