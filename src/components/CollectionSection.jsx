import React, { useState, useMemo } from 'react';
import { CATEGORIES } from '../data/products';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { Sparkles, Search, SlidersHorizontal, RotateCcw, Mic, Scale } from 'lucide-react';

const PRICE_RANGES = [
  { id: 'all', label: 'All Prices' },
  { id: 'under-5k', label: 'Under ₹5,000', min: 0, max: 5000 },
  { id: '5k-20k', label: '₹5,000 – ₹20,000', min: 5000, max: 20000 },
  { id: '20k-75k', label: '₹20,000 – ₹75,000', min: 20000, max: 75000 },
  { id: 'above-75k', label: '₹75,000 – ₹2,50,000', min: 75000, max: 250000 }
];

export const CollectionSection = () => {
  const {
    products,
    globalSearchQuery,
    setGlobalSearchQuery,
    openVirtualTryOn,
    compareList,
    setIsCompareOpen,
    triggerHaptic,
    showToast
  } = useShop();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured'); // featured, price-high, price-low, rating
  const [isListening, setIsListening] = useState(false);

  const searchQuery = globalSearchQuery || '';
  const setSearchQuery = setGlobalSearchQuery;

  const startVoiceSearch = () => {
    triggerHaptic(18);
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRec) {
      try {
        const recognition = new SpeechRec();
        recognition.lang = 'en-IN';
        recognition.interimResults = false;
        setIsListening(true);
        showToast('Listening for voice query... (e.g., "Emerald Kanchipuram" or "Bridal Lehenga")', 'Android 17 Voice AI');
        recognition.onresult = (event) => {
          const transcript = event.results?.[0]?.[0]?.transcript || '';
          if (transcript) {
            setSearchQuery(transcript);
            showToast(`Filtered catalog by voice: "${transcript}"`, 'Voice Search Complete');
          }
          setIsListening(false);
        };
        recognition.onerror = () => {
          setIsListening(false);
        };
        recognition.onend = () => {
          setIsListening(false);
        };
        recognition.start();
        return;
      } catch {}
    }
    // Fallback smart voice prompt simulation if browser speech API is unavailable
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      setSearchQuery('Kanchipuram');
      showToast('Voice AI matched: "Kanchipuram" across the 54-piece catalog.', 'Android 17 Voice AI');
    }, 900);
  };

  const allProducts = products || [];

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((item) => item.category === selectedCategory);
    }

    // Price range filter
    if (selectedPriceRange !== 'all') {
      const range = PRICE_RANGES.find((r) => r.id === selectedPriceRange);
      if (range) {
        result = result.filter((item) => item.priceUSD >= range.min && item.priceUSD <= range.max);
      }
    }

    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.collection.toLowerCase().includes(query) ||
          item.shortDesc.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query) ||
          item.tag.toLowerCase().includes(query) ||
          (item.craftsmanship?.materials && item.craftsmanship.materials.toLowerCase().includes(query))
      );
    }

    // Sort
    if (sortBy === 'price-high') {
      result.sort((a, b) => b.priceUSD - a.priceUSD);
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => a.priceUSD - b.priceUSD);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, selectedPriceRange, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedPriceRange('all');
    setSearchQuery('');
    setSortBy('featured');
  };

  const isFiltered = selectedCategory !== 'all' || selectedPriceRange !== 'all' || searchQuery.trim() !== '';

  return (
    <section id="collections" className="section-padding" style={{ background: '#FDFBF7' }}>
      <div className="container-couture">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 42px auto' }}>
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
            <Sparkles size={14} />
            <span>Maison Archive & New 2026 Releases</span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.2rem, 4.4vw, 3.4rem)',
              lineHeight: 1.15,
              marginBottom: '16px',
              color: 'var(--ivory-text)'
            }}
          >
            Emmy's Couture <br />
            <span style={{ color: 'var(--gold-accent)', fontStyle: 'italic', fontFamily: 'var(--font-serif-editorial)' }}>
              Bridal & Prêt Collections
            </span>
          </h2>

          <p style={{ color: 'var(--ivory-muted)', fontSize: '0.96rem', lineHeight: 1.7 }}>
            Discover 54 authentic South Indian women's couture creations — from royal Kanchipuram bridal pattu sarees, Balaramapuram Kasavu, and Kalyana Dhavani half sarees to temple silk churidhars, aari blouse bustiers, and Dravidian fusion gowns. Starting from ₹2,500 to ₹2,50,000.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid rgba(139, 115, 85, 0.25)',
            boxShadow: '0 8px 30px rgba(26, 26, 26, 0.05)',
            borderRadius: '2px',
            padding: '24px',
            marginBottom: '38px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px'
          }}
        >
          {/* Category Selection Header & Dropdown */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '10px' }}>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--bronze-highlight)', fontWeight: 600 }}>
                Select South Indian Category
              </div>

              {/* Category Dropdown Menu */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.7rem', color: '#7A7067', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                  Category Menu:
                </span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid rgba(139, 115, 85, 0.35)',
                    borderRadius: '2px',
                    padding: '6px 12px',
                    fontSize: '0.76rem',
                    color: '#2B2B2B',
                    fontWeight: 600,
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px'
              }}
            >
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      background: isActive ? '#1A1A1A' : '#F3ECE2',
                      color: isActive ? '#FAF7F2' : '#1A1A1A',
                      border: isActive ? '1px solid #1A1A1A' : '1px solid rgba(139, 115, 85, 0.2)',
                      padding: '8px 16px',
                      fontSize: '0.74rem',
                      letterSpacing: '0.10em',
                      textTransform: 'uppercase',
                      fontWeight: isActive ? 600 : 500,
                      cursor: 'pointer',
                      borderRadius: '1px',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secondary Row: Price Range + Search + Sort */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '16px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(139, 115, 85, 0.12)'
            }}
          >
            {/* Price Filter Pills */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--color-muted-text)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
                Price:
              </span>
              {PRICE_RANGES.map((pr) => {
                const isSelected = selectedPriceRange === pr.id;
                return (
                  <button
                    key={pr.id}
                    onClick={() => setSelectedPriceRange(pr.id)}
                    style={{
                      background: isSelected ? 'rgba(201, 169, 97, 0.25)' : 'transparent',
                      color: isSelected ? '#1A1A1A' : '#6B6255',
                      border: isSelected ? '1px solid #C9A961' : '1px solid rgba(139, 115, 85, 0.2)',
                      padding: '5px 12px',
                      fontSize: '0.72rem',
                      fontWeight: isSelected ? 600 : 400,
                      borderRadius: '1px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {pr.label}
                  </button>
                );
              })}
            </div>

            {/* Search Input & Sort Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {/* Search Box + Android 17 Voice Search */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#FAF7F2',
                  border: isListening ? '1px solid var(--color-primary-burgundy)' : '1px solid rgba(139, 115, 85, 0.3)',
                  padding: '6px 12px',
                  borderRadius: '999px'
                }}
              >
                <Search size={13} style={{ color: 'var(--bronze-highlight)' }} />
                <input
                  type="text"
                  placeholder="Search 54 creations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'var(--color-primary-text)',
                    fontSize: '0.75rem',
                    width: '145px'
                  }}
                />
                <button
                  type="button"
                  onClick={startVoiceSearch}
                  style={{
                    background: isListening ? 'var(--color-primary-burgundy)' : 'rgba(92, 26, 46, 0.08)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isListening ? '#FDFBF7' : 'var(--color-primary-burgundy)',
                    cursor: 'pointer'
                  }}
                  title="Android 17 Voice Search"
                >
                  <Mic size={12} />
                </button>
              </div>

              {/* AI Virtual Drape & Compare Studio Quick Pills */}
              <button
                type="button"
                onClick={() => openVirtualTryOn()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '6px 12px',
                  borderRadius: '999px',
                  background: 'var(--color-primary-burgundy)',
                  color: '#FDFBF7',
                  border: '1px solid var(--color-primary-burgundy)',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Sparkles size={12} style={{ color: '#D4AF7A' }} />
                <span>AI Drape Studio</span>
              </button>

              <button
                type="button"
                onClick={() => setIsCompareOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '6px 12px',
                  borderRadius: '999px',
                  background: '#FAF7F2',
                  color: 'var(--color-primary-burgundy)',
                  border: '1px solid rgba(92, 26, 46, 0.3)',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                <Scale size={12} />
                <span>Compare ({compareList.length}/3)</span>
              </button>

              {/* Sort Selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--color-muted-text)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
                  Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    background: '#FAF7F2',
                    color: '#1A1A1A',
                    border: '1px solid rgba(139, 115, 85, 0.3)',
                    padding: '6px 20px 6px 10px',
                    fontSize: '0.74rem',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    borderRadius: '1px',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  <option value="featured">Featured Runway</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              {/* Reset Filters */}
              {isFiltered && (
                <button
                  onClick={resetFilters}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--bronze-highlight)',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                    padding: '4px 8px'
                  }}
                >
                  <RotateCcw size={11} />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Counter Info */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', fontSize: '0.76rem', color: 'var(--color-muted-text)' }}>
          <span>Showing <strong style={{ color: 'var(--bronze-highlight)' }}>{filteredProducts.length}</strong> of {allProducts.length} curated creations</span>
          <span style={{ letterSpacing: '0.05em', fontWeight: 600 }}>Prices: ₹2,500 – ₹2,50,000</span>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#FFFFFF', border: '1px solid rgba(139, 115, 85, 0.2)' }}>
            <p style={{ color: 'var(--color-muted-text)', fontSize: '1rem', marginBottom: '16px' }}>
              No pieces match your selected filter criteria.
            </p>
            <button
              onClick={resetFilters}
              className="btn-outline-gold"
              style={{ fontSize: '0.78rem', padding: '8px 20px' }}
            >
              Reset Filters & View All 54 Creations
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '32px'
            }}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

