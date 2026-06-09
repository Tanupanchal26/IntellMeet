import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import { ROUTES } from '../utils/constants';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API Register
    setTimeout(() => {
      setLoading(false);
      navigate(ROUTES.DASHBOARD);
    }, 1200);
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(circle at top right, #F5F3FF, #ffffff 60%)',
      padding: '24px', boxSizing: 'border-box'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: '100%', maxWidth: '440px', background: '#ffffff',
          border: '1px solid #E2E8F0', borderRadius: '16px', padding: '40px',
          boxShadow: '0 10px 25px -5px rgba(109, 40, 217, 0.05)', boxSizing: 'border-box'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Link to={ROUTES.HOME} style={{
            textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
            gap: '8px', color: '#6D28D9', fontWeight: 800, fontSize: '1.5rem', marginBottom: '8px'
          }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#6D28D9' }} />
            IntelMeet
          </Link>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>Create account</h2>
          <p style={{ fontSize: '0.875rem', color: '#6B7280', marginTop: '8px', margin: 0 }}>
            Start hosting smart AI meetings in seconds
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Sarah Chen"
              style={{
                width: '100%', padding: '12px 16px', borderRadius: '8px',
                border: '1px solid #D1D5DB', outline: 'none', fontSize: '0.9rem',
                boxSizing: 'border-box', transition: 'border-color 0.2s'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
              Email address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{
                width: '100%', padding: '12px 16px', borderRadius: '8px',
                border: '1px solid #D1D5DB', outline: 'none', fontSize: '0.9rem',
                boxSizing: 'border-box', transition: 'border-color 0.2s'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: '100%', padding: '12px 16px', borderRadius: '8px',
                border: '1px solid #D1D5DB', outline: 'none', fontSize: '0.9rem',
                boxSizing: 'border-box', transition: 'border-color 0.2s'
              }}
            />
          </div>

          <Button variant="primary" size="lg" type="submit" loading={loading} style={{ width: '100%', marginTop: '8px' }}>
            Get Started Free
          </Button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.85rem', color: '#6B7280' }}>
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} style={{ color: '#6D28D9', textDecoration: 'none', fontWeight: 600 }}>
            Sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
