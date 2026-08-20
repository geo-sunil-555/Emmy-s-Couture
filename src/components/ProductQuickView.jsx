import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Sparkles, 
  ShoppingBag, 
  Calendar, 
  Clock, 
  Ruler, 
  ShieldCheck, 
  Heart
} from 'lucide-react';

export const ProductQuickView = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    formatPrice, 
    addToCart, 
    openAppointmentModal, 
    wishlist, 
    toggleWishlist,
    showToast 
  } = useShop();

  const [selectedSize, setSelectedSize] = useState("Bespoke Made-to-Measure");
  const [selectedColor, setSelectedColor] = useState(
    quickViewProduct?.colors?.[0]?.name || "Signature"
  );
  const [isCustomFormOpen, setIsCustomFormOpen] = useState(true);

  // Custom Measurements State
  const [measurements, setMeasurements] = useState({
    bust: '',
    waist: '',
    hips: '',
    height: '',
    heelHeight: '',
    specialNotes: ''
  });

  if (!quickViewProduct) return null;

  const isWishlisted = wishlist.includes(quickViewProduct.id);
  const isRareExclusive = quickViewProduct.tag === "Runway Exclusive" || quickViewProduct.tag === "Met Gala Highlight";

  const handleAdd = () => {
    addToCart(quickViewProduct, {
      size: selectedSize,
      color: selectedColor,
      isCustom: selectedSize === "Bespoke Made-to-Measure",
      customMeasurements: selectedSize === "Bespoke Made-to-Measure" ? measurements : null
    });
    setQuickViewProduct(null);
  };

  const handleBook = () => {
    setQuickViewProduct(null);
    openAppointmentModal("fitting", "kochi");
  };

  return (
    <div className="modal-overlay" onClick={() => setQuickViewProduct(null)}>
      <div
        className="glass-panel modal-content-animated"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '1000px',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: '0',
          position: 'relative',
          borderRadius: '2px',
          background: '#FAF7F2',
          border: '1px solid rgba(139, 115, 85, 0.35)',
          boxShadow: 'var(--shadow-modal)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.92)',
            border: '1px solid rgba(139, 115, 85, 0.25)',
            color: '#1A1A1A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 50,
            boxShadow: '0 4px 12px rgba(26, 26, 26, 0.08)'
          }}
          aria-label="Close Modal"
        >
          <X size={20} />
        </button>

        {/* Modal Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            alignItems: 'stretch'
          }}
        >
          {/* Left Column: Product Image (Full-Size Uncropped) */}
          <div style={{ position: 'relative', minHeight: '560px', background: '#FAF7F2', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
            <img
              src={quickViewProduct.images.primary}
              alt={quickViewProduct.name}
              onError={(e) => {
                e.currentTarget.src = "/images/royal_navy_ivory_half_saree.jpg";
              }}
              style={{
                width: '100%',
                height: '100%',
                maxHeight: '650px',
                objectFit: 'contain',
                objectPosition: 'center center'
              }}
            />

            {/* Badge */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                zIndex: 10
              }}
            >
              <span className={isRareExclusive ? "badge-burgundy" : "badge-gold"}>
                {quickViewProduct.tag || "Bespoke Creation"}
              </span>
            </div>
          </div>

          {/* Right Column: Information & Bespoke Form */}
          <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', gap: '20px', background: '#FFFFFF' }}>
            <div>
              <div
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--bronze-highlight)',
                  fontWeight: 600,
                  marginBottom: '6px'
                }}
              >
                {quickViewProduct.collection}
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-serif-primary)',
                  fontSize: '1.85rem',
                  lineHeight: 1.2,
                  fontWeight: 600,
                  color: 'var(--color-primary-text)',
                  marginBottom: '10px'
                }}
              >
                {quickViewProduct.name}
              </h2>

              <div
                style={{
                  fontFamily: 'var(--font-serif-primary)',
                  fontSize: '1.6rem',
                  color: 'var(--color-primary-text)',
                  fontWeight: 700
                }}
              >
                {formatPrice(quickViewProduct.priceUSD)}
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--color-muted-text)', lineHeight: 1.65 }}>
              {quickViewProduct.description}
            </p>

            {/* Craftsmanship Specifications Box */}
            <div
              style={{
                background: '#FAF7F2',
                border: '1px solid rgba(139, 115, 85, 0.2)',
                borderRadius: '2px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '0.78rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--bronze-highlight)', fontWeight: 700 }}>
                <Sparkles size={14} />
                <span>South Indian Atelier Craftsmanship Specifications:</span>
              </div>
              <div style={{ color: 'var(--color-body-text)' }}>
                <strong>Atelier Time:</strong> {quickViewProduct.craftsmanship.atelierHours}
              </div>
              <div style={{ color: 'var(--color-body-text)' }}>
                <strong>Materials:</strong> {quickViewProduct.craftsmanship.materials}
              </div>
              <div style={{ color: 'var(--color-body-text)' }}>
                <strong>Embellishment:</strong> {quickViewProduct.craftsmanship.embellishment}
              </div>
              <div style={{ color: 'var(--color-body-text)' }}>
                <strong>Origin:</strong> {quickViewProduct.craftsmanship.origin}
              </div>
            </div>

            {/* Color Selection */}
            {quickViewProduct.colors && (
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-muted-text)', fontWeight: 600, marginBottom: '8px' }}>
                  Select Silk Shade: <strong style={{ color: 'var(--bronze-highlight)' }}>{selectedColor}</strong>
                </label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {quickViewProduct.colors.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(c.name)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        background: selectedColor === c.name ? 'rgba(201, 169, 97, 0.2)' : '#FAF7F2',
                        border: selectedColor === c.name ? '1px solid #C9A961' : '1px solid rgba(139, 115, 85, 0.2)',
                        color: 'var(--color-primary-text)',
                        fontWeight: selectedColor === c.name ? 600 : 400,
                        fontSize: '0.75rem',
                        borderRadius: '1px',
                        cursor: 'pointer'
                      }}
                    >
                      <span
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          background: c.hex,
                          border: '1px solid rgba(139, 115, 85, 0.4)'
                        }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-muted-text)', fontWeight: 600 }}>
                  Select Size / Bespoke Fit:
                </label>
                <span style={{ fontSize: '0.72rem', color: 'var(--bronze-highlight)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Ruler size={12} /> Made-to-measure included
                </span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {quickViewProduct.sizes.map((sz, i) => {
                  const isSelected = selectedSize === sz;
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedSize(sz)}
                      style={{
                        padding: '8px 12px',
                        background: isSelected ? '#1A1A1A' : '#FAF7F2',
                        color: isSelected ? '#FAF7F2' : '#1A1A1A',
                        fontWeight: isSelected ? 600 : 400,
                        border: isSelected ? '1px solid #1A1A1A' : '1px solid rgba(139, 115, 85, 0.2)',
                        fontSize: '0.75rem',
                        borderRadius: '1px',
                        cursor: 'pointer'
                      }}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bespoke Measurement Intake */}
            {selectedSize === "Bespoke Made-to-Measure" && (
              <div
                style={{
                  background: '#FAF7F2',
                  border: '1px dashed var(--bronze-border)',
                  padding: '16px',
                  borderRadius: '2px'
                }}
              >
                <div style={{ fontSize: '0.78rem', color: 'var(--bronze-highlight)', fontWeight: 700, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={13} />
                  <span>Optional: Enter Your Precise Measurements (cm or in)</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <input
                    type="text"
                    placeholder="Bust (e.g. 88 cm / 34.5 in)"
                    value={measurements.bust}
                    onChange={(e) => setMeasurements({ ...measurements, bust: e.target.value })}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid rgba(139, 115, 85, 0.3)',
                      color: 'var(--color-primary-text)',
                      padding: '6px 10px',
                      fontSize: '0.76rem',
                      borderRadius: '1px',
                      outline: 'none'
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Waist (e.g. 66 cm / 26 in)"
                    value={measurements.waist}
                    onChange={(e) => setMeasurements({ ...measurements, waist: e.target.value })}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid rgba(139, 115, 85, 0.3)',
                      color: 'var(--color-primary-text)',
                      padding: '6px 10px',
                      fontSize: '0.76rem',
                      borderRadius: '1px',
                      outline: 'none'
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Hips (e.g. 96 cm / 37.8 in)"
                    value={measurements.hips}
                    onChange={(e) => setMeasurements({ ...measurements, hips: e.target.value })}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid rgba(139, 115, 85, 0.3)',
                      color: 'var(--color-primary-text)',
                      padding: '6px 10px',
                      fontSize: '0.76rem',
                      borderRadius: '1px',
                      outline: 'none'
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Height & Shoe Heel Height"
                    value={measurements.height}
                    onChange={(e) => setMeasurements({ ...measurements, height: e.target.value })}
                    style={{
                      background: '#FFFFFF',
                      border: '1px solid rgba(139, 115, 85, 0.3)',
                      color: 'var(--color-primary-text)',
                      padding: '6px 10px',
                      fontSize: '0.76rem',
                      borderRadius: '1px',
                      outline: 'none'
                    }}
                  />
                </div>
                <div style={{ fontSize: '0.68rem', color: 'var(--color-muted-text)', marginTop: '6px' }}>
                  *Our master tailors will contact you to verify fit before cutting fabric.
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={handleAdd}
                  className="btn-gold"
                  style={{ flex: 1, padding: '14px', fontSize: '0.84rem' }}
                >
                  <ShoppingBag size={16} />
                  <span>Reserve & Add to Private Bag</span>
                </button>

                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  style={{
                    width: '48px',
                    borderRadius: '1px',
                    background: '#FAF7F2',
                    border: '1px solid rgba(139, 115, 85, 0.25)',
                    color: isWishlisted ? 'var(--bronze-highlight)' : '#1A1A1A',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  aria-label="Wishlist"
                >
                  <Heart size={20} fill={isWishlisted ? 'var(--bronze-highlight)' : 'none'} />
                </button>
              </div>

              <button
                onClick={handleBook}
                className="btn-outline-gold"
                style={{ width: '100%', padding: '12px', fontSize: '0.8rem' }}
              >
                <Calendar size={14} />
                <span>Book Atelier Consultation for this Creation</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
