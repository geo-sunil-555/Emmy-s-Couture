import React, { useEffect, Suspense, lazy } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ShopProvider, useShop } from './context/ShopContext';
import { EntryPortal } from './components/EntryPortal';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HorizontalCollectionGallery } from './components/HorizontalCollectionGallery';
import { CraftsmanshipPinnedSection } from './components/CraftsmanshipPinnedSection';
import { AtelierCustomizer } from './components/AtelierCustomizer';
import { CollectionSection } from './components/CollectionSection';
import { RunwayLookbook } from './components/RunwayLookbook';
import { HeritageSection } from './components/HeritageSection';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

// Code-split heavy interactive modals and isolated administrative pages
const AuthModal = lazy(() => import('./components/AuthModal').then((m) => ({ default: m.AuthModal })));
const ProductQuickView = lazy(() => import('./components/ProductQuickView').then((m) => ({ default: m.ProductQuickView })));
const AppointmentModal = lazy(() => import('./components/AppointmentModal').then((m) => ({ default: m.AppointmentModal })));
const CartDrawer = lazy(() => import('./components/CartDrawer').then((m) => ({ default: m.CartDrawer })));
const CheckoutModal = lazy(() => import('./components/CheckoutModal').then((m) => ({ default: m.CheckoutModal })));
const StylistChat = lazy(() => import('./components/StylistChat').then((m) => ({ default: m.StylistChat })));
const UserInboxModal = lazy(() => import('./components/UserInboxModal').then((m) => ({ default: m.UserInboxModal })));
const AdminPage = lazy(() => import('./components/AdminPage').then((m) => ({ default: m.AdminPage })));
const Android17Hub = lazy(() => import('./components/Android17Hub').then((m) => ({ default: m.Android17Hub })));
const VirtualTryOnModal = lazy(() => import('./components/VirtualTryOnModal').then((m) => ({ default: m.VirtualTryOnModal })));
const ProductCompareDrawer = lazy(() => import('./components/ProductCompareDrawer').then((m) => ({ default: m.ProductCompareDrawer })));
const CrossDeviceHandoffModal = lazy(() => import('./components/CrossDeviceHandoffModal').then((m) => ({ default: m.CrossDeviceHandoffModal })));

gsap.registerPlugin(ScrollTrigger);

function MainContent() {
  const { hasEnteredSite } = useShop();

  useEffect(() => {
    if (!hasEnteredSite) return;

    // Initialize buttery-smooth Lenis scroll when main site is active
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5
    });

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger after assets settle
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [hasEnteredSite]);

  return (
    <>
      {/* 1. Welcome Editorial Entry Portal (Gated before entrance) */}
      {!hasEnteredSite && <EntryPortal />}

      {/* 2. Main Couture Website & Atelier */}
      {hasEnteredSite && (
        <div
          className="main-site-container"
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--bg-cream-base)',
            color: 'var(--color-primary-text)',
            animation: 'fadeInMaison 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <Navbar />
          
          <main style={{ flex: 1 }}>
            {/* 1. Hero Section (Parallax Scale & Float) */}
            <Hero />

            {/* 2. Collection Gallery (3-Card Horizontal Scroll-Jack) */}
            <HorizontalCollectionGallery />

            {/* 3. Craftsmanship Section (Sticky Macro Bodice Image + Scrolling Story) */}
            <CraftsmanshipPinnedSection />

            {/* 4. Interactive Bespoke Studio Customizer */}
            <AtelierCustomizer />

            {/* 5. Complete 54-Piece South Indian Couture Catalog */}
            <CollectionSection />

            {/* 5. Runway Lookbook & Interactive Hotspots */}
            <RunwayLookbook />

            {/* 6. Savoir-Faire & Master Weavers */}
            <HeritageSection />
          </main>

          <Footer />

          {/* Global Interactive Modals & Drawers (Code-split with Suspense) */}
          <Suspense fallback={null}>
            <ProductQuickView />
            <AppointmentModal />
            <CartDrawer />
            <CheckoutModal />
            <StylistChat />
            <UserInboxModal />
            <Android17Hub />
            <VirtualTryOnModal />
            <ProductCompareDrawer />
            <CrossDeviceHandoffModal />
          </Suspense>
        </div>
      )}

      {/* Global Authentication Modal & Notification Toasts */}
      <Suspense fallback={null}>
        <AuthModal />
      </Suspense>
      <Toast />
    </>
  );
}

function AppContent() {
  const { currentRoute } = useShop();

  // If visiting /admin or #admin, render the isolated, protected Admin Page
  if (currentRoute === 'admin') {
    return (
      <Suspense
        fallback={
          <div
            style={{
              minHeight: '100vh',
              background: '#1A0A10',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#D4AF7A',
              letterSpacing: '0.2em',
              fontSize: '0.85rem',
              textTransform: 'uppercase'
            }}
          >
            Loading Master Atelier Command...
          </div>
        }
      >
        <AdminPage />
        <Toast />
      </Suspense>
    );
  }

  // Otherwise render the public Customer Storefront
  return <MainContent />;
}

function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}

export default App;

