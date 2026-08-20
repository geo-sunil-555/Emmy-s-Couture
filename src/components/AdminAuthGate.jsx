import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  Crown, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  Sparkles, 
  AlertCircle 
} from 'lucide-react';

export const AdminAuthGate = () => {
  const { adminLogin, navigateTo, showToast } = useShop();

  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [securityKey, setSecurityKey] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    const res = await adminLogin(adminEmail, adminPassword, securityKey);
    setIsLoading(false);

    if (!res.success) {
      setErrorMessage(res.error || 'Invalid administrator credentials. Access restricted.');
    }
  };

  const handleAutoFill = () => {
    setAdminEmail('admin@emmyscouture.com');
    setAdminPassword('admin123');
    setSecurityKey('9900');
    setErrorMessage('');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        background: 'radial-gradient(ellipse at top, #2D0814 0%, #150208 60%, #080004 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: 'var(--font-sans)',
        color: '#FAF7F2',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Decorative Gold Rings */}
      <div
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          border: '1px solid rgba(212, 175, 122, 0.08)',
          pointerEvents: 'none',
          top: '-150px',
          right: '-150px'
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          border: '1px solid rgba(212, 175, 122, 0.05)',
          pointerEvents: 'none',
          bottom: '-100px',
          left: '-100px'
        }}
      />

      {/* Main Lock Card */}
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          background: 'rgba(30, 8, 16, 0.75)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(212, 175, 122, 0.4)',
          borderRadius: '4px',
          padding: '40px 36px',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 40px rgba(212, 175, 122, 0.1)',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* Header Lockup */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              margin: '0 auto 16px auto',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(212, 175, 122, 0.2) 0%, rgba(92, 26, 46, 0.4) 100%)',
              border: '1px solid rgba(212, 175, 122, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 25px rgba(212, 175, 122, 0.2)'
            }}
          >
            <ShieldCheck size={28} style={{ color: '#D4AF7A' }} />
          </div>

          <div style={{ fontFamily: 'var(--font-signature)', fontSize: '2.4rem', color: '#D4AF7A', lineHeight: 1 }}>
            Emmy's
          </div>
          <div style={{ fontSize: '0.68rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#E8D5B7', fontWeight: 700, marginTop: '6px' }}>
            PRIVATE ATELIER ADMINISTRATION GATE
          </div>
          <div style={{ fontSize: '0.74rem', color: 'rgba(232, 213, 183, 0.65)', marginTop: '8px', lineHeight: 1.4 }}>
            Restricted access. Authorized master atelier personnel and salon directors only.
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div
            style={{
              background: 'rgba(230, 80, 80, 0.15)',
              border: '1px solid rgba(230, 80, 80, 0.4)',
              color: '#FFB8B8',
              padding: '10px 14px',
              borderRadius: '2px',
              fontSize: '0.78rem',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <AlertCircle size={15} style={{ flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Admin Email */}
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#D4AF7A', marginBottom: '6px' }}>
              Administrator Email
            </label>
            <input
              type="email"
              required
              placeholder="admin@emmyscouture.com"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'rgba(15, 3, 8, 0.7)',
                border: '1px solid rgba(212, 175, 122, 0.3)',
                borderRadius: '2px',
                color: '#FAF7F2',
                fontSize: '0.86rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Master Password */}
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#D4AF7A', marginBottom: '6px' }}>
              Master Security Passcode
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••••••"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 42px 12px 16px',
                  background: 'rgba(15, 3, 8, 0.7)',
                  border: '1px solid rgba(212, 175, 122, 0.3)',
                  borderRadius: '2px',
                  color: '#FAF7F2',
                  fontSize: '0.86rem',
                  outline: 'none'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'rgba(212, 175, 122, 0.6)',
                  cursor: 'pointer'
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Security Access PIN */}
          <div>
            <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#D4AF7A', marginBottom: '6px' }}>
              Atelier Master PIN (Optional)
            </label>
            <input
              type="password"
              placeholder="e.g. 9900"
              value={securityKey}
              onChange={(e) => setSecurityKey(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                background: 'rgba(15, 3, 8, 0.7)',
                border: '1px solid rgba(212, 175, 122, 0.3)',
                borderRadius: '2px',
                color: '#FAF7F2',
                fontSize: '0.86rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              marginTop: '8px',
              background: 'linear-gradient(135deg, #D4AF7A 0%, #B38E58 100%)',
              color: '#20060E',
              border: 'none',
              padding: '14px',
              borderRadius: '2px',
              fontWeight: 700,
              fontSize: '0.82rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 20px rgba(212, 175, 122, 0.35)',
              transition: 'all 0.2s ease'
            }}
          >
            <Lock size={15} />
            <span>{isLoading ? 'Verifying Credentials...' : 'Authenticate & Unlock Console'}</span>
          </button>
        </form>

        {/* Demo Helper Button */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button
            type="button"
            onClick={handleAutoFill}
            style={{
              background: 'none',
              border: '1px dashed rgba(212, 175, 122, 0.35)',
              color: '#D4AF7A',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '0.7rem',
              letterSpacing: '0.08em',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px'
            }}
          >
            <Sparkles size={12} />
            <span>Auto-Fill Master Credentials</span>
          </button>
        </div>

        {/* Back to Public Boutique */}
        <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid rgba(212, 175, 122, 0.2)', textAlign: 'center' }}>
          <button
            type="button"
            onClick={() => navigateTo('/')}
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(232, 213, 183, 0.7)',
              fontSize: '0.76rem',
              letterSpacing: '0.08em',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#D4AF7A')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(232, 213, 183, 0.7)')}
          >
            <ArrowLeft size={14} />
            <span>Return to Public Boutique</span>
          </button>
        </div>
      </div>
    </div>
  );
};
