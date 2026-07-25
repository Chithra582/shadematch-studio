import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Sparkles } from 'lucide-react';
import { SKIN_TONE_PALETTE } from '../data/shades';
import { useStore } from '../store/useStore';
import { ProfileCard } from '../components/ProfileCard';
import type {
  Undertone, Finish, Coverage, SkinType, LookStyle, SkinTone, OnboardingState,
} from '../types';

const TOTAL_STEPS = 6;

// ── Step option helpers ────────────────────────────────────────────────────────

const UNDERTONE_OPTIONS: { value: Undertone; label: string; desc: string; accent: string }[] = [
  { value: 'warm', label: 'Warm', desc: 'Your veins look greenish, you tan easily', accent: '#D4A882' },
  { value: 'cool', label: 'Cool', desc: 'Your veins look blue/purple, silver flatters you', accent: '#B58A9A' },
  { value: 'neutral', label: 'Neutral', desc: 'Both gold and silver suit you equally', accent: '#A0887C' },
];

const FINISH_OPTIONS: { value: Finish; label: string; desc: string }[] = [
  { value: 'matte',  label: 'Matte',  desc: 'Flat, velvety, zero shine' },
  { value: 'satin',  label: 'Satin',  desc: 'Soft luminosity, between matte and dewy' },
  { value: 'dewy',   label: 'Dewy',   desc: 'Glassy, skin-like luminosity' },
];

const COVERAGE_OPTIONS: { value: Coverage; label: string; desc: string }[] = [
  { value: 'sheer',  label: 'Sheer',  desc: 'Barely-there, skin shows through' },
  { value: 'medium', label: 'Medium', desc: 'Buildable, evening skin tone' },
  { value: 'full',   label: 'Full',   desc: 'Complete, flawless coverage' },
];

const SKIN_TYPE_OPTIONS: { value: SkinType; label: string; desc: string }[] = [
  { value: 'dry',         label: 'Dry',         desc: 'Often flaky, tight feeling' },
  { value: 'oily',        label: 'Oily',        desc: 'Shines through the day' },
  { value: 'combination', label: 'Combo',       desc: 'Oily T-zone, dry elsewhere' },
  { value: 'normal',      label: 'Normal',      desc: 'Balanced, minimal concerns' },
  { value: 'sensitive',   label: 'Sensitive',   desc: 'Reacts easily, needs gentle formulas' },
];

const LOOK_OPTIONS: { value: LookStyle; label: string; desc: string; gradient: string }[] = [
  { value: 'natural',   label: 'Natural Glow',   desc: 'Barely-there beauty that enhances', gradient: 'linear-gradient(135deg, #F9EDE3, #D4A882)' },
  { value: 'bold',      label: 'Bold Statement', desc: 'Saturated, unapologetic colour',    gradient: 'linear-gradient(135deg, #C0392B, #6B2D55)' },
  { value: 'editorial', label: 'Editorial',      desc: 'High-concept, avant-garde looks',   gradient: 'linear-gradient(135deg, #2B1D18, #8E6F85)' },
];

// ── Sub-components ─────────────────────────────────────────────────────────────

const OptionButton: React.FC<{
  label: string;
  desc?: string;
  isSelected: boolean;
  onClick: () => void;
  accentColor?: string;
  gradientBg?: string;
}> = ({ label, desc, isSelected, onClick, accentColor, gradientBg }) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '14px 18px',
      borderRadius: 12,
      border: `2px solid ${isSelected ? 'var(--terracotta)' : 'var(--taupe-light)'}`,
      background: isSelected ? 'rgba(193,91,74,0.06)' : gradientBg ?? '#fff',
      cursor: 'pointer',
      textAlign: 'left',
      width: '100%',
      transition: 'all 140ms ease',
    }}
  >
    {accentColor && (
      <div
        className="swatch-pan"
        style={{ width: 28, height: 28, backgroundColor: accentColor, flexShrink: 0, cursor: 'pointer' }}
      />
    )}
    {gradientBg && !accentColor && (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: gradientBg,
          flexShrink: 0,
        }}
      />
    )}
    <div>
      <div style={{ fontWeight: 600, fontSize: 14, color: isSelected ? 'var(--terracotta)' : 'var(--espresso)' }}>
        {label}
      </div>
      {desc && (
        <div style={{ fontSize: 12, color: 'var(--taupe)', marginTop: 1, lineHeight: 1.4 }}>{desc}</div>
      )}
    </div>
    {isSelected && (
      <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
        <Check size={16} color="var(--terracotta)" />
      </div>
    )}
  </button>
);

// ── Main Page ──────────────────────────────────────────────────────────────────

export const ProfilePage: React.FC = () => {
  const { profile, setProfile, clearProfile, buildProfile } = useStore();

  const [onboarding, setOnboarding] = useState<OnboardingState>({
    step: 1,
    name: '',
    skinTone: null,
    undertone: null,
    finish: null,
    coverage: null,
    skinType: null,
    lookStyle: null,
  });

  const [isRevealing, setIsRevealing] = useState(false);

  const update = <K extends keyof OnboardingState>(key: K, value: OnboardingState[K]) =>
    setOnboarding((prev) => ({ ...prev, [key]: value }));

  const canProceed = (): boolean => {
    switch (onboarding.step) {
      case 1: return onboarding.name.trim().length >= 2;
      case 2: return onboarding.skinTone !== null;
      case 3: return onboarding.undertone !== null;
      case 4: return onboarding.finish !== null && onboarding.coverage !== null;
      case 5: return onboarding.skinType !== null;
      case 6: return onboarding.lookStyle !== null;
      default: return false;
    }
  };

  const handleFinish = () => {
    if (!onboarding.skinTone || !onboarding.undertone || !onboarding.finish ||
        !onboarding.coverage || !onboarding.skinType || !onboarding.lookStyle) return;

    setIsRevealing(true);
    setTimeout(() => {
      const built = buildProfile({
        name: onboarding.name.trim(),
        skinTone: onboarding.skinTone as SkinTone,
        undertone: onboarding.undertone as Undertone,
        finish: onboarding.finish as Finish,
        coverage: onboarding.coverage as Coverage,
        skinType: onboarding.skinType as SkinType,
        lookStyle: onboarding.lookStyle as LookStyle,
      });
      setProfile(built);
      setIsRevealing(false);
    }, 600);
  };

  // ── Show existing profile ──────────────────────────────────────────────────
  if (profile) {
    return (
      <div className="page-enter" style={{ maxWidth: 680, margin: '0 auto', padding: '40px 24px 80px' }}>
        <div style={{ marginBottom: 32 }}>
          <div className="eyebrow-terracotta" style={{ marginBottom: 8 }}>Step 1 of 4</div>
          <h1
            className="font-display"
            style={{ fontSize: 34, fontWeight: 500, color: 'var(--espresso)', lineHeight: 1.15 }}
          >
            Your Beauty Profile
          </h1>
          <p style={{ fontSize: 14, color: 'var(--taupe)', marginTop: 8 }}>
            Personalized to your skin tone, undertone, and style preferences.
          </p>
        </div>
        <ProfileCard profile={profile} />
        <div style={{ marginTop: 24 }}>
          <button className="btn-secondary" onClick={clearProfile}>
            Rebuild Profile
          </button>
        </div>
      </div>
    );
  }

  // ── Onboarding flow ────────────────────────────────────────────────────────

  const stepVariants = {
    initial: { opacity: 0, x: 24 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.22, ease: 'easeOut' } },
    exit:    { opacity: 0, x: -24, transition: { duration: 0.15, ease: 'easeIn' } },
  };

  return (
    <div style={{ maxWidth: 580, margin: '0 auto', padding: '40px 24px 100px' }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div className="eyebrow-terracotta" style={{ marginBottom: 8 }}>
          Step {onboarding.step} of {TOTAL_STEPS}
        </div>
        <h1
          className="font-display"
          style={{ fontSize: 34, fontWeight: 500, color: 'var(--espresso)', lineHeight: 1.15 }}
        >
          Build Your Beauty Profile
        </h1>

        {/* Progress bar */}
        <div
          style={{
            marginTop: 16,
            height: 3,
            background: 'var(--taupe-light)',
            borderRadius: 999,
            overflow: 'hidden',
          }}
        >
          <motion.div
            style={{ height: '100%', background: 'var(--terracotta)', borderRadius: 999 }}
            animate={{ width: `${(onboarding.step / TOTAL_STEPS) * 100}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div key={onboarding.step} variants={stepVariants} initial="initial" animate="animate" exit="exit">
          {/* Step 1: Name */}
          {onboarding.step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h2 className="font-display" style={{ fontSize: 22, fontWeight: 500, color: 'var(--espresso)' }}>
                What should we call you?
              </h2>
              <input
                id="profile-name"
                type="text"
                value={onboarding.name}
                onChange={(e) => update('name', e.target.value)}
                placeholder="Your name..."
                style={{ width: '100%', fontSize: 16 }}
                autoFocus
                maxLength={40}
              />
            </div>
          )}

          {/* Step 2: Skin Tone */}
          {onboarding.step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <h2 className="font-display" style={{ fontSize: 22, fontWeight: 500, color: 'var(--espresso)' }}>
                Select your skin tone
              </h2>
              <p style={{ fontSize: 13, color: 'var(--taupe)' }}>
                Choose the swatch that best matches your complexion.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', paddingTop: 4 }}>
                {SKIN_TONE_PALETTE.map((tone) => (
                  <div key={tone.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div
                      className={`swatch-pan${onboarding.skinTone === tone.id ? ' selected' : ''}`}
                      style={{ width: 52, height: 52, backgroundColor: tone.hex }}
                      onClick={() => update('skinTone', tone.id as SkinTone)}
                      role="radio"
                      aria-checked={onboarding.skinTone === tone.id}
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && update('skinTone', tone.id as SkinTone)}
                    />
                    <span style={{ fontSize: 10, color: 'var(--taupe)', fontWeight: 500, textAlign: 'center' }}>
                      {tone.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Undertone */}
          {onboarding.step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <h2 className="font-display" style={{ fontSize: 22, fontWeight: 500, color: 'var(--espresso)' }}>
                What's your undertone?
              </h2>
              {UNDERTONE_OPTIONS.map((opt) => (
                <OptionButton
                  key={opt.value}
                  label={opt.label}
                  desc={opt.desc}
                  isSelected={onboarding.undertone === opt.value}
                  onClick={() => update('undertone', opt.value)}
                  accentColor={opt.accent}
                />
              ))}
            </div>
          )}

          {/* Step 4: Finish + Coverage */}
          {onboarding.step === 4 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <h2 className="font-display" style={{ fontSize: 22, fontWeight: 500, color: 'var(--espresso)', marginBottom: 12 }}>
                  Preferred finish
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {FINISH_OPTIONS.map((opt) => (
                    <OptionButton
                      key={opt.value}
                      label={opt.label}
                      desc={opt.desc}
                      isSelected={onboarding.finish === opt.value}
                      onClick={() => update('finish', opt.value)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h2 className="font-display" style={{ fontSize: 22, fontWeight: 500, color: 'var(--espresso)', marginBottom: 12 }}>
                  Coverage level
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {COVERAGE_OPTIONS.map((opt) => (
                    <OptionButton
                      key={opt.value}
                      label={opt.label}
                      desc={opt.desc}
                      isSelected={onboarding.coverage === opt.value}
                      onClick={() => update('coverage', opt.value)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Skin Type */}
          {onboarding.step === 5 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <h2 className="font-display" style={{ fontSize: 22, fontWeight: 500, color: 'var(--espresso)' }}>
                Your skin type
              </h2>
              {SKIN_TYPE_OPTIONS.map((opt) => (
                <OptionButton
                  key={opt.value}
                  label={opt.label}
                  desc={opt.desc}
                  isSelected={onboarding.skinType === opt.value}
                  onClick={() => update('skinType', opt.value)}
                />
              ))}
            </div>
          )}

          {/* Step 6: Look Style */}
          {onboarding.step === 6 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <h2 className="font-display" style={{ fontSize: 22, fontWeight: 500, color: 'var(--espresso)' }}>
                Your look style
              </h2>
              {LOOK_OPTIONS.map((opt) => (
                <OptionButton
                  key={opt.value}
                  label={opt.label}
                  desc={opt.desc}
                  isSelected={onboarding.lookStyle === opt.value}
                  onClick={() => update('lookStyle', opt.value)}
                  gradientBg={opt.gradient}
                />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: 12, marginTop: 32, alignItems: 'center' }}>
        {onboarding.step > 1 && (
          <button
            className="btn-secondary"
            onClick={() => update('step', onboarding.step - 1)}
          >
            <ArrowLeft size={15} /> Back
          </button>
        )}

        {onboarding.step < TOTAL_STEPS ? (
          <button
            className="btn-primary"
            onClick={() => update('step', onboarding.step + 1)}
            disabled={!canProceed()}
            style={{ marginLeft: 'auto', opacity: canProceed() ? 1 : 0.45 }}
          >
            Continue <ArrowRight size={15} />
          </button>
        ) : (
          <button
            className="btn-primary"
            onClick={handleFinish}
            disabled={!canProceed() || isRevealing}
            style={{ marginLeft: 'auto', opacity: canProceed() ? 1 : 0.45 }}
          >
            {isRevealing ? (
              <>Generating profile…</>
            ) : (
              <><Sparkles size={15} /> Generate Profile</>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
