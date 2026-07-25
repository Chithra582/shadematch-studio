import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BeautyProfile, Appointment } from '../types';
import type { ShadeFamily, SkinTone, Undertone, LookStyle } from '../types';

// ─── Shade Family Recommendation Logic ───────────────────────────────────────

function deriveRecommendedFamilies(
  skinTone: SkinTone,
  undertone: Undertone,
  lookStyle: LookStyle
): ShadeFamily[] {
  const families: ShadeFamily[] = [];

  // Undertone-based primary recommendations
  if (undertone === 'warm') {
    families.push('nudes', 'corals', 'bronzes');
  } else if (undertone === 'cool') {
    families.push('roses', 'berries', 'mauves');
  } else {
    families.push('nudes', 'roses', 'neutrals');
  }

  // Style overlay
  if (lookStyle === 'bold') {
    families.push('reds', 'berries');
  } else if (lookStyle === 'natural') {
    families.push('neutrals');
  } else {
    // editorial
    families.push('mauves', 'reds');
  }

  // Depth-based inclusion
  const deepTones: SkinTone[] = ['sienna', 'chestnut', 'mahogany', 'espresso'];
  if (deepTones.includes(skinTone)) {
    families.push('bronzes');
  }

  // Deduplicate while preserving order
  return [...new Set(families)].slice(0, 4) as ShadeFamily[];
}

// ─── Store Interface ──────────────────────────────────────────────────────────

interface AppStore {
  // Profile
  profile: BeautyProfile | null;
  setProfile: (profile: BeautyProfile) => void;
  clearProfile: () => void;
  addSavedShade: (shadeId: string) => void;
  removeSavedShade: (shadeId: string) => void;

  // Comparison
  comparedShadeIds: string[];
  addToComparison: (shadeId: string) => void;
  removeFromComparison: (shadeId: string) => void;
  clearComparison: () => void;

  // Appointments
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  cancelAppointment: (appointmentId: string) => void;

  // Helpers
  buildProfile: (params: {
    name: string;
    skinTone: SkinTone;
    undertone: Undertone;
    finish: import('../types').Finish;
    coverage: import('../types').Coverage;
    skinType: import('../types').SkinType;
    lookStyle: LookStyle;
  }) => BeautyProfile;
}

// ─── Store Implementation ─────────────────────────────────────────────────────

export const useStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // ── Profile ─────────────────────────────────────────────────────────────
      profile: null,

      setProfile: (profile) => set({ profile }),

      clearProfile: () => set({ profile: null }),

      addSavedShade: (shadeId) => {
        const { profile } = get();
        if (!profile) return;
        if (profile.savedShadeIds.includes(shadeId)) return;
        set({
          profile: {
            ...profile,
            savedShadeIds: [...profile.savedShadeIds, shadeId],
          },
        });
      },

      removeSavedShade: (shadeId) => {
        const { profile } = get();
        if (!profile) return;
        set({
          profile: {
            ...profile,
            savedShadeIds: profile.savedShadeIds.filter((id) => id !== shadeId),
          },
        });
      },

      buildProfile: (params) => {
        const id = `profile-${Date.now()}`;
        const recommendedFamilies = deriveRecommendedFamilies(
          params.skinTone,
          params.undertone,
          params.lookStyle
        );
        const profile: BeautyProfile = {
          id,
          name: params.name,
          skinTone: params.skinTone,
          undertone: params.undertone,
          finish: params.finish,
          coverage: params.coverage,
          skinType: params.skinType,
          lookStyle: params.lookStyle,
          recommendedFamilies,
          savedShadeIds: [],
          createdAt: new Date().toISOString(),
        };
        return profile;
      },

      // ── Comparison ──────────────────────────────────────────────────────────
      comparedShadeIds: [],

      addToComparison: (shadeId) => {
        const { comparedShadeIds } = get();
        if (comparedShadeIds.includes(shadeId)) return;
        if (comparedShadeIds.length >= 4) return; // max 4
        set({ comparedShadeIds: [...comparedShadeIds, shadeId] });
      },

      removeFromComparison: (shadeId) => {
        set({
          comparedShadeIds: get().comparedShadeIds.filter((id) => id !== shadeId),
        });
      },

      clearComparison: () => set({ comparedShadeIds: [] }),

      // ── Appointments ─────────────────────────────────────────────────────────
      appointments: [],

      addAppointment: (appointment) => {
        set({ appointments: [...get().appointments, appointment] });
      },

      cancelAppointment: (appointmentId) => {
        set({
          appointments: get().appointments.map((a) =>
            a.id === appointmentId ? { ...a, status: 'cancelled' as const } : a
          ),
        });
      },
    }),
    {
      name: 'shadeswatch-store',
      // Only persist profile + appointments (not transient comparison state)
      partialize: (state) => ({
        profile: state.profile,
        appointments: state.appointments,
      }),
    }
  )
);
