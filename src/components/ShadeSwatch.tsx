import React from 'react';
import type { Shade } from '../types';
import { Heart, Plus, Check } from 'lucide-react';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

interface ShadeSwatch {
  shade: Shade;
  size?: number;
  showLabel?: boolean;
  showActions?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
}

const UNDERTONE_LABELS: Record<string, string> = {
  warm: 'Warm',
  cool: 'Cool',
  neutral: 'Neutral',
};

const DEPTH_LABELS: Record<string, string> = {
  light: 'Light',
  'light-medium': 'Lt–Md',
  medium: 'Medium',
  'medium-deep': 'Md–Dp',
  deep: 'Deep',
};

export const ShadeSwatch: React.FC<ShadeSwatch> = ({
  shade,
  size = 72,
  showLabel = true,
  showActions = false,
  isSelected = false,
  onSelect,
}) => {
  const { profile, addSavedShade, removeSavedShade, addToComparison } = useStore();
  const isSaved = profile?.savedShadeIds.includes(shade.id) ?? false;

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSaved) removeSavedShade(shade.id);
    else addSavedShade(shade.id);
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToComparison(shade.id);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.16, ease: 'easeOut' }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
    >
      {/* Swatch Circle */}
      <div
        className={`swatch-pan${isSelected ? ' selected' : ''}`}
        onClick={onSelect}
        style={{
          width: size,
          height: size,
          backgroundColor: shade.hexColor,
          position: 'relative',
          flexShrink: 0,
        }}
        title={shade.name}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onSelect?.()}
        aria-label={`${shade.name} by ${shade.brand}`}
        aria-pressed={isSelected}
      >
        {/* Finish sheen overlay */}
        {shade.finish === 'dewy' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.35) 0%, transparent 65%)',
              pointerEvents: 'none',
            }}
          />
        )}
        {shade.finish === 'satin' && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.18) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Selected check */}
        {isSelected && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(193,91,74,0.25)',
            }}
          >
            <Check size={18} color="#fff" strokeWidth={2.5} />
          </div>
        )}
      </div>

      {showLabel && (
        <div style={{ textAlign: 'center', maxWidth: size + 16 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--espresso)', lineHeight: 1.3 }}>
            {shade.name}
          </div>
          <div style={{ fontSize: 11, color: 'var(--taupe)', marginTop: 2 }}>
            {shade.brand}
          </div>
          <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginTop: 4, flexWrap: 'wrap' }}>
            <span className="badge badge-taupe">{UNDERTONE_LABELS[shade.undertone]}</span>
            <span className="badge badge-taupe">{DEPTH_LABELS[shade.depth]}</span>
          </div>
        </div>
      )}

      {showActions && (
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={handleSave}
            aria-label={isSaved ? 'Unsave shade' : 'Save shade'}
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              border: '1.5px solid var(--taupe-light)',
              background: isSaved ? 'rgba(193,91,74,0.10)' : '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 140ms ease',
            }}
          >
            <Heart
              size={13}
              color={isSaved ? '#C15B4A' : 'var(--taupe)'}
              fill={isSaved ? '#C15B4A' : 'none'}
            />
          </button>
          <button
            onClick={handleCompare}
            aria-label="Add to comparison"
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              border: '1.5px solid var(--taupe-light)',
              background: '#fff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 140ms ease',
            }}
          >
            <Plus size={13} color="var(--taupe)" />
          </button>
        </div>
      )}
    </motion.div>
  );
};
