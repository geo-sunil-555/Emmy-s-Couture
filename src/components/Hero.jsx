import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useShop } from '../context/ShopContext';
import { Sparkles, ArrowRight, Scissors, Calendar, Layers, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// =========================================================================
// ASSET CONFIGURATION (Easy swap for future 3D models or new render assets)
// =========================================================================
const HERO_ASSETS = {
  primaryHero: '/images/website_editorial_bg.png',
  fallbackHero: '/images/website_editorial_bg.png'
};

const ANTI_GRAVITY_SERIES = [
  {
    id: 'editorial-salon',
    name: "The Sovereign Heritage Editorial",
    edition: "Grand Editorial • Sovereign Heritage",
    image: "/images/website_editorial_bg.png",
    fallbackImage: "/images/website_editorial_bg.png",
    accent: "#D4AF7A",
    tag: "Editorial Flagship",
    description: "Sculptural handloom silks and diaphanous pastel drapes bathed in the warm architectural glow of Emmy's couture salon."
  },
  {
    id: 'navy-ivory',
    name: "Aadrika Midnight & Ivory Royal Half Saree",
    edition: "Edition 01 • Royal Heritage",
    image: "/images/royal_navy_ivory_half_saree.jpg",
    fallbackImage: "/images/royal_navy_ivory_half_saree.jpg",
    accent: "#192841",
    tag: "Heritage Masterpiece",
    description: "Hand-pleated ivory mulberry silk lehenga paired with a regal midnight navy blue dhavani and antique gold temple arch korvai borders."
  },
  {
    id: 'emerald-crimson',
    name: "Devayani Emerald & Crimson Temple Pattu",
    edition: "Edition 02 • Muhurtham Bridal",
    image: "/images/emerald_crimson_kanchipuram_pattu.jpg",
    fallbackImage: "/images/emerald_crimson_kanchipuram_pattu.jpg",
    accent: "#0E4D40",
    tag: "Atelier Exclusive",
    description: "Lustrous emerald green silk skirt studded with golden mango buttas, contrasting against a rich crimson red brocade blouse."
  },
  {
    id: 'imperial-wine',
    name: "Kalyani Imperial Wine & 24k Zardozi Lehenga",
    edition: "Edition 03 • Imperial Bridal",
    image: "/images/imperial_wine_zardozi_bridal_lehenga.jpg",
    fallbackImage: "/images/imperial_wine_zardozi_bridal_lehenga.jpg",
    accent: "#5C1A2E",
    tag: "Imperial Bridal Masterwork",
    description: "Deep imperial wine silk lehenga lavishly embellished with all-over intricate gold floral zardozi jaal and a heavy woven temple border."
  },
  {
    id: 'antique-rose',
    name: "Meera Antique Rose & Ivory Tissue Set",
    edition: "Edition 04 • Artisanal Pastel",
    image: "/images/antique_rose_ivory_tissue_drape.png",
    fallbackImage: "/images/antique_rose_ivory_tissue_drape.png",
    accent: "#B76E79",
    tag: "Pastel Couture",
    description: "Ethereal ivory checked chanderi silk lehenga accompanied by a romantic dusty rose tissue dhavani and antique matte gold zari border."
  },
  {
    id: 'rani-pink',
    name: "Rukmini Rani Pink & Ivory Brocade Pavadai",
    edition: "Edition 05 • Festive Classics",
    image: "/images/rani_pink_ivory_chanderi_pavadai.jpg",
    fallbackImage: "/images/rani_pink_ivory_chanderi_pavadai.jpg",
    accent: "#C2185B",
    tag: "Festive Temple Classic",
    description: "Pristine ivory checked flared lehenga with vibrant magenta floral buttas and a wide dual-tone gold & rani pink temple border."
  }
];

export const Hero = () => {
  const { openAppointmentModal, setActiveGlobalGown } = useShop();
  const [activeGownIndex, setActiveGownIndex] = useState(0);
  const activeGown = ANTI_GRAVITY_SERIES[activeGownIndex];

  const sectionRef = useRef(null);
  const bgImageRef = useRef(null);
  const textContentRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // 1. Initial Load Entry Animation for text only (never hide background image)
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.fromTo(
      headlineRef.current,
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" }
    )
      .fromTo(
        subtextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9 },
        "-=0.7"
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9 },
        "-=0.6"
      );

    // 2. ScrollTrigger: ONLY soften opacity & scale when user actually scrolls DOWN
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      if (bgImageRef.current && sectionRef.current) {
        gsap.fromTo(
          bgImageRef.current,
          { scale: 1, opacity: 1 },
          {
            scale: 1.08,
            opacity: 0.35,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=100%",
              scrub: 0.6,
              invalidateOnRefresh: true
            }
          }
        );
      }

      if (textContentRef.current && sectionRef.current) {
        gsap.to(textContentRef.current, {
          y: -90,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=100%",
            scrub: 0.8,
            invalidateOnRefresh: true
          }
        });
      }
    });

    return () => {
      tl.kill();
      mm.revert();
    };
  }, [activeGownIndex]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        paddingTop: '115px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        background: '#FDFBF7'
      }}
    >
      {/* 
        =======================================================================
        HERO FLOATING GOWN CONTAINER (Guaranteed Visible at 100% Opacity on Load)
        FUTURE 3D THREE.JS CANVAS SWAP-IN POINT:
        To replace this <img> with a real-time WebGL Three.js cloth simulation,
        mount <Canvas><GownModel /></Canvas> inside this container.
        =======================================================================
      */}
      <div
        ref={bgImageRef}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          willChange: 'transform, opacity',
          opacity: 1
        }}
      >
        {/* Ambient Extended Background for seamless edge immersion */}
        <div
          style={{
            position: 'absolute',
            inset: '-20px',
            backgroundImage: `url('${activeGown.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(35px) brightness(0.95)',
            opacity: 0.55
          }}
        />

        {/* Sharp Full-Size High Quality Foreground Image */}
        <img
          key={activeGown.image}
          src={activeGown.image}
          alt={activeGown.name}
          className="floating-gown-motion"
          fetchPriority="high"
          decoding="async"
          onError={(e) => {
            e.currentTarget.src = activeGown.fallbackImage || '/images/gown_burgundy.jpg';
          }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'right center',
            display: 'block',
            filter: 'contrast(1.08) brightness(1.03) saturate(1.08)',
            imageRendering: '-webkit-optimize-contrast'
          }}
        />

        {/* Gentle Left Feather for Headline Legibility */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(253,251,247,0.88) 0%, rgba(253,251,247,0.45) 32%, transparent 60%, transparent 100%)',
            pointerEvents: 'none'
          }}
        />
        
        {/* Soft bottom edge transition */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '120px',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(253,251,247,0.9) 100%)',
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Atmospheric Soft Warm Champagne Light Ray Orb */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: '520px',
          height: '520px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,122,0.22) 0%, rgba(253,251,247,0) 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      {/* Main Hero Content (Parallax Offset on Scroll) */}
      <div
        ref={textContentRef}
        className="container-couture"
        style={{ position: 'relative', zIndex: 10, margin: 'auto 0' }}
      >
        <div style={{ maxWidth: '820px' }}>
          
          {/* Main Title */}
          <h1
            ref={headlineRef}
            style={{
              fontSize: 'clamp(2.8rem, 6.2vw, 5.4rem)',
              lineHeight: 1.05,
              fontWeight: 500,
              marginBottom: '18px',
              letterSpacing: '0.01em',
              color: 'var(--color-primary-burgundy)'
            }}
          >
            South Indian Elegance <br />
            <span style={{ color: 'var(--color-champagne-gold)', fontStyle: 'italic', fontFamily: 'var(--font-serif-editorial)' }}>
              Weightless in Pure Heritage
            </span>
          </h1>

          {/* Editorial Subtitle */}
          <p
            ref={subtextRef}
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.22rem)',
              color: 'var(--color-text-charcoal)',
              lineHeight: 1.7,
              fontWeight: 400,
              maxWidth: '640px',
              marginBottom: '38px'
            }}
          >
            {activeGown.description} Designed for royal muhurthams and fitted privately across our Kerala salons in Kochi, Thiruvananthapuram, Kozhikode, and Thrissur.
          </p>

          {/* Call to Actions */}
          <div
            ref={ctaRef}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              alignItems: 'center'
            }}
          >
            <button
              onClick={() => scrollTo('couture-gallery')}
              className="btn-gold"
              style={{ padding: '16px 34px', fontSize: '0.84rem' }}
            >
              <span>Explore 3-Card Showcase</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => scrollTo('collections')}
              className="btn-outline-gold"
              style={{ padding: '15px 30px', fontSize: '0.84rem' }}
            >
              <Sparkles size={16} style={{ color: 'var(--color-champagne-gold)' }} />
              <span>Couture Catalog</span>
            </button>

            <button
              onClick={() => openAppointmentModal()}
              className="btn-ghost"
              style={{ padding: '15px 22px', fontSize: '0.8rem' }}
            >
              <Calendar size={16} style={{ color: 'var(--color-champagne-gold)' }} />
              <span>Book Salon Fitting</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '24px',
              marginTop: '46px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(212, 175, 122, 0.25)'
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-serif-editorial)', fontSize: '2rem', color: 'var(--color-primary-burgundy)', fontWeight: 600 }}>
                150+ hrs
              </div>
              <div style={{ fontSize: '0.74rem', letterSpacing: '0.12em', color: 'var(--color-muted-text)', textTransform: 'uppercase' }}>
                Handloom Craft Per Piece
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-serif-editorial)', fontSize: '2rem', color: 'var(--color-primary-burgundy)', fontWeight: 600 }}>
                100% Pure
              </div>
              <div style={{ fontSize: '0.74rem', letterSpacing: '0.12em', color: 'var(--color-muted-text)', textTransform: 'uppercase' }}>
                Mulberry Silk & 24k Zari
              </div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-serif-editorial)', fontSize: '2rem', color: 'var(--color-primary-burgundy)', fontWeight: 600 }}>
                Kerala Salons
              </div>
              <div style={{ fontSize: '0.74rem', letterSpacing: '0.12em', color: 'var(--color-muted-text)', textTransform: 'uppercase' }}>
                Kochi • Trivandrum • Kozhikode • Thrissur
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Fashion Runway Live Ticker */}
      <div className="marquee-container" style={{ position: 'relative', zIndex: 10, marginTop: '40px' }}>
        <div className="marquee-content" style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.76rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--color-primary-burgundy)', fontWeight: 700 }}>
            ✦ COUTURE: {activeGown.name.toUpperCase()}
          </span>
          <span style={{ fontSize: '0.76rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--color-muted-text)' }}>
            • AS FEATURED IN VOGUE & HARPER'S BAZAAR
          </span>
          <span style={{ fontSize: '0.76rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--color-primary-burgundy)', fontWeight: 700 }}>
            ✦ 100% PURE KANCHIPURAM SILK & 24K ZARI
          </span>
          <span style={{ fontSize: '0.76rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--color-muted-text)' }}>
            • BESPOKE PRIVATE FITTINGS BY INVITATION & SALON APPOINTMENT
          </span>
          <span style={{ fontSize: '0.76rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--color-primary-burgundy)', fontWeight: 700 }}>
            ✦ CANNES FILM FESTIVAL CELEBRITY ATELIER COMMISSIONS
          </span>
          <span style={{ fontSize: '0.76rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--color-muted-text)' }}>
            • GLOBAL CONCIERGE EXPRESS COURIER DELIVERY
          </span>
          {/* Duplicate for infinite seamless scroll */}
          <span style={{ fontSize: '0.76rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--color-primary-burgundy)', fontWeight: 700 }}>
            ✦ COUTURE: {activeGown.name.toUpperCase()}
          </span>
          <span style={{ fontSize: '0.76rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--color-muted-text)' }}>
            • AS FEATURED IN VOGUE & HARPER'S BAZAAR
          </span>
        </div>
      </div>
    </section>
  );
};
