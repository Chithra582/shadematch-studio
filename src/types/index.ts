// ─── Core Profile Types ──────────────────────────────────────────────────────

export type SkinTone =
  | 'porcelain'
  | 'ivory'
  | 'sand'
  | 'beige'
  | 'honey'
  | 'caramel'
  | 'sienna'
  | 'chestnut'
  | 'mahogany'
  | 'espresso';

export type Undertone = 'warm' | 'cool' | 'neutral';
export type Finish = 'matte' | 'dewy' | 'satin';
export type Coverage = 'sheer' | 'medium' | 'full';
export type SkinType = 'dry' | 'oily' | 'combination' | 'normal' | 'sensitive';
export type LookStyle = 'bold' | 'natural' | 'editorial';
export type ShadeFamily =
  | 'nudes'
  | 'roses'
  | 'berries'
  | 'reds'
  | 'corals'
  | 'bronzes'
  | 'mauves'
  | 'neutrals';

export interface BeautyProfile {
  id: string;
  name: string;
  skinTone: SkinTone;
  undertone: Undertone;
  finish: Finish;
  coverage: Coverage;
  skinType: SkinType;
  lookStyle: LookStyle;
  recommendedFamilies: ShadeFamily[];
  savedShadeIds: string[];
  createdAt: string;
}

// ─── Shade Types ──────────────────────────────────────────────────────────────

export interface Shade {
  id: string;
  name: string;
  hexColor: string;
  family: ShadeFamily;
  undertone: Undertone;
  depth: 'light' | 'light-medium' | 'medium' | 'medium-deep' | 'deep';
  finish: Finish;
  coverage: Coverage;
  brand: string;
  productLine: string;
  description: string;
  bestFor: SkinTone[];
  trending: boolean;
  viewCount: number;
  saveCount: number;
}

// ─── Lookbook Types ───────────────────────────────────────────────────────────

export interface Look {
  id: string;
  title: string;
  tagline: string;
  season: 'spring' | 'summer' | 'autumn' | 'winter' | 'all-year';
  style: LookStyle;
  shadeIds: string[];
  imageGradient: string; // CSS gradient for mock image
  tags: string[];
}

// ─── Artist / Appointment Types ───────────────────────────────────────────────

export type Specialty =
  | 'Bridal'
  | 'Editorial'
  | 'Natural Glam'
  | 'Bold Artistry'
  | 'Corrective'
  | 'Special FX';

export interface Artist {
  id: string;
  name: string;
  specialty: Specialty;
  rating: number;
  reviewCount: number;
  bio: string;
  avatarGradient: string; // CSS gradient for avatar placeholder
  availableDates: AvailableDate[];
  priceFrom: number;
}

export interface AvailableDate {
  date: string; // ISO date string
  slots: string[]; // e.g. ["10:00", "11:30", "14:00"]
}

export interface Appointment {
  id: string;
  artistId: string;
  artistName: string;
  date: string;
  time: string;
  service: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  bookedAt: string;
}

// ─── Analytics Types ──────────────────────────────────────────────────────────

export interface AnalyticsData {
  shadeDistribution: ShadeDistributionItem[];
  preferenceBreakdown: PreferenceItem[];
  topRecommended: TopShadeItem[];
  trendingShades: TrendingShadeItem[];
  weeklyActivity: WeeklyActivityItem[];
  statCards: StatCard[];
}

export interface ShadeDistributionItem {
  family: string;
  viewed: number;
  saved: number;
}

export interface PreferenceItem {
  subject: string;
  value: number;
  fullMark: number;
}

export interface TopShadeItem {
  name: string;
  brand: string;
  score: number;
  hexColor: string;
}

export interface TrendingShadeItem {
  name: string;
  views: number;
  hexColor: string;
  change: number; // percentage change
}

export interface WeeklyActivityItem {
  day: string;
  viewed: number;
  saved: number;
  compared: number;
}

export interface StatCard {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: string;
}

// ─── Onboarding Step Types ────────────────────────────────────────────────────

export interface OnboardingState {
  step: number;
  name: string;
  skinTone: SkinTone | null;
  undertone: Undertone | null;
  finish: Finish | null;
  coverage: Coverage | null;
  skinType: SkinType | null;
  lookStyle: LookStyle | null;
}
