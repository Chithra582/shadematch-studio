import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  AreaChart, Area, CartesianGrid,
} from 'recharts';
import { ANALYTICS_DATA } from '../data/analytics';
import { StatCard } from '../components/StatCard';
import { TrendingUp, Award } from 'lucide-react';

// ── Palette — no default recharts blue/green ──────────────────────────────────
const C_TERRACOTTA = '#C15B4A';
const C_SAGE       = '#8A9A7E';
const C_TAUPE      = '#B8A99A';
const C_WARM_SAND  = '#D4A882';

// ── Custom Tooltip ─────────────────────────────────────────────────────────────
const CustomTooltip: React.FC<{ active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }> = ({
  active, payload, label,
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid var(--taupe-light)',
        borderRadius: 10,
        padding: '10px 14px',
        boxShadow: '0 4px 14px rgba(43,29,24,0.10)',
        fontFamily: 'var(--font-body)',
        fontSize: 13,
      }}
    >
      {label && <div style={{ fontWeight: 700, marginBottom: 6, color: 'var(--espresso)' }}>{label}</div>}
      {payload.map((p) => (
        <div key={p.name} style={{ color: p.color, marginBottom: 2 }}>
          {p.name}: <strong>{p.value}</strong>
        </div>
      ))}
    </div>
  );
};

const SectionHeader: React.FC<{ title: string; sub?: string }> = ({ title, sub }) => (
  <div style={{ marginBottom: 18 }}>
    <h2
      className="font-display"
      style={{ fontSize: 20, fontWeight: 500, color: 'var(--espresso)', lineHeight: 1.2 }}
    >
      {title}
    </h2>
    {sub && <p style={{ fontSize: 13, color: 'var(--taupe)', marginTop: 4 }}>{sub}</p>}
  </div>
);

export const AnalyticsPage: React.FC = () => {
  const { statCards, shadeDistribution, preferenceBreakdown, topRecommended, trendingShades, weeklyActivity } =
    ANALYTICS_DATA;

  return (
    <div className="page-enter" style={{ padding: '40px 24px 100px', maxWidth: 1100, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <div className="eyebrow-terracotta" style={{ marginBottom: 6 }}>Step 3 of 4</div>
        <h1 className="font-display" style={{ fontSize: 34, fontWeight: 500, color: 'var(--espresso)', lineHeight: 1.15 }}>
          Beauty Analytics
        </h1>
        <p style={{ fontSize: 14, color: 'var(--taupe)', marginTop: 6 }}>
          Your personalized shade activity — views, saves, and trend intelligence.
        </p>
      </div>

      {/* Stat Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
          gap: 16,
          marginBottom: 40,
        }}
      >
        {statCards.map((card, i) => (
          <StatCard key={card.label} card={card} index={i} />
        ))}
      </div>

      {/* Main Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 28 }}>
        {/* Weekly Activity — Area Chart */}
        <motion.div
          className="card"
          style={{ padding: '24px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.3 }}
        >
          <SectionHeader
            title="Weekly Activity"
            sub="Shades viewed, saved, and compared"
          />
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={weeklyActivity} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="gradViewed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C_TERRACOTTA} stopOpacity={0.18} />
                  <stop offset="95%" stopColor={C_TERRACOTTA} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradSaved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C_SAGE} stopOpacity={0.18} />
                  <stop offset="95%" stopColor={C_SAGE} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--taupe-light)" vertical={false} />
              <XAxis dataKey="day" tick={{ fontFamily: 'var(--font-body)', fontSize: 11, fill: 'var(--taupe)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontFamily: 'var(--font-body)', fontSize: 11, fill: 'var(--taupe)' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--espresso)' }}
              />
              <Area type="monotone" dataKey="viewed" name="Viewed" stroke={C_TERRACOTTA} strokeWidth={2} fill="url(#gradViewed)" dot={false} />
              <Area type="monotone" dataKey="saved"  name="Saved"  stroke={C_SAGE}       strokeWidth={2} fill="url(#gradSaved)"   dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Preference Radar */}
        <motion.div
          className="card"
          style={{ padding: '24px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.3 }}
        >
          <SectionHeader
            title="Preference Profile"
            sub="Your finish, coverage, and style signature"
          />
          <ResponsiveContainer width="100%" height={210}>
            <RadarChart data={preferenceBreakdown} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="var(--taupe-light)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fontFamily: 'var(--font-body)', fontSize: 11, fill: 'var(--taupe)' }}
              />
              <Radar
                name="Preferences"
                dataKey="value"
                stroke={C_TERRACOTTA}
                fill={C_TERRACOTTA}
                fillOpacity={0.18}
                strokeWidth={2}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Shade Distribution — Bar Chart */}
      <motion.div
        className="card"
        style={{ padding: '24px', marginBottom: 28 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.3 }}
      >
        <SectionHeader
          title="Shade Family Distribution"
          sub="Views vs. saves across all shade families"
        />
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={shadeDistribution} margin={{ top: 4, right: 4, left: -16, bottom: 0 }} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--taupe-light)" vertical={false} />
            <XAxis dataKey="family" tick={{ fontFamily: 'var(--font-body)', fontSize: 11, fill: 'var(--taupe)' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontFamily: 'var(--font-body)', fontSize: 11, fill: 'var(--taupe)' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType="square"
              iconSize={10}
              wrapperStyle={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--espresso)' }}
            />
            <Bar dataKey="viewed" name="Viewed" fill={C_WARM_SAND}   radius={[4, 4, 0, 0]} />
            <Bar dataKey="saved"  name="Saved"  fill={C_TERRACOTTA} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Bottom row: Top Recommended + Trending */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Top Recommended */}
        <motion.div
          className="card"
          style={{ padding: '24px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34, duration: 0.3 }}
        >
          <SectionHeader title="Top Recommended" sub="Matched to your beauty profile" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {topRecommended.map((shade, i) => (
              <div key={shade.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 4,
                    color: 'var(--taupe)',
                    fontWeight: 700,
                    fontSize: 11,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <div
                  className="swatch-pan"
                  style={{ width: 28, height: 28, backgroundColor: shade.hexColor, flexShrink: 0, cursor: 'default' }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--espresso)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {shade.name}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--taupe)' }}>{shade.brand}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Award size={12} color={C_SAGE} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: C_SAGE }}>{shade.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trending Shades */}
        <motion.div
          className="card"
          style={{ padding: '24px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.40, duration: 0.3 }}
        >
          <SectionHeader title="Trending Now" sub="Surging views across the platform" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {trendingShades.map((shade) => (
              <div key={shade.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                  className="swatch-pan"
                  style={{ width: 28, height: 28, backgroundColor: shade.hexColor, flexShrink: 0, cursor: 'default' }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--espresso)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {shade.name}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--taupe)' }}>{shade.views.toLocaleString()} views</div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                    fontSize: 12,
                    fontWeight: 700,
                    color: C_SAGE,
                  }}
                >
                  <TrendingUp size={12} />
                  +{shade.change}%
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
