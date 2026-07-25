import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sparkles, GitCompare, BarChart2, BookOpen, Calendar, User,
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/profile',    label: 'Beauty Profile',  icon: User         },
  { to: '/compare',   label: 'Shade Compare',   icon: GitCompare   },
  { to: '/analytics', label: 'Analytics',        icon: BarChart2    },
  { to: '/lookbook',  label: 'Lookbook',         icon: BookOpen     },
  { to: '/artists',   label: 'Artists',          icon: Calendar     },
];

export const Sidebar: React.FC = () => {
  return (
  <aside
      style={{
        width: 220,
        minHeight: '100vh',
        background: '#fff',
        borderRight: '1px solid var(--taupe-light)',
        padding: '28px 14px 24px',
        position: 'sticky',
        top: 0,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Logo / Brand */}
      <div style={{ marginBottom: 36, paddingLeft: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #C15B4A 0%, #E8A8A0 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Sparkles size={17} color="#fff" />
          </div>
          <div>
            <div
              className="font-display"
              style={{ fontSize: 15, fontWeight: 600, color: 'var(--espresso)', lineHeight: 1.1 }}
            >
              ShadeMatch
            </div>
            <div style={{ fontSize: 10, color: 'var(--taupe)', fontWeight: 500, letterSpacing: '0.06em' }}>
              STUDIO
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            <Icon size={16} strokeWidth={1.8} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Version tag */}
      <div style={{ paddingLeft: 4 }}>
        <div className="eyebrow" style={{ fontSize: 10 }}>Frontend Wars 2026</div>
      </div>
    </aside>
  );
};

export const BottomTabBar: React.FC = () => {
  const location = useLocation();

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#fff',
        borderTop: '1px solid var(--taupe-light)',
        display: 'none',
        zIndex: 50,
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
      id="bottom-tab-bar"
    >
      {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
        const isActive = location.pathname.startsWith(to);
        return (
          <NavLink
            key={to}
            to={to}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px 4px 8px',
              gap: 3,
              color: isActive ? 'var(--terracotta)' : 'var(--taupe)',
              textDecoration: 'none',
              fontSize: 10,
              fontWeight: 600,
              transition: 'color 120ms ease',
            }}
          >
            <Icon size={18} strokeWidth={isActive ? 2 : 1.6} />
            <span style={{ letterSpacing: '0.02em' }}>{label.split(' ')[0]}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};
