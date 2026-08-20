import React from 'react';
import { Sparkles, ArrowRight, Calendar } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ClosingCTA = () => {
  const { openAppointmentModal } = useShop();

  const scrollToCollections = () => {
    const el = document.getElementById('collections');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="closing-cta"
      style={{
        background: '#FDFBF7',
        padding: '120px 0',
        borderTop: '1px solid rgba(212, 175, 122, 0.25)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Soft Champagne Glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,122,0.18) 0%, rgba(253,251,247,0) 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none'
        }}
      />

      <div className="container-couture" style={{ position: 'relative', zIndex: 10, maxWidth: '820px', margin: '0 auto' }}>
        {/* Monogram / Emblem */}
        <div style={{ marginBottom: '18px' }}>
          <span
            style={{
              fontFamily: 'var(--font-signature)',
              fontSize: '3.4rem',
              color: 'var(--color-champagne-gold)',
              display: 'block',
              lineHeight: 0.9
            }}
          >
            Emmy's
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.78rem',
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              color: 'var(--color-primary-burgundy)',
              fontWeight: 700
            }}
          >
            COUTURE ATELIER
          </span>
        </div>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--color-champagne-gold)',
            fontSize: '0.74rem',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            fontWeight: 700,
            marginBottom: '16px'
          }}
        >
          <Sparkles size={14} />
          <span>Living Sculptural Art</span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
            lineHeight: 1.12,
            color: 'var(--color-primary-burgundy)',
            fontWeight: 500,
            marginBottom: '22px'
          }}
        >
          Begin Your Bespoke Commission <br />
          <span style={{ color: 'var(--color-champagne-gold)', fontStyle: 'italic', fontFamily: 'var(--font-serif-editorial)' }}>
            In Absolute Weightlessness
          </span>
        </h2>

        <p style={{ color: 'var(--color-text-charcoal)', fontSize: '1.05rem', lineHeight: 1.75, maxWidth: '620px', margin: '0 auto 38px auto' }}>
          Whether reserving a private champagne salon fitting in Chennai, Bengaluru, Kochi, or Hyderabad, or commissioning a one-of-a-kind bridal masterpiece, our master couturières await your vision.
        </p>

        {/* Shimmer CTA Button & Secondary Action */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            onClick={() => openAppointmentModal()}
            className="btn-shimmer-gold"
            style={{
              padding: '16px 40px',
              fontSize: '0.84rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 700,
              cursor: 'pointer',
              borderRadius: '1px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              border: 'none',
              color: '#FDFBF7',
              background: 'linear-gradient(135deg, #5C1A2E 0%, #7A263F 35%, #D4AF7A 50%, #7A263F 65%, #5C1A2E 100%)',
              backgroundSize: '250% 100%',
              transition: 'all 0.5s ease',
              boxShadow: '0 8px 30px rgba(92, 26, 46, 0.25)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundPosition = '100% 0';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 35px rgba(212, 175, 122, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundPosition = '0 0';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(92, 26, 46, 0.25)';
            }}
          >
            <Calendar size={16} style={{ color: 'var(--color-champagne-gold)' }} />
            <span>Reserve Private Salon Consultation</span>
            <ArrowRight size={16} />
          </button>

          <button
            onClick={scrollToCollections}
            className="btn-outline-gold"
            style={{ padding: '15px 32px', fontSize: '0.84rem' }}
          >
            <span>Explore 54-Piece Catalog</span>
          </button>
        </div>
      </div>
    </section>
  );
};
