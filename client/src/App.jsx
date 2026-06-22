import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PathwaysPage from './pages/PathwaysPage';
import AboutPage from './pages/AboutPage';
import SelfCheckPage from './pages/SelfCheckPage';
import BookingPage from './pages/BookingPage';
import ToolboxPage from './pages/ToolboxPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollPct, setScrollPct] = useState(0);
  const [toast, setToast] = useState({ show: false, msg: '' });

  /* ── Scroll tracking ── */
  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      setScrollY(sy);
      document.documentElement.style.setProperty('--scroll-y', `${sy}`);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(total > 0 ? (sy / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const showToast = (msg) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: '' }), 3500);
  };

  return (
    <Router>
      <ScrollToTop />
      
      {/* Scroll progress */}
      <div id="scroll-progress" style={{ width: `${scrollPct}%` }} />

      {/* Toast */}
      <div className={`toast ${toast.show ? 'show' : ''}`}>{toast.msg}</div>

      {/* ── HEADER ── */}
      <header className={`site-header ${scrollY > 20 ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          <Link to="/" className="brand">
            <span className="brand-wordmark">Health<em>Matters</em></span>
          </Link>

          <nav className="nav-links">
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
            <NavLink to="/pathways" className={({ isActive }) => (isActive ? 'active' : '')}>Pathways</NavLink>
            <NavLink to="/tools" className={({ isActive }) => (isActive ? 'active' : '')}>Toolbox</NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About</NavLink>
            <NavLink to="/self-check" className={({ isActive }) => (isActive ? 'active' : '')}>Self-Check</NavLink>
          </nav>

          <Link to="/book" className="btn btn-primary">
            Book Free Session
          </Link>
        </div>
      </header>

      {/* ── MAIN ROUTING ── */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage showToast={showToast} />} />
          <Route path="/pathways" element={<PathwaysPage />} />
          <Route path="/tools" element={<ToolboxPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/self-check" element={<SelfCheckPage showToast={showToast} />} />
          <Route path="/book" element={<BookingPage showToast={showToast} />} />
        </Routes>
      </main>

      {/* ── FOOTER ── */}
      <footer>
        <div className="container footer-inner" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
            <Link to="/" className="footer-brand">Health<em style={{ fontStyle: 'italic' }}>Matters</em></Link>
            <div className="footer-links">
              <Link to="/pathways">Pathways</Link>
              <Link to="/tools">Toolbox</Link>
              <Link to="/about">About</Link>
              <Link to="/self-check">Self-Check</Link>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', borderTop: 'var(--border)', paddingTop: 'var(--space-md)', flexWrap: 'wrap', gap: 'var(--space-sm)' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--ink-soft)', display: 'flex', gap: 'var(--space-md)', flexWrap: 'wrap' }}>
              <span><strong>WhatsApp:</strong> <a href="https://wa.me/917202015096" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>+91 72020 15096</a></span>
              <span><strong>Email:</strong> <a href="mailto:thehealthmatters.team@gmail.com" style={{ color: 'inherit', textDecoration: 'underline' }}>thehealthmatters.team@gmail.com</a></span>
              <span><strong>Location:</strong> Surat, Gujarat</span>
            </div>
            
            <div style={{ display: 'flex', gap: '0.8rem', fontSize: '0.82rem', flexWrap: 'wrap' }}>
              <a href="https://chat.whatsapp.com/CHFdaSbN8Ks6V7BYR4eRUc" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-sage)', fontWeight: '500', textDecoration: 'none' }}>WhatsApp Community</a>
              <span style={{ opacity: 0.3 }}>|</span>
              <a href="https://www.instagram.com/HEALTHMATTERSPLATFORM" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Instagram</a>
              <span style={{ opacity: 0.3 }}>|</span>
              <a href="https://www.linkedin.com/in/rahul-sharma-vision" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn</a>
              <span style={{ opacity: 0.3 }}>|</span>
              <a href="https://www.facebook.com/profile.php?id=61583679650871" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Facebook</a>
            </div>
            
            <p className="footer-copy" style={{ margin: 0 }}>© 2026 HealthMatters. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </Router>
  );
}
