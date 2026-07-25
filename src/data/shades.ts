import type { Shade } from '../types';

// 10-shade skin-tone palette — from porcelain to deep espresso
// Also used as the visual centrepiece throughout the app
export const SKIN_TONE_PALETTE: { id: string; label: string; hex: string }[] = [
  { id: 'porcelain', label: 'Porcelain', hex: '#F9EDE3' },
  { id: 'ivory',     label: 'Ivory',     hex: '#F3DDD0' },
  { id: 'sand',      label: 'Sand',      hex: '#E8C9AF' },
  { id: 'beige',     label: 'Beige',     hex: '#D9B594' },
  { id: 'honey',     label: 'Honey',     hex: '#C9995C' },
  { id: 'caramel',   label: 'Caramel',   hex: '#B07A40' },
  { id: 'sienna',    label: 'Sienna',    hex: '#8B5E3C' },
  { id: 'chestnut',  label: 'Chestnut',  hex: '#6B3F28' },
  { id: 'mahogany',  label: 'Mahogany',  hex: '#4E2B1A' },
  { id: 'espresso',  label: 'Espresso',  hex: '#2B1510' },
];

export const SHADES: Shade[] = [
  // ── NUDES ──────────────────────────────────────────────────────────────────
  {
    id: 'sh-001', name: 'Bare Whisper', hexColor: '#F2DED2', family: 'nudes',
    undertone: 'neutral', depth: 'light', finish: 'satin', coverage: 'sheer',
    brand: 'Lumière', productLine: 'Skin Veil', trending: false, viewCount: 412, saveCount: 87,
    description: 'A barely-there veil that lets your skin breathe through — perfect for a "your lips but better" moment.',
    bestFor: ['porcelain', 'ivory'],
  },
  {
    id: 'sh-002', name: 'Cashew Crème', hexColor: '#D4A882', family: 'nudes',
    undertone: 'warm', depth: 'medium', finish: 'matte', coverage: 'medium',
    brand: 'Lumière', productLine: 'Velour Lip', trending: true, viewCount: 1820, saveCount: 634,
    description: 'The nude that works on everyone — warm beige with golden undertones for a lived-in luxe finish.',
    bestFor: ['sand', 'beige', 'honey'],
  },
  {
    id: 'sh-003', name: 'Espresso Silk', hexColor: '#6B4226', family: 'nudes',
    undertone: 'warm', depth: 'deep', finish: 'satin', coverage: 'full',
    brand: 'Noire Studio', productLine: 'Rich Wear', trending: true, viewCount: 2140, saveCount: 890,
    description: 'A deep brown-nude that commands the room — rich, sophisticated and utterly wearable.',
    bestFor: ['mahogany', 'espresso', 'chestnut'],
  },
  {
    id: 'sh-004', name: 'Oat & Honey', hexColor: '#C9A47E', family: 'nudes',
    undertone: 'warm', depth: 'light-medium', finish: 'dewy', coverage: 'sheer',
    brand: 'Petal & Dew', productLine: 'Glass Lip', trending: false, viewCount: 930, saveCount: 204,
    description: 'Translucent golden warmth — like sunlight filtered through honey. Dewy and glowing.',
    bestFor: ['beige', 'honey', 'caramel'],
  },
  {
    id: 'sh-005', name: 'Parchment', hexColor: '#E8CFBA', family: 'nudes',
    undertone: 'cool', depth: 'light', finish: 'matte', coverage: 'medium',
    brand: 'Lumière', productLine: 'Velour Lip', trending: false, viewCount: 560, saveCount: 118,
    description: 'Cool-toned parchment — refined and editorial, designed for porcelain and ivory complexions.',
    bestFor: ['porcelain', 'ivory', 'sand'],
  },

  // ── ROSES ──────────────────────────────────────────────────────────────────
  {
    id: 'sh-006', name: 'First Blush', hexColor: '#E8A8A0', family: 'roses',
    undertone: 'cool', depth: 'light', finish: 'dewy', coverage: 'sheer',
    brand: 'Petal & Dew', productLine: 'Glass Lip', trending: true, viewCount: 3210, saveCount: 1102,
    description: 'The ethereal rose everyone falls for — sheer and luminous, it melts into cool undertones beautifully.',
    bestFor: ['porcelain', 'ivory', 'sand'],
  },
  {
    id: 'sh-007', name: 'Garden Party', hexColor: '#D47876', family: 'roses',
    undertone: 'neutral', depth: 'medium', finish: 'satin', coverage: 'medium',
    brand: 'Lumière', productLine: 'Skin Veil', trending: false, viewCount: 1040, saveCount: 298,
    description: 'A mid-toned rosy pink that flatters neutrals — effortlessly chic from morning to midnight.',
    bestFor: ['beige', 'honey', 'sand'],
  },
  {
    id: 'sh-008', name: 'Dusty Petal', hexColor: '#C87C8C', family: 'roses',
    undertone: 'cool', depth: 'medium', finish: 'matte', coverage: 'full',
    brand: 'Noire Studio', productLine: 'Pigment Luxe', trending: false, viewCount: 780, saveCount: 167,
    description: 'Sophisticated muted rose — the colour of dried flowers. Pairs with a strong eye or zero makeup.',
    bestFor: ['ivory', 'sand', 'beige'],
  },

  // ── BERRIES ────────────────────────────────────────────────────────────────
  {
    id: 'sh-009', name: 'Midnight Plum', hexColor: '#6B2D55', family: 'berries',
    undertone: 'cool', depth: 'deep', finish: 'matte', coverage: 'full',
    brand: 'Noire Studio', productLine: 'Pigment Luxe', trending: true, viewCount: 2890, saveCount: 1024,
    description: 'Dramatic plum-berry that commands every room. A saturated cool jewel tone for bold looks.',
    bestFor: ['ivory', 'beige', 'sienna', 'mahogany'],
  },
  {
    id: 'sh-010', name: 'Wild Fig', hexColor: '#8B3A62', family: 'berries',
    undertone: 'neutral', depth: 'medium-deep', finish: 'satin', coverage: 'full',
    brand: 'Lumière', productLine: 'Velour Lip', trending: false, viewCount: 1440, saveCount: 390,
    description: 'Luscious dark berry meets soft satin — a versatile statement that works day to night.',
    bestFor: ['honey', 'caramel', 'sienna'],
  },
  {
    id: 'sh-011', name: 'Boysenberry', hexColor: '#7D3466', family: 'berries',
    undertone: 'cool', depth: 'deep', finish: 'matte', coverage: 'full',
    brand: 'Noire Studio', productLine: 'Pigment Luxe', trending: false, viewCount: 890, saveCount: 243,
    description: 'True-blue berry — cool, saturated, editorial. The choice of beauty directors everywhere.',
    bestFor: ['sienna', 'chestnut', 'mahogany', 'espresso'],
  },

  // ── REDS ───────────────────────────────────────────────────────────────────
  {
    id: 'sh-012', name: 'Scarlet Hour', hexColor: '#C0392B', family: 'reds',
    undertone: 'neutral', depth: 'medium', finish: 'satin', coverage: 'full',
    brand: 'Lumière', productLine: 'Velour Lip', trending: true, viewCount: 4120, saveCount: 1870,
    description: 'The iconic true red — balanced, universally flattering, and impossibly chic.',
    bestFor: ['porcelain', 'ivory', 'sand', 'beige', 'honey'],
  },
  {
    id: 'sh-013', name: 'Ruby Lacquer', hexColor: '#9B1B30', family: 'reds',
    undertone: 'cool', depth: 'deep', finish: 'matte', coverage: 'full',
    brand: 'Noire Studio', productLine: 'Pigment Luxe', trending: false, viewCount: 1560, saveCount: 510,
    description: 'Deep ruby with blue-cool undertones — the classic red for cool complexions elevated.',
    bestFor: ['ivory', 'sand', 'beige', 'sienna'],
  },
  {
    id: 'sh-014', name: 'Ember & Wine', hexColor: '#A0261E', family: 'reds',
    undertone: 'warm', depth: 'deep', finish: 'satin', coverage: 'full',
    brand: 'Noire Studio', productLine: 'Rich Wear', trending: false, viewCount: 1230, saveCount: 407,
    description: 'A sun-warmed burgundy red — deep, smoldering, and made for golden skin tones.',
    bestFor: ['honey', 'caramel', 'sienna', 'chestnut'],
  },

  // ── CORALS ─────────────────────────────────────────────────────────────────
  {
    id: 'sh-015', name: 'Tangerine Dream', hexColor: '#E8734A', family: 'corals',
    undertone: 'warm', depth: 'medium', finish: 'satin', coverage: 'medium',
    brand: 'Petal & Dew', productLine: 'Glass Lip', trending: true, viewCount: 2340, saveCount: 871,
    description: 'Sun-kissed coral with a citrus warmth — the quintessential summer shade.',
    bestFor: ['sand', 'beige', 'honey', 'caramel'],
  },
  {
    id: 'sh-016', name: 'Papaya Sorbet', hexColor: '#F0956A', family: 'corals',
    undertone: 'warm', depth: 'light-medium', finish: 'dewy', coverage: 'sheer',
    brand: 'Petal & Dew', productLine: 'Glass Lip', trending: false, viewCount: 1120, saveCount: 312,
    description: 'A tropical burst of peachy-coral. Sheer and luminous, this is summer in a tube.',
    bestFor: ['ivory', 'sand', 'beige'],
  },

  // ── BRONZES ────────────────────────────────────────────────────────────────
  {
    id: 'sh-017', name: 'Toasted Amber', hexColor: '#B5631E', family: 'bronzes',
    undertone: 'warm', depth: 'medium-deep', finish: 'satin', coverage: 'full',
    brand: 'Lumière', productLine: 'Skin Veil', trending: false, viewCount: 870, saveCount: 198,
    description: 'Rich amber-bronze that deepens warm undertones into something truly spectacular.',
    bestFor: ['caramel', 'sienna', 'chestnut'],
  },
  {
    id: 'sh-018', name: 'Burnished Dusk', hexColor: '#8B4513', family: 'bronzes',
    undertone: 'warm', depth: 'deep', finish: 'matte', coverage: 'full',
    brand: 'Noire Studio', productLine: 'Rich Wear', trending: true, viewCount: 1980, saveCount: 722,
    description: 'Dark, brooding bronze — the kind of shade that looks like you spent the summer in Marrakech.',
    bestFor: ['chestnut', 'mahogany', 'espresso'],
  },

  // ── MAUVES ─────────────────────────────────────────────────────────────────
  {
    id: 'sh-019', name: 'Thistle & Ash', hexColor: '#B58A9A', family: 'mauves',
    undertone: 'cool', depth: 'light-medium', finish: 'matte', coverage: 'medium',
    brand: 'Lumière', productLine: 'Velour Lip', trending: false, viewCount: 1290, saveCount: 345,
    description: 'Muted dusty mauve — the colour of twilight and effortless Parisian style.',
    bestFor: ['ivory', 'sand', 'beige'],
  },
  {
    id: 'sh-020', name: 'Smoke & Violet', hexColor: '#8E6F85', family: 'mauves',
    undertone: 'cool', depth: 'medium', finish: 'satin', coverage: 'full',
    brand: 'Noire Studio', productLine: 'Pigment Luxe', trending: true, viewCount: 2100, saveCount: 790,
    description: 'Smoky violet-mauve that bridges the line between neutral and statement. Endlessly versatile.',
    bestFor: ['honey', 'caramel', 'sienna'],
  },

  // ── NEUTRALS ───────────────────────────────────────────────────────────────
  {
    id: 'sh-021', name: 'Stone Harbour', hexColor: '#A0887C', family: 'neutrals',
    undertone: 'neutral', depth: 'medium', finish: 'matte', coverage: 'full',
    brand: 'Lumière', productLine: 'Velour Lip', trending: false, viewCount: 670, saveCount: 143,
    description: 'A true-neutral rosy-taupe — the rare shade that genuinely suits every undertone.',
    bestFor: ['sand', 'beige', 'honey', 'caramel'],
  },
  {
    id: 'sh-022', name: 'Warm Concrete', hexColor: '#9B7B6B', family: 'neutrals',
    undertone: 'warm', depth: 'medium', finish: 'matte', coverage: 'medium',
    brand: 'Petal & Dew', productLine: 'Glass Lip', trending: false, viewCount: 540, saveCount: 110,
    description: 'An architectural warm-neutral — the beauty world equivalent of a perfect white tee.',
    bestFor: ['honey', 'caramel', 'sienna'],
  },
];
