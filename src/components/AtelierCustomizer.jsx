import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Sparkles, 
  Scissors, 
  Layers, 
  Clock, 
  ShoppingBag, 
  Calendar, 
  Check, 
  Download,
  Info
} from 'lucide-react';

const SILHOUETTES = [
  {
    id: "rani-pink",
    name: "Rukmini Rani Pink & Ivory Brocade Pavadai",
    desc: "Festive ivory checked skirt with dual-tone rani pink temple border and brocade crop blouse.",
    basePrice: 6500,
    baseHours: 190,
    imageBg: "/images/rani_pink_ivory_chanderi_pavadai.jpg"
  },
  {
    id: "fuchsia-brocade",
    name: "Avantika Fuchsia & Gilded Brocade Crop Set",
    desc: "Vivid fuchsia brocade silk with woven gold mandala medallions and tailored sweetheart top.",
    basePrice: 8900,
    baseHours: 175,
    imageBg: "/images/fuchsia_brocade_crop_lehenga.jpg"
  },
  {
    id: "antique-rose",
    name: "Meera Antique Rose & Ivory Tissue Set",
    desc: "Handwoven geometric checked ivory silk with delicate antique rose gold-bordered dhavani.",
    basePrice: 11500,
    baseHours: 210,
    imageBg: "/images/antique_rose_ivory_tissue_drape.png"
  },
  {
    id: "royal-navy",
    name: "Aadrika Midnight & Ivory Royal Half Saree",
    desc: "Hand-pleated ivory mulberry silk with midnight navy dhavani and gold temple arch korvai borders.",
    basePrice: 14800,
    baseHours: 280,
    imageBg: "/images/royal_navy_ivory_half_saree.jpg"
  },
  {
    id: "rose-blush",
    name: "Samyukta Rose Blush & Zari Handloom Lehenga",
    desc: "Dusty rose silk brocade with diamond geometric jaal and draped tissue organza dupatta.",
    basePrice: 16500,
    baseHours: 290,
    imageBg: "/images/rose_blush_banarasi_tissue_lehenga.png"
  },
  {
    id: "emerald-crimson",
    name: "Devayani Emerald & Crimson Temple Pattu",
    desc: "Heavy 4-ply emerald silk studded with golden buttas and crimson maggam embroidered blouse.",
    basePrice: 18200,
    baseHours: 320,
    imageBg: "/images/emerald_crimson_kanchipuram_pattu.jpg"
  },
  {
    id: "imperial-wine",
    name: "Kalyani Imperial Wine 24k Zardozi Lehenga",
    desc: "All-over hand-sewn floral zardozi jaal on imperial wine mulberry raw silk.",
    basePrice: 19800,
    baseHours: 420,
    imageBg: "/images/imperial_wine_zardozi_bridal_lehenga.jpg"
  }
];

const FABRICS = [
  {
    id: "champagne-lame",
    name: "Champagne Gold Silk Lamé",
    origin: "Lyon, France",
    colorHex: "#C9A961",
    extraPrice: 15000,
    texture: "Liquid metallic luster with fluid micro-pleats"
  },
  {
    id: "noir-velvet",
    name: "Obsidian Noir Silk Velvet",
    origin: "Como, Italy",
    colorHex: "#0B0B0C",
    extraPrice: 12000,
    texture: "Deep ultra-soft light-absorbing mulberry silk pile"
  },
  {
    id: "emerald-zibeline",
    name: "Imperial Emerald Silk Zibeline",
    origin: "Lyon, France",
    colorHex: "#0D4626",
    extraPrice: 14000,
    texture: "Heavy architectural structured drape with soft sheen"
  },
  {
    id: "ivory-satin",
    name: "Alabaster Duchess Silk Satin",
    origin: "Como, Italy",
    colorHex: "#F5F0E6",
    extraPrice: 16000,
    texture: "High-density pearlescent bridal duchess satin"
  },
  {
    id: "ruby-taffeta",
    name: "Ruby Crimson Lacquer Taffeta",
    origin: "Lyon, France",
    colorHex: "#4A1220",
    extraPrice: 13000,
    texture: "Crisp architectural volume with deep burgundy reflections"
  }
];

const EMBELLISHMENTS = [
  {
    id: "gold-paillettes",
    name: "24k Gold Bullion & Paillettes",
    extraPrice: 28000,
    extraHours: 60,
    detail: "Hand-stitched 24k gold bullion filigree with micro-paillettes."
  },
  {
    id: "swarovski-crystals",
    name: "Swarovski Baguette Crystals",
    extraPrice: 24000,
    extraHours: 45,
    detail: "Hand-set crystals tracing architectural corset boning."
  },
  {
    id: "chantilly-pearls",
    name: "French Chantilly & Seed Pearls",
    extraPrice: 32000,
    extraHours: 80,
    detail: "Antique French lace appliqué with 2,500 natural seed pearls."
  },
  {
    id: "minimalist-pure",
    name: "Minimalist Sculptural Drape",
    extraPrice: 0,
    extraHours: 0,
    detail: "Pure architectural silhouette with flawless hand-rolled edges."
  }
];

const TRAIN_OPTIONS = [
  { id: "monarch-cape", name: "Monarch Cascading Cape (3.5m)", extraPrice: 16000 },
  { id: "cathedral", name: "Cathedral Royal Train (4.0m)", extraPrice: 20000 },
  { id: "court", name: "Court Train (1.5m)", extraPrice: 8000 },
  { id: "floor-length", name: "Floor Length / Modern Clean", extraPrice: 0 }
];

export const AtelierCustomizer = () => {
  const { formatPrice, addToCart, openAppointmentModal, showToast } = useShop();

  const [selectedSilhouette, setSelectedSilhouette] = useState(SILHOUETTES[0]);
  const [selectedFabric, setSelectedFabric] = useState(FABRICS[0]);
  const [selectedEmbellishment, setSelectedEmbellishment] = useState(EMBELLISHMENTS[0]);
  const [selectedTrain, setSelectedTrain] = useState(TRAIN_OPTIONS[0]);

  // Calculations
  const totalPriceUSD = 
    selectedSilhouette.basePrice + 
    selectedFabric.extraPrice + 
    selectedEmbellishment.extraPrice + 
    selectedTrain.extraPrice;

  const totalAtelierHours = 
    selectedSilhouette.baseHours + 
    selectedEmbellishment.extraHours;

  const handleAddToBag = () => {
    const bespokeProduct = {
      id: `custom-${Date.now()}`,
      name: `Bespoke: ${selectedSilhouette.name}`,
      priceUSD: totalPriceUSD,
      images: {
        primary: selectedSilhouette.imageBg
      },
      colors: [{ name: selectedFabric.name, hex: selectedFabric.colorHex }]
    };

    addToCart(bespokeProduct, {
      size: "Bespoke Custom Atelier Spec",
      color: selectedFabric.name,
      isCustom: true,
      customMeasurements: {
        silhouette: selectedSilhouette.name,
        fabric: `${selectedFabric.name} (${selectedFabric.origin})`,
        embellishment: selectedEmbellishment.name,
        train: selectedTrain.name,
        estimatedHours: `${totalAtelierHours} hours`
      }
    });
  };

  const handleBookFitting = () => {
    openAppointmentModal("fitting", "kochi");
    showToast(
      `Bespoke ${selectedSilhouette.name} specifications reserved for your consultation.`,
      "Atelier Specs Attached"
    );
  };

  return (
    <section id="customizer" className="section-padding" style={{ background: '#FDFBF7', position: 'relative' }}>
      <div className="container-couture" style={{ position: 'relative', zIndex: 10 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 60px auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--gold-accent)',
              fontSize: '0.74rem',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              marginBottom: '12px'
            }}
          >
            <Scissors size={15} />
            <span>Interactive Studio Atelier</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2rem, 4.2vw, 3.2rem)',
              lineHeight: 1.15,
              marginBottom: '18px',
              color: 'var(--ivory-text)'
            }}
          >
            Commission Your <br />
            <span style={{ color: 'var(--gold-accent)', fontStyle: 'italic', fontFamily: 'var(--font-serif-editorial)' }}>
              Emmy's Couture Masterwork
            </span>
          </h2>

          <p style={{ color: 'var(--ivory-muted)', fontSize: '0.96rem', lineHeight: 1.7 }}>
            Experience the private salon process online. Curate your silhouette, Lyon silk grade,
            hand-embroidery craftsmanship, and train specifications with real-time atelier pricing.
          </p>
        </div>

        {/* Customizer Workbench Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '40px',
            alignItems: 'start'
          }}
        >
          {/* LEFT: Live Interactive Visual Preview Studio */}
          <div
            className="glass-panel"
            style={{
              padding: '24px',
              borderRadius: '2px',
              border: '1px solid rgba(212, 175, 122, 0.35)',
              boxShadow: 'var(--shadow-card)',
              background: '#FFFFFF',
              position: 'sticky',
              top: '120px'
            }}
          >
            {/* Dedicated Top Studio Header for Silhouette & Fabric (Clear, Elegant & High Contrast) */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px',
                paddingBottom: '16px',
                marginBottom: '16px',
                borderBottom: '1px solid rgba(212, 175, 122, 0.25)'
              }}
            >
              <div>
                <div style={{ fontSize: '0.66rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-champagne-gold)', fontWeight: 700, marginBottom: '3px' }}>
                  Selected Creation
                </div>
                <h3 style={{ fontSize: '1.12rem', color: 'var(--color-primary-burgundy)', fontWeight: 600, margin: 0, lineHeight: 1.3 }}>
                  {selectedSilhouette.name}
                </h3>
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#F6F1EA',
                  padding: '6px 14px',
                  borderRadius: '1px',
                  border: '1px solid rgba(212, 175, 122, 0.4)',
                  fontSize: '0.74rem',
                  color: 'var(--color-primary-burgundy)',
                  fontWeight: 600
                }}
              >
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: selectedFabric.colorHex,
                    border: '1px solid rgba(255,255,255,0.9)',
                    boxShadow: '0 0 4px rgba(0,0,0,0.15)'
                  }}
                />
                <span>{selectedFabric.name}</span>
              </div>
            </div>

            {/* Canvas Preview Area */}
            <div
              style={{
                position: 'relative',
                minHeight: '560px',
                height: '560px',
                borderRadius: '2px',
                overflow: 'hidden',
                background: '#FAF7F2',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                border: '1px solid rgba(212, 175, 122, 0.2)'
              }}
            >
              {/* Active Silhouette Image (Full Size Uncropped) */}
              <img
                src={selectedSilhouette.imageBg}
                alt={selectedSilhouette.name}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'center center',
                  filter: 'contrast(1.02)',
                  transition: 'opacity 0.4s ease'
                }}
              />

              {/* Subtle Ambient Light Gradient */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(180deg, transparent 75%, rgba(92, 26, 46, 0.12) 100%)`,
                  pointerEvents: 'none',
                  transition: 'all 0.5s ease'
                }}
              />

              {/* Atelier Specs Bottom Bar */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 20,
                  width: '100%',
                  padding: '18px 20px',
                  background: 'rgba(250, 247, 242, 0.95)',
                  backdropFilter: 'blur(14px)',
                  borderTop: '1px solid rgba(139, 115, 85, 0.25)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-muted-text)', fontWeight: 600 }}>
                    Atelier Handcraft Time
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--bronze-highlight)', fontWeight: 700, fontSize: '0.92rem' }}>
                    <Clock size={14} />
                    <span>{totalAtelierHours} Dedicated Hours</span>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-muted-text)', fontWeight: 600 }}>
                    Bespoke Quotation
                  </div>
                  <div style={{ fontFamily: 'var(--font-serif-primary)', fontSize: '1.45rem', color: 'var(--color-primary-text)', fontWeight: 700 }}>
                    {formatPrice(totalPriceUSD)}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions for Left Column */}
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={handleAddToBag}
                className="btn-gold"
                style={{ width: '100%', padding: '14px', fontSize: '0.82rem' }}
              >
                <ShoppingBag size={16} />
                <span>Add Bespoke Creation to Private Bag</span>
              </button>

              <button
                onClick={handleBookFitting}
                className="btn-outline-gold"
                style={{ width: '100%', padding: '12px', fontSize: '0.8rem' }}
              >
                <Calendar size={15} />
                <span>Book Fitting with this Design</span>
              </button>
            </div>
          </div>

          {/* RIGHT: Step-by-Step Customization Studio Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* Step 1: Silhouette */}
            <div className="glass-card" style={{ padding: '24px', background: '#FFFFFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: '#1A1A1A',
                    color: '#FAF7F2',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  1
                </span>
                <h3 style={{ fontSize: '1.15rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary-text)', fontWeight: 600 }}>
                  Select Couture Silhouette
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {SILHOUETTES.map((sil) => {
                  const isSelected = selectedSilhouette.id === sil.id;
                  return (
                    <div
                      key={sil.id}
                      onClick={() => setSelectedSilhouette(sil)}
                      style={{
                        padding: '14px 18px',
                        borderRadius: '2px',
                        background: isSelected ? 'rgba(201, 169, 97, 0.15)' : '#FAF7F2',
                        border: isSelected ? '1px solid #C9A961' : '1px solid rgba(139, 115, 85, 0.2)',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'var(--transition-smooth)'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: isSelected ? 700 : 500, color: 'var(--color-primary-text)', fontSize: '0.92rem' }}>
                          {sil.name}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--color-muted-text)', marginTop: '2px' }}>
                          {sil.desc}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right', minWidth: '90px' }}>
                        <div style={{ color: 'var(--color-primary-text)', fontSize: '0.85rem', fontWeight: 700 }}>
                          {formatPrice(sil.basePrice)}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--color-muted-text)' }}>
                          {sil.baseHours}h atelier
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Fabric & Color */}
            <div className="glass-card" style={{ padding: '24px', background: '#FFFFFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: '#1A1A1A',
                    color: '#FAF7F2',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  2
                </span>
                <h3 style={{ fontSize: '1.15rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary-text)', fontWeight: 600 }}>
                  Pure Silk & Fabric Selection
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                {FABRICS.map((fab) => {
                  const isSelected = selectedFabric.id === fab.id;
                  return (
                    <div
                      key={fab.id}
                      onClick={() => setSelectedFabric(fab)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '2px',
                        background: isSelected ? 'rgba(201, 169, 97, 0.15)' : '#FAF7F2',
                        border: isSelected ? '1px solid #C9A961' : '1px solid rgba(139, 115, 85, 0.2)',
                        cursor: 'pointer',
                        transition: 'var(--transition-smooth)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <span
                          style={{
                            width: '22px',
                            height: '22px',
                            borderRadius: '50%',
                            background: fab.colorHex,
                            border: '1px solid rgba(139,115,85,0.4)',
                            display: 'inline-block'
                          }}
                        />
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-primary-text)' }}>
                          {fab.name}
                        </div>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-text)' }}>
                        {fab.texture} • <span style={{ color: 'var(--bronze-highlight)', fontWeight: 600 }}>{fab.origin}</span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-primary-text)', marginTop: '4px', fontWeight: 700 }}>
                        +{formatPrice(fab.extraPrice)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Artisanal Embellishment */}
            <div className="glass-card" style={{ padding: '24px', background: '#FFFFFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: '#1A1A1A',
                    color: '#FAF7F2',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  3
                </span>
                <h3 style={{ fontSize: '1.15rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary-text)', fontWeight: 600 }}>
                  Hand-Stitched Embellishments
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {EMBELLISHMENTS.map((emb) => {
                  const isSelected = selectedEmbellishment.id === emb.id;
                  return (
                    <div
                      key={emb.id}
                      onClick={() => setSelectedEmbellishment(emb)}
                      style={{
                        padding: '12px 16px',
                        borderRadius: '2px',
                        background: isSelected ? 'rgba(201, 169, 97, 0.15)' : '#FAF7F2',
                        border: isSelected ? '1px solid #C9A961' : '1px solid rgba(139, 115, 85, 0.2)',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'var(--transition-smooth)'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: isSelected ? 700 : 500, color: 'var(--color-primary-text)', fontSize: '0.88rem' }}>
                          {emb.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)' }}>
                          {emb.detail}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right', minWidth: '85px' }}>
                        <div style={{ color: 'var(--color-primary-text)', fontSize: '0.84rem', fontWeight: 700 }}>
                          {emb.extraPrice > 0 ? `+${formatPrice(emb.extraPrice)}` : 'Included'}
                        </div>
                        {emb.extraHours > 0 && (
                          <div style={{ fontSize: '0.7rem', color: 'var(--color-muted-text)' }}>
                            +{emb.extraHours}h
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Train & Cape Length */}
            <div className="glass-card" style={{ padding: '24px', background: '#FFFFFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: '#1A1A1A',
                    color: '#FAF7F2',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  4
                </span>
                <h3 style={{ fontSize: '1.15rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-primary-text)', fontWeight: 600 }}>
                  Train & Cape Architecture
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                {TRAIN_OPTIONS.map((train) => {
                  const isSelected = selectedTrain.id === train.id;
                  return (
                    <div
                      key={train.id}
                      onClick={() => setSelectedTrain(train)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '2px',
                        background: isSelected ? 'rgba(201, 169, 97, 0.15)' : '#FAF7F2',
                        border: isSelected ? '1px solid #C9A961' : '1px solid rgba(139, 115, 85, 0.2)',
                        cursor: 'pointer',
                        transition: 'var(--transition-smooth)'
                      }}
                    >
                      <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--color-primary-text)' }}>
                        {train.name}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-primary-text)', marginTop: '4px', fontWeight: 700 }}>
                        {train.extraPrice > 0 ? `+${formatPrice(train.extraPrice)}` : 'Included'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
