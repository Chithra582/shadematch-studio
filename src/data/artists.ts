import type { Artist } from '../types';

export const ARTISTS: Artist[] = [
  {
    id: 'artist-001',
    name: 'Valentina Cruz',
    specialty: 'Bridal',
    rating: 4.9,
    reviewCount: 214,
    bio: `Valentina's bridal portfolio spans four continents. She blends classic technique with modern finishes — her signature is radiant, camera-ready skin that still looks like skin.`,
    avatarGradient: 'linear-gradient(135deg, #E8A8A0 0%, #C15B4A 100%)',
    priceFrom: 180,
    availableDates: [
      { date: '2026-08-02', slots: ['10:00', '13:00', '15:30'] },
      { date: '2026-08-05', slots: ['09:00', '11:30', '14:00'] },
      { date: '2026-08-09', slots: ['10:00', '12:00'] },
    ],
  },
  {
    id: 'artist-002',
    name: 'Rohan Mehta',
    specialty: 'Editorial',
    rating: 4.8,
    reviewCount: 189,
    bio: `Rohan works between Mumbai and London, shooting for glossy mastheads and fashion weeks. His editorial eye translates directly to wearable-but-elevated client looks.`,
    avatarGradient: 'linear-gradient(135deg, #8A9A7E 0%, #5A6E52 100%)',
    priceFrom: 220,
    availableDates: [
      { date: '2026-08-03', slots: ['11:00', '14:00', '16:00'] },
      { date: '2026-08-07', slots: ['10:00', '13:30'] },
      { date: '2026-08-12', slots: ['09:00', '12:00', '15:00'] },
    ],
  },
  {
    id: 'artist-003',
    name: 'Aisha Dubois',
    specialty: 'Natural Glam',
    rating: 4.9,
    reviewCount: 307,
    bio: `Aisha is the artist your Instagram explore page knows but can't place. Specialist in enhancing natural beauty — her clients always say "I look like myself, but better.".`,
    avatarGradient: 'linear-gradient(135deg, #D4A882 0%, #8B5E3C 100%)',
    priceFrom: 150,
    availableDates: [
      { date: '2026-08-01', slots: ['09:30', '11:00', '13:30', '16:00'] },
      { date: '2026-08-04', slots: ['10:00', '14:00'] },
      { date: '2026-08-08', slots: ['09:00', '11:30', '14:30'] },
    ],
  },
  {
    id: 'artist-004',
    name: 'Margaux Fontaine',
    specialty: 'Bold Artistry',
    rating: 4.7,
    reviewCount: 156,
    bio: `Trained at MAC Pro and Cirque du Soleil, Margaux brings theatrical precision to every look. If you want cut creases, graphic liner, or a colour-block moment — she's the one.`,
    avatarGradient: 'linear-gradient(135deg, #6B2D55 0%, #9B1B30 100%)',
    priceFrom: 200,
    availableDates: [
      { date: '2026-08-02', slots: ['12:00', '15:00'] },
      { date: '2026-08-06', slots: ['10:00', '13:00', '16:00'] },
      { date: '2026-08-10', slots: ['11:00', '14:00'] },
    ],
  },
];
