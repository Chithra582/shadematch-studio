import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Layers } from 'lucide-react';
import { LOOKS } from '../data/looks';
import { SHADES } from '../data/shades';
import type { Look } from '../types';

const SEASON_LABELS: Record<string, string> = {
  spring: 'Spring',
  summer: 'Summer',
  autumn: 'Autumn',
  winter: 'Winter',
  'all-year': 'All-Year',
};

const STYLE_BADGE_CLASS: Record<string, string> = {
  natural: 'badge-sage',
  bold: 'badge-terracotta',
  editorial: 'badge-taupe',
};

export const LookbookPage: React.FC = () => {
  const [selectedLook, setSelectedLook] = useState<Look | null>(null);

  return (
    <div className="page-enter" style={{ padding: '40px 24px 100px', maxWidth: 1100, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <div className="eyebrow-terracotta" style={{ marginBottom: 6 }}>Virtual Lookbook</div>
        <h1 className="font-display" style={{ fontSize: 34, fontWeight: 500, color: 'var(--espresso)', lineHeight: 1.15 }}>
          Curated Looks
        </h1>
        <p style={{ fontSize: 14, color: 'var(--taupe)', marginTop: 6 }}>
          Discover seasonal shade combinations, from everyday glow to editorial drama.
        </p>
      </div>

      {/* Look Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 20,
        }}
      >
        {LOOKS.map((look, i) => {
          const lookShades = look.shadeIds.map((id) => SHADES.find((s) => s.id === id)).filter(Boolean);
          return (
            <motion.div
              key={look.id}
              className="card card-hover"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.28 }}
              onClick={() => setSelectedLook(look)}
              style={{ cursor: 'pointer', overflow: 'hidden' }}
            >
              {/* Gradient image */}
              <div
                style={{
                  height: 160,
                  background: look.imageGradient,
                  position: 'relative',
                }}
              >
                {/* Season badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    background: 'rgba(251,246,240,0.88)',
                    backdropFilter: 'blur(4px)',
                    borderRadius: 999,
                    padding: '4px 10px',
                    fontSize: 11,
                    fontWeight: 600,
                    color: 'var(--espresso)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {SEASON_LABELS[look.season]}
                </div>

                {/* Shade swatches row */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 12,
                    right: 12,
                    display: 'flex',
                    gap: -6,
                  }}
                >
                  {lookShades.map((shade, si) => (
                    shade && (
                      <div
                        key={shade.id}
                        className="swatch-pan"
                        style={{
                          width: 28,
                          height: 28,
                          backgroundColor: shade.hexColor,
                          marginLeft: si > 0 ? -8 : 0,
                          border: '2px solid rgba(251,246,240,0.8)',
                          cursor: 'default',
                        }}
                        title={shade.name}
                      />
                    )
                  ))}
                </div>
              </div>

              {/* Card body */}
              <div style={{ padding: '18px 18px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                  <div>
                    <h3
                      className="font-display"
                      style={{ fontSize: 18, fontWeight: 500, color: 'var(--espresso)', lineHeight: 1.2, marginBottom: 4 }}
                    >
                      {look.title}
                    </h3>
                    <p style={{ fontSize: 13, color: 'var(--taupe)', lineHeight: 1.45 }}>{look.tagline}</p>
                  </div>
                  <span className={`badge ${STYLE_BADGE_CLASS[look.style]}`} style={{ flexShrink: 0, marginTop: 2 }}>
                    {look.style.charAt(0).toUpperCase() + look.style.slice(1)}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
                  {look.tags.map((tag) => (
                    <span key={tag} className="badge badge-taupe">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedLook && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(43,29,24,0.55)',
              backdropFilter: 'blur(4px)',
              zIndex: 100,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
            }}
            onClick={() => setSelectedLook(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="card"
              style={{ maxWidth: 520, width: '100%', overflow: 'hidden' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gradient header */}
              <div
                style={{
                  height: 220,
                  background: selectedLook.imageGradient,
                  position: 'relative',
                }}
              >
                <button
                  onClick={() => setSelectedLook(null)}
                  aria-label="Close look detail"
                  style={{
                    position: 'absolute',
                    top: 14,
                    right: 14,
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    border: 'none',
                    background: 'rgba(251,246,240,0.85)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <X size={16} color="var(--espresso)" />
                </button>
              </div>

              {/* Body */}
              <div style={{ padding: '24px 26px 28px' }}>
                <span className={`badge ${STYLE_BADGE_CLASS[selectedLook.style]}`} style={{ marginBottom: 10, display: 'inline-flex' }}>
                  {selectedLook.style.charAt(0).toUpperCase() + selectedLook.style.slice(1)} · {SEASON_LABELS[selectedLook.season]}
                </span>
                <h2
                  className="font-display"
                  style={{ fontSize: 26, fontWeight: 500, color: 'var(--espresso)', lineHeight: 1.15, marginBottom: 6 }}
                >
                  {selectedLook.title}
                </h2>
                <p style={{ fontSize: 13, color: 'var(--taupe)', lineHeight: 1.55, marginBottom: 22 }}>
                  {selectedLook.tagline}
                </p>

                {/* Shade detail list */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 14 }}>
                  <Layers size={14} color="var(--terracotta)" />
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--terracotta)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    Shades Used
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {selectedLook.shadeIds.map((id) => {
                    const shade = SHADES.find((s) => s.id === id);
                    if (!shade) return null;
                    return (
                      <div
                        key={id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          padding: '10px 12px',
                          borderRadius: 10,
                          background: 'rgba(251,246,240,0.6)',
                          border: '1px solid var(--taupe-light)',
                        }}
                      >
                        <div
                          className="swatch-pan"
                          style={{ width: 38, height: 38, backgroundColor: shade.hexColor, flexShrink: 0, cursor: 'default' }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--espresso)' }}>{shade.name}</div>
                          <div style={{ fontSize: 12, color: 'var(--taupe)' }}>
                            {shade.brand} · {shade.productLine} · {shade.finish}
                          </div>
                        </div>
                        <span className="badge badge-taupe">{shade.undertone}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
