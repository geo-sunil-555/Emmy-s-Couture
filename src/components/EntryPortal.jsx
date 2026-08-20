import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, ArrowRight, UserCheck, Lock } from 'lucide-react';

export const EntryPortal = () => {
  const {
    currentUser,
    handleShopNow,
    logoutClient
  } = useShop();

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="entry-portal-wrapper"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#151311',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-sans)',
        color: '#FDFBF7'
      }}
    >
      {/* Background Image Layer with dramatic cinematic lighting */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('/images/emmys_entry_editorial.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          backgroundRepeat: 'no-repeat',
          filter: 'contrast(1.05) brightness(0.98)',
          transition: 'transform 10s ease-out',
          transform: isHovered ? 'scale(1.03)' : 'scale(1)'
        }}
      />

      {/* Cinematic Studio Shadows & Beam Enhancer */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 35% 30%, rgba(212, 175, 122, 0.12) 0%, transparent 60%),
            linear-gradient(to right, rgba(15, 13, 11, 0.2) 0%, rgba(20, 18, 16, 0.1) 40%, rgba(15, 13, 11, 0.65) 75%, rgba(12, 10, 8, 0.88) 100%),
            linear-gradient(to top, rgba(12, 10, 8, 0.85) 0%, transparent 35%, rgba(12, 10, 8, 0.6) 100%)
          `,
          pointerEvents: 'none'
        }}
      />

      {/* Top Subtle Luxury Maison Branding Bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          padding: '24px 36px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span
            style={{
              fontFamily: 'var(--font-signature)',
              fontSize: '1.8rem',
              color: '#D4AF7A',
              lineHeight: 1
            }}
          >
            Emmy's
          </span>
        </div>

        {/* User Account / Sign In Status Pill */}
        <div>
          {currentUser ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                background: 'rgba(30, 26, 22, 0.65)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                padding: '6px 16px',
                borderRadius: '30px',
                border: '1px solid rgba(212, 175, 122, 0.35)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UserCheck size={14} style={{ color: '#D4AF7A' }} />
                <span style={{ fontSize: '0.75rem', letterSpacing: '0.08em', color: '#FDFBF7' }}>
                  {currentUser.name}
                </span>
                <span
                  style={{
                    fontSize: '0.62rem',
                    background: 'rgba(212, 175, 122, 0.2)',
                    color: '#D4AF7A',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase'
                  }}
                >
                  Privé Member
                </span>
              </div>
              <button
                onClick={logoutClient}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(253, 251, 247, 0.6)',
                  cursor: 'pointer',
                  fontSize: '0.68rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  paddingLeft: '8px',
                  borderLeft: '1px solid rgba(212, 175, 122, 0.3)'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#D4AF7A')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(253, 251, 247, 0.6)')}
              >
                Sign Out
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {/* Main Right Editorial Typography Lockup matching the provided reference */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1440px',
          height: '100%',
          margin: '0 auto',
          padding: '0 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          zIndex: 10
        }}
      >
        <div
          style={{
            maxWidth: '560px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginTop: '40px'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Typography: "The" */}
          <div
            style={{
              fontFamily: 'var(--font-serif-editorial)',
              fontSize: 'clamp(2.4rem, 4.2vw, 3.8rem)',
              fontStyle: 'italic',
              fontWeight: 400,
              color: '#D8B888',
              lineHeight: 0.9,
              letterSpacing: '0.02em',
              textShadow: '0 2px 14px rgba(0,0,0,0.6)',
              marginBottom: '-8px',
              paddingLeft: '4px'
            }}
          >
            The
          </div>

          {/* Typography: "Emmy's" */}
          <div
            style={{
              fontFamily: 'var(--font-serif-editorial)',
              fontSize: 'clamp(4.2rem, 8.5vw, 7.8rem)',
              fontWeight: 400,
              letterSpacing: '0.01em',
              color: '#E8D5B7',
              lineHeight: 0.92,
              textShadow: '0 4px 20px rgba(0,0,0,0.7)',
              marginBottom: '34px'
            }}
          >
            Emmy's
          </div>

          {/* Primary Action Button: "SHOP NOW" */}
          <button
            onClick={handleShopNow}
            className="entry-shop-now-btn"
            style={{
              background: '#C5A580',
              color: '#342118',
              border: 'none',
              borderRadius: '2px',
              padding: '16px 42px',
              fontSize: '0.92rem',
              fontWeight: 700,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.4)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#D8B888';
              e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(212, 175, 122, 0.35), 0 0 15px rgba(212, 175, 122, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#C5A580';
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.4)';
            }}
          >
            <span>SHOP NOW</span>
            <ArrowRight size={16} style={{ transform: 'translateX(2px)' }} />
          </button>

          {/* Subtext info regarding membership and instant entry */}
          <div
            style={{
              marginTop: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'rgba(232, 213, 183, 0.75)',
              fontSize: '0.72rem',
              letterSpacing: '0.1em'
            }}
          >
            {currentUser ? (
              <span>
                ✦ Access Granted • Welcome back, {currentUser.name}
              </span>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Lock size={11} style={{ color: '#D4AF7A' }} />
                <span>Log in or register to enter</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Corner Subtle 4-Point Diamond Sparkle */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          right: '36px',
          color: 'rgba(216, 184, 136, 0.65)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.68rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          zIndex: 10
        }}
      >
        <Sparkles size={18} style={{ color: '#D4AF7A', animation: 'spinSlow 12s linear infinite' }} />
      </div>
    </div>
  );
};
