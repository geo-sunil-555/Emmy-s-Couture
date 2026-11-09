import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import {
  X,
  Smartphone,
  Tablet,
  Monitor,
  Share2,
  Copy,
  Check,
  Sparkles,
  ArrowRightLeft,
  Wifi
} from 'lucide-react';

const NEARBY_DEVICES = [
  {
    id: 'pixel-fold',
    name: 'Pixel 11 Pro Fold',
    os: 'Android 17 • Desktop & Inner Fold Mode',
    icon: Tablet,
    signal: 'Ultra-Wideband (UWB) • 0.8m'
  },
  {
    id: 'galaxy-s26',
    name: 'Galaxy S26 Ultra',
    os: 'Android 17 • One UI 9 Expressive',
    icon: Smartphone,
    signal: 'CrossDeviceSync BLE • 1.2m'
  },
  {
    id: 'salon-mirror',
    name: 'Kochi Salon Smart Fitting Mirror',
    os: 'Android 17 Atelier OS • Panampilly Nagar',
    icon: Monitor,
    signal: 'Maison Cloud Handoff Ready'
  }
];

export const CrossDeviceHandoffModal = () => {
  const {
    isHandoffOpen,
    setIsHandoffOpen,
    generateHandoffSession,
    importHandoffSession,
    cart,
    wishlist,
    compareList,
    triggerHaptic,
    showToast
  } = useShop();

  const [copied, setCopied] = useState(false);
  const [beamingDeviceId, setBeamingDeviceId] = useState(null);
  const [importInput, setImportInput] = useState('');

  const sessionData = useMemo(() => {
    if (!isHandoffOpen) return { token: '', shortCode: '', url: '' };
    return generateHandoffSession();
  }, [isHandoffOpen, cart, wishlist, compareList]);

  if (!isHandoffOpen) return null;

  const handleCopyLink = () => {
    triggerHaptic(15);
    navigator.clipboard?.writeText(sessionData.url);
    setCopied(true);
    showToast('Android 17 Handoff Continuity URL copied to clipboard!', 'Continue On Ready');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    triggerHaptic(18);
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Emmy's Couture • Android 17 Session Handoff",
          text: `Continue my Emmy's Couture bespoke session (${cart.length} bag items, ${wishlist.length} wishlisted creations).`,
          url: sessionData.url
        });
      } catch {}
    } else {
      handleCopyLink();
    }
  };

  const handleBeamToDevice = (device) => {
    triggerHaptic([12, 30, 18]);
    setBeamingDeviceId(device.id);
    setTimeout(() => {
      setBeamingDeviceId(null);
      showToast(
        `Session beamed to ${device.name} via Android 17 CrossDeviceSync! Open the prompt on your secondary screen.`,
        'Continue On Dispatched'
      );
    }, 1100);
  };

  const handleImportSubmit = (e) => {
    e.preventDefault();
    if (!importInput.trim()) return;
    const res = importHandoffSession(importInput);
    if (res.success) {
      setImportInput('');
      setIsHandoffOpen(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setIsHandoffOpen(false)}>
      <div
        className="a17-liquid-glass a17-spring-pop"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '640px',
          borderRadius: '24px',
          background: 'rgba(253, 251, 247, 0.97)',
          border: '1px solid rgba(212, 175, 122, 0.55)',
          boxShadow: '0 28px 70px rgba(45, 10, 22, 0.28)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '18px 24px',
            background: 'linear-gradient(90deg, #5C1A2E 0%, #3A0E1C 100%)',
            color: '#FDFBF7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ArrowRightLeft size={18} style={{ color: '#D4AF7A' }} />
            <div>
              <div style={{ fontSize: '0.62rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: '#D4AF7A', fontWeight: 700 }}>
                Android 17 • CrossDeviceSync API
              </div>
              <h3 style={{ color: '#FDFBF7', fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>
                "Continue On" Cross-Device Handoff
              </h3>
            </div>
          </div>

          <button
            onClick={() => setIsHandoffOpen(false)}
            style={{
              width: '32px',
              height: '32px',
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
            <X size={16} />
          </button>
        </div>

        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Active Session Summary */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(212, 175, 122, 0.35)',
              borderRadius: '16px',
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <div>
              <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-muted-text)', fontWeight: 700 }}>
                Active Atelier Payload Ready to Sync
              </div>
              <div style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--color-primary-burgundy)', marginTop: '2px' }}>
                {cart.length} Bag Creation{cart.length === 1 ? '' : 's'} • {wishlist.length} Wishlisted • {compareList.length} Compared
              </div>
            </div>

            <span
              style={{
                background: 'rgba(92, 26, 46, 0.08)',
                border: '1px solid rgba(92, 26, 46, 0.25)',
                color: 'var(--color-primary-burgundy)',
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '0.72rem',
                fontWeight: 700,
                fontFamily: 'monospace'
              }}
            >
              {sessionData.shortCode}
            </span>
          </div>

          {/* Nearby Android 17 Devices */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--color-muted-text)', fontWeight: 700, marginBottom: '10px' }}>
              <Wifi size={13} style={{ color: '#22C55E' }} />
              <span>Instant Beam to Nearby Android 17 Devices</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {NEARBY_DEVICES.map((dev) => {
                const IconComp = dev.icon;
                const isBeaming = beamingDeviceId === dev.id;
                return (
                  <div
                    key={dev.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      borderRadius: '14px',
                      background: '#FFFFFF',
                      border: '1px solid rgba(139, 115, 85, 0.25)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '12px',
                          background: 'rgba(92, 26, 46, 0.08)',
                          color: 'var(--color-primary-burgundy)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <IconComp size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--color-text-charcoal)' }}>
                          {dev.name}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--color-muted-text)' }}>
                          {dev.os} • <span style={{ color: '#15803D', fontWeight: 600 }}>{dev.signal}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleBeamToDevice(dev)}
                      style={{
                        padding: '7px 14px',
                        borderRadius: '999px',
                        background: isBeaming ? '#D4AF7A' : 'var(--color-primary-burgundy)',
                        color: isBeaming ? '#1A0A10' : '#FDFBF7',
                        border: 'none',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        cursor: 'pointer'
                      }}
                    >
                      {isBeaming ? 'Beaming...' : 'Continue Here'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Share Continuity Link / Copy */}
          <div>
            <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--color-muted-text)', fontWeight: 700, marginBottom: '8px' }}>
              Universal Web-to-App Continuity Link
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                readOnly
                value={sessionData.url}
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  borderRadius: '12px',
                  border: '1px solid rgba(139, 115, 85, 0.3)',
                  background: '#F6F1EA',
                  fontSize: '0.74rem',
                  color: 'var(--color-text-charcoal)',
                  outline: 'none'
                }}
              />
              <button
                onClick={handleCopyLink}
                style={{
                  padding: '10px 16px',
                  borderRadius: '12px',
                  background: '#FFFFFF',
                  border: '1px solid var(--color-primary-burgundy)',
                  color: 'var(--color-primary-burgundy)',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={handleNativeShare}
                className="btn-gold"
                style={{
                  padding: '10px 16px',
                  borderRadius: '12px',
                  fontSize: '0.74rem'
                }}
              >
                <Share2 size={14} />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Restore Session from Another Device */}
          <form
            onSubmit={handleImportSubmit}
            style={{
              paddingTop: '14px',
              borderTop: '1px solid rgba(212, 175, 122, 0.25)',
              display: 'flex',
              gap: '8px',
              alignItems: 'center'
            }}
          >
            <input
              type="text"
              placeholder="Paste Android 17 Handoff Link or Token from another device..."
              value={importInput}
              onChange={(e) => setImportInput(e.target.value)}
              style={{
                flex: 1,
                padding: '9px 12px',
                borderRadius: '12px',
                border: '1px solid rgba(139, 115, 85, 0.3)',
                background: '#FFFFFF',
                fontSize: '0.75rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                padding: '9px 16px',
                borderRadius: '12px',
                background: '#1A0A10',
                color: '#D4AF7A',
                border: '1px solid #D4AF7A',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Restore Session
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

