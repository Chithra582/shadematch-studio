import React from 'react';
import { motion } from 'framer-motion';
import type { BeautyProfile } from '../types';
import { Sparkles, Droplets, Sun, Moon } from 'lucide-react';
import { SKIN_TONE_PALETTE } from '../data/shades';

interface ProfileCardProps {
  profile: BeautyProfile;
}

const FAMILY_COLORS: Record<string, string> = {
  nudes:    '#D4A882',
  roses:    '#E8A8A0',
  berries:  '#7D3466',
  reds:     '#C0392B',
  corals:   '#E8734A',
  bronzes:  '#B5631E',
  mauves:   '#B58A9A',
  neutrals: '#A0887C',
};

const UNDERTONE_ICONS: Record<string, React.ReactNode> = {
  warm: <Sun size={13} strokeWidth={1.8} />,
  cool: <Moon size={13} strokeWidth={1.8} />,
  neutral: <Droplets size={13} strokeWidth={1.8} />,
};

const FINISH_LABELS: Record<string, string> = {
  matte: 'Matte',
  dewy: 'Dewy',
  satin: 'Satin',
};

const SKIN_TYPE_LABELS: Record<string, string> = {
  dry: 'Dry',
  oily: 'Oily',
  combination: 'Combination',
  normal: 'Normal',
  sensitive: 'Sensitive',
};

export const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const toneData = SKIN_TONE_PALETTE.find((t) => t.id === profile.skinTone);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      {/* Header Card */}
      <motion.div
        variants={itemVariants}
        className="card"
        style={{ padding: '28px 24px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          {/* Skin tone swatch */}
          <div
            className="swatch-pan"
            style={{
              width: 72,
              height: 72,
              backgroundColor: toneData?.hex,
              flexShrink: 0,
              cursor: 'default',
            }}
          />
          <div style={{ flex: 1, minWidth: 180 }}>
            <div className="eyebrow-terracotta" style={{ marginBottom: 4 }}>
              Beauty Profile
            </div>
            <h2
              className="font-display"
              style={{ fontSize: 26, fontWeight: 500, color: 'var(--espresso)', lineHeight: 1.15 }}
            >
              {profile.name}
            </h2>
            <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
              <span className="badge badge-taupe">
                {toneData?.label ?? profile.skinTone}
              </span>
              <span className="badge badge-terracotta">
                {UNDERTONE_ICONS[profile.undertone]}
                {profile.undertone.charAt(0).toUpperCase() + profile.undertone.slice(1)} Undertone
              </span>
              <span className="badge badge-sage">
                {SKIN_TYPE_LABELS[profile.skinType]} Skin
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Preferences Row */}
      <motion.div
        variants={itemVariants}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}
      >
        {[
          { label: 'Preferred Finish', value: FINISH_LABELS[profile.finish] },
          { label: 'Coverage Level', value: profile.coverage.charAt(0).toUpperCase() + profile.coverage.slice(1) },
          { label: 'Look Style', value: profile.lookStyle.charAt(0).toUpperCase() + profile.lookStyle.slice(1) },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="card"
            style={{ padding: '16px 18px', textAlign: 'center' }}
          >
            <div className="eyebrow" style={{ marginBottom: 6 }}>{label}</div>
            <div
              className="font-display"
              style={{ fontSize: 18, fontWeight: 500, color: 'var(--espresso)' }}
            >
              {value}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Recommended Shade Families */}
      <motion.div variants={itemVariants} className="card" style={{ padding: '22px 24px' }}>
        <div style={{ marginBottom: 16 }}>
          <div className="eyebrow" style={{ marginBottom: 4 }}>Your Shade Families</div>
          <p style={{ fontSize: 13, color: 'var(--taupe)', lineHeight: 1.5 }}>
            Curated for your {toneData?.label} skin with {profile.undertone} undertones.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {profile.recommendedFamilies.map((family, i) => (
            <motion.div
              key={family}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.25, ease: 'easeOut' }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 16px',
                borderRadius: 12,
                background: 'rgba(251,246,240,0.8)',
                border: '1.5px solid var(--taupe-light)',
              }}
            >
              <div
                className="swatch-pan"
                style={{
                  width: 24,
                  height: 24,
                  backgroundColor: FAMILY_COLORS[family],
                  cursor: 'default',
                }}
              />
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--espresso)', textTransform: 'capitalize' }}>
                {family}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Match Score */}
      <motion.div
        variants={itemVariants}
        className="card"
        style={{
          padding: '20px 24px',
          background: 'linear-gradient(135deg, #FBF0ED 0%, #fff 100%)',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: 'linear-gradient(135deg, #C15B4A, #E8A8A0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Sparkles size={22} color="#fff" />
        </div>
        <div>
          <div className="eyebrow" style={{ marginBottom: 2 }}>Shade Match Score</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <span
              className="font-display"
              style={{ fontSize: 32, fontWeight: 600, color: 'var(--terracotta)' }}
            >
              94%
            </span>
            <span style={{ fontSize: 13, color: 'var(--taupe)' }}>
              across {profile.recommendedFamilies.length} shade families
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
