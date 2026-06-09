import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ROUTES } from '../../utils/constants';
import Button from '../common/Button';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link to={ROUTES.HOME} className="navbar__brand">
          <span className="navbar__brand-dot" />
          IntelMeet
        </Link>

        <nav className="navbar__links">
          <Link to={ROUTES.HOME}>Home</Link>
          <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
        </nav>

        <div className="navbar__actions">
          <Link to={ROUTES.LOGIN}>
            <Button variant="outline" size="sm">Sign In</Button>
          </Link>
          <Link to={ROUTES.REGISTER}>
            <Button variant="primary" size="sm">Get Started</Button>
          </Link>
        </div>

        <button
          className="navbar__menu-toggle"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            style={{
              position: 'absolute', top: '68px', left: 0, right: 0,
              background: '#fff', borderBottom: '1px solid #E2E8F0',
              padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column',
              gap: '1rem', zIndex: 99,
            }}
          >
            <Link to={ROUTES.HOME} onClick={() => setMenuOpen(false)} style={{ color: '#6B7280', fontWeight: 500 }}>Home</Link>
            <Link to={ROUTES.DASHBOARD} onClick={() => setMenuOpen(false)} style={{ color: '#6B7280', fontWeight: 500 }}>Dashboard</Link>
            <a href="#features" onClick={() => setMenuOpen(false)} style={{ color: '#6B7280', fontWeight: 500 }}>Features</a>
            <a href="#pricing" onClick={() => setMenuOpen(false)} style={{ color: '#6B7280', fontWeight: 500 }}>Pricing</a>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
              <Link to={ROUTES.LOGIN} onClick={() => setMenuOpen(false)} style={{ flex: 1 }}>
                <Button variant="outline" size="sm" style={{ width: '100%' }}>Sign In</Button>
              </Link>
              <Link to={ROUTES.REGISTER} onClick={() => setMenuOpen(false)} style={{ flex: 1 }}>
                <Button variant="primary" size="sm" style={{ width: '100%' }}>Get Started</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
