import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';

export default function App() {
  return (
    <>
      <a
        href="#main-content"
        style={{
          position: 'absolute',
          top: '-100px',
          left: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: 'var(--color-accent)',
          color: '#0a0a0a',
          fontWeight: 600,
          borderRadius: 'var(--radius-sm)',
          zIndex: 999,
          transition: 'top 0.2s',
        }}
        onFocus={(e) => { e.currentTarget.style.top = '1rem'; }}
        onBlur={(e) => { e.currentTarget.style.top = '-100px'; }}
      >
        Skip to main content
      </a>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
      </Routes>
      <Footer />
    </>
  );
}
