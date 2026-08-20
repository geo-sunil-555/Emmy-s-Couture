import React from 'react';
import { useShop } from '../context/ShopContext';

export const PersistentBackground = () => {
  const { activeGlobalGown } = useShop();
  const currentImage = activeGlobalGown?.image || '/images/website_editorial_bg.png';

  return (
    <div
      id="persistent-global-bg"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        background: '#FDFBF7'
      }}
      aria-hidden="true"
    >
      {/* High Couture Floating Gown / Editorial Full-Page Layer */}
      <div
        key={currentImage}
        className="floating-gown-motion"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(253,251,247,0.65) 0%, rgba(253,251,247,0.3) 35%, rgba(253,251,247,0.08) 65%, rgba(253,251,247,0.45) 100%),
            linear-gradient(to bottom, rgba(253,251,247,0.15) 0%, transparent 35%, rgba(253,251,247,0.5) 100%),
            url('${currentImage}')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center 15%',
          backgroundAttachment: 'fixed',
          opacity: 0.98,
          transition: 'all 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
          filter: 'contrast(1.08) brightness(1.03) saturate(1.08)',
          imageRendering: '-webkit-optimize-contrast'
        }}
      />

      {/* Atmospheric Soft Champagne Light Ray Orb */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: '25%',
          width: '650px',
          height: '650px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212,175,122,0.25) 0%, rgba(253,251,247,0) 70%)',
          filter: 'blur(95px)',
          opacity: 0.85
        }}
      />

      {/* Bottom Floating Glow Orb */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(92,26,46,0.06) 0%, rgba(253,251,247,0) 70%)',
          filter: 'blur(80px)',
          opacity: 0.7
        }}
      />

      {/* Drifting Fabric Swatches Signature Motif */}
      <div className="swatch-field">
        <span className="swatch swatch--a"></span>
        <span className="swatch swatch--b"></span>
        <span className="swatch swatch--c"></span>
        <span className="swatch swatch--d"></span>
        <span className="thread thread--a"></span>
        <span className="thread thread--b"></span>
      </div>
    </div>
  );
};
