import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  ShoppingBag, 
  Heart, 
  Sparkles, 
  Calendar, 
  Menu, 
  X, 
  Search,
  Scissors,
  User,
  LogOut,
  Sliders,
  ChevronDown,
  Crown,
  BookOpen,
  ShieldCheck,
  Mail
} from 'lucide-react';

export const Navbar = () => {
  const { 
    totalItemsCount, 
    setIsCartOpen, 
    wishlist, 
    openAppointmentModal,
    currentUser,
    openAuthModal,
    logoutClient,
    returnToEntryCover,
    setIsAdminOpen,
    isInboxOpen,
    setIsInboxOpen,
    userMessages
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const userDropdownRef = useRef(null);
  const categoryDropdownRef = useRef(null);

  const clientEmail = (currentUser?.email || '').toLowerCase();
  const unreadInboxCount = userMessages.filter(
    (m) => ((m.recipientEmail || '').toLowerCase() === clientEmail || m.recipientId === currentUser?.id || !m.recipientEmail) && !m.read
  ).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setCategoryDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      {/* Top Luxury Bar */}
      <div style={{
        background: isScrolled ? 'rgba(248, 243, 236, 0.96)' : 'transparent',
        borderBottom: '1px solid rgba(212, 175, 122, 0.18)',
        padding: '7px 28px',
        fontSize: '0.72rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'var(--color-muted-text)',
        transition: 'background 0.3s ease'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={12} style={{ color: 'var(--color-champagne-gold)' }} />
            <span style={{ color: 'var(--color-primary-burgundy)', fontWeight: 600 }}>EMMY'S COUTURE</span>
          </div>

          <button
            onClick={returnToEntryCover}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-muted-text)',
              cursor: 'pointer',
              fontSize: '0.68rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              paddingLeft: '14px',
              borderLeft: '1px solid rgba(212, 175, 122, 0.3)'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary-burgundy)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-muted-text)')}
            title="Return to The Emmy's edit cover"
          >
            <BookOpen size={11} style={{ color: 'var(--color-champagne-gold)' }} />
            <span className="hidden sm:inline">The Emmy's Edit Cover</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Currency Indicator (INR Only) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-champagne-gold)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em' }}>INR (₹)</span>
          </div>

          {/* Client Account Dropdown Trigger & Inbox Button */}
          {currentUser && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Direct Atelier Inbox Button */}
              <button
                onClick={() => setIsInboxOpen(true)}
                style={{
                  background: 'rgba(92, 26, 46, 0.06)',
                  border: '1px solid rgba(212, 175, 122, 0.4)',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-primary-burgundy)',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s ease'
                }}
                title="Atelier Inbox & Maison Letters"
              >
                <Mail size={14} />
                {unreadInboxCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-4px',
                      right: '-4px',
                      minWidth: '15px',
                      height: '15px',
                      borderRadius: '10px',
                      background: '#9C1A1A',
                      color: '#FFFFFF',
                      fontSize: '0.58rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1.5px solid #FFFFFF',
                      padding: '0 3px'
                    }}
                  >
                    {unreadInboxCount}
                  </span>
                )}
              </button>

              <div style={{ position: 'relative' }} ref={userDropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  style={{
                    background: currentUser.isVip ? 'linear-gradient(135deg, rgba(212, 175, 122, 0.2) 0%, rgba(92, 26, 46, 0.1) 100%)' : 'rgba(92, 26, 46, 0.06)',
                    border: currentUser.isVip ? '1px solid #D4AF7A' : '1px solid rgba(212, 175, 122, 0.4)',
                    borderRadius: '20px',
                    padding: '3px 12px',
                    color: 'var(--color-primary-burgundy)',
                    cursor: 'pointer',
                    fontSize: '0.72rem',
                    letterSpacing: '0.08em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontWeight: 600
                  }}
                >
                  <Crown size={13} style={{ color: currentUser.isVip ? '#B8860B' : 'var(--color-champagne-gold)' }} />
                  <span>{currentUser.name}</span>
                  {currentUser.isVip && (
                    <span style={{ fontSize: '0.58rem', background: '#5C1A2E', color: '#FAF7F2', padding: '1px 5px', borderRadius: '4px', fontWeight: 800 }}>
                      VIP
                    </span>
                  )}
                  <ChevronDown size={12} style={{ transform: userDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </button>

                {/* User Dropdown Menu */}
                {userDropdownOpen && currentUser && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 8px)',
                      right: 0,
                      width: '270px',
                      background: '#FFFFFF',
                      border: '1px solid rgba(212, 175, 122, 0.35)',
                      boxShadow: '0 15px 35px rgba(92, 26, 46, 0.12)',
                      borderRadius: '4px',
                      padding: '16px',
                      zIndex: 100,
                      animation: 'fadeIn 0.2s ease'
                    }}
                  >
                    <div style={{ paddingBottom: '12px', borderBottom: '1px solid rgba(212, 175, 122, 0.2)', marginBottom: '12px' }}>
                      <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--color-primary-burgundy)', textTransform: 'none' }}>
                        {currentUser.name}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#887B72', textTransform: 'none', marginTop: '2px' }}>
                        {currentUser.email}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', flexWrap: 'wrap' }}>
                        {currentUser.isVip ? (
                          <span style={{ fontSize: '0.64rem', background: 'linear-gradient(135deg, #D4AF7A 0%, #AA7C39 100%)', color: '#1A1A1A', padding: '2px 8px', borderRadius: '10px', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            <Crown size={10} /> Privé VIP Member
                          </span>
                        ) : (
                          <span style={{ fontSize: '0.64rem', background: 'rgba(139, 115, 85, 0.15)', color: '#6E645D', padding: '2px 8px', borderRadius: '10px', fontWeight: 600 }}>
                            Standard Patron
                          </span>
                        )}
                        <span style={{ fontSize: '0.62rem', background: 'rgba(92, 26, 46, 0.08)', color: '#5C1A2E', padding: '2px 6px', borderRadius: '8px', fontWeight: 600 }}>
                          {currentUser.city || 'Kochi Maison'}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          setIsInboxOpen(true);
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          textAlign: 'left',
                          color: '#2B2B2B',
                          fontSize: '0.74rem',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '6px 0',
                          fontWeight: unreadInboxCount > 0 ? 700 : 500
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary-burgundy)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#2B2B2B')}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Mail size={13} style={{ color: 'var(--color-champagne-gold)' }} />
                          <span>Atelier Inbox & Letters</span>
                        </div>
                        {unreadInboxCount > 0 && (
                          <span style={{ background: '#9C1A1A', color: '#FFFFFF', fontSize: '0.62rem', fontWeight: 800, padding: '1px 6px', borderRadius: '8px' }}>
                            {unreadInboxCount}
                          </span>
                        )}
                      </button>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      openAppointmentModal();
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      color: '#2B2B2B',
                      fontSize: '0.74rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '6px 0'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary-burgundy)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#2B2B2B')}
                  >
                    <Calendar size={13} style={{ color: 'var(--color-champagne-gold)' }} />
                    <span>Book Salon Fitting</span>
                  </button>

                  {currentUser?.role === 'admin' && (
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        setIsAdminOpen(true);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        textAlign: 'left',
                        color: '#5C1A2E',
                        fontSize: '0.74rem',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 0',
                        fontWeight: 700
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#D4AF7A')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#5C1A2E')}
                    >
                      <ShieldCheck size={13} style={{ color: '#D4AF7A' }} />
                      <span>Atelier Admin Console</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      returnToEntryCover();
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      color: '#2B2B2B',
                      fontSize: '0.74rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '6px 0'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-primary-burgundy)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#2B2B2B')}
                  >
                    <BookOpen size={13} style={{ color: 'var(--color-champagne-gold)' }} />
                    <span>View Cover Portal</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      logoutClient();
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      color: '#9C1A1A',
                      fontSize: '0.74rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 0 2px 0',
                      borderTop: '1px solid rgba(0,0,0,0.06)',
                      marginTop: '4px'
                    }}
                  >
                    <LogOut size={13} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
              </div>
            </div>
          )}

          <button
            onClick={() => openAppointmentModal()}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-primary-burgundy)',
              cursor: 'pointer',
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              fontWeight: 600
            }}
          >
            <Calendar size={12} style={{ color: 'var(--color-champagne-gold)' }} />
            <span className="hidden sm:inline">Book Salon</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        style={{
          background: isScrolled
            ? 'rgba(253, 251, 247, 0.94)'
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'blur(4px)',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'blur(4px)',
          borderBottom: isScrolled ? '1px solid rgba(212, 175, 122, 0.25)' : '1px solid rgba(212, 175, 122, 0.15)',
          boxShadow: isScrolled ? '0 4px 24px rgba(92, 26, 46, 0.06)' : 'none',
          padding: isScrolled ? '14px 28px' : '18px 28px',
          transition: 'all 0.4s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Left Menu / Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden"
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--ivory-text)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div
            style={{
              display: 'none',
              gap: '28px',
              alignItems: 'center'
            }}
            className="hidden lg:flex"
          >
            <button
              onClick={() => scrollToSection('collections')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--ivory-text)',
                fontSize: '0.78rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontWeight: 400,
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--gold-accent)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--ivory-text)')}
            >
              Couture Collections
            </button>

            {/* Categories Dropdown Menu */}
            <div style={{ position: 'relative' }} ref={categoryDropdownRef}>
              <button
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--ivory-text)',
                  fontSize: '0.78rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  fontWeight: 400,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--gold-accent)')}
                onMouseLeave={(e) => (e.target.style.color = 'var(--ivory-text)')}
              >
                <span>Categories</span>
                <ChevronDown size={12} style={{ color: 'var(--color-champagne-gold)', transform: categoryDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
              </button>

              {categoryDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 14px)',
                    left: '0',
                    width: '260px',
                    background: '#FFFFFF',
                    border: '1px solid rgba(212, 175, 122, 0.45)',
                    borderRadius: '2px',
                    boxShadow: '0 12px 35px rgba(45, 8, 20, 0.15)',
                    padding: '8px 0',
                    zIndex: 200,
                    animation: 'modalSlideUp 0.2s ease'
                  }}
                >
                  <div style={{ padding: '8px 16px 4px 16px', fontSize: '0.64rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#887B72', fontWeight: 700 }}>
                    South Indian Silhouettes
                  </div>

                  {[
                    { id: 'churidar', label: '✦ Churidar & Anarkali Suits', tag: 'New Couture' },
                    { id: 'half-sarees', label: 'Pattu Pavadai & Half Sarees', tag: 'Heritage' },
                    { id: 'bridal', label: 'Bridal & Muhurtham Lehengas', tag: 'Bridal' },
                    { id: 'crop-tops', label: 'Modern Brocade Crop Sets', tag: 'Modern' },
                    { id: 'sarees', label: 'Heritage Pattu Sarees', tag: 'Silk' },
                    { id: 'blouses', label: 'Bespoke Maggam Blouses', tag: 'Craft' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setCategoryDropdownOpen(false);
                        scrollToSection('collections');
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        background: 'none',
                        border: 'none',
                        padding: '9px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        color: cat.id === 'churidar' ? '#5C1A2E' : '#2B2B2B',
                        fontSize: '0.76rem',
                        fontWeight: cat.id === 'churidar' ? 700 : 500,
                        cursor: 'pointer',
                        transition: 'background 0.2s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#FAF7F2')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                    >
                      <span>{cat.label}</span>
                      <span
                        style={{
                          fontSize: '0.6rem',
                          padding: '1px 6px',
                          borderRadius: '10px',
                          background: cat.id === 'churidar' ? 'rgba(92, 26, 46, 0.1)' : 'rgba(139, 115, 85, 0.1)',
                          color: cat.id === 'churidar' ? '#5C1A2E' : '#6E645D',
                          fontWeight: 700
                        }}
                      >
                        {cat.tag}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => scrollToSection('customizer')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--ivory-text)',
                fontSize: '0.78rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontWeight: 400,
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--gold-accent)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--ivory-text)')}
            >
              Bespoke Studio
            </button>

            <button
              onClick={() => scrollToSection('lookbook')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--ivory-text)',
                fontSize: '0.78rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontWeight: 400,
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--gold-accent)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--ivory-text)')}
            >
              Runway Lookbook
            </button>

            <button
              onClick={() => scrollToSection('heritage')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--ivory-text)',
                fontSize: '0.78rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                fontWeight: 400,
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--gold-accent)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--ivory-text)')}
            >
              Savoir-Faire & Craft
            </button>
          </div>
        </div>

        {/* Center Brand Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            cursor: 'pointer',
            textAlign: 'center',
            userSelect: 'none'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-signature)',
              fontSize: isScrolled ? '1.8rem' : '2.2rem',
              color: 'var(--gold-accent)',
              lineHeight: 0.9,
              display: 'block',
              transition: 'font-size 0.3s ease'
            }}
          >
            Emmy's
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: isScrolled ? '0.7rem' : '0.8rem',
              letterSpacing: '0.46em',
              textTransform: 'uppercase',
              color: 'var(--ivory-text)',
              fontWeight: 600,
              display: 'block',
              marginTop: '-2px'
            }}
          >
            COUTURE
          </span>
        </div>

        {/* Right Action Icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
          {/* Search Toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--ivory-text)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.2s ease'
            }}
            aria-label="Search Collection"
          >
            <Search size={18} />
          </button>

          {/* Wishlist Icon */}
          <button
            onClick={() => scrollToSection('collections')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--ivory-text)',
              cursor: 'pointer',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              transition: 'color 0.2s ease'
            }}
            aria-label="Wishlist"
          >
            <Heart size={19} />
            {wishlist.length > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-8px',
                  background: 'var(--gold-accent)',
                  color: '#1A1A1A',
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              background: 'rgba(201, 169, 97, 0.15)',
              border: '1px solid var(--gold-border)',
              borderRadius: '1px',
              padding: '8px 14px',
              color: 'var(--color-primary-text)',
              cursor: 'pointer',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              transition: 'var(--transition-smooth)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(201, 169, 97, 0.3)';
              e.currentTarget.style.borderColor = 'var(--gold-accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(201, 169, 97, 0.15)';
              e.currentTarget.style.borderColor = 'var(--gold-border)';
            }}
            aria-label="Open Cart Drawer"
          >
            <ShoppingBag size={16} style={{ color: 'var(--bronze-highlight)' }} />
            <span className="hidden sm:inline">Private Bag</span>
            {totalItemsCount > 0 && (
              <span
                style={{
                  background: 'var(--color-primary-text)',
                  color: '#FAF7F2',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  padding: '1px 6px',
                  borderRadius: '10px'
                }}
              >
                {totalItemsCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Expandable Search Drawer */}
      {searchOpen && (
        <div
          style={{
            background: '#FFFFFF',
            borderBottom: '1px solid var(--border-subtle)',
            boxShadow: '0 10px 25px rgba(26, 26, 26, 0.08)',
            padding: '16px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fadeIn 0.25s ease'
          }}
        >
          <div style={{ width: '100%', maxWidth: '600px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Search size={18} style={{ color: 'var(--bronze-highlight)' }} />
            <input
              type="text"
              placeholder="Search South Indian silk sarees, pattu pavadai, bustiers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                borderBottom: '1px solid var(--gold-border)',
                padding: '8px 4px',
                color: 'var(--color-primary-text)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
            <button
              onClick={() => {
                setSearchOpen(false);
                scrollToSection('collections');
              }}
              className="btn-gold"
              style={{ padding: '8px 18px', fontSize: '0.75rem' }}
            >
              Search
            </button>
            <button
              onClick={() => setSearchOpen(false)}
              style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            background: 'rgba(250, 247, 242, 0.98)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--border-subtle)',
            boxShadow: '0 15px 35px rgba(26, 26, 26, 0.1)',
            padding: '30px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            animation: 'fadeIn 0.3s ease'
          }}
          className="lg:hidden"
        >
          <button
            onClick={() => scrollToSection('collections')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--ivory-text)',
              textAlign: 'left',
              fontSize: '1rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '8px 0',
              borderBottom: '1px solid rgba(245, 240, 230, 0.08)'
            }}
          >
            Couture Collections
          </button>
          <button
            onClick={() => scrollToSection('customizer')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--ivory-text)',
              textAlign: 'left',
              fontSize: '1rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '8px 0',
              borderBottom: '1px solid rgba(245, 240, 230, 0.08)'
            }}
          >
            Bespoke Studio
          </button>
          <button
            onClick={() => scrollToSection('lookbook')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--ivory-text)',
              textAlign: 'left',
              fontSize: '1rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '8px 0',
              borderBottom: '1px solid rgba(245, 240, 230, 0.08)'
            }}
          >
            Runway Lookbook
          </button>
          <button
            onClick={() => scrollToSection('heritage')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--ivory-text)',
              textAlign: 'left',
              fontSize: '1rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '8px 0',
              borderBottom: '1px solid rgba(245, 240, 230, 0.08)'
            }}
          >
            Savoir-Faire & Craft
          </button>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              returnToEntryCover();
            }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--ivory-text)',
              textAlign: 'left',
              fontSize: '1rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '8px 0',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              borderBottom: '1px solid rgba(245, 240, 230, 0.08)'
            }}
          >
            <BookOpen size={18} style={{ color: 'var(--gold-accent)' }} />
            The Emmy's Edit Cover
          </button>

          {currentUser ? (
            <div
              style={{
                padding: '14px 0',
                borderBottom: '1px solid rgba(245, 240, 230, 0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Crown size={16} style={{ color: currentUser.isVip ? '#B8860B' : 'var(--gold-accent)' }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-primary-burgundy)' }}>
                  {currentUser.name}
                </span>
                {currentUser.isVip ? (
                  <span style={{ fontSize: '0.64rem', background: 'linear-gradient(135deg, #D4AF7A 0%, #AA7C39 100%)', color: '#1A1A1A', padding: '2px 8px', borderRadius: '10px', fontWeight: 800 }}>
                    👑 Privé VIP
                  </span>
                ) : (
                  <span style={{ fontSize: '0.64rem', background: 'rgba(139, 115, 85, 0.2)', color: '#FAF7F2', padding: '2px 6px', borderRadius: '8px' }}>
                    Standard Patron
                  </span>
                )}
              </div>
              <div style={{ fontSize: '0.74rem', color: '#887B72' }}>
                {currentUser.email} • {currentUser.city || 'Kochi Maison'}
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsInboxOpen(true);
                }}
                style={{
                  background: 'rgba(212, 175, 122, 0.15)',
                  border: '1px solid rgba(212, 175, 122, 0.3)',
                  color: '#FAF7F2',
                  padding: '8px 12px',
                  borderRadius: '2px',
                  fontSize: '0.78rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '4px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={14} style={{ color: '#D4AF7A' }} />
                  <span>Atelier Inbox & Letters</span>
                </div>
                {unreadInboxCount > 0 && (
                  <span style={{ background: '#9C1A1A', color: '#FFFFFF', fontSize: '0.64rem', fontWeight: 800, padding: '1px 6px', borderRadius: '8px' }}>
                    {unreadInboxCount} New
                  </span>
                )}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logoutClient();
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#9C1A1A',
                  fontSize: '0.78rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textAlign: 'left',
                  cursor: 'pointer',
                  paddingTop: '6px'
                }}
              >
                Sign Out of Atelier Session
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openAuthModal('login');
              }}
              style={{
                background: 'rgba(92, 26, 46, 0.08)',
                border: '1px solid rgba(212, 175, 122, 0.4)',
                color: 'var(--color-primary-burgundy)',
                padding: '12px',
                borderRadius: '2px',
                fontSize: '0.82rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Client Sign In / Register
            </button>
          )}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openAppointmentModal();
            }}
            className="btn-gold"
            style={{ width: '100%', marginTop: '10px' }}
          >
            <Calendar size={16} />
            Book Private Atelier Fitting
          </button>
        </div>
      )}
    </header>
  );
};
