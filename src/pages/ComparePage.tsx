import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GitCompare, SlidersHorizontal, Trash2, TrendingUp } from 'lucide-react';
import { SHADES } from '../data/shades';
import { ShadeSwatch } from '../components/ShadeSwatch';
import { useStore } from '../store/useStore';
import type { Undertone, Shade, ShadeFamily } from '../types';

type DepthFilter = 'all' | Shade['depth'];
type FinishFilter = 'all' | Shade['finish'];
type FamilyFilter = 'all' | ShadeFamily;
type UndertoneFilter = 'all' | Undertone;

const UNDERTONE_COLORS: Record<Undertone, string> = {
  warm: '#D4A882',
  cool: '#B58A9A',
  neutral: '#A0887C',
};

const DEPTH_ORDER: Record<string, number> = {
  'light': 0, 'light-medium': 1, 'medium': 2, 'medium-deep': 3, 'deep': 4,
};

export const ComparePage: React.FC = () => {
  const { comparedShadeIds, addToComparison, removeFromComparison, clearComparison } = useStore();

  const [undertoneFilter, setUndertoneFilter] = useState<UndertoneFilter>('all');
  const [depthFilter, setDepthFilter] = useState<DepthFilter>('all');
  const [finishFilter, setFinishFilter] = useState<FinishFilter>('all');
  const [familyFilter, setFamilyFilter] = useState<FamilyFilter>('all');
  const [sortBy, setSortBy] = useState<'name' | 'depth' | 'views'>('depth');
  const [showFilters, setShowFilters] = useState(false);

  const filteredShades = useMemo(() => {
    let result = [...SHADES];
    if (undertoneFilter !== 'all') result = result.filter((s) => s.undertone === undertoneFilter);
    if (depthFilter !== 'all') result = result.filter((s) => s.depth === depthFilter);
    if (finishFilter !== 'all') result = result.filter((s) => s.finish === finishFilter);
    if (familyFilter !== 'all') result = result.filter((s) => s.family === familyFilter);
    result.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'depth') return DEPTH_ORDER[a.depth] - DEPTH_ORDER[b.depth];
      return b.viewCount - a.viewCount;
    });
    return result;
  }, [undertoneFilter, depthFilter, finishFilter, familyFilter, sortBy]);

  const comparedShades = comparedShadeIds.map((id) => SHADES.find((s) => s.id === id)).filter(Boolean) as Shade[];

  const FilterSelect: React.FC<{
    id: string;
    label: string;
    value: string;
    onChange: (v: string) => void;
    options: { value: string; label: string }[];
  }> = ({ id, label, value, onChange, options }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 130 }}>
      <label htmlFor={id} style={{ fontSize: 11, fontWeight: 600, color: 'var(--taupe)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        {label}
      </label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} style={{ padding: '8px 12px' }}>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );

  return (
    <div className="page-enter" style={{ padding: '40px 24px 100px', maxWidth: 1100, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 32, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div className="eyebrow-terracotta" style={{ marginBottom: 6 }}>Step 2 of 4</div>
          <h1 className="font-display" style={{ fontSize: 34, fontWeight: 500, color: 'var(--espresso)', lineHeight: 1.15 }}>
            Shade Comparison
          </h1>
          <p style={{ fontSize: 14, color: 'var(--taupe)', marginTop: 6 }}>
            Select 2–4 shades to compare side-by-side.
            {comparedShadeIds.length === 0 && ' Click a swatch below to begin.'}
          </p>
        </div>
        <button
          className="btn-secondary"
          onClick={() => setShowFilters((v) => !v)}
          style={{ display: 'flex', alignItems: 'center', gap: 8 }}
          aria-expanded={showFilters}
        >
          <SlidersHorizontal size={15} /> Filters
        </button>
      </div>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: 'hidden', marginBottom: 24 }}
          >
            <div
              className="card"
              style={{
                padding: '20px 22px',
                display: 'flex',
                gap: 16,
                flexWrap: 'wrap',
                alignItems: 'flex-end',
              }}
            >
              <FilterSelect
                id="filter-undertone"
                label="Undertone"
                value={undertoneFilter}
                onChange={(v) => setUndertoneFilter(v as UndertoneFilter)}
                options={[
                  { value: 'all', label: 'All Undertones' },
                  { value: 'warm', label: 'Warm' },
                  { value: 'cool', label: 'Cool' },
                  { value: 'neutral', label: 'Neutral' },
                ]}
              />
              <FilterSelect
                id="filter-depth"
                label="Depth"
                value={depthFilter}
                onChange={(v) => setDepthFilter(v as DepthFilter)}
                options={[
                  { value: 'all', label: 'All Depths' },
                  { value: 'light', label: 'Light' },
                  { value: 'light-medium', label: 'Light–Medium' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'medium-deep', label: 'Medium–Deep' },
                  { value: 'deep', label: 'Deep' },
                ]}
              />
              <FilterSelect
                id="filter-finish"
                label="Finish"
                value={finishFilter}
                onChange={(v) => setFinishFilter(v as FinishFilter)}
                options={[
                  { value: 'all', label: 'All Finishes' },
                  { value: 'matte', label: 'Matte' },
                  { value: 'satin', label: 'Satin' },
                  { value: 'dewy', label: 'Dewy' },
                ]}
              />
              <FilterSelect
                id="filter-family"
                label="Family"
                value={familyFilter}
                onChange={(v) => setFamilyFilter(v as FamilyFilter)}
                options={[
                  { value: 'all', label: 'All Families' },
                  { value: 'nudes', label: 'Nudes' },
                  { value: 'roses', label: 'Roses' },
                  { value: 'berries', label: 'Berries' },
                  { value: 'reds', label: 'Reds' },
                  { value: 'corals', label: 'Corals' },
                  { value: 'bronzes', label: 'Bronzes' },
                  { value: 'mauves', label: 'Mauves' },
                  { value: 'neutrals', label: 'Neutrals' },
                ]}
              />
              <FilterSelect
                id="sort-by"
                label="Sort By"
                value={sortBy}
                onChange={(v) => setSortBy(v as 'name' | 'depth' | 'views')}
                options={[
                  { value: 'depth', label: 'Light → Deep' },
                  { value: 'name', label: 'Name A–Z' },
                  { value: 'views', label: 'Most Viewed' },
                ]}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comparison Strip */}
      <AnimatePresence>
        {comparedShades.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22 }}
            style={{ marginBottom: 32 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <GitCompare size={16} color="var(--terracotta)" />
                <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--espresso)' }}>
                  Comparing {comparedShades.length} shades
                </span>
              </div>
              <button
                className="btn-secondary"
                onClick={clearComparison}
                style={{ padding: '7px 14px', fontSize: 13 }}
                aria-label="Clear comparison"
              >
                <Trash2 size={13} /> Clear
              </button>
            </div>

            {/* Comparison colour bar */}
            <div className="card" style={{ padding: '24px', overflow: 'hidden' }}>
              {/* Colour strip */}
              <div
                style={{
                  display: 'flex',
                  borderRadius: 12,
                  overflow: 'hidden',
                  height: 56,
                  marginBottom: 20,
                  border: '1px solid var(--taupe-light)',
                }}
              >
                {comparedShades.map((shade) => (
                  <div
                    key={shade.id}
                    style={{ flex: 1, backgroundColor: shade.hexColor, transition: 'flex 300ms ease' }}
                    title={shade.name}
                  />
                ))}
              </div>

              {/* Detail columns */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${comparedShades.length}, 1fr)`,
                  gap: 16,
                }}
              >
                {comparedShades.map((shade) => (
                  <div key={shade.id} style={{ position: 'relative' }}>
                    <button
                      onClick={() => removeFromComparison(shade.id)}
                      aria-label={`Remove ${shade.name} from comparison`}
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: 22,
                        height: 22,
                        borderRadius: 6,
                        border: '1px solid var(--taupe-light)',
                        background: '#fff',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <X size={11} color="var(--taupe)" />
                    </button>

                    <div style={{ paddingRight: 28 }}>
                      {/* Undertone connector line */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                        <div
                          className="swatch-pan"
                          style={{
                            width: 14,
                            height: 14,
                            backgroundColor: UNDERTONE_COLORS[shade.undertone],
                            cursor: 'default',
                            flexShrink: 0,
                          }}
                        />
                        <span style={{ fontSize: 11, color: 'var(--taupe)', fontWeight: 600 }}>
                          {shade.undertone.charAt(0).toUpperCase() + shade.undertone.slice(1)}
                        </span>
                      </div>

                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--espresso)', marginBottom: 2 }}>
                        {shade.name}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--taupe)', marginBottom: 8 }}>
                        {shade.brand} · {shade.productLine}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        {[
                          ['Depth', shade.depth.replace('-', '–')],
                          ['Finish', shade.finish.charAt(0).toUpperCase() + shade.finish.slice(1)],
                          ['Coverage', shade.coverage.charAt(0).toUpperCase() + shade.coverage.slice(1)],
                        ].map(([label, value]) => (
                          <div key={label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                            <span style={{ color: 'var(--taupe)' }}>{label}</span>
                            <span style={{ fontWeight: 600, color: 'var(--espresso)' }}>{value}</span>
                          </div>
                        ))}
                      </div>
                      {shade.trending && (
                        <div className="badge badge-trending" style={{ marginTop: 10 }}>
                          <TrendingUp size={10} /> Trending
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shade Grid */}
      <div>
        <div className="eyebrow" style={{ marginBottom: 16 }}>
          {filteredShades.length} shade{filteredShades.length !== 1 ? 's' : ''}
          {familyFilter !== 'all' ? ` · ${familyFilter}` : ''}
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
            gap: '28px 20px',
          }}
        >
          {filteredShades.map((shade) => (
            <div key={shade.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <ShadeSwatch
                shade={shade}
                size={78}
                showLabel
                showActions
                isSelected={comparedShadeIds.includes(shade.id)}
                onSelect={() => {
                  if (comparedShadeIds.includes(shade.id)) removeFromComparison(shade.id);
                  else addToComparison(shade.id);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
