import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { PRODUCTS as INITIAL_PRODUCTS } from '../data/products';
import { 
  supabase, 
  isSupabaseConfigured, 
  supabaseSignUp, 
  supabaseSignIn, 
  supabaseSignOut,
  supabaseSaveAppointment,
  supabaseSaveOrder,
  supabaseFetchOrders,
  supabaseFetchAppointments,
  supabaseFetchProfiles,
  supabaseUpdateOrderStatus,
  supabaseUpdateAppointmentStatus,
  supabaseResetPassword,
  supabaseUpdatePassword
} from '../lib/supabase';

const ShopContext = createContext();

export const CURRENCIES = {
  INR: { code: 'INR', symbol: '₹', rate: 1.0, label: 'INR (₹)' }
};

export const ShopProvider = ({ children }) => {
  // Currency state (INR only)
  const [currency, setCurrency] = useState('INR');

  // Dynamic Product / Dress Catalog State (Custom dresses + default collection)
  const [products, setProducts] = useState(() => {
    try {
      const deletedSaved = localStorage.getItem('emmys_deleted_product_ids');
      const deletedIds = new Set(deletedSaved ? JSON.parse(deletedSaved) : []);

      const saved = localStorage.getItem('emmys_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge any missing initial products (excluding any deleted ones)
          const existingIds = new Set(parsed.map((p) => p.id));
          const missing = INITIAL_PRODUCTS.filter((p) => !existingIds.has(p.id) && !deletedIds.has(p.id));
          const activeParsed = parsed.filter((p) => !deletedIds.has(p.id));
          return [...activeParsed, ...missing];
        }
      }
      return INITIAL_PRODUCTS.filter((p) => !deletedIds.has(p.id));
    } catch (e) {
      console.error('Error loading products from storage:', e);
    }
    return INITIAL_PRODUCTS;
  });

  // Bag / Cart State
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('emmys_cart');
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return parsed;
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // e.g. 0.15 for 15%
  const [packagingChoice, setPackagingChoice] = useState('signature-velvet'); // signature-velvet, bridal-white, eco-luxury
  const [selectedFragranceSample, setSelectedFragranceSample] = useState('Rose Noir & Oud');

  // Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('emmys_wishlist');
      if (!saved) return [];
      return JSON.parse(saved);
    } catch {
      return [];
    }
  });

  // Client Authentication & VIP Users State
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('emmys_users');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('emmys_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Purchase Orders State (Purchase Requests) - Empty clean slate by default
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('emmys_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Salon Consultation & Reservation Requests State - Empty clean slate by default
  const [appointments, setAppointments] = useState(() => {
    try {
      const saved = localStorage.getItem('emmys_appointments');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Atelier User Inbox & VIP Messages State
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [userMessages, setUserMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('emmys_user_messages');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((m) => ({
          ...m,
          sender: (m.sender || '')
            .replace(/Emmy's Haute Couture/gi, "Emmy's Couture")
            .replace(/Haute Couture/gi, "Couture")
            .replace(/Haute /gi, "")
            .replace(/ haute /gi, " "),
          subject: (m.subject || '')
            .replace(/Emmy's Haute Couture/gi, "Emmy's Couture")
            .replace(/Haute Couture/gi, "Couture")
            .replace(/Haute /gi, "")
            .replace(/ haute /gi, " "),
          body: (m.body || '')
            .replace(/Emmy's Haute Couture/gi, "Emmy's Couture")
            .replace(/Haute Couture/gi, "Couture")
            .replace(/Haute /gi, "")
            .replace(/ haute /gi, " ")
        }));
      }
    } catch {}
    return [];
  });

  // Runway Invitations State (List of emails with unlocked 15% coupon privilege)
  const [runwayInvitedEmails, setRunwayInvitedEmails] = useState(() => {
    try {
      const saved = localStorage.getItem('emmys_runway_invited_emails');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  // Incoming Runway Invitation Requests (Patrons who requested Le Cercle Privé access)
  const [invitationRequests, setInvitationRequests] = useState(() => {
    try {
      const saved = localStorage.getItem('emmys_invitation_requests');
      if (saved) return JSON.parse(saved);
    } catch {}
    return [];
  });

  // Dedicated Route State ('store' | 'admin')
  const [currentRoute, setCurrentRoute] = useState(() => {
    try {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/admin' || path.startsWith('/admin') || hash === '#admin') {
        return 'admin';
      }
    } catch {}
    return 'store';
  });

  const navigateTo = (route) => {
    if (route === '/admin' || route === 'admin') {
      window.history.pushState({}, '', '/admin');
      setCurrentRoute('admin');
    } else {
      window.history.pushState({}, '', '/');
      setCurrentRoute('store');
    }
  };

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/admin' || path.startsWith('/admin') || hash === '#admin') {
        setCurrentRoute('admin');
      } else {
        setCurrentRoute('store');
      }
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Dedicated Master Admin Session State
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const saved = localStorage.getItem('emmys_admin_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const isAdminAuthenticated = Boolean(adminUser);

  // Admin Portal View State
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminTab, setAdminTab] = useState('overview'); // 'overview' | 'products' | 'orders' | 'appointments' | 'clients'

  // Entry Portal Gate State (false = show 'The Emmy\'s edit' cover)
  const [hasEnteredSite, setHasEnteredSite] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('signup'); // 'signup' | 'login'

  // Modals & Overlays
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [appointmentInitialData, setAppointmentInitialData] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isStylistChatOpen, setIsStylistChatOpen] = useState(false);

  // =========================================================
  // ANDROID 17 • MATERIAL 3 EXPRESSIVE & CONTINUITY STATE
  // =========================================================
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [compareList, setCompareList] = useState(() => {
    try {
      const saved = localStorage.getItem('emmys_compare_list');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [virtualTryOnProduct, setVirtualTryOnProduct] = useState(null);
  const [isHandoffOpen, setIsHandoffOpen] = useState(false);
  const [isLiveUpdateExpanded, setIsLiveUpdateExpanded] = useState(false);
  const [liveTrackerStage, setLiveTrackerStage] = useState(1); // 0: Loom Reserved, 1: Pit-Loom Weaving, 2: 24k Zardozi, 3: 14-Pt Inspection, 4: Armored Courier

  useEffect(() => {
    try {
      localStorage.setItem('emmys_compare_list', JSON.stringify(compareList));
    } catch {}
  }, [compareList]);

  // Global Active Gown (Persistent Background while scrolling)
  const [activeGlobalGown, setActiveGlobalGown] = useState({
    id: 'editorial',
    name: "Emmy's Sovereign Editorial Salon",
    image: "/images/website_editorial_bg.png",
    fallbackImage: "/images/website_editorial_bg.png"
  });

  // Toast notifications
  const [toast, setToast] = useState(null);

  // Sync Supabase Auth & Remote DB Records
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    // Listen to Supabase Auth State
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const email = session.user.email;
        const meta = session.user.user_metadata || {};
        const clientUser = {
          id: session.user.id,
          name: meta.full_name || email.split('@')[0],
          email,
          city: meta.city || 'Kochi Flagship Maison',
          preference: meta.preference || 'Bridal Kanchipuram',
          memberSince: new Date(session.user.created_at || Date.now()).getFullYear().toString()
        };
        setCurrentUser(clientUser);
      }
    });

    // Optionally fetch remote PostgreSQL orders and appointments if available
    const syncRemoteData = async () => {
      try {
        const remoteOrders = await supabaseFetchOrders();
        if (remoteOrders && remoteOrders.length > 0) {
          setOrders((prev) => {
            const remoteMapped = remoteOrders.map(ro => ({
              orderNumber: ro.order_number,
              firstName: ro.client_name?.split(' ')[0] || '',
              lastName: ro.client_name?.split(' ').slice(1).join(' ') || '',
              email: ro.client_email,
              phone: ro.phone || '',
              address: ro.shipping_address?.address || '',
              city: ro.shipping_address?.city || '',
              country: ro.shipping_address?.country || 'India',
              postalCode: ro.shipping_address?.postalCode || '',
              items: ro.items || [],
              totalUSD: ro.total_usd || ro.total_inr || 0,
              totalINR: ro.total_inr || ro.total_usd || 0,
              paymentMethod: ro.payment_method || 'Card',
              packagingChoice: ro.packaging_choice || 'signature-velvet',
              fragranceSample: ro.fragrance_sample || 'Rose Noir',
              status: ro.status || 'Confirmed',
              createdAt: ro.created_at || new Date().toISOString()
            }));
            // Merge with local orders without duplicates
            const combined = [...prev];
            remoteMapped.forEach(ro => {
              if (!combined.some(o => o.orderNumber === ro.orderNumber)) {
                combined.unshift(ro);
              }
            });
            return combined;
          });
        }

        const remoteAppts = await supabaseFetchAppointments();
        if (remoteAppts && remoteAppts.length > 0) {
          setAppointments((prev) => {
            const remoteMapped = remoteAppts.map(ra => ({
              bookingRef: ra.booking_ref,
              name: ra.client_name,
              email: ra.client_email,
              phone: ra.client_phone,
              maisonId: ra.maison_id,
              maisonName: ra.maison_name,
              serviceId: ra.service_id,
              serviceTitle: ra.service_title,
              date: ra.appointment_date,
              time: ra.appointment_time,
              eventDate: ra.event_date,
              specialRequests: ra.special_requests,
              status: ra.status || 'Confirmed',
              createdAt: ra.created_at || new Date().toISOString()
            }));
            const combined = [...prev];
            remoteMapped.forEach(ra => {
              if (!combined.some(a => a.bookingRef === ra.bookingRef)) {
                combined.unshift(ra);
              }
            });
            return combined;
          });
        }
      } catch (err) {
        console.warn('Sync Remote DB error:', err);
      }
    };

    syncRemoteData();

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // Save to LocalStorage effects
  useEffect(() => {
    try {
      localStorage.setItem('emmys_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('emmys_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('emmys_appointments', JSON.stringify(appointments));
    } catch (e) {
      console.error(e);
    }
  }, [appointments]);

  useEffect(() => {
    try {
      localStorage.setItem('emmys_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('emmys_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('emmys_users', JSON.stringify(users));
    } catch (e) {
      console.error(e);
    }
  }, [users]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('emmys_auth_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('emmys_auth_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('emmys_user_messages', JSON.stringify(userMessages));
    } catch (e) {
      console.error('Failed to sync messages:', e);
    }
  }, [userMessages]);

  useEffect(() => {
    try {
      localStorage.setItem('emmys_runway_invited_emails', JSON.stringify(runwayInvitedEmails));
    } catch (e) {
      console.error('Failed to sync runway invitations:', e);
    }
  }, [runwayInvitedEmails]);

  useEffect(() => {
    try {
      localStorage.setItem('emmys_invitation_requests', JSON.stringify(invitationRequests));
    } catch (e) {
      console.error('Failed to sync invitation requests:', e);
    }
  }, [invitationRequests]);

  const showToast = (message, title = "Emmy's Maison Notice") => {
    setToast({ title, message, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Currency Converter helper (INR only) - Memoized
  const formatPrice = useCallback((priceUSD) => {
    if (priceUSD === undefined || priceUSD === null || isNaN(priceUSD)) return '₹0';
    const curr = CURRENCIES.INR;
    const converted = Math.round(Number(priceUSD) * curr.rate);
    return `${curr.symbol}${converted.toLocaleString('en-IN')}`;
  }, []);

  // ==========================================
  // DRESS & PRODUCT CATALOG OPERATIONS (ADMIN)
  // ==========================================
  const addProduct = (dressData) => {
    const newId = `ec-${Date.now().toString().slice(-4)}`;
    const newDress = {
      id: newId,
      name: dressData.name,
      collection: dressData.collection || 'Royal Heritage Collection',
      category: dressData.category || 'half-sarees',
      tag: dressData.tag || 'New Couture Masterpiece',
      priceUSD: Number(dressData.priceINR || dressData.priceUSD || 15000),
      shortDesc: dressData.shortDesc || dressData.description?.slice(0, 120) || 'Exquisite handcrafted South Indian couture piece.',
      description: dressData.description || 'Woven on master pit-looms with pure mulberry silk and authentic 24k gold zari.',
      craftsmanship: {
        atelierHours: dressData.craftsmanship?.atelierHours || '220 hours of master handloom weaving & tailoring',
        materials: dressData.craftsmanship?.materials || '100% Pure Mulberry Silk & 24k Gold Zari',
        embellishment: dressData.craftsmanship?.embellishment || 'Traditional temple korvai borders & fine zardozi detailing',
        origin: dressData.craftsmanship?.origin || 'Kochi Flagship Maison & Kerala Master Weavers',
        silhouette: dressData.craftsmanship?.silhouette || 'Royal South Indian Half Saree with Draped Dhavani'
      },
      images: {
        primary: dressData.image || '/images/royal_navy_ivory_half_saree.jpg',
        secondary: dressData.secondaryImage || dressData.image || '/images/royal_navy_ivory_half_saree.jpg',
        alt: dressData.name
      },
      colors: dressData.colors || [
        { name: 'Signature Gold & Emerald', hex: '#0E4D40' },
        { name: 'Ruby Zari & Ivory', hex: '#7A1C24' }
      ],
      sizes: dressData.sizes || ['Bespoke Made-to-Measure', 'Standard Fitted (S)', 'Standard Fitted (M)', 'Standard Fitted (L)', '6.2m Unstitched Set'],
      featured: dressData.featured ?? true,
      rating: 5.0,
      reviewsCount: 12
    };

    setProducts((prev) => [newDress, ...prev]);
    showToast(`"${newDress.name}" added to the live Couture Catalog!`, 'Dress Published');
    return newDress;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
    showToast('Dress details updated in the live catalog.', 'Catalog Updated');
  };

  const deleteProduct = (id) => {
    // Persist deleted product ID to avoid resurrection across page reloads
    try {
      const deletedSaved = localStorage.getItem('emmys_deleted_product_ids');
      const deletedIds = deletedSaved ? JSON.parse(deletedSaved) : [];
      if (!deletedIds.includes(id)) {
        deletedIds.push(id);
        localStorage.setItem('emmys_deleted_product_ids', JSON.stringify(deletedIds));
      }
    } catch (e) {
      console.error('Error persisting deleted product ID:', e);
    }

    setProducts((prev) => prev.filter((p) => p.id !== id));
    setCart((prev) => prev.filter((item) => item.id !== id));
    setWishlist((prev) => prev.filter((wId) => wId !== id));
    showToast('Piece removed from the catalog, collections & runway.', 'Piece Archival');
  };

  const resetProductsToDefault = () => {
    try {
      localStorage.removeItem('emmys_deleted_product_ids');
      localStorage.removeItem('emmys_products');
    } catch {}
    setProducts(INITIAL_PRODUCTS);
    showToast('Catalog restored to original maison collection.', 'Catalog Reset');
  };

  // ==========================================
  // PURCHASE ORDERS MANAGEMENT (ADMIN + CLIENT)
  // ==========================================
  const saveOrder = async (orderData) => {
    const newOrder = {
      orderNumber: orderData.orderNumber,
      firstName: orderData.firstName,
      lastName: orderData.lastName,
      email: orderData.email,
      phone: orderData.phone,
      address: orderData.address,
      city: orderData.city,
      country: orderData.country || 'India',
      postalCode: orderData.postalCode,
      items: orderData.items,
      totalUSD: orderData.totalUSD,
      totalINR: orderData.totalINR,
      packagingChoice: orderData.packagingChoice,
      fragranceSample: orderData.fragranceSample,
      paymentMethod: orderData.paymentMethod,
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Also persist to Supabase PostgreSQL if online
    if (isSupabaseConfigured) {
      await supabaseSaveOrder(orderData);
    }

    // Automatically remove checked out items from the Private Bag
    if (orderData.items && orderData.items.length > 0) {
      const checkedOutKeys = new Set(orderData.items.map((i) => i.key || `${i.id}`));
      const checkedOutIds = new Set(orderData.items.map((i) => i.id));
      setCart((prev) => {
        const remaining = prev.filter((item) => !checkedOutKeys.has(item.key) && !checkedOutIds.has(item.id));
        try {
          localStorage.setItem('emmys_cart', JSON.stringify(remaining));
        } catch (e) {
          console.error(e);
        }
        return remaining;
      });
    } else {
      setCart([]);
      try {
        localStorage.removeItem('emmys_cart');
      } catch (e) {
        console.error(e);
      }
    }

    // Reset applied promo codes upon successful checkout
    setPromoCode('');
    setAppliedDiscount(0);

    // Automatically send purchase commission confirmation letter to customer's Atelier Inbox
    if (orderData.email) {
      const itemsList = (orderData.items || []).map((i) => `• ${i.name} (Qty: ${i.quantity}, Size: ${i.size || 'Bespoke'})`).join('\n');
      const clientName = `${orderData.firstName || ''} ${orderData.lastName || ''}`.trim() || 'Esteemed Patron';

      addUserMessage(orderData.email, {
        sender: "Emmy's Couture Atelier",
        subject: `✨ Purchase Commission Placed: Order #${orderData.orderNumber}`,
        body: `Dear ${clientName},\n\nThank you for placing your bespoke purchase commission #${orderData.orderNumber} with Emmy's Couture Maison.\n\nCommission Summary:\n${itemsList}\nTotal Value: ₹${(orderData.totalINR || 0).toLocaleString('en-IN')}\nDestination: ${orderData.address}, ${orderData.city}\n\nOur master artisans have received your order details and scheduled your silk pieces on our looms. You will receive immediate status updates in this inbox as your creation progresses from loom to delivery.\n\nWith highest regards,\nMaster Atelier\nEmmy's Couture Maison, Kerala`,
        badge: "Order Placed",
        orderNumber: orderData.orderNumber
      });
    }

    return newOrder;
  };

  const updateOrderStatus = async (orderNumber, newStatus) => {
    let targetOrder = orders.find((o) => o.orderNumber === orderNumber);

    setOrders((prev) =>
      prev.map((o) => {
        if (o.orderNumber === orderNumber) {
          targetOrder = { ...o, status: newStatus };
          return targetOrder;
        }
        return o;
      })
    );

    if (isSupabaseConfigured) {
      await supabaseUpdateOrderStatus(orderNumber, newStatus);
    }

    // =========================================================================
    // AUTOMATIC REAL-TIME INBOX LETTER AS ADMIN CHANGES ORDER STATUS
    // =========================================================================
    if (targetOrder && targetOrder.email) {
      const clientEmail = targetOrder.email.toLowerCase().trim();
      const clientName = targetOrder.firstName ? `${targetOrder.firstName} ${targetOrder.lastName || ''}`.trim() : 'Esteemed Patron';
      const itemsList = (targetOrder.items || []).map((i) => `• ${i.name} (Qty: ${i.quantity}, Size: ${i.size || 'Bespoke'})`).join('\n');

      let subject = `Order #${orderNumber} Status: ${newStatus}`;
      let badge = newStatus;
      let body = '';

      switch (newStatus) {
        case 'Confirmed':
        case 'Order Confirmed':
          subject = `✨ Order Confirmed: Couture Order #${orderNumber}`;
          badge = 'Confirmed';
          body = `Dear ${clientName},\n\nWe are delighted to confirm that your bespoke couture commission #${orderNumber} has been verified and officially confirmed by Emmy's Couture Maison.\n\nCommission Details:\n${itemsList}\nTotal: ₹${(targetOrder.totalINR || 0).toLocaleString('en-IN')}\n\nOur master weavers have scheduled your pieces on our traditional pit-looms. We will keep you updated in real-time as your ensemble progresses through hand-weaving, quality certification, and armored dispatch.\n\nWith highest regards,\nMaster Atelier\nEmmy's Couture Maison, Kerala`;
          break;

        case 'In Production':
        case 'Processing':
        case 'Processed':
          subject = `🧵 In Handloom Production / Processing: Order #${orderNumber}`;
          badge = 'Processing';
          body = `Dear ${clientName},\n\nYour couture commission #${orderNumber} is now actively in handloom production at our Kerala atelier.\n\nPieces currently on Loom & Hand-embroidery:\n${itemsList}\n\nOur master karigars are weaving pure mulberry silk threads and hand-crafting 24k gold zari korvai borders. Your masterwork is progressing with utmost artisanal care.\n\nWarm regards,\nEmmy's Couture Atelier`;
          break;

        case 'Quality Inspection':
          subject = `🔍 Master Quality Inspection: Order #${orderNumber}`;
          badge = 'Quality Inspection';
          body = `Dear ${clientName},\n\nYour handcrafted ensemble #${orderNumber} has completed hand-weaving and is currently undergoing our rigorous 14-point master quality inspection at our Kochi flagship atelier.\n\nOnce certified by the Head Couturière, your creation will be carefully steamed and enveloped in our signature keepsake box.\n\nWarm regards,\nEmmy's Couture Quality Team`;
          break;

        case 'Out for Delivery':
        case 'Dispatched':
          subject = `🚚 Out for Delivery / Dispatched: Order #${orderNumber}`;
          badge = 'Out for Delivery';
          body = `Dear ${clientName},\n\nGrand news! Your master couture creation #${orderNumber} has completed quality inspection and is now Out for Delivery via secure armored courier.\n\nDelivery Destination: ${targetOrder.address || ''}, ${targetOrder.city || ''}, ${targetOrder.postalCode || ''}\nContact: ${targetOrder.phone || 'On file'}\n\nPlease prepare to receive your royal couture parcel.\n\nWarm regards,\nEmmy's Couture Dispatch & Logistics`;
          break;

        case 'Delivered':
        case 'Completed':
          subject = `🎁 Delivered with Distinction: Order #${orderNumber}`;
          badge = 'Delivered';
          body = `Dear ${clientName},\n\nOur courier concierge records indicate that your couture creation #${orderNumber} has been safely delivered to your hands.\n\nWe hope this handloom masterwork brings splendor and magnificence to your special celebrations. Should you desire bespoke fitting refinements or styling advice, our salon couturières remain gladly at your service.\n\nWith our warmest gratitude,\nMaster Atelier Director & Karigars\nEmmy's Couture Maison`;
          break;

        case 'Declined':
        case 'Cancelled':
          subject = `⚠️ Order Status Notice (Declined): Order #${orderNumber}`;
          badge = 'Declined';
          body = `Dear ${clientName},\n\nWe regret to inform you that your purchase request #${orderNumber} could not be fulfilled at this time by Emmy's Couture Maison (due to handloom silk shortage or verification constraints).\n\nIf you have any questions or would like assistance selecting an alternative heirloom piece from our active collection, please contact our VIP Concierge.\n\nWarm regards,\nEmmy's Couture Maison`;
          break;

        default:
          subject = `Order Update: Order #${orderNumber} is now ${newStatus}`;
          badge = newStatus;
          body = `Dear ${clientName},\n\nThe status of your couture order #${orderNumber} has been updated to: ${newStatus}.\n\nItems in Commission:\n${itemsList}\n\nThank you for choosing Emmy's Couture.\n\nWarm regards,\nEmmy's Couture Maison`;
          break;
      }

      addUserMessage(clientEmail, {
        sender: "Emmy's Couture Order Logistics",
        subject,
        body,
        badge,
        orderNumber
      });
    }

    showToast(`Order ${orderNumber} status updated to '${newStatus}' & notification dispatched to client's Atelier Inbox.`, 'Status Updated');
  };

  const deleteOrder = (orderNumber) => {
    setOrders((prev) => prev.filter((o) => o.orderNumber !== orderNumber));
    showToast(`Order ${orderNumber} removed from active logs.`, 'Order Removed');
  };

  const clearAllOrders = () => {
    setOrders([]);
    try {
      localStorage.removeItem('emmys_orders');
    } catch (e) {
      console.error(e);
    }
    showToast('All purchase requests and order history cleared.', 'Orders Cleared');
  };

  // ==============================================
  // SALON APPOINTMENTS MANAGEMENT (ADMIN + CLIENT)
  // ==============================================
  const saveAppointment = async (appointmentData) => {
    const newAppointment = {
      bookingRef: appointmentData.bookingRef,
      name: appointmentData.name,
      email: appointmentData.email,
      phone: appointmentData.phone,
      maisonId: appointmentData.maisonId,
      maisonName: appointmentData.maisonName,
      serviceId: appointmentData.serviceId,
      serviceTitle: appointmentData.serviceTitle,
      date: appointmentData.date,
      time: appointmentData.time,
      eventDate: appointmentData.eventDate || '',
      specialRequests: appointmentData.specialRequests || '',
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    setAppointments((prev) => [newAppointment, ...prev]);

    // Also persist to Supabase PostgreSQL if online
    if (isSupabaseConfigured) {
      await supabaseSaveAppointment(appointmentData);
    }

    // Deliver appointment confirmation letter to customer's Atelier Inbox
    if (appointmentData.email) {
      addUserMessage(appointmentData.email, {
        sender: "Emmy's Private Salon Concierge",
        subject: `✨ Private Salon Fitting Confirmed: Ref #${appointmentData.bookingRef}`,
        body: `Dear ${appointmentData.name || 'Esteemed Patron'},\n\nWe have confirmed your private fitting reservation at ${appointmentData.maisonName || "Emmy's Flagship Maison"}.\n\nAppointment Reference: #${appointmentData.bookingRef}\nExperience: ${appointmentData.serviceTitle}\nDate & Time: ${appointmentData.date} at ${appointmentData.time}\n\nOur master couturières look forward to hosting you for an exclusive champagne consultation.\n\nWarm regards,\nEmmy's Salon Concierge`,
        badge: "Fitting Confirmed",
        bookingRef: appointmentData.bookingRef
      });
    }

    return newAppointment;
  };

  const updateAppointmentStatus = async (bookingRef, newStatus) => {
    let targetAppt = appointments.find((a) => a.bookingRef === bookingRef);

    setAppointments((prev) =>
      prev.map((a) => {
        if (a.bookingRef === bookingRef) {
          targetAppt = { ...a, status: newStatus };
          return targetAppt;
        }
        return a;
      })
    );

    if (isSupabaseConfigured) {
      await supabaseUpdateAppointmentStatus(bookingRef, newStatus);
    }

    // Deliver real-time status letter to patron's Atelier Inbox
    if (targetAppt && targetAppt.email) {
      const clientEmail = targetAppt.email.toLowerCase().trim();
      const clientName = targetAppt.name || 'Esteemed Patron';

      let subject = `Salon Fitting Ref #${bookingRef}: ${newStatus}`;
      let badge = `Salon ${newStatus}`;
      let body = '';

      switch (newStatus) {
        case 'Confirmed':
          subject = `✨ Private Salon Fitting Confirmed: Ref #${bookingRef}`;
          badge = 'Fitting Confirmed';
          body = `Dear ${clientName},\n\nYour private couture salon appointment #${bookingRef} has been officially confirmed by Emmy's Salon Concierge.\n\nReservation Details:\n• Maison: ${targetAppt.maisonName || 'Kochi Flagship Maison'}\n• Experience: ${targetAppt.serviceTitle || 'Bespoke Fitting'}\n• Schedule: ${targetAppt.date} at ${targetAppt.time}\n\nWe look forward to welcoming you for your bespoke fitting session.\n\nWarm regards,\nEmmy's Salon Concierge`;
          break;

        case 'Completed':
          subject = `✨ Salon Consultation Completed: Ref #${bookingRef}`;
          badge = 'Fitting Completed';
          body = `Dear ${clientName},\n\nThank you for joining us for your private salon fitting #${bookingRef} at ${targetAppt.maisonName}.\n\nYour custom silhouette measurements and fabric preferences have been safely archived in our Master Karigar Registry.\n\nWarm regards,\nEmmy's Couture Maison`;
          break;

        case 'Declined':
        case 'Cancelled':
          subject = `⚠️ Salon Fitting Update (Declined/Cancelled): Ref #${bookingRef}`;
          badge = 'Fitting Cancelled';
          body = `Dear ${clientName},\n\nYour fitting reservation #${bookingRef} scheduled for ${targetAppt.date} could not be accommodated at ${targetAppt.maisonName}.\n\nPlease contact our VIP concierge or select an alternate salon date online.\n\nWarm regards,\nEmmy's Salon Concierge`;
          break;

        default:
          subject = `Salon Fitting Ref #${bookingRef} Status: ${newStatus}`;
          badge = `Salon ${newStatus}`;
          body = `Dear ${clientName},\n\nThe status of your salon fitting appointment #${bookingRef} has been updated to: ${newStatus}.\n\nSchedule: ${targetAppt.date} at ${targetAppt.time}\nMaison: ${targetAppt.maisonName}\n\nWarm regards,\nEmmy's Salon Concierge`;
          break;
      }

      addUserMessage(clientEmail, {
        sender: "Emmy's Private Salon Concierge",
        subject,
        body,
        badge,
        bookingRef
      });
    }

    showToast(`Reservation ${bookingRef} status updated to '${newStatus}' & notice sent to client's Atelier Inbox.`, 'Appointment Updated');
  };

  const deleteAppointment = (bookingRef) => {
    setAppointments((prev) => prev.filter((a) => a.bookingRef !== bookingRef));
    showToast(`Reservation ${bookingRef} archived.`, 'Appointment Archived');
  };

  const clearAllAppointments = () => {
    setAppointments([]);
    try {
      localStorage.removeItem('emmys_appointments');
    } catch (e) {
      console.error(e);
    }
    showToast('All salon consultation and reservation history cleared.', 'Reservations Cleared');
  };

  // ==========================================
  // ATELIER INBOX & VIP CORRESPONDENCE
  // ==========================================
  const addUserMessage = (recipientEmail, messageData) => {
    const newMsg = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      recipientEmail: (recipientEmail || '').toLowerCase().trim(),
      sender: messageData.sender || "Emmy's Couture Atelier",
      subject: messageData.subject || "Official Maison Notification",
      body: messageData.body || "",
      badge: messageData.badge || "Maison Notice",
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      read: false,
      isVipConferred: messageData.isVipConferred ?? false,
      timestamp: new Date().toISOString()
    };
    setUserMessages((prev) => [newMsg, ...prev]);
    return newMsg;
  };

  const markMessageAsRead = (messageId) => {
    setUserMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, read: true } : m))
    );
  };

  const deleteUserMessage = (messageId) => {
    setUserMessages((prev) => prev.filter((m) => m.id !== messageId));
  };

  // ==========================================
  // CLIENT & USER OPERATIONS (ADMIN VIP ONLY)
  // ==========================================
  const addUser = (userData) => {
    const cleanEmail = (userData.email || '').toLowerCase().trim();
    const newUser = {
      id: `client-${Date.now()}`,
      name: userData.name,
      email: cleanEmail,
      password: userData.password || 'password123',
      city: userData.city || 'Kochi Flagship Maison',
      preference: userData.preference || 'Bridal Couture',
      isVip: true, // Only Admin can register/confer VIP status!
      vipTier: 'Privé VIP Patron',
      memberSince: new Date().getFullYear().toString(),
      totalOrders: 0,
      totalSpendINR: 0
    };

    setUsers((prev) => [newUser, ...prev]);

    // Dispatch Official VIP Welcome Letter to user's Inbox
    addUserMessage(cleanEmail, {
      sender: "Emmy's Couture Atelier",
      subject: "👑 Official Maison Invitation: Welcome to Emmy's VIP Privé Circle",
      body: `Dear ${userData.name},\n\nBy executive decree of the Master Atelier Director, we are deeply honored to officially induct you into the Emmy's Couture VIP Privé Circle.\n\nAs a Conferred VIP Patron, you enjoy full unhindered access to our private salons across Kerala (Kochi Flagship, Thiruvananthapuram Royal Salon, Kozhikode Beachfront, Thrissur Studio & Kumarakom Villa) with dedicated 1-on-1 master couturière concierge, priority loom reservations, and complimentary champagne fittings.\n\nYour VIP Privé credentials are registered in the master archives. We eagerly await welcoming you to your first bespoke fitting.\n\nWith our highest compliments,\nMaster Atelier Director & Karigars\nEmmy's Couture Maison, Kerala`,
      badge: "VIP Privé Induction",
      isVipConferred: true
    });

    // If current logged-in user is this patron, sync session immediately
    if (currentUser && currentUser.email?.toLowerCase() === cleanEmail) {
      setCurrentUser((prev) => ({ ...prev, isVip: true, vipTier: 'Privé VIP Patron' }));
    }

    showToast(`👑 VIP Privé Client ${newUser.name} registered and welcome letter dispatched to Inbox!`, 'VIP Client Conferred');
    return newUser;
  };

  const grantVipStatus = (userIdOrEmail) => {
    const targetUser = users.find(
      (u) => u.id === userIdOrEmail || u.email.toLowerCase() === (userIdOrEmail || '').toLowerCase()
    );
    if (!targetUser) return;

    setUsers((prev) =>
      prev.map((u) =>
        u.id === targetUser.id ? { ...u, isVip: true, vipTier: 'Privé VIP Patron' } : u
      )
    );

    // Send official VIP Induction Letter
    addUserMessage(targetUser.email, {
      sender: "Emmy's Couture Atelier",
      subject: "👑 Official Maison Invitation: Welcome to Emmy's VIP Privé Circle",
      body: `Dear ${targetUser.name},\n\nWe have the distinct honor of informing you that your patron account has been upgraded to VIP Privé status by the Master Atelier Director.\n\nYou are now entitled to complimentary private salon fittings across all Kerala Maisons, 1-on-1 bespoke styling consultations, and priority atelier queueing on our master pit-looms.\n\nWith warm regards,\nMaster Atelier Director\nEmmy's Couture Maison, Kerala`,
      badge: "VIP Privé Induction",
      isVipConferred: true
    });

    if (currentUser && (currentUser.id === targetUser.id || currentUser.email?.toLowerCase() === targetUser.email.toLowerCase())) {
      setCurrentUser((prev) => ({ ...prev, isVip: true, vipTier: 'Privé VIP Patron' }));
    }

    showToast(`👑 VIP Privé Status conferred upon ${targetUser.name}! Letter sent to Inbox.`, 'VIP Granted');
  };

  const revokeVipStatus = (userIdOrEmail) => {
    const targetUser = users.find(
      (u) => u.id === userIdOrEmail || u.email.toLowerCase() === (userIdOrEmail || '').toLowerCase()
    );
    if (!targetUser) return;

    setUsers((prev) =>
      prev.map((u) =>
        u.id === targetUser.id ? { ...u, isVip: false, vipTier: 'Standard Patron' } : u
      )
    );

    if (currentUser && (currentUser.id === targetUser.id || currentUser.email?.toLowerCase() === targetUser.email.toLowerCase())) {
      setCurrentUser((prev) => ({ ...prev, isVip: false, vipTier: 'Standard Patron' }));
    }

    showToast(`VIP status for ${targetUser.name} changed to Standard Patron.`, 'Status Updated');
  };

  // ==========================================
  // RUNWAY INVITATIONS & 15% COUPON ACCESS
  // ==========================================
  const sendRunwayInvitation = (userEmailOrId, customNote = '') => {
    const targetUser = users.find(
      (u) => u.id === userEmailOrId || u.email.toLowerCase() === (userEmailOrId || '').toLowerCase().trim()
    );
    const targetEmail = targetUser ? targetUser.email.toLowerCase() : (userEmailOrId || '').toLowerCase().trim();
    const targetName = targetUser ? targetUser.name : 'Esteemed Patron';

    // Record in runway invited list
    setRunwayInvitedEmails((prev) => {
      if (prev.includes(targetEmail)) return prev;
      return [...prev, targetEmail];
    });

    // Update users array with runway invitation flag
    setUsers((prev) =>
      prev.map((u) =>
        u.email.toLowerCase() === targetEmail
          ? { ...u, hasRunwayInvitation: true, runwayCouponCode: 'RUNWAY15' }
          : u
      )
    );

    // Update active currentUser session if matching
    if (currentUser && currentUser.email?.toLowerCase() === targetEmail) {
      setCurrentUser((prev) => ({
        ...prev,
        hasRunwayInvitation: true,
        runwayCouponCode: 'RUNWAY15'
      }));
    }

    // Dispatch Official Runway Front-Row Invitation Letter to client's Atelier Inbox
    const noteText = customNote ? `\n\nPersonal Note from Emmy's Couture Atelier:\n"${customNote}"\n` : '';
    addUserMessage(targetEmail, {
      sender: "Emmy's Couture Atelier",
      subject: "🎟️ Official Front-Row Invitation: Emmy's Couture Runway & 15% Privilege Pass",
      body: `Dear ${targetName},\n\nEmmy's Couture Maison is deeply delighted to present you with an official Front-Row Invitation to the upcoming Emmy's Couture Runway Showcase across our Kerala flagship salons.${noteText}\n\nAs an Invited Runway Patron, you have unlocked our private 15% Runway Privilege Coupon:\n\n✨ EXCLUSIVE COUPON CODE: RUNWAY15 ✨\n(Entitles you to 15% off all master handloom creations, bespoke half-sarees, and bridal couture across the boutique).\n\nPlease apply the code RUNWAY15 at checkout to claim your 15% savings.\n\nWe eagerly await hosting you for this unforgettable celebration of Kerala handloom mastery.\n\nWith highest regards,\nMaster Atelier & Karigars\nEmmy's Couture Maison, Kerala`,
      badge: "Runway Pass (15% Off)",
      hasRunwayCoupon: true,
      couponCode: "RUNWAY15"
    });

    showToast(`🎟️ Official Runway Invitation & 15% Code (RUNWAY15) dispatched to ${targetName}!`, 'Runway Invite Sent');
  };

  const revokeRunwayInvitation = (userEmailOrId) => {
    const targetUser = users.find(
      (u) => u.id === userEmailOrId || u.email.toLowerCase() === (userEmailOrId || '').toLowerCase().trim()
    );
    const targetEmail = targetUser ? targetUser.email.toLowerCase() : (userEmailOrId || '').toLowerCase().trim();

    setRunwayInvitedEmails((prev) => prev.filter((e) => e !== targetEmail));

    setUsers((prev) =>
      prev.map((u) =>
        u.email.toLowerCase() === targetEmail
          ? { ...u, hasRunwayInvitation: false }
          : u
      )
    );

    if (currentUser && currentUser.email?.toLowerCase() === targetEmail) {
      setCurrentUser((prev) => ({
        ...prev,
        hasRunwayInvitation: false
      }));
    }

    showToast(`Runway invitation removed for ${targetEmail}.`, 'Invitation Revoked');
  };

  // ==========================================
  // INCOMING INVITATION REQUESTS (LE CERCLE PRIVÉ)
  // ==========================================
  const requestInvitation = (email, name = '') => {
    const cleanEmail = (email || '').trim().toLowerCase();
    if (!cleanEmail) return { success: false, error: 'Please enter a valid email address.' };

    const isAlreadyInvited = runwayInvitedEmails.includes(cleanEmail);
    if (isAlreadyInvited) {
      showToast("You are already an official Runway Invitee! Use code 'RUNWAY15' in your bag.", "Already Invited");
      return { success: true, alreadyInvited: true };
    }

    const patronName = name || users.find((u) => u.email.toLowerCase() === cleanEmail)?.name || 'Patron';

    const newReq = {
      id: `req-${Date.now()}`,
      email: cleanEmail,
      name: patronName,
      requestedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Pending Admin Review'
    };

    setInvitationRequests((prev) => [newReq, ...prev.filter((r) => r.email.toLowerCase() !== cleanEmail)]);

    // Send acknowledgment notice to user's inbox
    addUserMessage(cleanEmail, {
      sender: "Emmy's Couture Atelier",
      subject: "Maison Dossier Received: Emmy's Privé Circle Invitation Request",
      body: `Dear ${patronName},\n\nWe have received your application for Le Cercle Privé membership and Emmy's South Indian Couture Runway invitation.\n\nYour patron dossier has been logged and submitted to Emmy's Couture Maison for review. Note: The 15% Runway & Privé welcome privilege (RUNWAY15) is unlocked once the Admin officially reviews and dispatches your invitation.\n\nWarm regards,\nEmmy's Couture Atelier\nKerala Flagship Maison`,
      badge: "Request Pending Review"
    });

    showToast("✦ Invitation Request submitted to Emmy's Couture Maison for review.", "Request Submitted");
    return { success: true };
  };

  const approveInvitationRequest = (reqIdOrEmail) => {
    const req = invitationRequests.find(
      (r) => r.id === reqIdOrEmail || r.email.toLowerCase() === reqIdOrEmail.toLowerCase()
    );
    if (!req) return;

    setInvitationRequests((prev) =>
      prev.map((r) => (r.id === req.id ? { ...r, status: 'Approved' } : r))
    );

    sendRunwayInvitation(req.email);
  };

  const deleteInvitationRequest = (reqId) => {
    setInvitationRequests((prev) => prev.filter((r) => r.id !== reqId));
    showToast('Invitation request removed.', 'Request Removed');
  };

  const updateUser = (id, updatedFields) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...updatedFields } : u))
    );
    showToast('Client profile updated.', 'Profile Updated');
  };

  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    showToast('Client removed from registry.', 'Client Removed');
  };

  const clearAllUsers = () => {
    setUsers([]);
    try {
      localStorage.removeItem('emmys_users');
    } catch (e) {
      console.error(e);
    }
    showToast('VIP client directory cleared.', 'Clients Cleared');
  };

  const clearAdminHistory = () => {
    setOrders([]);
    setAppointments([]);
    setUsers([]);
    try {
      localStorage.removeItem('emmys_orders');
      localStorage.removeItem('emmys_appointments');
      localStorage.removeItem('emmys_users');
    } catch (e) {
      console.error(e);
    }
    showToast('All admin purchase requests, salon reservations, and client logs have been wiped.', 'Admin History Cleared');
  };

  // Cart operations
  const addToCart = (product, options = {}) => {
    const itemKey = `${product.id}-${options.size || 'Bespoke'}-${options.color || 'Default'}-${options.isCustom ? 'custom' : 'std'}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.key === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.key === itemKey ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          key: itemKey,
          id: product.id,
          name: product.name,
          collection: product.collection,
          tag: product.tag,
          shortDesc: product.shortDesc,
          description: product.description,
          priceUSD: product.priceUSD,
          image: product.images?.primary || product.image,
          size: options.size || 'Bespoke Made-to-Measure',
          color: options.color || (product.colors && product.colors[0]?.name) || 'Signature',
          customMeasurements: options.customMeasurements || null,
          quantity: 1
        }
      ];
    });
    showToast(`"${product.name}" added to your Private Bag.`, "Atelier Selection");
    setIsCartOpen(true);
  };

  const removeFromCart = (itemKey) => {
    setCart((prev) => prev.filter((item) => item.key !== itemKey));
  };

  const clearCart = (silent = false) => {
    setCart([]);
    try {
      localStorage.removeItem('emmys_cart');
    } catch (e) {
      console.error(e);
    }
    if (!silent) {
      showToast("Your Private Bag has been cleared.", "Bag Emptied");
    }
  };

  const updateCartQuantity = (itemKey, qty) => {
    if (qty <= 0) {
      removeFromCart(itemKey);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.key === itemKey ? { ...item, quantity: qty } : item))
    );
  };

  const applyPromo = (code) => {
    const clean = (code || '').trim().toUpperCase();
    const userEmail = (currentUser?.email || '').toLowerCase().trim();
    const isRunwayInvited = runwayInvitedEmails.includes(userEmail) || currentUser?.hasRunwayInvitation;

    if (clean === 'RUNWAY15' || clean === 'EMMYRUNWAY15' || clean === 'RUNWAY') {
      if (!isRunwayInvited) {
        showToast(
          "Access Denied: Code 'RUNWAY15' is reserved exclusively for patrons holding an official Emmy's Couture Runway Invitation dispatched by the Atelier.",
          "Runway Invitation Required"
        );
        return { 
          success: false, 
          message: "Runway Invitation Required. Only patrons invited by Admin can redeem this 15% discount." 
        };
      }

      setPromoCode('RUNWAY15');
      setAppliedDiscount(0.15);
      showToast("🎟️ 15% Emmy's Couture Runway Privilege Applied to Bag!", "Runway Offer Unlocked");
      return { success: true, message: "15% Runway Privilege applied" };
    } else if (clean === 'EMMYVIP') {
      if (!currentUser?.isVip && !isRunwayInvited) {
        showToast("Access Denied: Code 'EMMYVIP' is reserved exclusively for Conferred VIP Privé Patrons.", "VIP Status Required");
        return { success: false, message: "VIP Privé Status Required" };
      }
      setPromoCode('EMMYVIP');
      setAppliedDiscount(0.15);
      showToast("👑 VIP Privé 15% Atelier Privilege applied.", "Privé Access");
      return { success: true, message: "15% VIP Privilege applied" };
    } else if (clean === 'COUTURE10') {
      setPromoCode('COUTURE10');
      setAppliedDiscount(0.1);
      showToast("10% Salon Privilege applied.", "Privé Access");
      return { success: true, message: "10% Salon Privilege applied" };
    } else {
      showToast("Invalid Privilege Code. If you hold a Runway Invitation from Admin, use code 'RUNWAY15'.", "Notice");
      return { success: false, message: "Invalid privilege code" };
    }
  };

  // Wishlist operations
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast("Piece removed from your Private Wishlist.", "Maison Wishlist");
        return prev.filter((id) => id !== productId);
      } else {
        showToast("Piece preserved in your Private Wishlist.", "Maison Wishlist");
        return [...prev, productId];
      }
    });
  };

  // Cart calculations - Memoized for optimal rendering performance
  const cartSubtotalUSD = useMemo(
    () => cart.reduce((sum, item) => sum + (item.priceUSD || 0) * (item.quantity || 1), 0),
    [cart]
  );
  const discountAmountUSD = useMemo(
    () => cartSubtotalUSD * appliedDiscount,
    [cartSubtotalUSD, appliedDiscount]
  );
  const cartTotalUSD = useMemo(
    () => Math.max(0, cartSubtotalUSD - discountAmountUSD),
    [cartSubtotalUSD, discountAmountUSD]
  );
  const totalItemsCount = useMemo(
    () => cart.reduce((sum, item) => sum + (item.quantity || 1), 0),
    [cart]
  );

  // Open Appointment helper
  const openAppointmentModal = (serviceId = null, maisonId = null) => {
    setAppointmentInitialData({ serviceId, maisonId });
    setIsAppointmentOpen(true);
  };

  // Auth Operations (Supabase PostgreSQL + Offline Hybrid)
  const registerClient = async ({ name, email, password, city = 'Kochi Flagship Maison', preference = 'Bridal Couture' }) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    if (!cleanName || !cleanEmail || !password) {
      return { success: false, error: 'Please provide your full name, email address, and a secure password.' };
    }

    // Try Supabase first if configured
    if (isSupabaseConfigured) {
      const res = await supabaseSignUp({ name: cleanName, email: cleanEmail, password, city, preference });
      if (!res.fallback) {
        if (res.success) {
          setCurrentUser(res.user);
          setIsAuthModalOpen(false);
          setHasEnteredSite(true);
          showToast(`Welcome to Emmy's Couture Maison, ${res.user.name}! Your private atelier account is registered in PostgreSQL.`, "PostgreSQL Access Granted");
          return { success: true, user: res.user };
        } else {
          return { success: false, error: res.error || 'Failed to register client.' };
        }
      }
    }

    // Fallback / Local Storage Mode
    if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, error: 'An account with this email address already exists in the Atelier archives. Please log in.' };
    }

    const newUser = {
      id: `client-${Date.now()}`,
      name: cleanName,
      email: cleanEmail,
      password: password,
      city: city || 'Kochi Flagship Maison',
      preference: preference || 'Couture',
      isVip: false, // Standard patron only. VIP Privé is exclusively conferred by the Master Admin!
      vipTier: 'Standard Patron',
      memberSince: new Date().getFullYear().toString(),
      totalOrders: 0,
      totalSpendINR: 0
    };

    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);

    // Send standard welcome letter to client's inbox
    addUserMessage(cleanEmail, {
      sender: "Emmy's Couture Atelier",
      subject: "Welcome to Emmy's Couture Maison",
      body: `Dear ${cleanName},\n\nThank you for creating your private patron account with Emmy's Couture.\n\nYou have unrestricted access to explore our 54-piece South Indian couture catalog, request salon appointments across our Kerala ateliers, and curate bespoke wishlists.\n\nPlease note that VIP Privé privileges (including complimentary champagne salon fittings, 1-on-1 master couturière concierge, and priority pit-loom scheduling) are granted exclusively by personal invitation and registration from Emmy's Couture Maison.\n\nWarm regards,\nEmmy's Couture Atelier\nKerala Flagship Maison`,
      badge: "Patron Account"
    });

    setIsAuthModalOpen(false);
    setHasEnteredSite(true);
    showToast(`Welcome to Emmy's Couture Maison, ${newUser.name}! Your private atelier account is active.`, "Maison Access Granted");
    return { success: true, user: newUser };
  };

  const loginClient = async (email, password) => {
    const cleanEmail = email.trim().toLowerCase();

    // Special quick check for admin login credentials
    if (cleanEmail === 'admin@emmyscouture.com' && password === 'admin123') {
      const adminUser = {
        id: 'admin-master',
        name: 'Master Atelier Director',
        email: 'admin@emmyscouture.com',
        city: 'Kochi Flagship Maison',
        role: 'admin',
        preference: 'Master Administrative Access',
        memberSince: '2024'
      };
      setCurrentUser(adminUser);
      setIsAdminOpen(true);
      setIsAuthModalOpen(false);
      setHasEnteredSite(true);
      showToast('Welcome Master Director. Atelier Administrative Console unlocked.', '👑 Admin Access Granted');
      return { success: true, user: adminUser };
    }

    // Try Supabase first if configured
    if (isSupabaseConfigured) {
      const res = await supabaseSignIn(cleanEmail, password);
      if (!res.fallback) {
        if (res.success) {
          setCurrentUser(res.user);
          setIsAuthModalOpen(false);
          setHasEnteredSite(true);
          showToast(`Welcome back, ${res.user.name}. Privé Atelier catalog unlocked from PostgreSQL.`, "Client Authentication");
          return { success: true, user: res.user };
        } else {
          return { success: false, error: res.error || 'Invalid credentials.' };
        }
      }
    }

    // Fallback / Local storage verification
    const foundUser = users.find((u) => u.email.toLowerCase() === cleanEmail && u.password === password);

    if (foundUser) {
      setCurrentUser(foundUser);
      setIsAuthModalOpen(false);
      setHasEnteredSite(true);
      showToast(`Welcome back, ${foundUser.name}. Privé Atelier catalog unlocked.`, "Client Authentication");
      return { success: true, user: foundUser };
    }

    return {
      success: false,
      error: 'Invalid credentials. Please verify your email and password, or create an Atelier account.'
    };
  };

  const resetClientPassword = async ({ email, newPassword }) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (newPassword || '').trim();

    if (!cleanEmail) {
      return { success: false, error: 'Please provide your registered email address.' };
    }
    if (!cleanPass || cleanPass.length < 6) {
      return { success: false, error: 'New password must be at least 6 characters in length.' };
    }

    let supabaseSent = false;
    // Try Supabase password recovery if configured
    if (isSupabaseConfigured) {
      const res = await supabaseResetPassword(cleanEmail);
      if (res.success) {
        supabaseSent = true;
      }
    }

    // Check if account exists in local records
    const existingIndex = users.findIndex((u) => u.email.toLowerCase() === cleanEmail);
    if (existingIndex !== -1) {
      const updatedUsers = [...users];
      const targetUser = updatedUsers[existingIndex];
      updatedUsers[existingIndex] = {
        ...targetUser,
        password: cleanPass
      };
      setUsers(updatedUsers);
      try {
        localStorage.setItem('emmys_users', JSON.stringify(updatedUsers));
      } catch (e) {
        console.error(e);
      }

      // Automatically dispatch security confirmation to customer's Atelier Inbox
      addUserMessage(cleanEmail, {
        sender: "Emmy's Couture Atelier Security",
        subject: "🔒 Security Alert: Credentials Reset Confirmed",
        body: `Dear ${targetUser.name || 'Esteemed Patron'},\n\nThis letter confirms that the password for your Emmy's Couture Maison account (${cleanEmail}) has been successfully updated.\n\nYou can now sign in using your new credentials to access your private salon wishlist, bespoke commissions, and VIP Privé allocations.\n\nIf you did not initiate this change, please immediately notify our master concierge.\n\nWith highest regards,\nMaster Atelier Security Protocol\nEmmy's Couture Maison, Kerala`,
        badge: "Security Notice"
      });

      showToast(`Credentials updated for ${cleanEmail}. You may now sign in.`, "Password Reset Successful");
      return { success: true, message: 'Password updated successfully. Please sign in with your new credentials.' };
    }

    // Special handler for demo client
    if (cleanEmail === 'priya@emmyscouture.com') {
      showToast("Demo client credentials updated successfully. Please sign in.", "Demo Password Reset");
      return { success: true, message: 'Demo client credentials reset successfully.' };
    }

    if (supabaseSent) {
      showToast(`Password recovery link dispatched to ${cleanEmail}.`, "Recovery Email Sent");
      return { success: true, message: 'Password recovery email dispatched successfully.' };
    }

    return {
      success: false,
      error: 'No registered client account found with this email address. Please verify your email or create a new account.'
    };
  };

  const logoutClient = async () => {
    const prevName = currentUser?.name || 'Client';
    if (isSupabaseConfigured) {
      await supabaseSignOut();
    }
    setCurrentUser(null);
    setHasEnteredSite(false);
    setIsAuthModalOpen(false);
    setIsAdminOpen(false);
    showToast(`Goodbye, ${prevName}. You have exited your private atelier session.`, "Maison Sign Out");
  };

  const adminLogin = async (email, password, secretKey) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();
    const cleanKey = (secretKey || '').trim();

    if (
      cleanEmail === 'admin@emmyscouture.com' &&
      (cleanPass === 'admin123' || cleanKey === '9900')
    ) {
      const session = {
        id: 'admin-master',
        name: 'Master Atelier Director',
        email: 'admin@emmyscouture.com',
        role: 'atelier_admin',
        city: 'Kochi Flagship Maison',
        loggedInAt: new Date().toISOString()
      };
      setAdminUser(session);
      try {
        localStorage.setItem('emmys_admin_session', JSON.stringify(session));
      } catch (e) {
        console.error(e);
      }
      showToast('Master Atelier Console verified & unlocked.', '👑 Admin Access Granted');
      return { success: true, user: session };
    }

    return {
      success: false,
      error: 'Invalid administrator credentials. Access is restricted to authorized master atelier personnel only.'
    };
  };

  const adminLogout = () => {
    setAdminUser(null);
    try {
      localStorage.removeItem('emmys_admin_session');
    } catch (e) {
      console.error(e);
    }
    navigateTo('/');
    showToast('Administrator session ended securely.', 'Admin Signed Out');
  };

  const handleShopNow = () => {
    if (currentUser) {
      setHasEnteredSite(true);
      showToast(`Welcome back, ${currentUser.name}. Entering the Atelier salon.`, "Maison Entrance");
    } else {
      setAuthModalMode('signup');
      setIsAuthModalOpen(true);
    }
  };

  const openAuthModal = (mode = 'signup') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const returnToEntryCover = () => {
    setHasEnteredSite(false);
  };

  // =========================================================
  // ANDROID 17 • TACTILE HAPTICS, COMPARE, TRY-ON & HANDOFF
  // =========================================================
  const triggerHaptic = useCallback((pattern = 12) => {
    if (!hapticsEnabled) return;
    try {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(pattern);
      }
    } catch {}
  }, [hapticsEnabled]);

  const toggleCompareProduct = (productId) => {
    triggerHaptic(15);
    setCompareList((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed creation from Couture Comparison Studio.', 'Compare Studio');
        return prev.filter((id) => id !== productId);
      }
      if (prev.length >= 3) {
        showToast('Comparison Studio holds up to 3 couture creations at once. Replacing oldest selection.', 'Compare Studio');
        return [...prev.slice(1), productId];
      }
      const target = products.find((p) => p.id === productId);
      showToast(`Added "${target?.name || 'Creation'}" to Couture Comparison Studio.`, 'Compare Studio');
      return [...prev, productId];
    });
  };

  const clearCompareList = () => {
    triggerHaptic([10, 30, 10]);
    setCompareList([]);
    showToast('Comparison tray cleared.', 'Compare Studio');
  };

  const openVirtualTryOn = (product = null) => {
    triggerHaptic(18);
    const chosen = product || products[0] || INITIAL_PRODUCTS[0];
    setVirtualTryOnProduct(chosen);
  };

  const generateHandoffSession = () => {
    const payload = {
      v: 17,
      ts: Date.now(),
      w: wishlist.slice(0, 8),
      c: cart.map((item) => ({ id: item.id, s: item.size, q: item.quantity })).slice(0, 6),
      cp: compareList
    };
    try {
      const token = btoa(encodeURIComponent(JSON.stringify(payload)));
      return {
        token,
        shortCode: `A17-${token.slice(0, 4).toUpperCase()}-${token.slice(-4).toUpperCase()}`,
        url: `${window.location.origin}/?handoff=${encodeURIComponent(token)}`
      };
    } catch {
      return {
        token: 'EMMYS-A17-SYNC',
        shortCode: 'A17-SYNC-2026',
        url: window.location.origin
      };
    }
  };

  const importHandoffSession = (tokenOrUrl) => {
    triggerHaptic([15, 40, 20]);
    try {
      let rawToken = (tokenOrUrl || '').trim();
      if (rawToken.includes('handoff=')) {
        const urlObj = new URL(rawToken);
        rawToken = urlObj.searchParams.get('handoff') || '';
      }
      const decoded = JSON.parse(decodeURIComponent(atob(rawToken)));
      if (decoded && decoded.v === 17) {
        if (Array.isArray(decoded.w)) {
          setWishlist(decoded.w);
        }
        if (Array.isArray(decoded.cp)) {
          setCompareList(decoded.cp);
        }
        if (Array.isArray(decoded.c) && decoded.c.length > 0) {
          const restoredCart = decoded.c
            .map((entry) => {
              const prod = products.find((p) => p.id === entry.id);
              if (!prod) return null;
              return {
                key: `${prod.id}-${entry.s || 'Bespoke'}-Default-std`,
                id: prod.id,
                name: prod.name,
                collection: prod.collection,
                tag: prod.tag,
                shortDesc: prod.shortDesc,
                description: prod.description,
                priceUSD: prod.priceUSD,
                image: prod.images?.primary || prod.image,
                size: entry.s || 'Bespoke Made-to-Measure',
                color: (prod.colors && prod.colors[0]?.name) || 'Signature',
                quantity: entry.q || 1
              };
            })
            .filter(Boolean);
          if (restoredCart.length > 0) {
            setCart(restoredCart);
          }
        }
        setHasEnteredSite(true);
        showToast('Android 17 Cross-Device Handoff complete! Bag, Wishlist & Compare Studio synced.', 'Continue On Synced');
        return { success: true };
      }
    } catch (err) {
      console.warn('Handoff decode error:', err);
    }
    showToast('Could not verify Handoff token. Please paste a valid Android 17 Handoff link or token.', 'Handoff Notice');
    return { success: false };
  };

  // Handle Android 17 App Shortcuts & Cross-Device URL Handoff on initial load
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const handoffToken = params.get('handoff');
      const shortcutAction = params.get('action');
      if (handoffToken) {
        importHandoffSession(handoffToken);
        window.history.replaceState({}, '', '/');
      } else if (shortcutAction === 'virtual-tryon') {
        setHasEnteredSite(true);
        setVirtualTryOnProduct(products[0] || INITIAL_PRODUCTS[0]);
        window.history.replaceState({}, '', '/');
      } else if (shortcutAction === 'book-salon') {
        setHasEnteredSite(true);
        setIsAppointmentOpen(true);
        window.history.replaceState({}, '', '/');
      }
    } catch {}
  }, []);

  return (
    <ShopContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        // Product & Dress Catalog State (Custom CRUD)
        products,
        setProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault,
        // Bag & Cart State
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateCartQuantity,
        isCartOpen,
        setIsCartOpen,
        cartSubtotalUSD,
        discountAmountUSD,
        cartTotalUSD,
        totalItemsCount,
        promoCode,
        setPromoCode,
        applyPromo,
        appliedDiscount,
        packagingChoice,
        setPackagingChoice,
        selectedFragranceSample,
        setSelectedFragranceSample,
        wishlist,
        toggleWishlist,
        quickViewProduct,
        setQuickViewProduct,
        isAppointmentOpen,
        setIsAppointmentOpen,
        appointmentInitialData,
        openAppointmentModal,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isStylistChatOpen,
        setIsStylistChatOpen,
        activeGlobalGown,
        setActiveGlobalGown,
        toast,
        showToast,
        // Authentication & Entry Gate
        currentUser,
        users,
        addUser,
        updateUser,
        deleteUser,
        grantVipStatus,
        revokeVipStatus,
        // Runway Invitations & 15% Access Pass
        runwayInvitedEmails,
        sendRunwayInvitation,
        revokeRunwayInvitation,
        // Incoming Privé Circle & Runway Requests
        invitationRequests,
        requestInvitation,
        approveInvitationRequest,
        deleteInvitationRequest,
        // Atelier Inbox & VIP Correspondence
        isInboxOpen,
        setIsInboxOpen,
        userMessages,
        addUserMessage,
        markMessageAsRead,
        deleteUserMessage,
        hasEnteredSite,
        setHasEnteredSite,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        registerClient,
        loginClient,
        logoutClient,
        resetClientPassword,
        handleShopNow,
        openAuthModal,
        returnToEntryCover,
        // Purchase Orders Management (Admin + Client)
        orders,
        saveOrder,
        updateOrderStatus,
        deleteOrder,
        clearAllOrders,
        // Salon Reservations Management (Admin + Client)
        appointments,
        saveAppointment,
        updateAppointmentStatus,
        deleteAppointment,
        clearAllAppointments,
        // Client Management & Directory
        clearAllUsers,
        clearAdminHistory,
        // Dedicated Route & Routing Navigation ('store' | 'admin')
        currentRoute,
        setCurrentRoute,
        navigateTo,
        // Master Admin Session & Auth
        adminUser,
        isAdminAuthenticated,
        adminLogin,
        adminLogout,
        // Admin Portal Control State
        isAdminOpen,
        setIsAdminOpen,
        adminTab,
        setAdminTab,
        // Supabase PostgreSQL status
        isSupabaseConfigured,
        // Android 17 • Material 3 Expressive & Continuity Features
        hapticsEnabled,
        setHapticsEnabled,
        triggerHaptic,
        globalSearchQuery,
        setGlobalSearchQuery,
        compareList,
        toggleCompareProduct,
        clearCompareList,
        isCompareOpen,
        setIsCompareOpen,
        virtualTryOnProduct,
        setVirtualTryOnProduct,
        openVirtualTryOn,
        isHandoffOpen,
        setIsHandoffOpen,
        generateHandoffSession,
        importHandoffSession,
        isLiveUpdateExpanded,
        setIsLiveUpdateExpanded,
        liveTrackerStage,
        setLiveTrackerStage
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
