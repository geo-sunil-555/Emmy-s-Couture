import React, { memo } from 'react';
import { useShop } from '../context/ShopContext';
import { Heart, Eye, ShoppingBag, Sparkles } from 'lucide-react';

export const ProductCard = memo(({ product }) => {
  const {
    formatPrice,
    addToCart,
    wishlist,
    toggleWishlist,
    setQuickViewProduct
  } = useShop();

  const isWishlisted = wishlist.includes(product.id);
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

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
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
            zIndex: 10,
            boxShadow: '0 4px 12px rgba(26, 26, 26, 0.08)',
            transition: 'var(--transition-smooth)'
          }}
          aria-label="Add to Wishlist"
        >
          <Heart size={18} fill={isWishlisted ? 'var(--bronze-highlight)' : 'none'} />
        </button>

        {/* Quick View Hover Button */}
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
            onClick={() => setQuickViewProduct(product)}
            className="btn-gold"
            style={{
              flex: 1,
              padding: '10px 14px',
              fontSize: '0.74rem',
              letterSpacing: '0.14em',
              background: '#1A1A1A',
              color: '#FAF7F2',
              border: '1px solid #1A1A1A',
              boxShadow: '0 4px 15px rgba(26, 26, 26, 0.2)'
            }}
          >
            <Eye size={14} />
            <span>Explore & Sizing</span>
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

          <button
            onClick={() => addToCart(product)}
            className="btn-outline-gold"
            style={{
              padding: '8px 14px',
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              fontWeight: 600
            }}
          >
            <ShoppingBag size={14} />
            <span>Bag</span>
          </button>
        </div>
      </div>
    </div>
  );
});
