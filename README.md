# ShadeMatch Studio

> **BeautyTech SaaS — Frontend Wars 2026 Entry**  
> A personalized beauty intelligence platform that matches shades to your unique skin tone, undertone, and style preferences. Client-side only. No backends, no APIs, no databases.

---

## ✨ Features

### 1. Beauty Profile (Onboarding)
6-step guided onboarding with visual swatch selectors (not dropdowns):
- **Name** → **Skin Tone** (10-swatch palette, porcelain → espresso) → **Undertone** → **Finish + Coverage** → **Skin Type** → **Look Style**
- Generates a personalized profile card with recommended shade families
- Staged reveal animation (staggered 80ms per card) using Framer Motion
- Persisted via Zustand + localStorage

### 2. Shade Comparison Tool
- Large, tactile swatch circles with real inner-shadow makeup-pan feel
- Finish sheen overlays (dewy = glossy radial gradient, satin = subtle highlight)
- Select 2–4 shades for side-by-side comparison
- Colour strip + undertone relationship dots
- Filter by undertone, depth, finish, and family; sort by light→deep, name, or views
- Save/compare quick-action buttons on each swatch

### 3. Beauty Analytics Dashboard
- **Stat Cards** — explored, saved, compared, match score
- **Weekly Activity** — Area chart (viewed + saved, custom terracotta/sage gradient)
- **Preference Profile** — Radar chart recolored to terracotta
- **Shade Family Distribution** — Bar chart (warm-sand + terracotta, no default blue/green)
- **Top Recommended** — Matched to your profile
- **Trending Now** — Live surge indicators
- All charts recolored away from recharts defaults

### 4. Virtual Lookbook
- Gallery of 6 curated looks with gradient mock-images and overlapping shade swatches
- Click → animated detail modal with all shades listed (name, brand, product line, finish)

### 5. Artist Portfolios & Booking
- 4 artist cards with specialty, rating, bio, and price
- Click → booking modal with date/time slot selection
- Confirms into a local appointment list (persisted per session)
- Upcoming appointments panel above the grid

---

## 🎨 Design System

| Token | Value |
|---|---|
| Background | `#FBF6F0` (warm ivory) |
| Text | `#2B1D18` (deep espresso) |
| Accent / CTA | `#C15B4A` (terracotta-rose) |
| Secondary | `#8A9A7E` (muted sage) |
| Border | `#B8A99A` (soft taupe) |
| Display Font | Fraunces (Google Fonts) |
| Body Font | Manrope (Google Fonts) |

---

## 🛠 Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`) + custom CSS vars |
| Routing | react-router-dom v7 |
| State | Zustand (with `persist` → localStorage) |
| Animation | Framer Motion |
| Charts | Recharts (recolored to brand palette) |
| Icons | Lucide React |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   └── Sidebar.tsx        # Desktop sidebar + mobile bottom tab bar
│   ├── ShadeSwatch.tsx        # Tactile swatch component
│   ├── ProfileCard.tsx        # Profile reveal card (animated)
│   └── StatCard.tsx           # Analytics stat card
├── pages/
│   ├── ProfilePage.tsx        # 6-step onboarding + profile view
│   ├── ComparePage.tsx        # Shade comparison tool
│   ├── AnalyticsPage.tsx      # Data visualization dashboard
│   ├── LookbookPage.tsx       # Virtual lookbook gallery
│   └── ArtistsPage.tsx        # Artist cards + booking modal
├── data/
│   ├── shades.ts              # 22 shades across 8 families (mock)
│   ├── analytics.ts           # Mock analytics data
│   ├── looks.ts               # 6 curated looks (mock)
│   └── artists.ts             # 4 artists with availability (mock)
├── store/
│   └── useStore.ts            # Zustand store (profile, comparison, appointments)
├── types/
│   └── index.ts               # All TypeScript types (no `any`)
├── App.tsx                    # Root routing
├── main.tsx                   # Entry point
└── index.css                  # Design tokens + global styles
```

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Visit `http://localhost:5173`

---

## Deployment Link

https://agent-6a64766d3416d2d43c5ae2d--shadematch-studio.netlify.app/profile

---

