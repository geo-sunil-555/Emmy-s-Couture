import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowRight, Layers, Eye } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

gsap.registerPlugin(ScrollTrigger);

// Core visual assets configured for easy swapping
const GALLERY_CARDS = [
  {
    id: 'ec-005',
    title: 'Rukmini Rani Pink & Ivory Brocade Pavadai',
    edition: 'Edition 01 • Festive Classics',
    image: '/images/rani_pink_ivory_chanderi_pavadai.jpg',
    fallbackImage: '/images/rani_pink_ivory_chanderi_pavadai.jpg',
    description: 'Pristine ivory checked flared lehenga with vibrant magenta floral buttas and a wide dual-tone gold & rani pink temple border.',
    price: '₹6,500',
    tag: 'Festive Classic'
  },
  {
    id: 'ec-006',
    title: 'Avantika Fuchsia Brocade Crop Lehenga',
    edition: 'Edition 02 • Modern Brocade',
    image: '/images/fuchsia_brocade_crop_lehenga.jpg',
    fallbackImage: '/images/fuchsia_brocade_crop_lehenga.jpg',
    description: 'Radiant fuchsia magenta pure silk brocade flared lehenga paired with a structured sweetheart-neckline bustier crop top in all-over gold motifs.',
    price: '₹8,900',
    tag: 'Modern Brocade'
  },
  {
    id: 'ec-003',
    title: 'Meera Antique Rose & Ivory Tissue Set',
    edition: 'Edition 03 • Artisanal Pastel',
    image: '/images/antique_rose_ivory_tissue_drape.png',
    fallbackImage: '/images/antique_rose_ivory_tissue_drape.png',
    description: 'Ethereal ivory checked chanderi silk lehenga accompanied by a romantic dusty rose tissue dhavani and antique matte gold zari border.',
    price: '₹11,500',
    tag: 'Pastel Couture'
  },
  {
    id: 'ec-001',
    title: 'Aadrika Midnight & Ivory Royal Half Saree',
    edition: 'Edition 04 • Royal Heritage',
    image: '/images/royal_navy_ivory_half_saree.jpg',
    fallbackImage: '/images/royal_navy_ivory_half_saree.jpg',
    description: 'Hand-pleated ivory mulberry silk lehenga paired with a regal midnight navy blue dhavani and antique gold temple arch korvai borders.',
    price: '₹14,800',
    tag: 'Heritage Masterpiece'
  },
  {
    id: 'ec-007',
    title: 'Samyukta Rose Blush & Zari Bridal Lehenga',
    edition: 'Edition 05 • Rose Gold Bridal',
    image: '/images/rose_blush_banarasi_tissue_lehenga.png',
    fallbackImage: '/images/rose_blush_banarasi_tissue_lehenga.png',
    description: 'Dusty rose pink silk brocade lehenga with fine diamond geometric jaal, paired with a sculpted choli and draped tissue organza dupatta.',
    price: '₹16,500',
    tag: 'Rose Gold Bridal'
  },
  {
    id: 'ec-002',
    title: 'Devayani Emerald & Crimson Temple Pattu',
    edition: 'Edition 06 • Muhurtham Bridal',
    image: '/images/emerald_crimson_kanchipuram_pattu.jpg',
    fallbackImage: '/images/emerald_crimson_kanchipuram_pattu.jpg',
    description: 'Lustrous emerald green silk skirt studded with golden mango buttas, contrasting against a rich crimson red brocade blouse.',
    price: '₹18,200',
    tag: 'Muhurtham Bridal'
  },
  {
    id: 'ec-004',
    title: 'Kalyani Imperial Wine & 24k Zardozi Lehenga',
    edition: 'Edition 07 • Imperial Bridal',
    image: '/images/imperial_wine_zardozi_bridal_lehenga.jpg',
    fallbackImage: '/images/imperial_wine_zardozi_bridal_lehenga.jpg',
    description: 'Deep imperial wine silk lehenga lavishly embellished with all-over intricate gold floral zardozi jaal and a heavy woven temple border.',
    price: '₹19,800',
    tag: 'Imperial Masterwork'
  }
];

export const HorizontalCollectionGallery = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const cardsRef = useRef([]);
  const { products, setQuickViewProduct } = useShop();

  const displayCards = React.useMemo(() => {
    return GALLERY_CARDS.filter((card) => products.some((p) => p.id === card.id));
  }, [products]);

  useEffect(() => {
    // Only apply horizontal scroll-jacking on desktop devices (width >= 1024px)
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current;
      if (!track) return;

      const totalScroll = track.scrollWidth - window.innerWidth + 120;

      const horizontalTween = gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${totalScroll + 300}`,
          invalidateOnRefresh: true
        }
      });

      // Scale and glow animations for each card as it centers
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { scale: 0.95, opacity: 0.85, boxShadow: "0 10px 30px rgba(92, 26, 46, 0.06)" },
          {
            scale: 1.02,
            opacity: 1,
            boxShadow: "0 25px 60px rgba(212, 175, 122, 0.35), 0 0 1px #D4AF7A",
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              start: "left center",
              end: "right center",
              scrub: true
            }
          }
        );
      });

      return () => {
        horizontalTween.kill();
      };
    });

    // Mobile fallback: clean vertical fade-ins
    mm.add("(max-width: 1023px)", () => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        });
      });
    });

    return () => mm.revert();
  }, []);

  const handleCardClick = (card) => {
    // Find matching product in products array to open full detail view
    const product = products.find((p) => p.id === card.id);
    if (product) {
      setQuickViewProduct(product);
    } else {
      setQuickViewProduct({
        id: card.id,
        name: card.title,
        collection: card.edition,
        category: 'half-sarees',
        tag: card.tag,
        priceUSD: parseInt(card.price.replace(/[^\d]/g, '')),
        images: {
          primary: card.image,
          secondary: card.fallbackImage || card.image,
          alt: card.title
        },
        shortDesc: card.description,
        description: card.description,
        craftsmanship: {
          atelierHours: "180+ hours of artisan craftsmanship",
          materials: "100% Pure Mulberry Silk & Gold Zari",
          embellishment: "Hand-woven borders & intricate needlework",
          origin: "Atelier Emmy's",
          silhouette: "Couture Garment"
        },
        colors: [{ name: "Signature Couture", hex: "#5C1A2E" }],
        sizes: ["Bespoke Made-to-Measure", "Standard Fitted (S)", "Standard Fitted (M)", "Standard Fitted (L)"]
      });
    }
  };

  return (
    <section
      id="couture-gallery"
      ref={sectionRef}
      style={{
        position: 'relative',
        background: '#FDFBF7',
        overflow: 'hidden',
        borderTop: '1px solid rgba(212, 175, 122, 0.25)',
        borderBottom: '1px solid rgba(212, 175, 122, 0.25)'
      }}
    >
      {/* Section Header */}
      <div className="container-couture" style={{ paddingTop: '80px', paddingBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
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
                marginBottom: '10px'
              }}
            >
              <Layers size={14} style={{ color: 'var(--color-champagne-gold)' }} />
              <span>The Couture Showcase • 3-Card Scroll Gallery</span>
            </div>
            <h2
              style={{
                fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
                lineHeight: 1.15,
                color: 'var(--color-primary-burgundy)',
                fontWeight: 500
              }}
            >
              Weightless Silhouettes <br />
              <span style={{ color: 'var(--color-champagne-gold)', fontStyle: 'italic', fontFamily: 'var(--font-serif-editorial)' }}>
                Suspended in Golden Light
              </span>
            </h2>
          </div>

          <p style={{ color: 'var(--color-muted-text)', fontSize: '0.92rem', maxWidth: '420px', lineHeight: 1.6 }}>
            Scroll through our signature floating couture masterworks. Each bespoke gown is individually tailored with anatomical precision and hand-embroidered gold wire.
          </p>
        </div>
      </div>

      {/* Horizontal Scroll Track Container */}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          paddingBottom: '80px',
          paddingTop: '20px'
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: '40px',
            paddingLeft: 'max(28px, calc((100vw - 1380px) / 2 + 28px))',
            paddingRight: '60px',
            width: 'max-content'
          }}
          className="flex-col lg:flex-row"
        >
          {displayCards.map((card, idx) => (
            <div
              key={card.id}
              ref={(el) => (cardsRef.current[idx] = el)}
              onClick={() => handleCardClick(card)}
              style={{
                width: '100%',
                maxWidth: '480px',
                minWidth: '320px',
                flexShrink: 0,
                background: '#FFFFFF',
                border: '1px solid rgba(212, 175, 122, 0.35)',
                borderRadius: '2px',
                padding: '20px',
                boxShadow: 'var(--shadow-card)',
                cursor: 'pointer',
                transition: 'border-color 0.4s ease, transform 0.4s var(--ease-silk)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-champagne-gold)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212, 175, 122, 0.35)';
              }}
            >
              {/* Image Container with Full-Size Uncropped Display */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '560px',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  background: '#FAF7F2',
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(212, 175, 122, 0.2)'
                }}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = card.fallbackImage;
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center center',
                    transition: 'transform 0.8s var(--ease-silk)',
                    filter: 'contrast(1.04) brightness(1.02)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.04)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />

                {/* Tag Badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    background: 'rgba(253, 251, 247, 0.94)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(212, 175, 122, 0.4)',
                    padding: '4px 10px',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--color-primary-burgundy)',
                    borderRadius: '1px'
                  }}
                >
                  {card.tag}
                </div>

                {/* Interactive Floating Eye Icon Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(card);
                  }}
                  title="View Garment Details"
                  aria-label="View Garment Details"
                  style={{
                    position: 'absolute',
                    bottom: '14px',
                    right: '14px',
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(212, 175, 122, 0.45)',
                    color: 'var(--color-primary-burgundy)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 6px 18px rgba(92, 26, 46, 0.18)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    zIndex: 10
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--color-primary-burgundy)';
                    e.currentTarget.style.color = '#FDFBF7';
                    e.currentTarget.style.transform = 'scale(1.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
                    e.currentTarget.style.color = 'var(--color-primary-burgundy)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <Eye size={19} />
                </button>
              </div>

              {/* Card Meta */}
              <div>
                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.16em', color: 'var(--color-champagne-gold)', fontWeight: 700, marginBottom: '4px' }}>
                  {card.edition}
                </div>
                <h3
                  style={{
                    fontSize: '1.28rem',
                    color: 'var(--color-primary-burgundy)',
                    fontWeight: 600,
                    marginBottom: '8px'
                  }}
                >
                  {card.title}
                </h3>
                <p style={{ fontSize: '0.84rem', color: 'var(--color-text-charcoal)', lineHeight: 1.55, marginBottom: '14px' }}>
                  {card.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(212, 175, 122, 0.2)' }}>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-primary-burgundy)' }}>
                    {card.price}
                  </div>
                  <span style={{ fontSize: '0.74rem', color: 'var(--color-champagne-gold)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>Request Fitting</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
