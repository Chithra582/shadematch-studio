---
name: shade-matching
description: Matches a user's selected or detected skin tone to compatible foundation and concealer shades using a predefined, rule-based catalog lookup.
---

# Skill: shade-matching

## Description
Matches a user's selected or detected skin tone to compatible foundation
and concealer shades using a predefined, rule-based catalog lookup.

## Inputs
- Skin tone value (selected during onboarding)
- Optional undertone preference

## Outputs
- Ranked list of matching shades from the static catalog, each with
  coverage type and finish metadata

## Logic
Rule-based distance comparison against catalog entries in `shades.ts` —
no machine learning model or LLM is involved.

## Limitations
- Catalog is hardcoded and does not update dynamically.
- Matching is approximate and not a substitute for in-person color testing.