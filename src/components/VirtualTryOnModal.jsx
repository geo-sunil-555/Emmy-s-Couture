import React, { useState, useMemo, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Sparkles,
  Sun,
  Flame,
  Moon,
  Camera,
  ShoppingBag,
  Layers,
  CheckCircle2,
  Sliders,
  Upload,
  RefreshCw,
  Calendar
} from 'lucide-react';

const LIGHTING_PRESETS = [
  {
    id: 'muhurtham-sun',
    label: 'Morning Muhurtham Sun',
    kelvin: '5600K Daylight',
    icon: Sun,
    filter: 'contrast(1.06) brightness(1.05) saturate(1.12)',
    overlay: 'radial-gradient(circle at 30% 20%, rgba(255, 244, 214, 0.28) 0%, transparent 65%)',
    desc: 'Crisp natural temple courtyard daylight highlighting pure mulberry silk weave.'
  },
  {
    id: 'nilavilakku-lamp',
    label: 'Nilavilakku Temple Lamp',
    kelvin: '2700K Sacred Gold',
    icon: Flame,
    filter: 'contrast(1.1) brightness(1.02) sepia(0.18) saturate(1.28)',
    overlay: 'radial-gradient(circle at 50% 35%, rgba(212, 175, 122, 0.38) 0%, rgba(92, 26, 46, 0.18) 80%)',
    desc: 'Warm brass oil-lamp glow that amplifies 24k gold korvai zari borders.'
  },
  {
    id: 'reception-chandelier',
    label: 'Grand Reception Chandelier',
    kelvin: '4200K Crystal Luster',
    icon: Sparkles,
    filter: 'contrast(1.12) brightness(1.06) saturate(1.18)',
    overlay: 'linear-gradient(135deg, rgba(255, 255, 255, 0.24) 0%, rgba(212, 175, 122, 0.18) 50%, rgba(45, 10, 22, 0.2) 100%)',
    desc: 'High-sparkle ballroom illumination tailored for zardozi and Swarovski accents.'
  },
  {
    id: 'backwater-twilight',
    label: 'Kochi Backwater Twilight',
    kelvin: '6500K Moonlit Silk',
    icon: Moon,
    filter: 'contrast(1.08) brightness(0.96) saturate(1.05) hue-rotate(-4deg)',
    overlay: 'radial-gradient(circle at 70% 25%, rgba(180, 205, 255, 0.22) 0%, rgba(26, 12, 22, 0.32) 85%)',
    desc: 'Soft evening twilight ideal for pastel tissue drapes and ivory kasavu.'
  }
];

const UNDERTONES = [
  { id: 'warm-gold', name: 'Warm Golden Honey', hex: '#D69E66', matchBoost: 4 },
  { id: 'rich-espresso', name: 'Rich Malabar Espresso', hex: '#603926', matchBoost: 5 },
  { id: 'olive-bronze', name: 'Dravidian Olive Bronze', hex: '#A57548', matchBoost: 4 },
  { id: 'rose-ivory', name: 'Warm Rose Ivory', hex: '#E8C3A9', matchBoost: 3 },
  { id: 'deep-cocoa', name: 'Deep Teak & Cocoa', hex: '#432618', matchBoost: 5 }
];

const DRAPE_STYLES = [
  { id: 'classic-pleat', name: 'Traditional Temple Box-Pleat', tag: 'Heritage' },
  { id: 'floating-dhavani', name: 'Floating Sovereign Dhavani', tag: 'Editorial' },
  { id: 'couture-veil', name: 'SculptedMuhurtham Shoulder Drape', tag: 'Bridal' }
];

export const VirtualTryOnModal = () => {
  const {
    virtualTryOnProduct,
    setVirtualTryOnProduct,
    products,
    formatPrice,
    addToCart,
    openAppointmentModal,
    triggerHaptic,
    showToast
  } = useShop();

  const [selectedLighting, setSelectedLighting] = useState(LIGHTING_PRESETS[0]);
  const [selectedUndertone, setSelectedUndertone] = useState(UNDERTONES[0]);
  const [selectedDrape, setSelectedDrape] = useState(DRAPE_STYLES[0]);
  const [zariShimmer, setZariShimmer] = useState(85);
  const [userPortrait, setUserPortrait] = useState(null);
  const fileInputRef = useRef(null);

  const activeProduct = virtualTryOnProduct;

  const harmonyScore = useMemo(() => {
    if (!activeProduct) return 96;
    const base = 93;
    const boost = selectedUndertone.matchBoost || 3;
    const lightBonus = selectedLighting.id === 'nilavilakku-lamp' ? 2 : 1;
    return Math.min(99, base + boost + lightBonus);
  }, [activeProduct, selectedUndertone, selectedLighting]);

  if (!activeProduct) return null;

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setUserPortrait(ev.target.result);
      triggerHaptic(20);
      showToast('Personal portrait calibrated with Gemini Nano Silk Drape Studio.', 'AI Portrait Ready');
    };
    reader.readAsDataURL(file);
  };

  const handleAddSimulatedPiece = () => {
    triggerHaptic([15, 30, 15]);
    addToCart(activeProduct, {
      size: 'Bespoke Made-to-Measure',
      color: `${activeProduct.colors?.[0]?.name || 'Signature'} (${selectedDrape.name})`,
      isCustom: true,
      customMeasurements: {
        specialNotes: `AI Drape Style: ${selectedDrape.name} • Lighting Calibrated: ${selectedLighting.label} • Undertone: ${selectedUndertone.name}`
      }
    });
    setVirtualTryOnProduct(null);
  };

  return (
    <div className="modal-overlay" onClick={() => setVirtualTryOnProduct(null)}>
      <div
        className="a17-liquid-glass a17-spring-pop"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '1080px',
          maxHeight: '92vh',
          overflowY: 'auto',
          borderRadius: '24px',
          background: 'rgba(253, 251, 247, 0.96)',
          border: '1px solid rgba(212, 175, 122, 0.55)',
          boxShadow: '0 28px 75px rgba(45, 10, 22, 0.28)',
          position: 'relative',
          padding: 0
        }}
      >
        {/* Top Android 17 M3 Expressive Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 24px',
            background: 'linear-gradient(90deg, #5C1A2E 0%, #3A0E1C 100%)',
            color: '#FDFBF7',
            borderBottom: '1px solid rgba(212, 175, 122, 0.35)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <span
              style={{
                background: 'rgba(212, 175, 122, 0.22)',
                border: '1px solid #D4AF7A',
                color: '#D4AF7A',
                fontSize: '0.64rem',
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: '999px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase'
              }}
            >
              Android 17 • Gemini Nano AI
            </span>
            <h3 style={{ color: '#FDFBF7', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
              Virtual Silk Drape & Ceremony Lighting Studio
            </h3>
          </div>

          <button
            onClick={() => setVirtualTryOnProduct(null)}
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
            aria-label="Close AI Virtual Drape Studio"
          >
            <X size={18} />
          </button>
        </div>

        {/* Main Studio Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 0
          }}
        >
          {/* Left Column: Live Interactive Silk Lighting & Drape Viewport */}
          <div
            style={{
              position: 'relative',
              minHeight: '520px',
              background: '#16070C',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '20px',
              overflow: 'hidden'
            }}
          >
            {/* Dynamic Lighting Atmosphere Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: selectedLighting.overlay,
                pointerEvents: 'none',
                zIndex: 2,
                transition: 'all 0.5s ease'
              }}
            />

            {/* Zari Shimmer Specular Glow */}
            <div
              style={{
                position: 'absolute',
                top: '20%',
                left: '25%',
                width: '280px',
                height: '280px',
                borderRadius: '50%',
                background: `radial-gradient(circle, rgba(212, 175, 122, ${(zariShimmer / 100) * 0.42}) 0%, transparent 70%)`,
                filter: 'blur(36px)',
                pointerEvents: 'none',
                zIndex: 2
              }}
            />

            {/* Top Floating AI Telemetry Pills */}
            <div
              style={{
                position: 'relative',
                zIndex: 5,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: '10px',
                flexWrap: 'wrap'
              }}
            >
              <div
                style={{
                  background: 'rgba(22, 7, 12, 0.78)',
                  backdropFilter: 'blur(14px)',
                  border: '1px solid rgba(212, 175, 122, 0.45)',
                  borderRadius: '999px',
                  padding: '6px 14px',
                  color: '#FDFBF7',
                  fontSize: '0.7rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Sparkles size={13} style={{ color: '#D4AF7A' }} />
                <span>{selectedLighting.label} ({selectedLighting.kelvin})</span>
              </div>

              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(212, 175, 122, 0.95) 0%, rgba(182, 138, 76, 0.95) 100%)',
                  color: '#1A0A10',
                  borderRadius: '999px',
                  padding: '6px 14px',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  boxShadow: '0 6px 20px rgba(212, 175, 122, 0.35)'
                }}
              >
                <CheckCircle2 size={14} />
                <span>{harmonyScore}% AI Zari & Undertone Match</span>
              </div>
            </div>

            {/* Center Gown Image + Optional User Portrait PIP */}
            <div
              style={{
                position: 'relative',
                zIndex: 3,
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                my: '12px'
              }}
            >
              <img
                src={activeProduct.images?.primary || activeProduct.image || '/images/royal_navy_ivory_half_saree.jpg'}
                alt={activeProduct.name}
                style={{
                  maxHeight: '420px',
                  width: '100%',
                  objectFit: 'contain',
                  filter: selectedLighting.filter,
                  transition: 'filter 0.45s ease, transform 0.45s ease',
                  borderRadius: '12px'
                }}
              />

              {/* Skin Undertone Reference Badge / User Portrait PIP */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  background: 'rgba(22, 7, 12, 0.88)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(212, 175, 122, 0.5)',
                  borderRadius: '16px',
                  padding: '10px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#FDFBF7',
                  maxWidth: '230px'
                }}
              >
                {userPortrait ? (
                  <img
                    src={userPortrait}
                    alt="Patron Portrait"
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid #D4AF7A'
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: selectedUndertone.hex,
                      border: '2px solid #D4AF7A',
                      flexShrink: 0
                    }}
                  />
                )}
                <div>
                  <div style={{ fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#D4AF7A', fontWeight: 700 }}>
                    {userPortrait ? 'Patron Portrait Active' : 'Complexion Swatch'}
                  </div>
                  <div style={{ fontSize: '0.74rem', fontWeight: 600 }}>
                    {selectedUndertone.name}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Photo Upload & Piece Switcher Bar */}
            <div
              style={{
                position: 'relative',
                zIndex: 5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                flexWrap: 'wrap',
                paddingTop: '12px',
                borderTop: '1px solid rgba(212, 175, 122, 0.22)'
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                style={{ display: 'none' }}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{
                  background: 'rgba(255, 255, 255, 0.12)',
                  border: '1px solid rgba(212, 175, 122, 0.45)',
                  color: '#FDFBF7',
                  borderRadius: '999px',
                  padding: '7px 14px',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <Upload size={13} style={{ color: '#D4AF7A' }} />
                <span>{userPortrait ? 'Change Portrait Photo' : 'Upload Portrait Photo'}</span>
              </button>

              {userPortrait && (
                <button
                  onClick={() => setUserPortrait(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#D4AF7A',
                    fontSize: '0.7rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <RefreshCw size={12} /> Reset Photo
                </button>
              )}

              <div style={{ fontSize: '0.7rem', color: 'rgba(253, 251, 247, 0.75)' }}>
                {selectedLighting.desc}
              </div>
            </div>
          </div>

          {/* Right Column: Controls & Calibration */}
          <div
            style={{
              padding: '26px 28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              background: '#FDFBF7'
            }}
          >
            {/* Switch Couture Piece */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.68rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'var(--color-muted-text)',
                  fontWeight: 700,
                  marginBottom: '6px'
                }}
              >
                Selected Couture Masterwork
              </label>
              <select
                value={activeProduct.id}
                onChange={(e) => {
                  const found = products.find((p) => p.id === e.target.value);
                  if (found) {
                    triggerHaptic(10);
                    setVirtualTryOnProduct(found);
                  }
                }}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '1px solid rgba(92, 26, 46, 0.25)',
                  background: '#FFFFFF',
                  color: 'var(--color-primary-burgundy)',
                  fontWeight: 600,
                  fontSize: '0.84rem',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                {products.slice(0, 24).map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {formatPrice(p.priceUSD)}
                  </option>
                ))}
              </select>
            </div>

            {/* 1. Ceremony Lighting Environment */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.68rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'var(--color-muted-text)',
                  fontWeight: 700,
                  marginBottom: '8px'
                }}
              >
                1. Ceremony Lighting Simulation
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {LIGHTING_PRESETS.map((preset) => {
                  const IconComp = preset.icon;
                  const active = selectedLighting.id === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => {
                        triggerHaptic(12);
                        setSelectedLighting(preset);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 12px',
                        borderRadius: '14px',
                        background: active ? 'var(--color-primary-burgundy)' : '#FFFFFF',
                        color: active ? '#FDFBF7' : 'var(--color-text-charcoal)',
                        border: active
                          ? '1px solid var(--color-primary-burgundy)'
                          : '1px solid rgba(212, 175, 122, 0.35)',
                        fontSize: '0.74rem',
                        fontWeight: active ? 600 : 500,
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <IconComp size={15} style={{ color: active ? '#D4AF7A' : 'var(--color-primary-burgundy)', flexShrink: 0 }} />
                      <div>
                        <div>{preset.label}</div>
                        <div style={{ fontSize: '0.62rem', opacity: 0.75 }}>{preset.kelvin}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Skin Undertone Calibration */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.68rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'var(--color-muted-text)',
                  fontWeight: 700,
                  marginBottom: '8px'
                }}
              >
                2. Complexion & Undertone Harmony: <strong style={{ color: 'var(--color-primary-burgundy)' }}>{selectedUndertone.name}</strong>
              </label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {UNDERTONES.map((tone) => {
                  const active = selectedUndertone.id === tone.id;
                  return (
                    <button
                      key={tone.id}
                      onClick={() => {
                        triggerHaptic(10);
                        setSelectedUndertone(tone);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 12px',
                        borderRadius: '999px',
                        background: active ? 'rgba(92, 26, 46, 0.1)' : '#FFFFFF',
                        border: active ? '2px solid var(--color-primary-burgundy)' : '1px solid rgba(139, 115, 85, 0.3)',
                        cursor: 'pointer',
                        fontSize: '0.72rem',
                        fontWeight: active ? 700 : 500,
                        color: 'var(--color-text-charcoal)'
                      }}
                    >
                      <span
                        style={{
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          background: tone.hex,
                          border: '1px solid rgba(0,0,0,0.2)'
                        }}
                      />
                      <span>{tone.name.split(' ').slice(-1)[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Drape Silhouette & 24k Zari Luster */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label
                  style={{
                    fontSize: '0.68rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.14em',
                    color: 'var(--color-muted-text)',
                    fontWeight: 700
                  }}
                >
                  3. 24k Gold Zari Reflection Intensity
                </label>
                <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--color-primary-burgundy)' }}>
                  {zariShimmer}% Luster
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                value={zariShimmer}
                onChange={(e) => setZariShimmer(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#5C1A2E', cursor: 'pointer' }}
              />

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
                {DRAPE_STYLES.map((d) => {
                  const active = selectedDrape.id === d.id;
                  return (
                    <button
                      key={d.id}
                      onClick={() => {
                        triggerHaptic(10);
                        setSelectedDrape(d);
                      }}
                      style={{
                        flex: 1,
                        minWidth: '120px',
                        padding: '8px 10px',
                        borderRadius: '10px',
                        background: active ? '#1A0A10' : '#FFFFFF',
                        color: active ? '#D4AF7A' : 'var(--color-text-charcoal)',
                        border: active ? '1px solid #D4AF7A' : '1px solid rgba(139, 115, 85, 0.25)',
                        fontSize: '0.71rem',
                        fontWeight: active ? 700 : 500,
                        cursor: 'pointer'
                      }}
                    >
                      {d.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action CTAs */}
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '10px' }}>
              <button
                onClick={handleAddSimulatedPiece}
                className="btn-gold"
                style={{
                  width: '100%',
                  borderRadius: '999px',
                  padding: '14px 20px',
                  fontSize: '0.8rem'
                }}
              >
                <ShoppingBag size={16} />
                <span>Reserve This Calibrated Drape — {formatPrice(activeProduct.priceUSD)}</span>
              </button>

              <button
                onClick={() => {
                  setVirtualTryOnProduct(null);
                  openAppointmentModal('fitting', 'kochi');
                }}
                className="btn-outline-gold"
                style={{
                  width: '100%',
                  borderRadius: '999px',
                  padding: '11px 18px',
                  fontSize: '0.76rem'
                }}
              >
                <Calendar size={14} />
                <span>Book In-Salon Lighting & Drape Trial</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

