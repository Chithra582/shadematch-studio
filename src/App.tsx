import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar, BottomTabBar } from './components/layout/Sidebar';
import { ProfilePage }   from './pages/ProfilePage';
import { ComparePage }   from './pages/ComparePage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { LookbookPage }  from './pages/LookbookPage';
import { ArtistsPage }   from './pages/ArtistsPage';

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--ivory)' }}>
        {/* Desktop sidebar */}
        <Sidebar />

        {/* Main content */}
        <main style={{ flex: 1, overflowX: 'hidden', paddingBottom: 80 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/profile" replace />} />
            <Route path="/profile"    element={<ProfilePage />}   />
            <Route path="/compare"    element={<ComparePage />}   />
            <Route path="/analytics"  element={<AnalyticsPage />} />
            <Route path="/lookbook"   element={<LookbookPage />}  />
            <Route path="/artists"    element={<ArtistsPage />}   />
            <Route path="*"           element={<Navigate to="/profile" replace />} />
          </Routes>
        </main>
      </div>

      {/* Mobile bottom tab bar */}
      <BottomTabBar />
    </BrowserRouter>
  );
}

export default App;
