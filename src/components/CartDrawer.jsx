import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Gift, 
  Sparkles, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

const PACKAGING_OPTIONS = [
  { id: 'signature-velvet', name: 'Signature Obsidian Velvet & Gold Box', note: 'Complimentary' },
  { id: 'bridal-white', name: 'Bridal Alabaster Chest & Silk Tissue', note: 'Complimentary' },
  { id: 'eco-luxury', name: 'Minimalist Eco-Silk Garment Bag', note: 'Complimentary' }
];

const FRAGRANCE_SAMPLES = [
  "Rose Noir & Aged Oud (Maison Signature)",
  "Fleur d'Oranger & Brut Champagne",
  "Santal Impérial & Amber"
];

export const CartDrawer = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    clearCart,
    updateCartQuantity, 
    cartSubtotalUSD, 
    discountAmountUSD, 
    cartTotalUSD, 
    formatPrice, 
    promoCode, 
    applyPromo, 
    appliedDiscount, 
    packagingChoice, 
    setPackagingChoice, 
    selectedFragranceSample, 
    setSelectedFragranceSample,
    setIsCheckoutOpen 
  } = useShop();

  const [inputCode, setInputCode] = useState(promoCode || '');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (inputCode) {
      applyPromo(inputCode);
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="cart-drawer-overlay" onClick={() => setIsCartOpen(false)}>
      <div
        className="cart-drawer"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '22px 24px',
            borderBottom: '1px solid rgba(139, 115, 85, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#FAF7F2'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={18} style={{ color: 'var(--bronze-highlight)' }} />
            <h3 style={{ fontSize: '1.05rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-primary-text)', fontWeight: 600 }}>
              Private Bag ({cart.length})
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--bronze-highlight)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  textDecoration: 'underline'
                }}
                title="Remove all items from bag"
              >
                Clear Bag
              </button>
            )}

            <button
              onClick={() => setIsCartOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--color-primary-text)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
              aria-label="Close Bag Drawer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Drawer Scrollable Content */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            background: '#FAF7F2'
          }}
        >
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', margin: 'auto 0', padding: '40px 0' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'rgba(139, 115, 85, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto',
                  color: 'var(--bronze-highlight)'
                }}
              >
                <ShoppingBag size={28} />
              </div>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--color-primary-text)', fontWeight: 600 }}>
                Your Private Bag is Empty
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-muted-text)', marginBottom: '20px' }}>
                Explore Emmy's South Indian Couture or design a bespoke commission in the Atelier Customizer.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-gold"
                style={{ padding: '12px 24px', fontSize: '0.78rem' }}
              >
                Discover Collection
              </button>
            </div>
          ) : (
            <>
              {/* Cart Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {cart.map((item) => (
                  <div
                    key={item.key}
                    style={{
                      display: 'flex',
                      gap: '16px',
                      padding: '14px',
                      background: '#FFFFFF',
                      border: '1px solid rgba(139, 115, 85, 0.2)',
                      boxShadow: '0 4px 12px rgba(26, 26, 26, 0.04)',
                      borderRadius: '1px'
                    }}
                  >
                    {/* Item Image */}
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={(e) => {
                        e.currentTarget.src = "/images/royal_navy_ivory_half_saree.jpg";
                      }}
                      style={{
                        width: '85px',
                        height: '115px',
                        objectFit: 'cover',
                        borderRadius: '1px',
                        flexShrink: 0
                      }}
                    />

                    {/* Item Details */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                          <div>
                            {item.tag && (
                              <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--bronze-highlight)', fontWeight: 600, display: 'block', marginBottom: '2px' }}>
                                {item.tag}
                              </span>
                            )}
                            <h4 style={{ fontSize: '0.92rem', color: 'var(--color-primary-text)', fontWeight: 600, lineHeight: 1.3 }}>
                              {item.name}
                            </h4>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.key)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: 'var(--color-muted-text)',
                              cursor: 'pointer',
                              padding: '2px'
                            }}
                            title="Remove Piece"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        {(item.shortDesc || item.description) && (
                          <p style={{
                            fontSize: '0.74rem',
                            color: '#555555',
                            lineHeight: 1.35,
                            margin: '4px 0 6px 0',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {item.shortDesc || item.description}
                          </p>
                        )}

                        <div style={{ fontSize: '0.73rem', color: 'var(--bronze-highlight)', fontWeight: 600, marginTop: '2px' }}>
                          Size: {item.size} • Shade: {item.color}
                        </div>

                        {item.customMeasurements && (
                          <div style={{ fontSize: '0.7rem', color: 'var(--color-muted-text)', marginTop: '4px', fontStyle: 'italic' }}>
                            ✓ Custom Atelier Specs Included
                          </div>
                        )}
                      </div>

                      {/* Price & Quantity Controls */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FAF7F2', padding: '3px 8px', borderRadius: '1px', border: '1px solid rgba(139, 115, 85, 0.25)' }}>
                          <button
                            onClick={() => updateCartQuantity(item.key, item.quantity - 1)}
                            style={{ background: 'none', border: 'none', color: 'var(--color-primary-text)', cursor: 'pointer' }}
                          >
                            <Minus size={12} />
                          </button>
                          <span style={{ fontSize: '0.78rem', minWidth: '16px', textAlign: 'center', fontWeight: 600, color: 'var(--color-primary-text)' }}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.key, item.quantity + 1)}
                            style={{ background: 'none', border: 'none', color: 'var(--color-primary-text)', cursor: 'pointer' }}
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <div style={{ color: 'var(--color-primary-text)', fontWeight: 700, fontSize: '0.95rem' }}>
                          {formatPrice(item.priceUSD * item.quantity)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Complimentary Velvet Packaging Selector */}
              <div
                style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(139, 115, 85, 0.2)',
                  borderRadius: '1px',
                  padding: '14px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--bronze-highlight)', fontWeight: 700, marginBottom: '8px' }}>
                  <Gift size={14} />
                  <span>Complimentary Maison Gift Packaging</span>
                </div>

                <select
                  value={packagingChoice}
                  onChange={(e) => setPackagingChoice(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#FAF7F2',
                    border: '1px solid rgba(139, 115, 85, 0.3)',
                    color: 'var(--color-primary-text)',
                    padding: '8px',
                    fontSize: '0.76rem',
                    borderRadius: '1px',
                    outline: 'none'
                  }}
                >
                  {PACKAGING_OPTIONS.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} ({pkg.note})
                    </option>
                  ))}
                </select>
              </div>

              {/* Complimentary Fragrance Sample Selector */}
              <div
                style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(139, 115, 85, 0.2)',
                  borderRadius: '1px',
                  padding: '14px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--color-primary-text)', fontWeight: 600, marginBottom: '8px' }}>
                  <Sparkles size={14} style={{ color: 'var(--bronze-highlight)' }} />
                  <span>Complimentary Maison Parfumerie Sample (10ml)</span>
                </div>

                <select
                  value={selectedFragranceSample}
                  onChange={(e) => setSelectedFragranceSample(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#FAF7F2',
                    border: '1px solid rgba(139, 115, 85, 0.3)',
                    color: 'var(--color-primary-text)',
                    padding: '8px',
                    fontSize: '0.76rem',
                    borderRadius: '1px',
                    outline: 'none'
                  }}
                >
                  {FRAGRANCE_SAMPLES.map((frag, i) => (
                    <option key={i} value={frag}>
                      {frag}
                    </option>
                  ))}
                </select>
              </div>

              {/* Privilege Promo Code */}
              <div>
                <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Privilege Code (e.g. 'RUNWAY15')"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    style={{
                      flex: 1,
                      background: '#FFFFFF',
                      border: '1px solid rgba(139, 115, 85, 0.3)',
                      color: 'var(--color-primary-text)',
                      padding: '8px 12px',
                      fontSize: '0.78rem',
                      borderRadius: '1px',
                      outline: 'none'
                    }}
                  />
                  <button
                    type="submit"
                    className="btn-outline-gold"
                    style={{ padding: '8px 16px', fontSize: '0.75rem' }}
                  >
                    Apply
                  </button>
                </form>
                {appliedDiscount > 0 && (
                  <div style={{ fontSize: '0.74rem', color: '#5C1A2E', fontWeight: 700, marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span>✓</span>
                    <span>{promoCode === 'RUNWAY15' ? "🎟️ Runway Invitation Privilege (15%) Applied" : `VIP Privilege (${appliedDiscount * 100}%) Applied`}</span>
                  </div>
                )}
                <div style={{ fontSize: '0.68rem', color: '#887B72', marginTop: '4px' }}>
                  *15% Runway offer requires an official Runway Invitation dispatched from the Atelier Admin.
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer / Subtotal & Checkout Button */}
        {cart.length > 0 && (
          <div
            style={{
              padding: '24px',
              borderTop: '1px solid rgba(139, 115, 85, 0.2)',
              background: '#F3ECE2',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--color-muted-text)' }}>
              <span>Atelier Subtotal:</span>
              <span>{formatPrice(cartSubtotalUSD)}</span>
            </div>

            {appliedDiscount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--bronze-highlight)', fontWeight: 600 }}>
                <span>VIP Privilege Savings:</span>
                <span>-{formatPrice(discountAmountUSD)}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--color-muted-text)' }}>
              <span>White Glove Insured Shipping:</span>
              <span style={{ color: 'var(--bronze-highlight)', fontWeight: 600 }}>Complimentary Worldwide</span>
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--color-primary-text)',
                paddingTop: '10px',
                borderTop: '1px solid rgba(139, 115, 85, 0.2)'
              }}
            >
              <span>Total:</span>
              <span style={{ fontFamily: 'var(--font-serif-primary)', color: 'var(--color-primary-text)' }}>
                {formatPrice(cartTotalUSD)}
              </span>
            </div>

            <button
              onClick={handleProceedCheckout}
              className="btn-gold"
              style={{ width: '100%', padding: '16px', fontSize: '0.86rem' }}
            >
              <span>Proceed to VIP Checkout</span>
              <ArrowRight size={16} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.68rem', color: 'var(--color-muted-text)' }}>
              <ShieldCheck size={13} style={{ color: 'var(--bronze-highlight)' }} />
              <span>Complimentary insured courier delivery with private stylist handover</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
