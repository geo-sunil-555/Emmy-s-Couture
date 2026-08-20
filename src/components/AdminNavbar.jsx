import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Crown, 
  Layers, 
  Plus, 
  ShoppingBag, 
  Calendar, 
  Users, 
  Sliders, 
  Trash2, 
  ArrowLeft, 
  LogOut, 
  ExternalLink, 
  Search, 
  CheckCircle2, 
  ShieldCheck, 
  Database,
  Sparkles,
  MapPin,
  Menu,
  X
} from 'lucide-react';

export const AdminNavbar = ({
  activeTab,
  setActiveTab,
  totalDresses,
  ordersCount,
  activeReservations,
  usersCount,
  onOpenAddDress
}) => {
  const { 
    isSupabaseConfigured, 
    clearAdminHistory, 
    navigateTo, 
    adminLogout, 
    adminUser 
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const NAV_ITEMS = [
    { 
      id: 'overview', 
      label: 'Dashboard Overview', 
      shortLabel: 'Overview',
      icon: Layers, 
      badge: null 
    },
    { 
      id: 'products', 
      label: 'Dress Catalog & Inventory', 
      shortLabel: 'Dresses',
      icon: Plus, 
      badge: totalDresses,
      badgeColor: '#5C1A2E'
    },
    { 
      id: 'orders', 
      label: 'Purchase Requests', 
      shortLabel: 'Orders',
      icon: ShoppingBag, 
      badge: ordersCount,
      badgeColor: ordersCount > 0 ? '#C05621' : null
    },
    { 
      id: 'appointments', 
      label: 'Kerala Salon Reservations', 
      shortLabel: 'Salons',
      icon: Calendar, 
      badge: activeReservations,
      badgeColor: activeReservations > 0 ? '#2B6CB0' : null
    },
    { 
      id: 'clients', 
      label: 'VIP Client Directory', 
      shortLabel: 'VIP Clients',
      icon: Users, 
      badge: usersCount,
      badgeColor: null
    }
  ];

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: '#FFFFFF',
        borderBottom: '1px solid rgba(139, 115, 85, 0.2)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
      }}
    >
      {/* ========================================================
          1. TOP COMMAND BAR (Burgundy Velvet & Gold)
         ======================================================== */}
      <div
        style={{
          background: 'linear-gradient(135deg, #2D0814 0%, #1A030C 100%)',
          color: '#FAF7F2',
          padding: '12px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px',
          borderBottom: '1px solid rgba(212, 175, 122, 0.3)'
        }}
      >
        {/* Left: Maison Brand & Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => setActiveTab('overview')}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(212, 175, 122, 0.25) 0%, rgba(92, 26, 46, 0.4) 100%)',
                border: '1px solid rgba(212, 175, 122, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(212, 175, 122, 0.2)'
              }}
            >
              <Crown size={18} style={{ color: '#D4AF7A' }} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontFamily: 'var(--font-signature)', fontSize: '1.8rem', color: '#D4AF7A', lineHeight: 1 }}>
                  Emmy's
                </span>
                <span style={{ fontSize: '0.68rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#E8D5B7', fontWeight: 700 }}>
                  ATELIER ADMIN
                </span>
              </div>
              <div style={{ fontSize: '0.64rem', color: 'rgba(232, 213, 183, 0.7)', letterSpacing: '0.06em' }}>
                Kerala Salons • Inventory, Client Purchase & Salon Booking Console
              </div>
            </div>
          </div>

          {/* Database Live Status Badge */}
          <div
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(212, 175, 122, 0.12)',
              border: '1px solid rgba(212, 175, 122, 0.3)',
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '0.68rem',
              color: '#D4AF7A'
            }}
            className="md:flex"
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: isSupabaseConfigured ? '#48BB78' : '#ECC94B', display: 'inline-block' }} />
            <span>{isSupabaseConfigured ? 'PostgreSQL Live Connected' : 'Atelier DB Ready'}</span>
          </div>
        </div>

        {/* Right: Actions & User Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {/* Quick Action: Add New Dress */}
          <button
            onClick={onOpenAddDress}
            style={{
              background: 'linear-gradient(135deg, #D4AF7A 0%, #B38E58 100%)',
              color: '#20060E',
              border: 'none',
              padding: '7px 14px',
              borderRadius: '2px',
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              boxShadow: '0 2px 10px rgba(212, 175, 122, 0.3)',
              transition: 'all 0.2s ease'
            }}
          >
            <Plus size={13} />
            <span>+ Add Dress</span>
          </button>

          {/* Clear Admin History Button */}
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to clear all historical purchase requests, salon reservations, and client logs?')) {
                clearAdminHistory();
              }
            }}
            style={{
              background: 'rgba(230, 80, 80, 0.16)',
              border: '1px solid rgba(230, 80, 80, 0.4)',
              color: '#FFB8B8',
              padding: '7px 12px',
              borderRadius: '2px',
              fontSize: '0.7rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(230, 80, 80, 0.3)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(230, 80, 80, 0.16)')}
            title="Clear all order logs, salon reservations, and client history"
          >
            <Trash2 size={12} />
            <span>Clear Logs</span>
          </button>

          {/* View Public Storefront */}
          <button
            onClick={() => navigateTo('/')}
            style={{
              background: 'rgba(212, 175, 122, 0.18)',
              border: '1px solid rgba(212, 175, 122, 0.45)',
              color: '#FAF7F2',
              padding: '7px 14px',
              borderRadius: '2px',
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#D4AF7A', e.currentTarget.style.color = '#20060E')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(212, 175, 122, 0.18)', e.currentTarget.style.color = '#FAF7F2')}
            title="Switch to public boutique storefront"
          >
            <ArrowLeft size={13} />
            <span>Storefront</span>
          </button>

          {/* Admin Profile & Sign Out */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '8px', borderLeft: '1px solid rgba(212, 175, 122, 0.3)' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: '#5C1A2E',
                border: '1px solid #D4AF7A',
                color: '#D4AF7A',
                fontSize: '0.7rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title={adminUser?.email || 'admin@emmyscouture.com'}
            >
              MD
            </div>

            <button
              onClick={adminLogout}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(232, 213, 183, 0.75)',
                fontSize: '0.72rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FF9999')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(232, 213, 183, 0.75)')}
              title="End admin session and log out"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          2. LUXURY NAVIGATION TABS BAR
         ======================================================== */}
      <div
        style={{
          padding: '0 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          overflowX: 'auto',
          background: '#FFFFFF'
        }}
      >
        <div style={{ display: 'flex', gap: '6px' }}>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  borderBottom: isActive ? '3px solid #5C1A2E' : '3px solid transparent',
                  padding: '14px 16px',
                  color: isActive ? '#5C1A2E' : '#6E645D',
                  fontWeight: isActive ? 700 : 600,
                  fontSize: '0.8rem',
                  letterSpacing: '0.06em',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = '#5C1A2E';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = '#6E645D';
                }}
              >
                <Icon size={15} style={{ color: isActive ? '#5C1A2E' : '#A39589' }} />
                <span>{item.label}</span>
                {item.badge !== null && item.badge !== undefined && (
                  <span
                    style={{
                      background: isActive ? '#5C1A2E' : 'rgba(110, 100, 93, 0.1)',
                      color: isActive ? '#FFFFFF' : '#6E645D',
                      fontSize: '0.66rem',
                      padding: '2px 7px',
                      borderRadius: '10px',
                      fontWeight: 700
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Kerala Atelier Salons List Pin */}
        <div
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.72rem',
            color: '#887B72',
            paddingLeft: '16px'
          }}
          className="lg:flex"
        >
          <MapPin size={12} style={{ color: '#D4AF7A' }} />
          <span>Kochi • Trivandrum • Kozhikode • Thrissur • Kumarakom</span>
        </div>
      </div>
    </nav>
  );
};
