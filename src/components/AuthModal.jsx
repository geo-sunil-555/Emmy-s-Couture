import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Sparkles,
  Lock,
  Mail,
  User,
  MapPin,
  CheckCircle2,
  Eye,
  EyeOff,
  Crown,
  ArrowRight,
  ArrowLeft,
  Key,
  ShieldCheck
} from 'lucide-react';

export const AuthModal = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    registerClient,
    loginClient,
    resetClientPassword,
    isSupabaseConfigured
  } = useShop();

  // Registration state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regCity, setRegCity] = useState('Kochi Flagship Maison');
  const [regPreference, setRegPreference] = useState('Bridal Kanchipuram & Zardozi');

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Forgot password state
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotConfirmPassword, setForgotConfirmPassword] = useState('');
  const [showForgotNewPassword, setShowForgotNewPassword] = useState(false);
  const [forgotSuccessMessage, setForgotSuccessMessage] = useState('');

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const res = await registerClient({
        name: regName,
        email: regEmail,
        password: regPassword,
        city: regCity,
        preference: regPreference
      });

      setIsLoading(false);
      if (!res.success) {
        setErrorMessage(res.error);
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.message || 'An unexpected error occurred.');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const res = await loginClient(loginEmail, loginPassword);
      setIsLoading(false);
      if (!res.success) {
        setErrorMessage(res.error);
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.message || 'An unexpected error occurred.');
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setForgotSuccessMessage('');

    if (forgotNewPassword !== forgotConfirmPassword) {
      setErrorMessage('Passwords do not match. Please ensure both fields match.');
      return;
    }

    if (forgotNewPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters in length.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await resetClientPassword({
        email: forgotEmail,
        newPassword: forgotNewPassword
      });
      setIsLoading(false);
      if (res.success) {
        setForgotSuccessMessage(res.message || 'Credentials updated successfully.');
        setLoginEmail(forgotEmail);
      } else {
        setErrorMessage(res.error || 'Failed to reset password.');
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.message || 'An unexpected error occurred.');
    }
  };

  const loadDemoCredentials = () => {
    setLoginEmail('priya@emmyscouture.com');
    setLoginPassword('password123');
    setErrorMessage('');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(15, 12, 11, 0.82)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        padding: '20px',
        animation: 'fadeIn 0.3s ease'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsAuthModalOpen(false);
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '520px',
          background: '#FDFBF7',
          borderRadius: '4px',
          border: '1px solid rgba(212, 175, 122, 0.45)',
          boxShadow: '0 25px 70px rgba(0, 0, 0, 0.55), 0 0 1px rgba(212, 175, 122, 0.6)',
          overflow: 'hidden',
          animation: 'modalSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          color: '#2B2B2B'
        }}
      >
        {/* Top Gold Foil Accent Border */}
        <div
          style={{
            height: '4px',
            background: 'linear-gradient(90deg, #5C1A2E 0%, #D4AF7A 50%, #5C1A2E 100%)'
          }}
        />

        {/* Modal Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'rgba(92, 26, 46, 0.06)',
            border: '1px solid rgba(212, 175, 122, 0.3)',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#5C1A2E',
            transition: 'all 0.25s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#5C1A2E';
            e.currentTarget.style.color = '#FDFBF7';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(92, 26, 46, 0.06)';
            e.currentTarget.style.color = '#5C1A2E';
          }}
          aria-label="Close Authentication Modal"
        >
          <X size={16} />
        </button>

        <div style={{ padding: '36px 36px 32px 36px' }}>
          {/* Header Brand Seal */}
          <div style={{ textAlign: 'center', marginBottom: '22px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(92, 26, 46, 0.06)',
                border: '1px solid rgba(212, 175, 122, 0.5)',
                color: '#D4AF7A',
                marginBottom: '10px'
              }}
            >
              <Crown size={22} />
            </div>

            <div style={{ fontFamily: 'var(--font-signature)', fontSize: '2rem', color: '#5C1A2E', lineHeight: 0.9 }}>
              Emmy's
            </div>
            <div style={{ fontSize: '0.66rem', letterSpacing: '0.38em', textTransform: 'uppercase', color: '#887B72', fontWeight: 600 }}>
              COUTURE PRIVÉ
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div
            style={{
              display: 'flex',
              background: 'rgba(92, 26, 46, 0.05)',
              borderRadius: '2px',
              padding: '4px',
              marginBottom: '24px',
              border: '1px solid rgba(212, 175, 122, 0.25)',
              gap: '4px'
            }}
          >
            <button
              type="button"
              onClick={() => {
                setAuthModalMode('signup');
                setErrorMessage('');
                setForgotSuccessMessage('');
              }}
              style={{
                flex: 1,
                padding: '9px 0',
                background: authModalMode === 'signup' ? '#FFFFFF' : 'transparent',
                border: authModalMode === 'signup' ? '1px solid rgba(212, 175, 122, 0.4)' : 'none',
                borderRadius: '2px',
                color: authModalMode === 'signup' ? '#5C1A2E' : '#695E57',
                fontWeight: authModalMode === 'signup' ? 700 : 500,
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                boxShadow: authModalMode === 'signup' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.25s ease'
              }}
            >
              Create Account
            </button>

            <button
              type="button"
              onClick={() => {
                setAuthModalMode('login');
                setErrorMessage('');
                setForgotSuccessMessage('');
              }}
              style={{
                flex: 1,
                padding: '9px 0',
                background: authModalMode === 'login' ? '#FFFFFF' : 'transparent',
                border: authModalMode === 'login' ? '1px solid rgba(212, 175, 122, 0.4)' : 'none',
                borderRadius: '2px',
                color: authModalMode === 'login' ? '#5C1A2E' : '#695E57',
                fontWeight: authModalMode === 'login' ? 700 : 500,
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                boxShadow: authModalMode === 'login' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                transition: 'all 0.25s ease'
              }}
            >
              Client Sign In
            </button>

            {authModalMode === 'forgot' && (
              <button
                type="button"
                style={{
                  flex: 1,
                  padding: '9px 0',
                  background: '#FFFFFF',
                  border: '1px solid rgba(212, 175, 122, 0.4)',
                  borderRadius: '2px',
                  color: '#5C1A2E',
                  fontWeight: 700,
                  fontSize: '0.72rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  cursor: 'default',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                }}
              >
                Reset Password
              </button>
            )}
          </div>

          {/* Error Message Alert */}
          {errorMessage && (
            <div
              style={{
                background: 'rgba(180, 40, 40, 0.08)',
                border: '1px solid rgba(180, 40, 40, 0.3)',
                padding: '10px 14px',
                borderRadius: '3px',
                color: '#9C1A1A',
                fontSize: '0.78rem',
                marginBottom: '18px',
                lineHeight: 1.4
              }}
            >
              {errorMessage}
            </div>
          )}

          {/* TAB 1: CREATE ACCOUNT (SIGN UP) */}
          {authModalMode === 'signup' && (
            <form onSubmit={handleRegisterSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.72rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#5C1A2E',
                    fontWeight: 600,
                    marginBottom: '6px'
                  }}
                >
                  Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <User
                    size={16}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#887B72'
                    }}
                  />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maharani Devika"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 38px',
                      background: '#FFFFFF',
                      border: '1px solid rgba(212, 175, 122, 0.4)',
                      borderRadius: '2px',
                      fontSize: '0.86rem',
                      color: '#2B2B2B',
                      outline: 'none',
                      fontFamily: 'var(--font-sans)',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#5C1A2E')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(212, 175, 122, 0.4)')}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.72rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#5C1A2E',
                    fontWeight: 600,
                    marginBottom: '6px'
                  }}
                >
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail
                    size={16}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#887B72'
                    }}
                  />
                  <input
                    type="email"
                    required
                    placeholder="client@couture.com"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 38px',
                      background: '#FFFFFF',
                      border: '1px solid rgba(212, 175, 122, 0.4)',
                      borderRadius: '2px',
                      fontSize: '0.86rem',
                      color: '#2B2B2B',
                      outline: 'none',
                      fontFamily: 'var(--font-sans)',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#5C1A2E')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(212, 175, 122, 0.4)')}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.72rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#5C1A2E',
                    fontWeight: 600,
                    marginBottom: '6px'
                  }}
                >
                  Create Password
                </label>
                <div style={{ position: 'relative' }}>
                  <Lock
                    size={16}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#887B72'
                    }}
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••••"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 38px 12px 38px',
                      background: '#FFFFFF',
                      border: '1px solid rgba(212, 175, 122, 0.4)',
                      borderRadius: '2px',
                      fontSize: '0.86rem',
                      color: '#2B2B2B',
                      outline: 'none',
                      fontFamily: 'var(--font-sans)',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#5C1A2E')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(212, 175, 122, 0.4)')}
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
                      color: '#887B72',
                      cursor: 'pointer'
                    }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Preferred Salon City */}
              <div style={{ marginBottom: '22px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.72rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#5C1A2E',
                    fontWeight: 600,
                    marginBottom: '6px'
                  }}
                >
                  Preferred Atelier Salon
                </label>
                <div style={{ position: 'relative' }}>
                  <MapPin
                    size={16}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#887B72'
                    }}
                  />
                  <select
                    value={regCity}
                    onChange={(e) => setRegCity(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 38px',
                      background: '#FFFFFF',
                      border: '1px solid rgba(212, 175, 122, 0.4)',
                      borderRadius: '2px',
                      fontSize: '0.86rem',
                      color: '#2B2B2B',
                      outline: 'none',
                      fontFamily: 'var(--font-sans)',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="Kochi Flagship Maison">Kochi Flagship Maison (Panampilly Nagar & Fort Kochi)</option>
                    <option value="Thiruvananthapuram Royal Salon">Thiruvananthapuram Royal Salon (Kowdiar Palace)</option>
                    <option value="Kozhikode Beachfront Atelier">Kozhikode Beachfront Atelier (PT Usha Road)</option>
                    <option value="Thrissur Heritage Studio">Thrissur Heritage Studio (Palace Road)</option>
                    <option value="Kumarakom Backwaters Retreat">Kumarakom Private Villa & Backwaters Retreat</option>
                    <option value="Virtual Kerala Atelier">Virtual Kerala Atelier (Global Malayali Concierge)</option>
                  </select>
                </div>
              </div>

              {/* Submit Registration Button */}
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #5C1A2E 0%, #3B0E1C 100%)',
                  color: '#FAF7F2',
                  border: '1px solid rgba(212, 175, 122, 0.5)',
                  borderRadius: '2px',
                  padding: '14px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  cursor: isLoading ? 'wait' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 6px 20px rgba(92, 26, 46, 0.25)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.15)')}
                onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
              >
                <span>{isLoading ? 'Creating Atelier Privé Account...' : 'Create Account & Enter Salon'}</span>
                <ArrowRight size={16} />
              </button>

              <div style={{ textAlign: 'center', marginTop: '16px' }}>
                <span style={{ fontSize: '0.76rem', color: '#7A7067' }}>
                  Already registered with our Maison?{' '}
                </span>
                <button
                  type="button"
                  onClick={() => setAuthModalMode('login')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#5C1A2E',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Sign In
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: CLIENT SIGN IN */}
          {authModalMode === 'login' && (
            <form onSubmit={handleLoginSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.72rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#5C1A2E',
                    fontWeight: 600,
                    marginBottom: '6px'
                  }}
                >
                  Registered Email
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail
                    size={16}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#887B72'
                    }}
                  />
                  <input
                    type="email"
                    required
                    placeholder="priya@emmyscouture.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px 12px 38px',
                      background: '#FFFFFF',
                      border: '1px solid rgba(212, 175, 122, 0.4)',
                      borderRadius: '2px',
                      fontSize: '0.86rem',
                      color: '#2B2B2B',
                      outline: 'none',
                      fontFamily: 'var(--font-sans)',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#5C1A2E')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(212, 175, 122, 0.4)')}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label
                    style={{
                      fontSize: '0.72rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: '#5C1A2E',
                      fontWeight: 600
                    }}
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={loadDemoCredentials}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#D4AF7A',
                      fontSize: '0.7rem',
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    Auto-Fill Demo Client
                  </button>
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock
                    size={16}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#887B72'
                    }}
                  />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 38px 12px 38px',
                      background: '#FFFFFF',
                      border: '1px solid rgba(212, 175, 122, 0.4)',
                      borderRadius: '2px',
                      fontSize: '0.86rem',
                      color: '#2B2B2B',
                      outline: 'none',
                      fontFamily: 'var(--font-sans)',
                      transition: 'border-color 0.2s ease'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#5C1A2E')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(212, 175, 122, 0.4)')}
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
                      color: '#887B72',
                      cursor: 'pointer'
                    }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Forgot Password Option Trigger */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '6px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthModalMode('forgot');
                      setForgotEmail(loginEmail || '');
                      setErrorMessage('');
                      setForgotSuccessMessage('');
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#5C1A2E',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      padding: '2px 0'
                    }}
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>

              {/* Submit Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #5C1A2E 0%, #3B0E1C 100%)',
                  color: '#FAF7F2',
                  border: '1px solid rgba(212, 175, 122, 0.5)',
                  borderRadius: '2px',
                  padding: '14px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  cursor: isLoading ? 'wait' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 6px 20px rgba(92, 26, 46, 0.25)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.15)')}
                onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
              >
                <span>{isLoading ? 'Authenticating Client...' : 'Sign In & Enter Salon'}</span>
                <ArrowRight size={16} />
              </button>

              <div style={{ textAlign: 'center', marginTop: '16px' }}>
                <span style={{ fontSize: '0.76rem', color: '#7A7067' }}>
                  New to Emmy's Couture Maison?{' '}
                </span>
                <button
                  type="button"
                  onClick={() => setAuthModalMode('signup')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#5C1A2E',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Create an Account
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: FORGOT PASSWORD RECOVERY */}
          {authModalMode === 'forgot' && (
            <div>
              {forgotSuccessMessage ? (
                <div style={{ textAlign: 'center', padding: '16px 0 8px 0' }}>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: 'rgba(212, 175, 122, 0.15)',
                      border: '1px solid #D4AF7A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px auto',
                      color: '#5C1A2E'
                    }}
                  >
                    <CheckCircle2 size={30} style={{ color: '#5C1A2E' }} />
                  </div>

                  <h3 style={{ fontSize: '1.25rem', color: '#5C1A2E', fontWeight: 600, marginBottom: '8px' }}>
                    Credentials Successfully Reset
                  </h3>

                  <p style={{ color: '#6E645C', fontSize: '0.84rem', lineHeight: 1.5, marginBottom: '22px' }}>
                    {forgotSuccessMessage}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setAuthModalMode('login');
                      setErrorMessage('');
                      setForgotSuccessMessage('');
                    }}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #5C1A2E 0%, #3B0E1C 100%)',
                      color: '#FAF7F2',
                      border: '1px solid rgba(212, 175, 122, 0.5)',
                      borderRadius: '2px',
                      padding: '13px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 16px rgba(92, 26, 46, 0.25)'
                    }}
                  >
                    <span>Proceed to Client Sign In</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit}>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#D4AF7A', fontWeight: 700, marginBottom: '4px' }}>
                      Atelier Security Protocol
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#6E645C', lineHeight: 1.4 }}>
                      Enter your registered email and choose a new secure password to update your atelier credentials.
                    </div>
                  </div>

                  {/* Registered Email */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label
                        style={{
                          fontSize: '0.72rem',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: '#5C1A2E',
                          fontWeight: 600
                        }}
                      >
                        Registered Email Address
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setForgotEmail('priya@emmyscouture.com');
                          setForgotNewPassword('password123');
                          setForgotConfirmPassword('password123');
                          setErrorMessage('');
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#D4AF7A',
                          fontSize: '0.7rem',
                          cursor: 'pointer',
                          textDecoration: 'underline'
                        }}
                      >
                        Auto-Fill Demo Email
                      </button>
                    </div>
                    <div style={{ position: 'relative' }}>
                      <Mail
                        size={16}
                        style={{
                          position: 'absolute',
                          left: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: '#887B72'
                        }}
                      />
                      <input
                        type="email"
                        required
                        placeholder="client@couture.com"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '12px 14px 12px 38px',
                          background: '#FFFFFF',
                          border: '1px solid rgba(212, 175, 122, 0.4)',
                          borderRadius: '2px',
                          fontSize: '0.86rem',
                          color: '#2B2B2B',
                          outline: 'none',
                          fontFamily: 'var(--font-sans)',
                          transition: 'border-color 0.2s ease'
                        }}
                        onFocus={(e) => (e.target.style.borderColor = '#5C1A2E')}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(212, 175, 122, 0.4)')}
                      />
                    </div>
                  </div>

                  {/* New Password */}
                  <div style={{ marginBottom: '16px' }}>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.72rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#5C1A2E',
                        fontWeight: 600,
                        marginBottom: '6px'
                      }}
                    >
                      New Password (Min 6 Characters)
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Lock
                        size={16}
                        style={{
                          position: 'absolute',
                          left: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: '#887B72'
                        }}
                      />
                      <input
                        type={showForgotNewPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••••••"
                        value={forgotNewPassword}
                        onChange={(e) => setForgotNewPassword(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '12px 38px 12px 38px',
                          background: '#FFFFFF',
                          border: '1px solid rgba(212, 175, 122, 0.4)',
                          borderRadius: '2px',
                          fontSize: '0.86rem',
                          color: '#2B2B2B',
                          outline: 'none',
                          fontFamily: 'var(--font-sans)',
                          transition: 'border-color 0.2s ease'
                        }}
                        onFocus={(e) => (e.target.style.borderColor = '#5C1A2E')}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(212, 175, 122, 0.4)')}
                      />
                      <button
                        type="button"
                        onClick={() => setShowForgotNewPassword(!showForgotNewPassword)}
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          color: '#887B72',
                          cursor: 'pointer'
                        }}
                      >
                        {showForgotNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm New Password */}
                  <div style={{ marginBottom: '22px' }}>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '0.72rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#5C1A2E',
                        fontWeight: 600,
                        marginBottom: '6px'
                      }}
                    >
                      Confirm New Password
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Lock
                        size={16}
                        style={{
                          position: 'absolute',
                          left: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: '#887B72'
                        }}
                      />
                      <input
                        type={showForgotNewPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••••••"
                        value={forgotConfirmPassword}
                        onChange={(e) => setForgotConfirmPassword(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '12px 14px 12px 38px',
                          background: '#FFFFFF',
                          border: '1px solid rgba(212, 175, 122, 0.4)',
                          borderRadius: '2px',
                          fontSize: '0.86rem',
                          color: '#2B2B2B',
                          outline: 'none',
                          fontFamily: 'var(--font-sans)',
                          transition: 'border-color 0.2s ease'
                        }}
                        onFocus={(e) => (e.target.style.borderColor = '#5C1A2E')}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(212, 175, 122, 0.4)')}
                      />
                    </div>
                  </div>

                  {/* Submit Reset Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #5C1A2E 0%, #3B0E1C 100%)',
                      color: '#FAF7F2',
                      border: '1px solid rgba(212, 175, 122, 0.5)',
                      borderRadius: '2px',
                      padding: '14px',
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      cursor: isLoading ? 'wait' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 6px 20px rgba(92, 26, 46, 0.25)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.15)')}
                    onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
                  >
                    <Key size={15} />
                    <span>{isLoading ? 'Resetting Credentials...' : 'Reset & Update Password'}</span>
                  </button>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '18px' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthModalMode('login');
                        setErrorMessage('');
                        setForgotSuccessMessage('');
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#5C1A2E',
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <ArrowLeft size={14} />
                      <span>Back to Sign In</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setAuthModalMode('signup');
                        setErrorMessage('');
                        setForgotSuccessMessage('');
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#887B72',
                        fontSize: '0.76rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        textDecoration: 'underline'
                      }}
                    >
                      Create Account
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* Maison Privacy & Security Assurance */}
          <div
            style={{
              marginTop: '24px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(212, 175, 122, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              color: '#887B72',
              fontSize: '0.68rem',
              letterSpacing: '0.06em',
              textAlign: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={14} style={{ color: '#D4AF7A' }} />
              <span>Private Atelier Encrypted Session • 100% Confidential Client Privileges</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px', color: '#9E948B', fontSize: '0.64rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: isSupabaseConfigured ? '#48BB78' : '#D4AF7A', display: 'inline-block' }} />
              <span>{isSupabaseConfigured ? 'Live PostgreSQL Database Connected' : 'PostgreSQL Schema & Atelier Database Configured'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
