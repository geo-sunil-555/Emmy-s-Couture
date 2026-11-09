import React from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Scale,
  Sparkles,
  ShoppingBag,
  Trash2,
  Plus,
  Clock,
  Award,
  MapPin,
  Eye
} from 'lucide-react';

export const ProductCompareDrawer = () => {
  const {
    isCompareOpen,
    setIsCompareOpen,
    compareList,
    toggleCompareProduct,
    clearCompareList,
    products,
    formatPrice,
    addToCart,
    openVirtualTryOn,
    setQuickViewProduct,
    triggerHaptic
  } = useShop();

  if (!isCompareOpen) return null;

  const comparedProducts = compareList
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  const suggestedAdditions = products
    .filter((p) => !compareList.includes(p.id))
    .slice(0, 6);

  return (
    <div className="modal-overlay" onClick={() => setIsCompareOpen(false)}>
      <div
        className="a17-liquid-glass a17-spring-pop"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '1120px',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: '24px',
          background: 'rgba(253, 251, 247, 0.97)',
          border: '1px solid rgba(212, 175, 122, 0.5)',
          boxShadow: '0 28px 75px rgba(45, 10, 22, 0.25)',
          padding: 0
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '18px 26px',
            background: 'linear-gradient(90deg, #5C1A2E 0%, #380D1B 100%)',
            color: '#FDFBF7',
            borderBottom: '1px solid rgba(212, 175, 122, 0.35)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <Scale size={18} style={{ color: '#D4AF7A' }} />
            <h3 style={{ color: '#FDFBF7', fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>
              Couture Side-by-Side Comparison Studio ({comparedProducts.length}/3)
            </h3>
            <span
              style={{
                fontSize: '0.64rem',
                background: 'rgba(212, 175, 122, 0.2)',
                border: '1px solid rgba(212, 175, 122, 0.5)',
                color: '#D4AF7A',
                padding: '2px 9px',
                borderRadius: '999px',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 700
              }}
            >
              Android 17 Multi-Pane View
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {comparedProducts.length > 0 && (
              <button
                onClick={clearCompareList}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(212, 175, 122, 0.35)',
                  color: '#FDFBF7',
                  borderRadius: '999px',
                  padding: '6px 12px',
                  fontSize: '0.7rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <Trash2 size={12} /> Clear All
              </button>
            )}
            <button
              onClick={() => setIsCompareOpen(false)}
              style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.14)',
                border: '1px solid rgba(212, 175, 122, 0.4)',
                color: '#FDFBF7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '26px' }}>
          {comparedProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <Scale size={36} style={{ color: 'var(--color-champagne-gold)', marginBottom: '12px' }} />
              <h4 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>
                Select Up to 3 Couture Creations to Compare
              </h4>
              <p style={{ fontSize: '0.86rem', color: 'var(--color-muted-text)', maxWidth: '520px', margin: '0 auto 24px auto' }}>
                Compare handloom weaving hours, 24k gold zari purity, temple border craftsmanship, and bespoke pricing side-by-side.
              </p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {suggestedAdditions.slice(0, 3).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => toggleCompareProduct(p.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 16px',
                      borderRadius: '999px',
                      background: '#FFFFFF',
                      border: '1px solid rgba(92, 26, 46, 0.3)',
                      color: 'var(--color-primary-burgundy)',
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    <Plus size={14} /> Add {p.name.split(' ').slice(0, 3).join(' ')}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px'
              }}
            >
              {comparedProducts.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid rgba(212, 175, 122, 0.4)',
                    borderRadius: '18px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 8px 26px rgba(92, 26, 46, 0.06)'
                  }}
                >
                  {/* Image Header */}
                  <div style={{ position: 'relative', height: '240px', background: '#F8F4ED' }}>
                    <img
                      src={item.images?.primary || item.image}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                    />
                    <button
                      onClick={() => toggleCompareProduct(item.id)}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        width: '30px',
                        height: '30px',
                        borderRadius: '50%',
                        background: 'rgba(26, 10, 16, 0.78)',
                        color: '#FDFBF7',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title="Remove from comparison"
                    >
                      <X size={14} />
                    </button>
                    <span
                      className="badge-gold"
                      style={{ position: 'absolute', bottom: '10px', left: '10px', borderRadius: '999px' }}
                    >
                      {item.collection}
                    </span>
                  </div>

                  {/* Specs Table */}
                  <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                    <div>
                      <h4 style={{ fontSize: '1.08rem', fontWeight: 600, marginBottom: '4px' }}>
                        {item.name}
                      </h4>
                      <div style={{ fontFamily: 'var(--font-serif-primary)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-primary-burgundy)' }}>
                        {formatPrice(item.priceUSD)}
                      </div>
                    </div>

                    <div style={{ fontSize: '0.76rem', borderTop: '1px solid rgba(212,175,122,0.25)', paddingTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div>
                        <span style={{ color: 'var(--color-muted-text)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={12} style={{ color: '#D4AF7A' }} /> Atelier Loom Hours:
                        </span>
                        <div style={{ color: 'var(--color-text-charcoal)', fontWeight: 500, marginTop: '2px' }}>
                          {item.craftsmanship?.atelierHours || '200+ hours master handloom'}
                        </div>
                      </div>

                      <div>
                        <span style={{ color: 'var(--color-muted-text)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Award size={12} style={{ color: '#D4AF7A' }} /> Silk & Zari Purity:
                        </span>
                        <div style={{ color: 'var(--color-text-charcoal)', fontWeight: 500, marginTop: '2px' }}>
                          {item.craftsmanship?.materials || '100% Pure Mulberry Silk & 24k Zari'}
                        </div>
                      </div>

                      <div>
                        <span style={{ color: 'var(--color-muted-text)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Sparkles size={12} style={{ color: '#D4AF7A' }} /> Surface Craft:
                        </span>
                        <div style={{ color: 'var(--color-text-charcoal)', fontWeight: 500, marginTop: '2px' }}>
                          {item.craftsmanship?.embellishment || 'Traditional temple korvai & zardozi'}
                        </div>
                      </div>

                      <div>
                        <span style={{ color: 'var(--color-muted-text)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <MapPin size={12} style={{ color: '#D4AF7A' }} /> Origin Cluster:
                        </span>
                        <div style={{ color: 'var(--color-text-charcoal)', fontWeight: 500, marginTop: '2px' }}>
                          {item.craftsmanship?.origin || 'Kerala Flagship Atelier'}
                        </div>
                      </div>
                    </div>

                    {/* Action Row */}
                    <div style={{ marginTop: 'auto', paddingTop: '12px', display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => {
                          setIsCompareOpen(false);
                          openVirtualTryOn(item);
                        }}
                        style={{
                          flex: 1,
                          padding: '9px 10px',
                          borderRadius: '999px',
                          background: 'rgba(92, 26, 46, 0.08)',
                          border: '1px solid rgba(92, 26, 46, 0.3)',
                          color: 'var(--color-primary-burgundy)',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '5px'
                        }}
                      >
                        <Sparkles size={12} /> AI Drape
                      </button>

                      <button
                        onClick={() => {
                          triggerHaptic(15);
                          addToCart(item);
                          setIsCompareOpen(false);
                        }}
                        className="btn-gold"
                        style={{
                          flex: 1,
                          padding: '9px 10px',
                          borderRadius: '999px',
                          fontSize: '0.7rem'
                        }}
                      >
                        <ShoppingBag size={12} /> Add to Bag
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Empty Slot Add Card if < 3 */}
              {comparedProducts.length < 3 && (
                <div
                  style={{
                    border: '2px dashed rgba(212, 175, 122, 0.5)',
                    borderRadius: '18px',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    background: 'rgba(255, 255, 255, 0.5)',
                    minHeight: '320px'
                  }}
                >
                  <Plus size={28} style={{ color: 'var(--color-primary-burgundy)', marginBottom: '10px' }} />
                  <div style={{ fontSize: '0.92rem', fontWeight: 600, marginBottom: '6px' }}>
                    Add Another Creation ({3 - comparedProducts.length} slot{3 - comparedProducts.length > 1 ? 's' : ''} open)
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)', marginBottom: '16px' }}>
                    Quick-add a masterpiece below to compare specifications:
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                    {suggestedAdditions.slice(0, 3).map((p) => (
                      <button
                        key={p.id}
                        onClick={() => toggleCompareProduct(p.id)}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '999px',
                          background: '#FFFFFF',
                          border: '1px solid rgba(92, 26, 46, 0.25)',
                          color: 'var(--color-primary-burgundy)',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          textAlign: 'left',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }}>
                          + {p.name}
                        </span>
                        <span style={{ color: '#887B72' }}>{formatPrice(p.priceUSD)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

