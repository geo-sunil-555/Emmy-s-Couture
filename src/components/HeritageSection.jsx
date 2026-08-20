import React, { useState } from 'react';
import { Sparkles, Award, Scissors, Feather, ZoomIn } from 'lucide-react';

export const HeritageSection = () => {
  const [activeCraftView, setActiveCraftView] = useState('macro');

  return (
    <section id="heritage" className="section-padding" style={{ background: '#FDFBF7', borderTop: '1px solid rgba(212, 175, 122, 0.25)', borderBottom: '1px solid rgba(212, 175, 122, 0.25)', position: 'relative' }}>
      <div className="container-couture">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '50px',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Story & Craft */}
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--color-primary-burgundy)',
                fontSize: '0.74rem',
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                fontWeight: 700,
                marginBottom: '12px'
              }}
            >
              <Award size={15} style={{ color: 'var(--color-champagne-gold)' }} />
              <span>Savoir-Faire & Craftsmanship Story</span>
            </div>

            <h2
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                lineHeight: 1.15,
                marginBottom: '20px',
                color: 'var(--color-primary-burgundy)'
              }}
            >
              The Sacred Needlework of <br />
              <span style={{ color: 'var(--color-champagne-gold)', fontStyle: 'italic', fontFamily: 'var(--font-serif-editorial)' }}>
                Emmy's South Indian Atelier
              </span>
            </h2>

            <p style={{ color: 'var(--color-text-charcoal)', fontSize: '0.96rem', lineHeight: 1.75, marginBottom: '24px' }}>
              Founded on the belief that traditional handlooms represent living sculptural art, Emmy's Couture upholds
              the revered centuries-old traditions of master South Indian karigars and weavers. Across our private salons in Chennai, Bengaluru, Kochi, and Hyderabad,
              every garment is handcrafted with pure Kanchipuram mulberry silk, authentic temple filigree, and 24k gold zari bullion.
            </p>

            {/* 3 Pillars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '1px',
                    background: 'rgba(92, 26, 46, 0.08)',
                    border: '1px solid var(--gold-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-primary-burgundy)',
                    flexShrink: 0
                  }}
                >
                  <Scissors size={18} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.02rem', color: 'var(--color-primary-burgundy)', fontWeight: 600, marginBottom: '4px' }}>
                    32-Point Anatomical Master Tailoring
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-muted-text)', lineHeight: 1.5 }}>
                    Individual wooden mannequins sculpted for private clients ensuring an uncompromised, bespoke second-skin fit for corsets and blouses.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '1px',
                    background: 'rgba(92, 26, 46, 0.08)',
                    border: '1px solid var(--gold-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-primary-burgundy)',
                    flexShrink: 0
                  }}
                >
                  <Sparkles size={18} style={{ color: 'var(--color-champagne-gold)' }} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.02rem', color: 'var(--color-primary-burgundy)', fontWeight: 600, marginBottom: '4px' }}>
                    24k Gold Zardozi & Freshwater Pearl Bullion
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-muted-text)', lineHeight: 1.5 }}>
                    Fine gold bullion coils, natural seed pearls, and genuine Swarovskis micro-stitched over 150 hours per bespoke gown.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '1px',
                    background: 'rgba(92, 26, 46, 0.08)',
                    border: '1px solid var(--gold-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-primary-burgundy)',
                    flexShrink: 0
                  }}
                >
                  <Feather size={18} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.02rem', color: 'var(--color-primary-burgundy)', fontWeight: 600, marginBottom: '4px' }}>
                    Zero-Waste Pure Mulberry Silk & Kasavu
                  </h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-muted-text)', lineHeight: 1.5 }}>
                    Ethically harvested organic silk and heritage Balaramapuram weaves preserving historic Indian textile arts.
                  </p>
                </div>
              </div>
            </div>

            {/* Founder Quote */}
            <div
              style={{
                borderLeft: '2px solid var(--color-champagne-gold)',
                paddingLeft: '18px',
                fontStyle: 'italic',
                color: 'var(--color-primary-burgundy)',
                fontSize: '0.94rem',
                lineHeight: 1.6
              }}
            >
              "Emmy's Couture is not merely fashion; it is the architecture of South Indian royal majesty and enduring heritage."
              <div
                style={{
                  fontFamily: 'var(--font-signature)',
                  fontSize: '1.6rem',
                  color: 'var(--color-champagne-gold)',
                  marginTop: '8px',
                  fontStyle: 'normal'
                }}
              >
                Emmy
              </div>
              <div style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-muted-text)', fontStyle: 'normal', fontWeight: 600 }}>
                Founder & Artistic Director, Emmy's Couture
              </div>
            </div>
          </div>

          {/* Right Column: High Fashion Editorial Craft Image & Detail Switcher */}
          <div style={{ position: 'relative' }}>
            <div
              className="glass-panel"
              style={{
                padding: '16px',
                borderRadius: '2px',
                background: '#FFFFFF',
                border: '1px solid rgba(212, 175, 122, 0.35)',
                boxShadow: 'var(--shadow-card)'
              }}
            >
              {/* Image Toggle Tabs */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <button
                  onClick={() => setActiveCraftView('macro')}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    background: activeCraftView === 'macro' ? 'var(--color-primary-burgundy)' : 'rgba(253, 251, 247, 0.9)',
                    color: activeCraftView === 'macro' ? '#FDFBF7' : 'var(--color-text-charcoal)',
                    border: activeCraftView === 'macro' ? '1px solid var(--color-primary-burgundy)' : '1px solid rgba(212, 175, 122, 0.3)',
                    borderRadius: '1px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <ZoomIn size={13} />
                  <span>Macro Bodice Embroidery</span>
                </button>

                <button
                  onClick={() => setActiveCraftView('studio')}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    background: activeCraftView === 'studio' ? 'var(--color-primary-burgundy)' : 'rgba(253, 251, 247, 0.9)',
                    color: activeCraftView === 'studio' ? '#FDFBF7' : 'var(--color-text-charcoal)',
                    border: activeCraftView === 'studio' ? '1px solid var(--color-primary-burgundy)' : '1px solid rgba(212, 175, 122, 0.3)',
                    borderRadius: '1px',
                    cursor: 'pointer'
                  }}
                >
                  <span>Atelier Draping Studio</span>
                </button>
              </div>

              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '520px',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  background: '#F6F1EA'
                }}
              >
                <img
                  src={activeCraftView === 'macro' ? "/images/craft_bodice_detail.jpg" : "/images/atelier_craft.png"}
                  alt="Emmy's South Indian Atelier Artisanal Handcraft"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'all 0.5s ease'
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    right: '20px',
                    background: 'rgba(253, 251, 247, 0.96)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(212, 175, 122, 0.35)',
                    padding: '14px 18px',
                    borderRadius: '2px'
                  }}
                >
                  <div style={{ fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-champagne-gold)', fontWeight: 700 }}>
                    {activeCraftView === 'macro' ? "Micro Zardozi & Pearl Detail" : "Salon Master Pattern Drafting"}
                  </div>
                  <div style={{ color: 'var(--color-primary-burgundy)', fontSize: '0.88rem', fontWeight: 600 }}>
                    {activeCraftView === 'macro'
                      ? "24k Gold Bullion Wire & Seed Pearl Needlework on Deep Wine Duchess Silk"
                      : "Handloom Weaving & 32-Point Anatomical Second-Skin Draping"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
