# EXPLAINABILITY — ShadeMatch Studio

## How it decides
1. The user selects or has their skin tone estimated through the
   onboarding flow.
2. The `match_shades` function compares that tone value against a fixed,
   pre-defined shade catalog (`shades.ts`) using rule-based matching —
   not a trained model or LLM.
3. Ranked matches are displayed alongside curated look and artist
   suggestions from static mock data (`analytics.ts`).
4. State (selections, preferences) is kept in Zustand and persisted to
   localStorage — there is no backend or database.

## Data used
- A hardcoded shade catalog bundled with the app.
- The user's own tone selection/input, kept entirely client-side.
- No data is sent to any server, API, or third party.

## Limitations
- Matching logic is deterministic and rule-based, not adaptive or
  learning-based — it will not improve from user feedback.
- The shade catalog is static; it does not reflect real-time inventory,
  new product releases, or discontinued shades.
- No professional color-matching technology (e.g. camera-based analysis)
  is used — accuracy depends on the user's own tone selection.
- Because everything runs client-side with no backend, this project has
  no server-side reasoning or API calls for an agent framework to export.