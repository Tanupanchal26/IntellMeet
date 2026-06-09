import React, { useState } from 'react';
import Button from '../components/common/Button';

const Profile: React.FC = () => {
  const [name, setName] = useState('User Profile');
  const [email, setEmail] = useState('user@intellmeet.com');
  const [org, setOrg] = useState('My Company');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Profile updated successfully!');
    }, 1000);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', marginBottom: '24px' }}>My Profile</h2>

      <div style={{
        background: '#ffffff', border: '1px solid #E2E8F0', borderRadius: '16px',
        padding: '32px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
      }}>
        {/* User avatar header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '32px' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
            color: '#ffffff', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '1.75rem', fontWeight: 'bold'
          }}>
            {name.charAt(0)}
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600, color: '#111827' }}>{name}</h3>
            <span style={{ fontSize: '0.85rem', color: '#6B7280' }}>Manage your personal details and app settings</span>
          </div>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%', padding: '12px 16px', borderRadius: '8px',
                border: '1px solid #D1D5DB', outline: 'none', fontSize: '0.9rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%', padding: '12px 16px', borderRadius: '8px',
                border: '1px solid #D1D5DB', outline: 'none', fontSize: '0.9rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
              Organization
            </label>
            <input
              type="text"
              value={org}
              onChange={(e) => setOrg(e.target.value)}
              style={{
                width: '100%', padding: '12px 16px', borderRadius: '8px',
                border: '1px solid #D1D5DB', outline: 'none', fontSize: '0.9rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '20px', display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
            <Button variant="primary" size="md" type="submit" loading={isSaving}>
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
