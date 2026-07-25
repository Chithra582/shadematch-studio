import React from 'react';
import { motion } from 'framer-motion';
import type { StatCard as StatCardType } from '../types';
import { TrendingUp, TrendingDown, Minus, Palette, Heart, GitCompare, Sparkles } from 'lucide-react';

const ICON_MAP: Record<string, React.FC<{ size: number; color: string }>> = {
  Palette: ({ size, color }) => <Palette size={size} color={color} />,
  Heart:   ({ size, color }) => <Heart size={size} color={color} />,
  GitCompare: ({ size, color }) => <GitCompare size={size} color={color} />,
  Sparkles:   ({ size, color }) => <Sparkles size={size} color={color} />,
};

interface StatCardProps {
  card: StatCardType;
  index: number;
}

export const StatCard: React.FC<StatCardProps> = ({ card, index }) => {
  const Icon = ICON_MAP[card.icon];
  const TrendIcon =
    card.trend === 'up' ? TrendingUp :
    card.trend === 'down' ? TrendingDown : Minus;

  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.28, ease: 'easeOut' }}
      style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span className="eyebrow">{card.label}</span>
        {Icon && (
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: 'rgba(193,91,74,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon size={16} color="var(--terracotta)" />
          </div>
        )}
      </div>
      <div>
        <div
          className="font-display"
          style={{ fontSize: 30, fontWeight: 600, lineHeight: 1, color: 'var(--espresso)' }}
        >
          {card.value}
        </div>
        <div
          style={{
            marginTop: 6,
            fontSize: 12,
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
          className={`trend-${card.trend}`}
        >
          <TrendIcon size={12} strokeWidth={2} />
          {card.change}
        </div>
      </div>
    </motion.div>
  );
};
