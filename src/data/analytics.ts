import type { AnalyticsData } from '../types';

export const ANALYTICS_DATA: AnalyticsData = {
  statCards: [
    { label: 'Shades Explored', value: '247', change: '+12 this week', trend: 'up', icon: 'Palette' },
    { label: 'Shades Saved', value: '38', change: '+5 this week', trend: 'up', icon: 'Heart' },
    { label: 'Comparisons Made', value: '14', change: '+3 this week', trend: 'up', icon: 'GitCompare' },
    { label: 'Match Score', value: '94%', change: 'Profile complete', trend: 'neutral', icon: 'Sparkles' },
  ],

  shadeDistribution: [
    { family: 'Nudes',    viewed: 68, saved: 22 },
    { family: 'Roses',    viewed: 52, saved: 18 },
    { family: 'Reds',     viewed: 44, saved: 15 },
    { family: 'Berries',  viewed: 38, saved: 12 },
    { family: 'Corals',   viewed: 30, saved: 10 },
    { family: 'Bronzes',  viewed: 22, saved: 8  },
    { family: 'Mauves',   viewed: 19, saved: 6  },
    { family: 'Neutrals', viewed: 14, saved: 4  },
  ],

  preferenceBreakdown: [
    { subject: 'Matte',     value: 82, fullMark: 100 },
    { subject: 'Dewy',      value: 45, fullMark: 100 },
    { subject: 'Satin',     value: 60, fullMark: 100 },
    { subject: 'Bold',      value: 55, fullMark: 100 },
    { subject: 'Natural',   value: 70, fullMark: 100 },
    { subject: 'Full Cover',value: 48, fullMark: 100 },
  ],

  topRecommended: [
    { name: 'Cashew Crème',  brand: 'Lumière',       score: 98, hexColor: '#D4A882' },
    { name: 'Scarlet Hour',  brand: 'Lumière',       score: 95, hexColor: '#C0392B' },
    { name: 'Thistle & Ash', brand: 'Lumière',       score: 91, hexColor: '#B58A9A' },
    { name: 'First Blush',   brand: 'Petal & Dew',   score: 88, hexColor: '#E8A8A0' },
    { name: 'Wild Fig',      brand: 'Lumière',       score: 85, hexColor: '#8B3A62' },
  ],

  trendingShades: [
    { name: 'Scarlet Hour',    views: 4120, hexColor: '#C0392B', change: +28 },
    { name: 'First Blush',     views: 3210, hexColor: '#E8A8A0', change: +21 },
    { name: 'Espresso Silk',   views: 2140, hexColor: '#6B4226', change: +17 },
    { name: 'Midnight Plum',   views: 2890, hexColor: '#6B2D55', change: +14 },
    { name: 'Tangerine Dream', views: 2340, hexColor: '#E8734A', change: +11 },
  ],

  weeklyActivity: [
    { day: 'Mon', viewed: 18, saved: 4, compared: 2 },
    { day: 'Tue', viewed: 34, saved: 7, compared: 3 },
    { day: 'Wed', viewed: 28, saved: 5, compared: 1 },
    { day: 'Thu', viewed: 52, saved: 9, compared: 4 },
    { day: 'Fri', viewed: 61, saved: 11, compared: 5 },
    { day: 'Sat', viewed: 44, saved: 8, compared: 3 },
    { day: 'Sun', viewed: 10, saved: 2, compared: 1 },
  ],
};
