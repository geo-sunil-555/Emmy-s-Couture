import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Award, Scissors, Feather, ZoomIn, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

gsap.registerPlugin(ScrollTrigger);

// Core visual asset path configured for easy swap
const CRAFT_DETAIL_IMAGE = "/images/detail-burgundy-bodice.png";
const CRAFT_DETAIL_FALLBACK = "/images/craft_bodice_detail.jpg";

export const CraftsmanshipPinnedSection = () => {
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const textBlocksRef = useRef([]);
  const { openAppointmentModal } = useShop();

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Desktop: Pin image container while paragraphs scroll past with staggered reveals
    mm.add("(min-width: 1024px)", () => {
      textBlocksRef.current.forEach((block, index) => {
        if (!block) return;
        gsap.fromTo(
          block,
          { opacity: 0.25, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: {
              trigger: block,
              start: "top 75%",
              end: "bottom 45%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    });

    // Mobile: Standard sequential fade in
    mm.add("(max-width: 1023px)", () => {
      textBlocksRef.current.forEach((block) => {
        if (!block) return;
        gsap.from(block, {
          opacity: 0,
          y: 35,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="craftsmanship"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: '#FDFBF7',
        padding: '120px 0',
        borderTop: '1px solid rgba(212, 175, 122, 0.25)',
        borderBottom: '1px solid rgba(212, 175, 122, 0.25)'
      }}
    >
      <div className="container-couture">
        {/* Section Kicker */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 60px auto' }}>
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
            <span>South Indian Handloom & Master Maggam Artistry</span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4.2vw, 3.5rem)',
              lineHeight: 1.15,
              color: 'var(--color-primary-burgundy)',
              fontWeight: 500
            }}
          >
            The Sacred Craftsmanship of <br />
            <span style={{ color: 'var(--color-champagne-gold)', fontStyle: 'italic', fontFamily: 'var(--font-serif-editorial)' }}>
              Emmy's South Indian Bridal Ateliers
            </span>
          </h2>
        </div>

        {/* 2-Column Split: Sticky Image Left + Scrolling Story Column Right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '60px',
            alignItems: 'flex-start'
          }}
        >
          {/* Left Column: Pinned Sticky Macro Embroidery Image */}
          <div
            ref={imageContainerRef}
            style={{
              position: 'sticky',
              top: '120px',
              borderRadius: '2px',
              overflow: 'hidden',
              background: '#FFFFFF',
              border: '1px solid rgba(212, 175, 122, 0.35)',
              padding: '16px',
              boxShadow: 'var(--shadow-card)'
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '500px',
                borderRadius: '2px',
                overflow: 'hidden',
                background: '#F6F1EA'
              }}
            >
              <img
                src={CRAFT_DETAIL_IMAGE}
                alt="Emmy's South Indian 24k Gold Maggam and Zardozi Work"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = CRAFT_DETAIL_FALLBACK;
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.8s var(--ease-silk)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />

              {/* Floating Caption Pill */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '18px',
                  left: '18px',
                  right: '18px',
                  background: 'rgba(253, 251, 247, 0.95)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(212, 175, 122, 0.4)',
                  padding: '14px 18px',
                  borderRadius: '2px',
                  boxShadow: '0 6px 20px rgba(92, 26, 46, 0.08)'
                }}
              >
                <div style={{ fontSize: '0.68rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-champagne-gold)', fontWeight: 700 }}>
                  South Indian Maggam Focus (10x Magnification)
                </div>
                <div style={{ color: 'var(--color-primary-burgundy)', fontSize: '0.86rem', fontWeight: 600 }}>
                  24k Gold Temple Zari, Kasu Medallions & Basra Seed Pearls
                </div>
              </div>
            </div>

            {/* Quick Metrics Under Image */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginTop: '16px', textAlign: 'center' }}>
              <div style={{ padding: '10px', background: '#F6F1EA', borderRadius: '1px' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary-burgundy)' }}>180+ hrs</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--color-muted-text)', textTransform: 'uppercase' }}>Aari & Maggam</div>
              </div>
              <div style={{ padding: '10px', background: '#F6F1EA', borderRadius: '1px' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary-burgundy)' }}>24k Gold</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--color-muted-text)', textTransform: 'uppercase' }}>Temple Zari</div>
              </div>
              <div style={{ padding: '10px', background: '#F6F1EA', borderRadius: '1px' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-primary-burgundy)' }}>100%</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--color-muted-text)', textTransform: 'uppercase' }}>Kanchipuram Silk</div>
              </div>
            </div>
          </div>

          {/* Right Column: Scroll-Driven Story Blocks */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            
            {/* Story Block 1 */}
            <div
              ref={(el) => (textBlocksRef.current[0] = el)}
              className="glass-panel"
              style={{ padding: '32px', background: '#FFFFFF', border: '1px solid rgba(212, 175, 122, 0.35)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <Scissors size={18} style={{ color: 'var(--color-champagne-gold)' }} />
                <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--color-champagne-gold)', fontWeight: 700 }}>
                  Act I • Master Dhavani & Maggam Architecture
                </span>
              </div>
              <h3 style={{ fontSize: '1.45rem', color: 'var(--color-primary-burgundy)', fontWeight: 600, marginBottom: '12px' }}>
                32-Point Bespoke South Indian Bridal Drafting
              </h3>
              <p style={{ color: 'var(--color-text-charcoal)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '14px' }}>
                Before a single golden needle touches handloom silk, each bespoke half saree, pavadai, and blouse is drafted to the client's exact silhouette. Our master karigars in Chennai, Bengaluru, Kochi, and Hyderabad sculpt internal boning that balances heavy silk pleats and antique gold temple borders effortlessly.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--color-primary-burgundy)', fontWeight: 600 }}>
                <CheckCircle2 size={14} style={{ color: 'var(--color-champagne-gold)' }} />
                <span>Sculpted maggam blouse fitting & perfectly balanced lehenga pleating</span>
              </div>
            </div>

            {/* Story Block 2 */}
            <div
              ref={(el) => (textBlocksRef.current[1] = el)}
              className="glass-panel"
              style={{ padding: '32px', background: '#FFFFFF', border: '1px solid rgba(212, 175, 122, 0.35)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <Sparkles size={18} style={{ color: 'var(--color-champagne-gold)' }} />
                <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--color-champagne-gold)', fontWeight: 700 }}>
                  Act II • Sacred Temple Aari & Kasu Maggam
                </span>
              </div>
              <h3 style={{ fontSize: '1.45rem', color: 'var(--color-primary-burgundy)', fontWeight: 600, marginBottom: '12px' }}>
                24k Gold Temple Zari Bullion & Kasu Medallions
              </h3>
              <p style={{ color: 'var(--color-text-charcoal)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '14px' }}>
                Generational artisans spend upwards of 180 hours applying delicate coiled 24k gold zari bullion wire, Basra seed pearls, and intricate Mayil (peacock) and mango buttas. Every stitch honors classical Chola and Dravidian temple architecture.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--color-primary-burgundy)', fontWeight: 600 }}>
                <CheckCircle2 size={14} style={{ color: 'var(--color-champagne-gold)' }} />
                <span>Hand-embroidered temple gopuram borders, kasu buttas & zardozi jaal</span>
              </div>
            </div>

            {/* Story Block 3 */}
            <div
              ref={(el) => (textBlocksRef.current[2] = el)}
              className="glass-panel"
              style={{ padding: '32px', background: '#FFFFFF', border: '1px solid rgba(212, 175, 122, 0.35)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <Feather size={18} style={{ color: 'var(--color-champagne-gold)' }} />
                <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--color-champagne-gold)', fontWeight: 700 }}>
                  Act III • Royal Pit-Loom Weaves & Korvai Heritage
                </span>
              </div>
              <h3 style={{ fontSize: '1.45rem', color: 'var(--color-primary-burgundy)', fontWeight: 600, marginBottom: '12px' }}>
                Pure 4-Ply Kanchipuram Mulberry Silk & Kasavu
              </h3>
              <p style={{ color: 'var(--color-text-charcoal)', fontSize: '0.92rem', lineHeight: 1.7, marginBottom: '14px' }}>
                Hand-woven on traditional pit-looms by master weaving cooperatives across Kanchipuram, Balaramapuram, and Dharmavaram. Woven with authentic interlocking Korvai borders that unite rich silk body colors with pure gold zari for generational heirloom permanence.
              </p>
              
              <button
                onClick={() => openAppointmentModal("bespoke-fitting")}
                className="btn-gold"
                style={{ padding: '12px 28px', fontSize: '0.8rem', marginTop: '10px' }}
              >
                <span>Reserve Private South Indian Atelier Fitting</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
