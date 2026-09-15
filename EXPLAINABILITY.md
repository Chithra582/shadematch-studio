# EXPLAINABILITY — ShadeMatch Studio

> **Admissibility & Transparency Report for OpenGAP / Agent Passport**  
> *Agent Name:* ShadeMatch Studio (`shadeswatch-studio`)  
> *Specification:* OpenGAP v0.1.0  
> *Domain:* Retail & E-commerce / Beauty Technology  

---

## 1. Overview & Architectural Purpose

ShadeMatch Studio is a rule-based beauty intelligence agent that recommends cosmetic shade families to users based on their declared skin tone, undertone, finish preference, coverage level, skin type, and look style. It operates entirely client-side with no network calls — all reasoning runs against a curated, static mock dataset of 22 shades across 8 families (nudes, roses, berries, reds, corals, bronzes, mauves, neutrals).

The agent's primary purpose is to reduce the cognitive load of shade discovery by translating a user's physical and stylistic profile into a ranked, personalized set of cosmetic recommendations — and to present those recommendations through an analytics-driven dashboard that explains the reasoning visually.

---

## 2. How the Agent Decides (Decision-Making Logic)

ShadeMatch Studio operates on a deterministic, multi-stage decision pipeline:

```
[User Onboarding Input] ──> [Undertone Classification] ──> [Look Style Overlay]
                                                                    │
                                                                    ▼
[Profile Card Reveal] <── [Family Ranking Engine] <── [Skin Depth Adjustment]
```

### 2.1 Undertone-Based Primary Family Selection

The core recommendation logic is driven by undertone:

| Undertone | Primary Families Assigned |
|---|---|
| `warm`    | nudes, corals, bronzes |
| `cool`    | roses, berries, mauves |
| `neutral` | nudes, roses, neutrals |

**Rationale:** Undertone is the strongest predictor of whether a cosmetic shade will appear harmonious or clashing on a given complexion. Warm undertones pull toward orange-adjacent spectrum families; cool undertones toward blue-pink spectrum families.

### 2.2 Look Style Overlay

After the undertone base is established, the agent applies a look-style modifier:

| Look Style  | Modifier |
|---|---|
| `bold`      | Appends `reds`, `berries` to the family list |
| `natural`   | Appends `neutrals` |
| `editorial` | Appends `mauves`, `reds` |

**Rationale:** Look style captures the user's aesthetic intent independently of skin tone. A warm-undertoned user who wants bold looks should still have access to deep red families despite those not being "warm primary."

### 2.3 Skin Depth Adjustment

For deep skin tone categories (`sienna`, `chestnut`, `mahogany`, `espresso`), the agent additionally appends `bronzes` regardless of undertone:

**Rationale:** Bronze and deep warm-brown shades are universally complementary for deeper complexions and significantly under-recommended by generic beauty tools. This rule corrects for that gap.

### 2.4 Deduplication & Slot Limit

The combined family list is deduplicated (preserving insertion order) and capped at **4 families** to prevent recommendation overload.

**Rationale:** Research in choice architecture shows that presenting 4 or fewer primary options reduces decision fatigue while covering meaningfully differentiated aesthetics.

### 2.5 Shade-Level Filtering (Comparison Tool)

Within the Shade Comparison tool, individual shades are filtered by:
- **Undertone match** (`warm` / `cool` / `neutral`)
- **Depth range** (light → deep, 5 levels)
- **Finish** (matte / satin / dewy)
- **Family** (any of the 8 families)

Shades are then sorted by user choice: `depth` (light→deep), `name` (A–Z), or `viewCount` (popularity proxy from mock data).

---

## 3. Data the Agent Uses

All data is **static and local** — no network requests are made at any point.

| Dataset | Location | Contents |
|---|---|---|
| Shade catalogue | `src/data/shades.ts` | 22 shades — name, hex colour, family, undertone, depth, finish, coverage, brand, product line, description, bestFor skin tones, viewCount, saveCount, trending flag |
| Skin tone palette | `src/data/shades.ts` (SKIN_TONE_PALETTE) | 10 swatches from porcelain (#F9EDE3) to espresso (#2B1510) |
| Analytics data | `src/data/analytics.ts` | Mock weekly activity, shade distribution by family, preference breakdown, top recommended, trending shades, stat cards |
| Lookbook data | `src/data/looks.ts` | 6 curated look combinations with shade IDs, gradients, tags, season |
| Artist data | `src/data/artists.ts` | 4 mock artists with specialty, rating, bio, availability slots, price |

**No external APIs are called. No user data leaves the browser.**

User-generated data (profile selections, saved shades, booked appointments) is persisted in **`localStorage`** under the key `shadeswatch-store` via Zustand's `persist` middleware.

---

## 4. Limitations

| Limitation | Description |
|---|---|
| Static dataset | The shade catalogue is fixed at 22 entries; new shades require code-level additions |
| No real shade-to-skin rendering | There is no AR/camera try-on; visual matching is approximated by logic rules |
| Mock analytics | All chart data is hardcoded; it does not reflect actual user behaviour |
| No cross-device sync | `localStorage` is browser and device-specific; profiles do not persist across devices |
| Undertone self-reporting | The agent relies entirely on user-declared undertone — no skin-tone detection from images |
| English-only | All content, labels, and copy are English-only; no i18n support |
| No accessibility audit | ARIA labels are present on interactive elements but a full WCAG 2.1 AA audit has not been performed |

---

## 5. Framework & Technology Transparency

| Layer | Technology | Role |
|---|---|---|
| UI Framework | React 18 + TypeScript | Component rendering, typed interfaces |
| Build Tool | Vite 6 + `@tailwindcss/vite` | Dev server, HMR, production bundling |
| Styling | Tailwind CSS v4 + custom CSS variables | Design tokens, layout primitives |
| Routing | react-router-dom v7 | Client-side SPA navigation |
| State | Zustand (`persist` middleware) | Global profile/comparison/appointment state |
| Animation | Framer Motion | Page transitions, swatch hover, profile reveal |
| Data Viz | Recharts | Area, Bar, Radar charts — recoloured to brand palette |
| Icons | Lucide React | Consistent icon set |

---

## 6. Decision Audit Trail (Example)

**Input:** Skin tone = `honey`, Undertone = `warm`, Look style = `bold`

```
Step 1 — Undertone base:     [nudes, corals, bronzes]
Step 2 — Bold style overlay: [nudes, corals, bronzes, reds, berries]
Step 3 — Skin depth:         honey is not in deep tier → no bronzes addition
Step 4 — Deduplicate + cap4: [nudes, corals, bronzes, reds]
Output → recommendedFamilies: ["nudes", "corals", "bronzes", "reds"]
```

This trace is fully reproducible from `src/store/useStore.ts` → `deriveRecommendedFamilies()`.
