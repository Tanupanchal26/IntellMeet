import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '../utils/constants';
import Button from '../components/common/Button';

const NotFound: React.FC = () => (
  <section className="not-found" style={{
    minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '24px', boxSizing: 'border-box'
  }}>
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}
    >
      <div className="not-found__code" style={{
        fontSize: '6rem', fontWeight: 900, color: '#6D28D9', lineHeight: 1
      }}>404</div>
      <h2 className="not-found__title" style={{ fontSize: '1.75rem', fontWeight: 700, color: '#111827', margin: 0 }}>Page not found</h2>
      <p className="not-found__message" style={{ fontSize: '0.95rem', color: '#6B7280', maxWidth: '380px', margin: 0 }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to={ROUTES.HOME} style={{ textDecoration: 'none', marginTop: '8px' }}>
        <Button variant="primary" size="lg">Back to Home</Button>
      </Link>
    </motion.div>
  </section>
);

export default NotFound;
