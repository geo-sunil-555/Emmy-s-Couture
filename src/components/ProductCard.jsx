import React, { memo, useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Heart, Eye, ShoppingBag, Sparkles, Scale, ChevronDown, ArrowRightLeft } from 'lucide-react';

export const ProductCard = memo(({ product }) => {
  const {
    formatPrice,
    addToCart,
    wishlist,
    toggleWishlist,
    setQuickViewProduct,
    compareList,
    toggleCompareProduct,
    setIsCompareOpen,
    openVirtualTryOn,
    setIsHandoffOpen,
    triggerHaptic
  } = useShop();

  const [splitMenuOpen, setSplitMenuOpen] = useState(false);

  const isWishlisted = wishlist.includes(product.id);
  const isCompared = compareList.includes(product.id);
  const isRareExclusive = product.tag === "Runway Exclusive" || product.tag === "Met Gala Highlight";

  return (
    <div
      className="glass-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Image Container with Hover Actions */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '133%', // 3:4 Luxury portrait ratio
          overflow: 'hidden',
          background: '#F8F4ED'
        }}
      >
        <img
          src={product.images?.primary || product.image || "/images/royal_navy_ivory_half_saree.jpg"}
          alt={product.name}
          onError={(e) => {
            e.currentTarget.src = "/images/royal_navy_ivory_half_saree.jpg";
          }}
          loading="lazy"
          decoding="async"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
            transition: 'transform 0.6s var(--ease-couture)'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />

        {/* Top Badges */}
        <div
          style={{
            position: 'absolute',
            top: '14px',
            left: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            zIndex: 10
          }}
        >
          {product.tag && (
            <span
              className={isRareExclusive ? "badge-burgundy" : "badge-gold"}
              style={{ backdropFilter: 'blur(8px)' }}
            >
              {product.tag}
            </span>
          )}
        </div>

        {/* Top Right Action Stack: Wishlist + Compare */}
        <div
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            zIndex: 10
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              triggerHaptic(12);
              toggleWishlist(product.id);
            }}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(139, 115, 85, 0.2)',
              color: isWishlisted ? 'var(--bronze-highlight)' : '#1A1A1A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(26, 26, 26, 0.08)',
              transition: 'var(--transition-smooth)'
            }}
            aria-label="Add to Wishlist"
            title="Save to Wishlist"
          >
            <Heart size={17} fill={isWishlisted ? 'var(--bronze-highlight)' : 'none'} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCompareProduct(product.id);
            }}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: isCompared ? 'var(--color-primary-burgundy)' : 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(139, 115, 85, 0.25)',
              color: isCompared ? '#D4AF7A' : '#1A1A1A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(26, 26, 26, 0.08)',
              transition: 'var(--transition-smooth)'
            }}
            aria-label="Compare Creation"
            title="Compare Side-by-Side"
          >
            <Scale size={16} />
          </button>
        </div>

        {/* Quick View + AI Drape Hover Bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            right: '16px',
            display: 'flex',
            gap: '8px',
            zIndex: 10
          }}
        >
          <button
            onClick={() => {
              triggerHaptic(10);
              setQuickViewProduct(product);
            }}
            className="btn-gold"
            style={{
              flex: 1,
              padding: '10px 12px',
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              background: 'rgba(26, 26, 26, 0.92)',
              backdropFilter: 'blur(10px)',
              color: '#FAF7F2',
              border: '1px solid rgba(212, 175, 122, 0.35)',
              borderRadius: '999px',
              boxShadow: '0 4px 15px rgba(26, 26, 26, 0.2)'
            }}
          >
            <Eye size={14} />
            <span>Explore</span>
          </button>

          <button
            onClick={() => openVirtualTryOn(product)}
            style={{
              padding: '10px 12px',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              background: 'rgba(92, 26, 46, 0.92)',
              backdropFilter: 'blur(10px)',
              color: '#D4AF7A',
              border: '1px solid rgba(212, 175, 122, 0.5)',
              borderRadius: '999px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              boxShadow: '0 4px 15px rgba(92, 26, 46, 0.25)'
            }}
            title="Android 17 Gemini Nano Virtual Silk Drape"
          >
            <Sparkles size={13} />
            <span>AI Drape</span>
          </button>
        </div>
      </div>

      {/* Card Body Info */}
      <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', flex: 1, background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(8px)' }}>
        <div
          style={{
            fontSize: '0.68rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--bronze-highlight)',
            fontWeight: 600,
            marginBottom: '6px'
          }}
        >
          {product.collection}
        </div>

        <h3
          style={{
            fontFamily: 'var(--font-serif-primary)',
            fontSize: '1.15rem',
            fontWeight: 600,
            lineHeight: 1.35,
            color: 'var(--color-primary-text)',
            marginBottom: '8px',
            cursor: 'pointer'
          }}
          onClick={() => setQuickViewProduct(product)}
        >
          {product.name}
        </h3>

        <p
          style={{
            fontSize: '0.82rem',
            color: 'var(--color-muted-text)',
            lineHeight: 1.55,
            marginBottom: '14px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {product.shortDesc}
        </p>

        {/* Color swatches preview */}
        {product.colors && (
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '16px' }}>
            <span style={{ fontSize: '0.68rem', color: 'var(--color-muted-text)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
              Shades:
            </span>
            {product.colors.map((c, i) => (
              <span
                key={i}
                title={c.name}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: c.hex,
                  border: '1px solid rgba(139, 115, 85, 0.3)',
                  display: 'inline-block'
                }}
              />
            ))}
          </div>
        )}

        {/* Bottom Price & Add Action */}
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '14px',
            borderTop: '1px solid rgba(139, 115, 85, 0.15)'
          }}
        >
          <div>
            <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-muted-text)', fontWeight: 600 }}>
              Bespoke Atelier
            </div>
            <div
              style={{
                fontFamily: 'var(--font-serif-primary)',
                fontSize: '1.25rem',
                color: 'var(--color-primary-text)',
                fontWeight: 700
              }}
            >
              {formatPrice(product.priceUSD)}
            </div>
          </div>

          {/* Material 3 Expressive Split Button */}
          <div className="a17-split-btn-group">
            <button
              onClick={() => {
                triggerHaptic(15);
                addToCart(product);
              }}
              className="a17-split-primary"
            >
              <ShoppingBag size={13} />
              <span>Bag</span>
            </button>
            <button
              onClick={() => {
                triggerHaptic(10);
                setSplitMenuOpen((prev) => !prev);
              }}
              className="a17-split-secondary"
              aria-label="More Actions"
              title="Android 17 Expressive Actions"
            >
              <ChevronDown
                size={13}
                style={{
                  transform: splitMenuOpen ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s ease'
                }}
              />
            </button>

            {splitMenuOpen && (
              <div
                className="a17-liquid-glass a17-spring-pop"
                style={{
                  position: 'absolute',
                  bottom: 'calc(100% + 8px)',
                  right: 0,
                  width: '195px',
                  borderRadius: '16px',
                  padding: '6px',
                  zIndex: 45,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px'
                }}
              >
                <button
                  onClick={() => {
                    setSplitMenuOpen(false);
                    openVirtualTryOn(product);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '8px 10px',
                    textAlign: 'left',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    color: 'var(--color-primary-burgundy)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Sparkles size={13} style={{ color: '#B8860B' }} />
                  <span>AI Silk Drape Studio</span>
                </button>

                <button
                  onClick={() => {
                    setSplitMenuOpen(false);
                    toggleCompareProduct(product.id);
                    setIsCompareOpen(true);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '8px 10px',
                    textAlign: 'left',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    color: 'var(--color-text-charcoal)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Scale size={13} style={{ color: 'var(--color-primary-burgundy)' }} />
                  <span>{isCompared ? 'View in Compare' : 'Compare Side-by-Side'}</span>
                </button>

                <button
                  onClick={() => {
                    setSplitMenuOpen(false);
                    setIsHandoffOpen(true);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '8px 10px',
                    textAlign: 'left',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    color: 'var(--color-text-charcoal)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <ArrowRightLeft size={13} style={{ color: 'var(--color-primary-burgundy)' }} />
                  <span>Continue On Device</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
