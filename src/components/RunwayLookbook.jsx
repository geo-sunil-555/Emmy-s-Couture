import React, { useState, useMemo } from 'react';
import { LOOKBOOK_LOOKS } from '../data/lookbook';
import { useShop } from '../context/ShopContext';
import { Sparkles, Eye, ShoppingBag, ChevronLeft, ChevronRight, Ticket } from 'lucide-react';

export const RunwayLookbook = () => {
  const { 
    products, 
    formatPrice, 
    setQuickViewProduct,
    currentUser,
    runwayInvitedEmails,
    setIsInboxOpen,
    applyPromo,
    setIsCartOpen
  } = useShop();
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState(null);

  // Dynamically merge base lookbook with all live products (including admin-added dresses)
  const allRunwayLooks = useMemo(() => {
    // 1. Process base looks from LOOKBOOK_LOOKS only if the product is still active in products
    const enrichedBase = LOOKBOOK_LOOKS
      .filter((look) => {
        const targetProdId = look.hotspots?.[0]?.productId;
        // If look corresponds to a product ID, only include it if product is active and not deleted
        return !targetProdId || products.some((p) => p.id === targetProdId);
      })
      .map((look) => {
        const targetProdId = look.hotspots?.[0]?.productId;
        const matchedProd = products.find((p) => p.id === targetProdId);
        if (matchedProd) {
          return {
            ...look,
            image: matchedProd.images?.primary || matchedProd.image || look.image,
            hotspots: look.hotspots.map((spot) => ({
              ...spot,
              priceUSD: Number(matchedProd.priceINR || matchedProd.priceUSD || spot.priceUSD),
              productName: matchedProd.name || spot.productName
            }))
          };
        }
        return look;
      });

    // 2. Identify all products not explicitly in base look hotspots
    const existingProductIds = new Set(
      enrichedBase.flatMap((l) => l.hotspots?.map((h) => h.productId) || [])
    );

    // 3. Automatically turn every admin-added or extra product into a Runway Look!
    const dynamicAdminLooks = products
      .filter((p) => !existingProductIds.has(p.id))
      .map((p, idx) => ({
        id: `look-dyn-${p.id}`,
        title: `Look ${enrichedBase.length + idx + 1}: ${p.name}`,
        season: p.collection || "Kerala Festive Heritage",
        location: p.craftsmanship?.origin || "Atelier Emmy's Kerala Salon",
        image: p.images?.primary || p.image || '/images/royal_navy_ivory_half_saree.jpg',
        captionTitle: p.tag || "Atelier Runway Creation.",
        caption: p.shortDesc || p.description || `${p.name} handcrafted by master karigars with gold zari.`,
        artisanHours: p.craftsmanship?.atelierHours || "195 Atelier Hours",
        weave: p.craftsmanship?.materials || "Pure Handloom Mulberry Silk & Zari",
        stylingTip: `Style with heritage temple ornaments and bespoke footwear for ${p.collection || "Maison Emmy's"}.`,
        heritageNote: p.craftsmanship?.embellishment || "Handcrafted with artisanal needlework & korvai weaving.",
        hotspots: [
          {
            id: `spot-${p.id}`,
            x: 50,
            y: 48,
            title: p.name,
            detail: p.shortDesc || p.description || "Fine bespoke tailoring & master craftsmanship.",
            productId: p.id,
            productName: p.name,
            priceUSD: Number(p.priceINR || p.priceUSD || 15000)
          }
        ]
      }));

    return [...enrichedBase, ...dynamicAdminLooks];
  }, [products]);

  // Safe active look fallback
  const safeIndex = activeLookIndex < allRunwayLooks.length ? activeLookIndex : 0;
  const currentLook = allRunwayLooks[safeIndex] || allRunwayLooks[0];

  const handleNext = () => {
    setActiveHotspot(null);
    setActiveLookIndex((prev) => (prev + 1) % allRunwayLooks.length);
  };

  const handlePrev = () => {
    setActiveHotspot(null);
    setActiveLookIndex((prev) => (prev - 1 + allRunwayLooks.length) % allRunwayLooks.length);
  };

  const openProduct = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setQuickViewProduct(product);
    }
  };

  return (
    <section id="lookbook" className="section-padding" style={{ background: '#F8F3EC', position: 'relative' }}>
      <div className="container-couture">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 48px auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--bronze-highlight)',
              fontSize: '0.74rem',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              fontWeight: 700,
              marginBottom: '12px'
            }}
          >
            <Sparkles size={14} />
            <span>Interactive Fashion Editorial</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4.4vw, 3.4rem)',
              lineHeight: 1.15,
              marginBottom: '16px',
              color: 'var(--color-primary-text)'
            }}
          >
            Shop The Runway <br />
            <span style={{ color: 'var(--bronze-highlight)', fontStyle: 'italic', fontFamily: 'var(--font-serif-editorial)' }}>
              Editorial Lookbook
            </span>
          </h2>

          <p style={{ color: 'var(--color-muted-text)', fontSize: '0.96rem', lineHeight: 1.7 }}>
            Tap the illuminated gold pins on our Emmy's Couture runway captures to explore artisanal construction details and shop direct from the catwalk.
          </p>
        </div>

        {/* Runway Invitation Patron Ribbon */}
        {((currentUser?.email && runwayInvitedEmails.includes(currentUser.email.toLowerCase())) || currentUser?.hasRunwayInvitation) && (
          <div
            style={{
              maxWidth: '820px',
              margin: '0 auto 36px auto',
              background: 'linear-gradient(135deg, #2A0914 0%, #4A1222 100%)',
              border: '1px solid #D4AF7A',
              borderRadius: '4px',
              padding: '16px 22px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '14px',
              boxShadow: '0 8px 24px rgba(74, 18, 34, 0.25)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(212, 175, 122, 0.2)', border: '1px solid #D4AF7A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4AF7A', flexShrink: 0 }}>
                <Ticket size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#D4AF7A', fontWeight: 800 }}>
                  Official Front-Row Runway Pass Active
                </div>
                <div style={{ fontSize: '0.92rem', color: '#FAF7F2', fontWeight: 600 }}>
                  Welcome {currentUser.name}! 15% Runway Offer unlocked (Code: <strong style={{ color: '#D4AF7A', fontFamily: 'monospace' }}>RUNWAY15</strong>)
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => {
                  applyPromo('RUNWAY15');
                  setIsCartOpen(true);
                }}
                style={{
                  background: 'linear-gradient(135deg, #D4AF7A 0%, #AA7C39 100%)',
                  color: '#1A1A1A',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '2px',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer'
                }}
              >
                Apply 15% Code
              </button>
              <button
                onClick={() => setIsInboxOpen(true)}
                style={{
                  background: 'transparent',
                  color: '#FAF7F2',
                  border: '1px solid rgba(212, 175, 122, 0.5)',
                  padding: '8px 14px',
                  borderRadius: '2px',
                  fontSize: '0.74rem',
                  cursor: 'pointer'
                }}
              >
                View Letter
              </button>
            </div>
          </div>
        )}

        {/* Lookbook Stage */}
        <div
          className="glass-panel"
          style={{
            position: 'relative',
            borderRadius: '2px',
            overflow: 'hidden',
            border: '1px solid rgba(139, 115, 85, 0.25)',
            boxShadow: 'var(--shadow-card)',
            background: '#FFFFFF'
          }}
        >
          {/* Main Runway Editorial Canvas */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '650px',
              height: '82vh',
              maxHeight: '850px',
              background: '#120B0E',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden'
            }}
            onClick={() => setActiveHotspot(null)}
          >
            {/* Ambient Blurred Background for immersive atmosphere */}
            <div
              style={{
                position: 'absolute',
                inset: '-30px',
                backgroundImage: `url(${currentLook?.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(35px) brightness(0.35)',
                opacity: 0.85,
                transform: 'scale(1.15)',
                pointerEvents: 'none'
              }}
            />

            {/* Sharp Full-Size Fit Foreground Image (Uncropped Head-to-Toe) */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img
                src={currentLook?.image}
                alt={currentLook?.title}
                style={{
                  height: '100%',
                  width: 'auto',
                  maxWidth: '100%',
                  objectFit: 'contain',
                  objectPosition: 'center center',
                  filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.6))',
                  zIndex: 2
                }}
              />

              {/* Interactive Pulsing Hotspot */}
              {currentLook?.hotspots?.map((spot) => {
                const isSelected = activeHotspot?.id === spot.id;
                return (
                  <div
                    key={spot.id}
                    style={{
                      position: 'absolute',
                      left: `${spot.x}%`,
                      top: `${spot.y}%`,
                      zIndex: 10
                    }}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveHotspot(isSelected ? null : spot);
                      }}
                      className="hotspot-pin"
                      aria-label={`Hotspot: ${spot.title}`}
                    >
                      <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1A1A1A' }}>✦</span>
                    </button>

                  {/* Hotspot Floating Tooltip Popup Card */}
                  {isSelected && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        position: 'absolute',
                        bottom: '40px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '280px',
                        background: '#FFFFFF',
                        border: '1px solid rgba(139, 115, 85, 0.3)',
                        borderRadius: '2px',
                        padding: '16px',
                        boxShadow: '0 10px 30px rgba(26, 26, 26, 0.2)',
                        zIndex: 100,
                        animation: 'fadeIn 0.25s ease'
                      }}
                    >
                      <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--bronze-highlight)', fontWeight: 600, marginBottom: '4px' }}>
                        Runway Hotspot
                      </div>
                      <div style={{ fontFamily: 'var(--font-serif-primary)', fontSize: '1.05rem', color: 'var(--color-primary-text)', fontWeight: 600, marginBottom: '6px' }}>
                        {spot.title}
                      </div>
                      <p style={{ fontSize: '0.76rem', color: 'var(--color-muted-text)', marginBottom: '10px', lineHeight: 1.45 }}>
                        {spot.detail}
                      </p>
                      <div style={{ fontSize: '0.92rem', color: 'var(--color-primary-text)', fontWeight: 700, marginBottom: '12px' }}>
                        {formatPrice(spot.priceUSD)}
                      </div>

                      <button
                        onClick={() => openProduct(spot.productId)}
                        className="btn-gold"
                        style={{ width: '100%', padding: '8px 12px', fontSize: '0.72rem' }}
                      >
                        <Eye size={13} />
                        <span>View Piece & Sizing</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
            </div>

            {/* Editorial Caption Bar (Bottom Left) */}
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                maxWidth: '520px',
                zIndex: 20,
                background: 'rgba(26, 12, 17, 0.82)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(212, 175, 122, 0.4)',
                padding: '20px 24px',
                borderRadius: '2px',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.4)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                <span
                  style={{
                    background: 'var(--color-champagne-gold)',
                    color: '#1A1A1A',
                    padding: '3px 9px',
                    fontSize: '0.66rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    borderRadius: '1px'
                  }}
                >
                  {currentLook?.season}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#D4AF7A', fontWeight: 600 }}>
                  📍 {currentLook?.location}
                </span>
                <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.6)', marginLeft: 'auto' }}>
                  Look {safeIndex + 1} of {allRunwayLooks.length}
                </span>
              </div>

              <h3 style={{ fontSize: '1.32rem', color: '#FAF7F2', fontWeight: 600, marginBottom: '6px', lineHeight: 1.25 }}>
                {currentLook?.title}
              </h3>
              
              <p style={{ fontSize: '0.84rem', color: '#E8E4DF', lineHeight: 1.5, marginBottom: '12px' }}>
                {currentLook?.caption}
              </p>

              {/* Craftsmanship & Weave Chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                {currentLook?.artisanHours && (
                  <span style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(212,175,122,0.3)', padding: '2px 8px', fontSize: '0.68rem', color: '#FDFBF7', borderRadius: '1px' }}>
                    ⏳ {currentLook.artisanHours}
                  </span>
                )}
                {currentLook?.weave && (
                  <span style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(212,175,122,0.3)', padding: '2px 8px', fontSize: '0.68rem', color: '#FDFBF7', borderRadius: '1px' }}>
                    🧵 {currentLook.weave}
                  </span>
                )}
              </div>

              {/* Styling & Heritage Writings */}
              {currentLook?.stylingTip && (
                <div style={{ fontSize: '0.76rem', color: '#D4AF7A', lineHeight: 1.45, borderTop: '1px solid rgba(212,175,122,0.2)', paddingTop: '8px' }}>
                  <strong style={{ color: '#FAF7F2' }}>Styling Advisory:</strong> {currentLook.stylingTip}
                </div>
              )}
            </div>

            {/* Navigation Arrows */}
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                right: '24px',
                display: 'flex',
                gap: '10px',
                zIndex: 20
              }}
            >
              <button
                onClick={handlePrev}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '1px',
                  background: 'rgba(255, 255, 255, 0.92)',
                  border: '1px solid rgba(139, 115, 85, 0.3)',
                  color: 'var(--color-primary-text)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(26, 26, 26, 0.1)',
                  transition: 'var(--transition-smooth)'
                }}
                aria-label="Previous Runway Look"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={handleNext}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '1px',
                  background: 'rgba(255, 255, 255, 0.92)',
                  border: '1px solid rgba(139, 115, 85, 0.3)',
                  color: 'var(--color-primary-text)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(26, 26, 26, 0.1)',
                  transition: 'var(--transition-smooth)'
                }}
                aria-label="Next Runway Look"
              >
                <ChevronRight size={20} />
              </button>
            </div>

          </div>

          {/* Lookbook Horizontal Thumbnail Selector Strip */}
          <div
            style={{
              padding: '16px 20px',
              background: '#FAF7F2',
              borderTop: '1px solid rgba(139, 115, 85, 0.15)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              overflowX: 'auto',
              scrollbarWidth: 'thin'
            }}
          >
            <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-primary-burgundy)', whiteSpace: 'nowrap', marginRight: '6px' }}>
              Runway Looks ({allRunwayLooks.length}):
            </div>
            {allRunwayLooks.map((lk, idx) => {
              const isActive = idx === safeIndex;
              return (
                <button
                  key={lk.id}
                  onClick={() => {
                    setActiveHotspot(null);
                    setActiveLookIndex(idx);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 12px 6px 6px',
                    background: isActive ? '#5C1A2E' : '#FFFFFF',
                    color: isActive ? '#FDFBF7' : '#2B2B2B',
                    border: isActive ? '1px solid #D4AF7A' : '1px solid rgba(139, 115, 85, 0.25)',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    fontSize: '0.75rem',
                    fontWeight: isActive ? 600 : 500,
                    transition: 'all 0.2s ease',
                    flexShrink: 0
                  }}
                >
                  <img
                    src={lk.image}
                    alt={lk.title}
                    style={{
                      width: '28px',
                      height: '36px',
                      objectFit: 'cover',
                      objectPosition: 'top center',
                      borderRadius: '1px',
                      border: '1px solid rgba(212, 175, 122, 0.4)'
                    }}
                  />
                  <span>Look {idx + 1}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
