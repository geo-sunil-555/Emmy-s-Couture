import React from 'react';
import { useShop } from '../context/ShopContext';
import {
  Sparkles,
  Scale,
  ArrowRightLeft,
  ShoppingBag,
  Activity,
  ChevronUp,
  ChevronDown,
  Vibrate,
  CheckCircle2,
  Truck,
  Scissors,
  ShieldCheck,
  Calendar,
  Grid
} from 'lucide-react';

const LOOM_STAGES = [
  { id: 0, short: 'Loom Reserved', label: 'Master Pit-Loom Allocation Confirmed', eta: 'Stage 1 of 5' },
  { id: 1, short: 'Pit-Loom Weaving', label: 'Weaving 100% Pure Mulberry Silk & Korvai Border', eta: 'Stage 2 of 5 • Active' },
  { id: 2, short: '24k Zardozi Craft', label: 'Hand-Embroidering 24k Gold Bullion Motifs', eta: 'Stage 3 of 5' },
  { id: 3, short: '14-Pt Inspection', label: 'Head Couturière Quality & Fit Certification', eta: 'Stage 4 of 5' },
  { id: 4, short: 'Armored Courier', label: 'Dispatched via White-Glove Kerala Courier', eta: 'Stage 5 of 5 • Ready' }
];

export const Android17Hub = () => {
  const {
    orders,
    appointments,
    compareList,
    setIsCompareOpen,
    openVirtualTryOn,
    setIsHandoffOpen,
    setIsCartOpen,
    totalItemsCount,
    isLiveUpdateExpanded,
    setIsLiveUpdateExpanded,
    liveTrackerStage,
    setLiveTrackerStage,
    hapticsEnabled,
    setHapticsEnabled,
    triggerHaptic,
    openAppointmentModal
  } = useShop();

  const latestOrder = orders?.[0];
  const latestAppt = appointments?.[0];
  const currentStage = LOOM_STAGES[liveTrackerStage] || LOOM_STAGES[1];
  const progressPercent = Math.round(((liveTrackerStage + 1) / LOOM_STAGES.length) * 100);

  const scrollToCatalog = () => {
    triggerHaptic(10);
    const el = document.getElementById('collections');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ===================================================================
          1. ANDROID 17 "LIVE UPDATES" ONGOING ACTIVITY PILL & EXPANDED CARD
          =================================================================== */}
      <div
        style={{
          position: 'fixed',
          bottom: '28px',
          left: '28px',
          zIndex: 910,
          maxWidth: 'calc(100vw - 56px)'
        }}
      >
        {!isLiveUpdateExpanded ? (
          /* Compact Android 17 Status Bar Live Update Pill */
          <button
            onClick={() => {
              triggerHaptic(14);
              setIsLiveUpdateExpanded(true);
            }}
            className="a17-liquid-glass-dark"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 16px',
              borderRadius: '999px',
              color: '#FDFBF7',
              cursor: 'pointer',
              fontSize: '0.73rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              transition: 'all 0.3s var(--a17-spring)'
            }}
            title="Expand Android 17 Live Atelier Activity & Quick Tools"
          >
            <span className="a17-live-dot" />
            <span style={{ color: '#D4AF7A', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.65rem', letterSpacing: '0.12em' }}>
              A17 Live
            </span>
            <span style={{ borderLeft: '1px solid rgba(212, 175, 122, 0.35)', paddingLeft: '8px' }}>
              {latestOrder
                ? `Order #${latestOrder.orderNumber}: ${latestOrder.status}`
                : `Atelier Loom: ${currentStage.short} (${progressPercent}%)`}
            </span>
            {compareList.length > 0 && (
              <span
                style={{
                  background: '#D4AF7A',
                  color: '#1A0A10',
                  fontSize: '0.62rem',
                  fontWeight: 800,
                  padding: '1px 7px',
                  borderRadius: '999px'
                }}
              >
                {compareList.length} Compare
              </span>
            )}
            <ChevronUp size={14} style={{ color: '#D4AF7A' }} />
          </button>
        ) : (
          /* Expanded Android 17 Live Activity & Material 3 Expressive Quick Hub */
          <div
            className="a17-liquid-glass-dark a17-spring-pop"
            style={{
              width: '370px',
              maxWidth: 'calc(100vw - 40px)',
              borderRadius: '24px',
              padding: '18px 20px',
              color: '#FDFBF7',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}
          >
            {/* Card Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="a17-live-dot" />
                <div>
                  <div style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.16em', color: '#D4AF7A', fontWeight: 700 }}>
                    Android 17 • Live Ongoing Update
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>
                    {latestOrder
                      ? `Commission #${latestOrder.orderNumber}`
                      : 'Kerala Pit-Loom Live Telemetry'}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  triggerHaptic(10);
                  setIsLiveUpdateExpanded(false);
                }}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(212, 175, 122, 0.35)',
                  color: '#FDFBF7',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <ChevronDown size={15} />
              </button>
            </div>

            {/* Progress Bar & Interactive Stage Stepper */}
            <div
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(212, 175, 122, 0.25)',
                borderRadius: '16px',
                padding: '12px 14px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', marginBottom: '6px' }}>
                <span style={{ color: '#D4AF7A', fontWeight: 700 }}>{currentStage.short}</span>
                <span style={{ opacity: 0.8 }}>{progressPercent}% Complete</span>
              </div>

              {/* Expressive Progress Track */}
              <div
                style={{
                  width: '100%',
                  height: '7px',
                  background: 'rgba(255, 255, 255, 0.14)',
                  borderRadius: '999px',
                  overflow: 'hidden',
                  marginBottom: '8px'
                }}
              >
                <div
                  style={{
                    width: `${progressPercent}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #D4AF7A 0%, #22C55E 100%)',
                    borderRadius: '999px',
                    transition: 'width 0.35s ease'
                  }}
                />
              </div>

              <div style={{ fontSize: '0.72rem', color: 'rgba(253, 251, 247, 0.85)', marginBottom: '10px' }}>
                {currentStage.label}
              </div>

              {/* Interactive Stage Selector Pills */}
              <div style={{ display: 'flex', gap: '4px', justifyContent: 'space-between' }}>
                {LOOM_STAGES.map((st, idx) => (
                  <button
                    key={st.id}
                    onClick={() => {
                      triggerHaptic(12);
                      setLiveTrackerStage(idx);
                    }}
                    style={{
                      flex: 1,
                      padding: '4px 0',
                      borderRadius: '8px',
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      border: liveTrackerStage === idx ? '1px solid #D4AF7A' : '1px solid rgba(255,255,255,0.12)',
                      background: liveTrackerStage === idx ? 'rgba(212, 175, 122, 0.28)' : 'transparent',
                      color: liveTrackerStage === idx ? '#D4AF7A' : 'rgba(255,255,255,0.65)',
                      cursor: 'pointer'
                    }}
                    title={st.short}
                  >
                    S{idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Upcoming Salon Fitting Notice if any */}
            {latestAppt && (
              <div
                style={{
                  fontSize: '0.72rem',
                  background: 'rgba(212, 175, 122, 0.14)',
                  border: '1px solid rgba(212, 175, 122, 0.35)',
                  borderRadius: '12px',
                  padding: '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Calendar size={14} style={{ color: '#D4AF7A', flexShrink: 0 }} />
                <span>
                  Fitting Reserved: <strong>{latestAppt.date}</strong> at {latestAppt.time} ({latestAppt.maisonName})
                </span>
              </div>
            )}

            {/* Android 17 Material 3 Expressive Quick Launchers */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button
                onClick={() => {
                  setIsLiveUpdateExpanded(false);
                  openVirtualTryOn();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '10px 12px',
                  borderRadius: '14px',
                  background: 'rgba(212, 175, 122, 0.2)',
                  border: '1px solid rgba(212, 175, 122, 0.45)',
                  color: '#FDFBF7',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Sparkles size={14} style={{ color: '#D4AF7A' }} />
                <span>AI Silk Drape</span>
              </button>

              <button
                onClick={() => {
                  setIsLiveUpdateExpanded(false);
                  setIsCompareOpen(true);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '10px 12px',
                  borderRadius: '14px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(212, 175, 122, 0.3)',
                  color: '#FDFBF7',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Scale size={14} style={{ color: '#D4AF7A' }} />
                <span>Compare ({compareList.length}/3)</span>
              </button>

              <button
                onClick={() => {
                  setIsLiveUpdateExpanded(false);
                  setIsHandoffOpen(true);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '10px 12px',
                  borderRadius: '14px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(212, 175, 122, 0.3)',
                  color: '#FDFBF7',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <ArrowRightLeft size={14} style={{ color: '#D4AF7A' }} />
                <span>Continue On</span>
              </button>

              <button
                onClick={() => {
                  setHapticsEnabled(!hapticsEnabled);
                  triggerHaptic(20);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                  padding: '10px 12px',
                  borderRadius: '14px',
                  background: hapticsEnabled ? 'rgba(34, 197, 94, 0.18)' : 'rgba(255, 255, 255, 0.06)',
                  border: hapticsEnabled ? '1px solid rgba(34, 197, 94, 0.5)' : '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#FDFBF7',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Vibrate size={14} style={{ color: hapticsEnabled ? '#4ADE80' : '#9CA3AF' }} />
                <span>Haptics: {hapticsEnabled ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ===================================================================
          2. ANDROID 17 ADAPTIVE MOBILE & FOLDABLE BOTTOM NAVIGATION DOCK
          =================================================================== */}
      <div
        className="lg:hidden a17-liquid-glass"
        style={{
          position: 'fixed',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 895,
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 10px',
          borderRadius: '999px',
          maxWidth: '94vw'
        }}
      >
        <button
          onClick={scrollToCatalog}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            padding: '6px 12px',
            borderRadius: '999px',
            background: 'transparent',
            border: 'none',
            color: 'var(--color-primary-burgundy)',
            fontSize: '0.62rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          <Grid size={15} />
          <span>Catalog</span>
        </button>

        <button
          onClick={() => openVirtualTryOn()}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            padding: '6px 12px',
            borderRadius: '999px',
            background: 'rgba(92, 26, 46, 0.1)',
            border: 'none',
            color: 'var(--color-primary-burgundy)',
            fontSize: '0.62rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          <Sparkles size={15} style={{ color: '#B8860B' }} />
          <span>AI Drape</span>
        </button>

        <button
          onClick={() => setIsCompareOpen(true)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            padding: '6px 12px',
            borderRadius: '999px',
            background: 'transparent',
            border: 'none',
            color: 'var(--color-primary-burgundy)',
            fontSize: '0.62rem',
            fontWeight: 700,
            cursor: 'pointer',
            position: 'relative'
          }}
        >
          <Scale size={15} />
          <span>Compare</span>
          {compareList.length > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '2px',
                right: '6px',
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                background: 'var(--color-primary-burgundy)',
                color: '#FDFBF7',
                fontSize: '0.55rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {compareList.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setIsHandoffOpen(true)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            padding: '6px 12px',
            borderRadius: '999px',
            background: 'transparent',
            border: 'none',
            color: 'var(--color-primary-burgundy)',
            fontSize: '0.62rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          <ArrowRightLeft size={15} />
          <span>Sync</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            padding: '6px 12px',
            borderRadius: '999px',
            background: 'var(--color-primary-burgundy)',
            border: 'none',
            color: '#FDFBF7',
            fontSize: '0.62rem',
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          <ShoppingBag size={15} style={{ color: '#D4AF7A' }} />
          <span>Bag ({totalItemsCount})</span>
        </button>
      </div>
    </>
  );
};

