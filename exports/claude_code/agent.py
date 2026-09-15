# ShadeMatch Studio — Claude Code Export Adapter
# Checkpoint 3: Export — Framework Visa: Claude Code
#
# This adapter exports the ShadeMatch Studio agent as a Claude-native
# tool-use agent using the Anthropic Python SDK.

import anthropic
import json
import time
import datetime

# ── Tool Definitions (Anthropic format) ───────────────────────────────────────

TOOLS = [
    {
        "name": "shade_recommender",
        "description": (
            "Recommends cosmetic shade families for a user based on their skin tone, "
            "undertone, and look style. Returns up to 4 ranked shade families from "
            "the ShadeMatch Studio catalogue (nudes, roses, berries, reds, corals, "
            "bronzes, mauves, neutrals) with a match score and rationale."
        ),
        "input_schema": {
            "type": "object",
            "required": ["skin_tone", "undertone", "look_style"],
            "properties": {
                "skin_tone": {
                    "type": "string",
                    "enum": [
                        "porcelain", "ivory", "sand", "beige", "honey",
                        "caramel", "sienna", "chestnut", "mahogany", "espresso",
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
                    "description": "User's preferred aesthetic intensity",
                },
            },
        },
    },
    {
        "name": "profile_builder",
        "description": "Builds a complete BeautyProfile from user onboarding inputs.",
        "input_schema": {
            "type": "object",
            "required": ["name", "skin_tone", "undertone", "finish", "coverage", "skin_type", "look_style"],
            "properties": {
                "name":       {"type": "string", "description": "User's display name"},
                "skin_tone":  {"type": "string"},
                "undertone":  {"type": "string"},
                "finish":     {"type": "string", "enum": ["matte", "satin", "dewy"]},
                "coverage":   {"type": "string", "enum": ["sheer", "medium", "full"]},
                "skin_type":  {"type": "string", "enum": ["dry", "oily", "combination", "normal", "sensitive"]},
                "look_style": {"type": "string"},
            },
        },
    },
]

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


def execute_tool(tool_name: str, tool_input: dict) -> str:
    if tool_name == "shade_recommender":
        families = derive_recommended_families(
            tool_input["skin_tone"], tool_input["undertone"], tool_input["look_style"]
        )
        return json.dumps({
            "recommended_families": families,
            "match_score": 94,
            "rationale": (
                f"For {tool_input['undertone']} undertones with a "
                f"{tool_input['look_style']} look style, the top families are: "
                f"{', '.join(families)}."
            ),
        })

    if tool_name == "profile_builder":
        families = derive_recommended_families(
            tool_input["skin_tone"], tool_input["undertone"], tool_input["look_style"]
        )
        return json.dumps({
            "id": f"profile-{int(time.time())}",
            **tool_input,
            "recommended_families": families,
            "saved_shade_ids": [],
            "created_at": datetime.datetime.utcnow().isoformat() + "Z",
        })

    return json.dumps({"error": f"Unknown tool: {tool_name}"})


# ── Agent Loop ────────────────────────────────────────────────────────────────

SYSTEM_PROMPT = """You are ShadeMatch Studio, a personalized beauty intelligence agent.
Your role is to help users discover cosmetic shade families that complement their skin tone,
undertone, and aesthetic preferences. You have access to two tools:

1. shade_recommender — for quick family recommendations from skin profile inputs
2. profile_builder — for building a full persistent beauty profile

Always explain your recommendations in warm, encouraging language. Reference specific
shade families by name and briefly explain why they suit the user's profile."""


def run_agent(user_message: str, api_key: str | None = None) -> str:
    """
    Run the ShadeMatch Studio agent using Claude's tool-use API.

    Args:
        user_message: Natural-language beauty query.
        api_key: Anthropic API key. Falls back to ANTHROPIC_API_KEY env var.

    Returns:
        Final text response from Claude.
    """
    client = anthropic.Anthropic(api_key=api_key)
    messages: list[dict] = [{"role": "user", "content": user_message}]

    while True:
        response = client.messages.create(
            model="claude-3-7-sonnet-20250219",
            max_tokens=2048,
            system=SYSTEM_PROMPT,
            tools=TOOLS,
            messages=messages,
        )

        # Append assistant turn
        messages.append({"role": "assistant", "content": response.content})

        if response.stop_reason == "end_turn":
            # Return the last text block
            for block in reversed(response.content):
                if hasattr(block, "text"):
                    return block.text
            return ""

        if response.stop_reason == "tool_use":
            tool_results = []
            for block in response.content:
                if block.type == "tool_use":
                    result_content = execute_tool(block.name, block.input)
                    tool_results.append({
                        "type": "tool_result",
                        "tool_use_id": block.id,
                        "content": result_content,
                    })
            messages.append({"role": "user", "content": tool_results})
            continue

        break

    return ""


# ── Example Usage ─────────────────────────────────────────────────────────────

if __name__ == "__main__":
    reply = run_agent(
        "I have ivory skin with cool undertones and I love editorial looks. "
        "Can you build my beauty profile and tell me which shade families to explore?"
    )
    print(reply)
