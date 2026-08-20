import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { AdminNavbar } from './AdminNavbar';
import { 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle, 
  Clock, 
  Calendar, 
  ShoppingBag, 
  Users, 
  Layers, 
  DollarSign, 
  ArrowLeft, 
  Search, 
  Filter, 
  Sparkles, 
  Eye, 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  Package, 
  Crown,
  RotateCcw,
  Check,
  ExternalLink,
  ChevronRight,
  AlertTriangle,
  FileText,
  Ticket
} from 'lucide-react';

const PRESET_DRESS_IMAGES = [
  { label: 'Pistachio Sage Organza Floral Churidar', url: '/images/sage_green_organza_churidar.jpg' },
  { label: 'Royal Navy & Ivory Half Saree', url: '/images/royal_navy_ivory_half_saree.jpg' },
  { label: 'Emerald & Crimson Temple Pattu', url: '/images/emerald_crimson_kanchipuram_pattu.jpg' },
  { label: 'Antique Rose & Ivory Tissue Set', url: '/images/antique_rose_ivory_tissue_drape.png' },
  { label: 'Imperial Wine & Zardozi Bridal Lehenga', url: '/images/imperial_wine_zardozi_bridal_lehenga.jpg' },
  { label: 'Kochi Heritage Gold Kasavu Tissue Saree', url: '/images/kochi_heritage_gold_kasavu.jpg' }
];

export const AdminPortal = () => {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    resetProductsToDefault,
    orders, 
    updateOrderStatus, 
    deleteOrder,
    clearAllOrders,
    appointments, 
    updateAppointmentStatus, 
    deleteAppointment,
    clearAllAppointments,
    users, 
    addUser, 
    deleteUser,
    grantVipStatus,
    revokeVipStatus,
    sendRunwayInvitation,
    revokeRunwayInvitation,
    runwayInvitedEmails,
    invitationRequests,
    approveInvitationRequest,
    deleteInvitationRequest,
    addUserMessage,
    clearAllUsers,
    clearAdminHistory,
    setIsAdminOpen, 
    adminTab, 
    setAdminTab,
    formatPrice,
    isSupabaseConfigured,
    navigateTo,
    adminLogout
  } = useShop();

  // Active Tab state
  const [activeTab, setActiveTab] = useState(adminTab || 'overview');

  useEffect(() => {
    if (adminTab) {
      setActiveTab(adminTab);
    }
  }, [adminTab]);

  // Add Product Modal & Form State
  const [isAddDressOpen, setIsAddDressOpen] = useState(false);
  const [dressForm, setDressForm] = useState({
    name: '',
    collection: 'Muhurtham Bridal Heritage',
    category: 'half-sarees',
    tag: 'Muhurtham Masterpiece',
    priceINR: 18500,
    shortDesc: '',
    description: '',
    atelierHours: '280 hours of pit-loom handloom weaving',
    materials: '100% Pure Kanchipuram Mulberry Silk & 24k Gold Zari',
    embellishment: 'Traditional temple arch korvai borders & hand-pleated dhavani',
    origin: 'Kochi Flagship Maison',
    silhouette: 'Royal South Indian Half Saree with Draped Dhavani',
    image: '/images/royal_navy_ivory_half_saree.jpg',
    color1Name: 'Temple Emerald & Gold',
    color1Hex: '#0E4D40',
    color2Name: 'Midnight Ruby & Gold',
    color2Hex: '#7A1C24'
  });

  // Selected Order for Invoice view
  const [viewingOrder, setViewingOrder] = useState(null);

  // Search and Filter states
  const [catalogSearch, setCatalogSearch] = useState('');
  const [catalogCategory, setCatalogCategory] = useState('all');
  const [catalogCollection, setCatalogCollection] = useState('all');
  const [orderFilterStatus, setOrderFilterStatus] = useState('all');
  const [apptFilterLocation, setApptFilterLocation] = useState('all');

  // Add VIP Client Modal State
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [clientForm, setClientForm] = useState({
    name: '',
    email: '',
    city: 'Kochi Flagship Maison',
    preference: 'Bridal Kanchipuram & Zardozi'
  });

  // Direct Atelier Message Modal State
  const [isSendMessageOpen, setIsSendMessageOpen] = useState(false);
  const [messageTargetUser, setMessageTargetUser] = useState(null);
  const [directMessageForm, setDirectMessageForm] = useState({
    subject: '',
    body: '',
    badge: 'Atelier Letter'
  });

  // Runway Invitation Modal State
  const [isRunwayModalOpen, setIsRunwayModalOpen] = useState(false);
  const [runwayTargetUser, setRunwayTargetUser] = useState(null);
  const [runwayCustomNote, setRunwayCustomNote] = useState('');

  // Calculate Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.totalINR) || 0), 0);
  const pendingOrders = orders.filter(o => o.status === 'Pending Verification' || o.status === 'In Production').length;
  const activeReservations = appointments.filter(a => a.status === 'Confirmed').length;
  const totalDresses = products.length;

  const handleDressSubmit = (e) => {
    e.preventDefault();
    if (!dressForm.name || !dressForm.priceINR) return;

    addProduct({
      name: dressForm.name,
      collection: dressForm.collection,
      category: dressForm.category,
      tag: dressForm.tag,
      priceINR: Number(dressForm.priceINR),
      priceUSD: Number(dressForm.priceINR),
      shortDesc: dressForm.shortDesc || dressForm.description.slice(0, 100),
      description: dressForm.description || `${dressForm.name} handcrafted by master artisans with authentic gold zari.`,
      craftsmanship: {
        atelierHours: dressForm.atelierHours,
        materials: dressForm.materials,
        embellishment: dressForm.embellishment,
        origin: dressForm.origin,
        silhouette: dressForm.silhouette
      },
      image: dressForm.image,
      colors: [
        { name: dressForm.color1Name, hex: dressForm.color1Hex },
        { name: dressForm.color2Name, hex: dressForm.color2Hex }
      ],
      sizes: ['Bespoke Made-to-Measure', 'Standard Fitted (S)', 'Standard Fitted (M)', 'Standard Fitted (L)', '6.2m Unstitched Set'],
      featured: true
    });

    setIsAddDressOpen(false);
    // Reset Form
    setDressForm({
      name: '',
      collection: 'Muhurtham Bridal Heritage',
      category: 'half-sarees',
      tag: 'Muhurtham Masterpiece',
      priceINR: 18500,
      shortDesc: '',
      description: '',
      atelierHours: '280 hours of pit-loom handloom weaving',
      materials: '100% Pure Kanchipuram Mulberry Silk & 24k Gold Zari',
      embellishment: 'Traditional temple arch korvai borders & hand-pleated dhavani',
      origin: 'Kochi Flagship Maison',
      silhouette: 'Royal South Indian Half Saree with Draped Dhavani',
      image: '/images/royal_navy_ivory_half_saree.jpg',
      color1Name: 'Temple Emerald & Gold',
      color1Hex: '#0E4D40',
      color2Name: 'Midnight Ruby & Gold',
      color2Hex: '#7A1C24'
    });
  };

  const handleClientSubmit = (e) => {
    e.preventDefault();
    if (!clientForm.name || !clientForm.email) return;
    addUser(clientForm);
    setIsAddClientOpen(false);
    setClientForm({ name: '', email: '', city: 'Kochi Flagship Maison', preference: 'Bridal Couture' });
  };

  const openSendMessageModal = (user) => {
    setMessageTargetUser(user);
    setDirectMessageForm({
      subject: `Exclusive Atelier Update for ${user.name}`,
      body: `Dear ${user.name},\n\nWe are pleased to reach out to you directly from Emmy's Couture Atelier regarding your bespoke preferences.\n\nWarm regards,\nMaster Couturière & Atelier Team`,
      badge: 'Atelier Notice'
    });
    setIsSendMessageOpen(true);
  };

  const handleSendMessageSubmit = (e) => {
    e.preventDefault();
    if (!messageTargetUser || !directMessageForm.subject) return;

    addUserMessage(messageTargetUser.email, {
      sender: "Emmy's Couture Atelier",
      subject: directMessageForm.subject,
      body: directMessageForm.body,
      badge: directMessageForm.badge
    });

    setIsSendMessageOpen(false);
    setMessageTargetUser(null);
  };

  const openRunwayModal = (user) => {
    setRunwayTargetUser(user);
    setRunwayCustomNote('We are honored to reserve your VIP Front-Row seat for the Kerala Couture Runway showcase. Your 15% privilege pass (RUNWAY15) is now active.');
    setIsRunwayModalOpen(true);
  };

  const handleRunwaySubmit = (e) => {
    e.preventDefault();
    if (!runwayTargetUser) return;
    sendRunwayInvitation(runwayTargetUser.email, runwayCustomNote);
    setIsRunwayModalOpen(false);
    setRunwayTargetUser(null);
  };

  // Filtered lists
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(catalogSearch.toLowerCase()) || 
                          p.collection.toLowerCase().includes(catalogSearch.toLowerCase());
    const matchesCat = catalogCategory === 'all' || p.category === catalogCategory;
    const matchesCol = catalogCollection === 'all' || p.collection === catalogCollection;
    return matchesSearch && matchesCat && matchesCol;
  });

  const filteredOrders = orders.filter(o => {
    if (orderFilterStatus === 'all') return true;
    return o.status === orderFilterStatus;
  });

  const filteredAppts = appointments.filter(a => {
    if (apptFilterLocation === 'all') return true;
    return a.maisonId === apptFilterLocation || a.maisonName?.toLowerCase().includes(apptFilterLocation.toLowerCase());
  });

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#FAF7F2',
        color: '#2B2B2B',
        fontFamily: 'var(--font-sans)',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* ========================================================
          DEDICATED LUXURY ADMIN NAVIGATION BAR
         ======================================================== */}
      <AdminNavbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setAdminTab && setAdminTab(tab);
        }}
        totalDresses={totalDresses}
        ordersCount={orders.length}
        activeReservations={activeReservations}
        usersCount={users.length}
        onOpenAddDress={() => setIsAddDressOpen(true)}
      />

      {/* ========================================================
          3. MAIN CONTENT AREA (BY TAB)
         ======================================================== */}
      <main style={{ padding: '32px 28px', flex: 1, maxWidth: '1440px', width: '100%', margin: '0 auto' }}>

        {/* ----------------------------------------------------
            TAB 1: DASHBOARD OVERVIEW
           ---------------------------------------------------- */}
        {activeTab === 'overview' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
              <div>
                <h2 style={{ fontSize: '1.7rem', color: '#5C1A2E', fontWeight: 600, margin: '0 0 6px 0' }}>
                  Executive Atelier Overview
                </h2>
                <p style={{ color: '#7A7067', fontSize: '0.86rem', margin: 0 }}>
                  Real-time operational summary of Kerala salon bookings, client purchase orders, and couture piece inventory.
                </p>
              </div>

              {(orders.length > 0 || appointments.length > 0 || users.length > 0) && (
                <button
                  onClick={() => {
                    if (window.confirm('Clear all historical orders, reservations, and client logs?')) {
                      clearAdminHistory();
                    }
                  }}
                  style={{
                    background: 'none',
                    border: '1px solid rgba(180, 40, 40, 0.3)',
                    color: '#9C1A1A',
                    padding: '8px 16px',
                    borderRadius: '2px',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Trash2 size={13} />
                  <span>Clear All Activity Logs</span>
                </button>
              )}
            </div>

            {/* Metric KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
              <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '3px', border: '1px solid rgba(212, 175, 122, 0.3)', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.74rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#887B72', fontWeight: 700 }}>Total Order Value</span>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(92, 26, 46, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <DollarSign size={16} style={{ color: '#5C1A2E' }} />
                  </div>
                </div>
                <div style={{ fontSize: '1.9rem', fontWeight: 700, color: '#5C1A2E', fontFamily: 'var(--font-serif-editorial)' }}>
                  {formatPrice(totalRevenue)}
                </div>
                <div style={{ fontSize: '0.72rem', color: orders.length > 0 ? '#48BB78' : '#887B72', marginTop: '6px', fontWeight: 600 }}>
                  ✦ Across {orders.length} Verified Orders
                </div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '3px', border: '1px solid rgba(212, 175, 122, 0.3)', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.74rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#887B72', fontWeight: 700 }}>Purchase Requests</span>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(92, 26, 46, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShoppingBag size={16} style={{ color: '#5C1A2E' }} />
                  </div>
                </div>
                <div style={{ fontSize: '1.9rem', fontWeight: 700, color: '#5C1A2E', fontFamily: 'var(--font-serif-editorial)' }}>
                  {orders.length}
                </div>
                <div style={{ fontSize: '0.72rem', color: pendingOrders > 0 ? '#C05621' : orders.length > 0 ? '#48BB78' : '#887B72', marginTop: '6px', fontWeight: 600 }}>
                  ✦ {pendingOrders} pending / in production
                </div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '3px', border: '1px solid rgba(212, 175, 122, 0.3)', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.74rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#887B72', fontWeight: 700 }}>Salon Reservations</span>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(92, 26, 46, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Calendar size={16} style={{ color: '#5C1A2E' }} />
                  </div>
                </div>
                <div style={{ fontSize: '1.9rem', fontWeight: 700, color: '#5C1A2E', fontFamily: 'var(--font-serif-editorial)' }}>
                  {appointments.length}
                </div>
                <div style={{ fontSize: '0.72rem', color: appointments.length > 0 ? '#3182CE' : '#887B72', marginTop: '6px', fontWeight: 600 }}>
                  ✦ Across Kochi, Trivandrum & Kozhikode
                </div>
              </div>

              <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '3px', border: '1px solid rgba(212, 175, 122, 0.3)', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '0.74rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#887B72', fontWeight: 700 }}>Active Dress Catalog</span>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(92, 26, 46, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Layers size={16} style={{ color: '#5C1A2E' }} />
                  </div>
                </div>
                <div style={{ fontSize: '1.9rem', fontWeight: 700, color: '#5C1A2E', fontFamily: 'var(--font-serif-editorial)' }}>
                  {products.length} Pieces
                </div>
                <div style={{ fontSize: '0.72rem', color: '#805AD5', marginTop: '6px', fontWeight: 600 }}>
                  ✦ Ready in Customer Store
                </div>
              </div>
            </div>

            {/* Quick Overview Tables */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '28px' }}>
              {/* Recent Orders List */}
              <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '3px', border: '1px solid rgba(139, 115, 85, 0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                  <h3 style={{ fontSize: '1.05rem', color: '#5C1A2E', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShoppingBag size={18} style={{ color: '#D4AF7A' }} />
                    <span>Recent Purchase Requests</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    style={{ background: 'none', border: 'none', color: '#5C1A2E', fontSize: '0.76rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <span>View All Orders</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

                {orders.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '36px 20px', background: '#FAF7F2', borderRadius: '2px', border: '1px dashed rgba(139, 115, 85, 0.2)' }}>
                    <ShoppingBag size={28} style={{ color: '#C0B3A6', marginBottom: '8px' }} />
                    <div style={{ fontWeight: 600, fontSize: '0.84rem', color: '#6E645D' }}>No Purchase Requests History</div>
                    <div style={{ fontSize: '0.74rem', color: '#887B72', marginTop: '4px' }}>
                      Orders placed by clients during checkout will appear here in real time.
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {orders.slice(0, 4).map((order) => (
                      <div
                        key={order.orderNumber}
                        style={{
                          padding: '12px 16px',
                          background: '#FAF7F2',
                          borderRadius: '2px',
                          border: '1px solid rgba(139, 115, 85, 0.15)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.86rem', color: '#1A1A1A' }}>
                            {order.orderNumber} • {order.firstName} {order.lastName}
                          </div>
                          <div style={{ fontSize: '0.74rem', color: '#7A7067' }}>
                            {order.city} • {order.items.length} item(s) • {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontWeight: 700, color: '#5C1A2E', fontSize: '0.9rem' }}>
                            {formatPrice(order.totalINR)}
                          </div>
                          <span
                            style={{
                              fontSize: '0.65rem',
                              padding: '2px 8px',
                              borderRadius: '10px',
                              background: order.status === 'Dispatched' ? '#C6F6D5' : '#FEFCBF',
                              color: order.status === 'Dispatched' ? '#22543D' : '#744210',
                              fontWeight: 700,
                              textTransform: 'uppercase'
                            }}
                          >
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Salon Reservations */}
              <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '3px', border: '1px solid rgba(139, 115, 85, 0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                  <h3 style={{ fontSize: '1.05rem', color: '#5C1A2E', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calendar size={18} style={{ color: '#D4AF7A' }} />
                    <span>Upcoming Kerala Salon Appointments</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab('appointments')}
                    style={{ background: 'none', border: 'none', color: '#5C1A2E', fontSize: '0.76rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <span>View All Bookings</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

                {appointments.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '36px 20px', background: '#FAF7F2', borderRadius: '2px', border: '1px dashed rgba(139, 115, 85, 0.2)' }}>
                    <Calendar size={28} style={{ color: '#C0B3A6', marginBottom: '8px' }} />
                    <div style={{ fontWeight: 600, fontSize: '0.84rem', color: '#6E645D' }}>No Salon Reservations History</div>
                    <div style={{ fontSize: '0.74rem', color: '#887B72', marginTop: '4px' }}>
                      Client fittings & VIP consultation bookings across Kerala will appear here.
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {appointments.slice(0, 4).map((appt) => (
                      <div
                        key={appt.bookingRef}
                        style={{
                          padding: '12px 16px',
                          background: '#FAF7F2',
                          borderRadius: '2px',
                          border: '1px solid rgba(139, 115, 85, 0.15)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.86rem', color: '#1A1A1A' }}>
                            {appt.name} • {appt.bookingRef}
                          </div>
                          <div style={{ fontSize: '0.74rem', color: '#7A7067' }}>
                            {appt.maisonName || appt.maisonId} • {appt.date} at {appt.time}
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '0.74rem', fontWeight: 600, color: '#5C1A2E' }}>
                            {appt.serviceTitle?.slice(0, 24)}...
                          </div>
                          <span
                            style={{
                              fontSize: '0.65rem',
                              padding: '2px 8px',
                              borderRadius: '10px',
                              background: '#BEE3F8',
                              color: '#2B6CB0',
                              fontWeight: 700,
                              textTransform: 'uppercase'
                            }}
                          >
                            {appt.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------
            TAB 2: DRESS CATALOG & ADD PRODUCTS
           ---------------------------------------------------- */}
        {activeTab === 'products' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '1.6rem', color: '#5C1A2E', fontWeight: 600, margin: '0 0 4px 0' }}>
                  Couture Dress Catalog
                </h2>
                <p style={{ color: '#7A7067', fontSize: '0.84rem', margin: 0 }}>
                  Manage the live dresses presented to customers. Add new half-sarees, bridal lehengas, and silk creations.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={resetProductsToDefault}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid rgba(139, 115, 85, 0.3)',
                    color: '#6E645D',
                    padding: '10px 16px',
                    borderRadius: '2px',
                    fontSize: '0.76rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <RotateCcw size={13} />
                  <span>Restore Defaults</span>
                </button>

                <button
                  onClick={() => setIsAddDressOpen(true)}
                  style={{
                    background: 'linear-gradient(135deg, #5C1A2E 0%, #3B0E1C 100%)',
                    border: '1px solid rgba(212, 175, 122, 0.5)',
                    color: '#FAF7F2',
                    padding: '10px 22px',
                    borderRadius: '2px',
                    fontSize: '0.78rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 15px rgba(92, 26, 46, 0.25)'
                  }}
                >
                  <Plus size={16} />
                  <span>Add New Couture Piece</span>
                </button>
              </div>
            </div>

            {/* Filter Bar */}
            <div style={{ display: 'flex', gap: '14px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flex: '1 1 260px' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#887B72' }} />
                <input
                  type="text"
                  placeholder="Search dresses by name or collection..."
                  value={catalogSearch}
                  onChange={(e) => setCatalogSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 38px',
                    background: '#FFFFFF',
                    border: '1px solid rgba(139, 115, 85, 0.3)',
                    borderRadius: '2px',
                    fontSize: '0.84rem',
                    outline: 'none'
                  }}
                />
              </div>

              <select
                value={catalogCategory}
                onChange={(e) => setCatalogCategory(e.target.value)}
                style={{
                  padding: '10px 16px',
                  background: '#FFFFFF',
                  border: '1px solid rgba(139, 115, 85, 0.3)',
                  borderRadius: '2px',
                  fontSize: '0.84rem',
                  color: '#2B2B2B',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="all">All Categories</option>
                <option value="churidar">Churidar & Anarkali Suits</option>
                <option value="half-sarees">Half Sarees & Dhavanis</option>
                <option value="bridal">Bridal Lehengas & Gowns</option>
                <option value="crop-tops">Modern Brocade Crop Sets</option>
                <option value="sarees">Heritage Pattu Sarees</option>
                <option value="blouses">Bespoke Maggam Blouses</option>
                <option value="gowns">Couture Evening Gowns</option>
              </select>

              {/* Collection Dropdown Filter */}
              <select
                value={catalogCollection}
                onChange={(e) => setCatalogCollection(e.target.value)}
                style={{
                  padding: '10px 16px',
                  background: '#FFFFFF',
                  border: '1px solid rgba(139, 115, 85, 0.3)',
                  borderRadius: '2px',
                  fontSize: '0.84rem',
                  color: '#2B2B2B',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="all">All Collections</option>
                <option value="Kerala Festive Churidar Heritage">✦ Kerala Festive Churidar Heritage</option>
                <option value="Churidar & Anarkali Silk Collection">✦ Churidar & Anarkali Silk Collection</option>
                <option value="Muhurtham Bridal Heritage">Muhurtham Bridal Heritage</option>
                <option value="Royal Heritage Dhavani">Royal Heritage Dhavani</option>
                <option value="Artisanal Pastel Weaves">Artisanal Pastel Weaves</option>
                <option value="Imperial Royal Bridal">Imperial Royal Bridal</option>
                <option value="Festive Classics">Festive Classics</option>
                <option value="Bespoke Kerala Kasavu">Bespoke Kerala Kasavu</option>
              </select>
            </div>

            {/* Product Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '22px' }}>
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '2px',
                    border: '1px solid rgba(139, 115, 85, 0.25)',
                    overflow: 'hidden',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', height: '340px', background: '#F8F5EE', overflow: 'hidden' }}>
                    <img
                      src={prod.images?.primary || prod.image || '/images/royal_navy_ivory_half_saree.jpg'}
                      alt={prod.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'top center',
                        transition: 'transform 0.5s ease'
                      }}
                      onError={(e) => {
                        e.target.src = '/images/royal_navy_ivory_half_saree.jpg';
                      }}
                    />
                    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                      <span
                        style={{
                          background: 'rgba(92, 26, 46, 0.9)',
                          color: '#FDFBF7',
                          fontSize: '0.65rem',
                          padding: '3px 8px',
                          borderRadius: '2px',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase'
                        }}
                      >
                        {prod.category}
                      </span>
                    </div>
                  </div>

                  <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: '#D4AF7A', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginBottom: '4px' }}>
                        {prod.collection}
                      </div>
                      <h4 style={{ fontSize: '0.94rem', color: '#1A1A1A', margin: '0 0 8px 0', lineHeight: 1.3, fontWeight: 700 }}>
                        {prod.name}
                      </h4>
                      <p style={{ fontSize: '0.78rem', color: '#7A7067', margin: '0 0 12px 0', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {prod.shortDesc || prod.description}
                      </p>
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', paddingTop: '10px', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                        <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#5C1A2E' }}>
                          {formatPrice(prod.priceUSD)}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: '#887B72' }}>
                          {prod.craftsmanship?.atelierHours?.slice(0, 18)}...
                        </span>
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => deleteProduct(prod.id)}
                          style={{
                            flex: 1,
                            background: 'rgba(180, 40, 40, 0.08)',
                            border: '1px solid rgba(180, 40, 40, 0.3)',
                            color: '#9C1A1A',
                            padding: '6px',
                            borderRadius: '2px',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px'
                          }}
                        >
                          <Trash2 size={12} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------------------------------------------
            TAB 3: PURCHASE REQUESTS & ORDERS
           ---------------------------------------------------- */}
        {activeTab === 'orders' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '1.6rem', color: '#5C1A2E', fontWeight: 600, margin: '0 0 4px 0' }}>
                  Client Purchase Requests
                </h2>
                <p style={{ color: '#7A7067', fontSize: '0.84rem', margin: 0 }}>
                  Real-time database of boutique purchase requests and checkout orders.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                {orders.length > 0 && (
                  <button
                    onClick={() => {
                      if (window.confirm('Clear all purchase orders history?')) {
                        clearAllOrders();
                      }
                    }}
                    style={{
                      background: 'none',
                      border: '1px solid rgba(180, 40, 40, 0.3)',
                      color: '#9C1A1A',
                      padding: '8px 14px',
                      borderRadius: '2px',
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <Trash2 size={13} />
                    <span>Clear Orders History</span>
                  </button>
                )}

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', color: '#7A7067', fontWeight: 600 }}>Filter:</span>
                  <select
                    value={orderFilterStatus}
                    onChange={(e) => setOrderFilterStatus(e.target.value)}
                    style={{
                      padding: '8px 14px',
                      background: '#FFFFFF',
                      border: '1px solid rgba(139, 115, 85, 0.3)',
                      borderRadius: '2px',
                      fontSize: '0.82rem',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="all">All Statuses ({orders.length})</option>
                    <option value="Pending Verification">Pending Verification</option>
                    <option value="In Production">In Production</option>
                    <option value="Quality Inspection">Quality Inspection</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Orders Content */}
            {filteredOrders.length === 0 ? (
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '3px',
                  border: '1px solid rgba(139, 115, 85, 0.2)',
                  padding: '60px 24px',
                  textAlign: 'center'
                }}
              >
                <ShoppingBag size={42} style={{ color: '#D4AF7A', opacity: 0.6, marginBottom: '12px' }} />
                <h3 style={{ fontSize: '1.2rem', color: '#5C1A2E', margin: '0 0 6px 0', fontWeight: 600 }}>
                  No Purchase Requests Found
                </h3>
                <p style={{ color: '#7A7067', fontSize: '0.86rem', maxWidth: '440px', margin: '0 auto' }}>
                  The purchase orders history is currently clear. When clients place orders in the boutique or during checkout, their requests will appear here automatically.
                </p>
              </div>
            ) : (
              <div style={{ background: '#FFFFFF', borderRadius: '3px', border: '1px solid rgba(139, 115, 85, 0.25)', overflowX: 'auto', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
                  <thead>
                    <tr style={{ background: '#FAF7F2', borderBottom: '1px solid rgba(139, 115, 85, 0.2)', color: '#5C1A2E', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
                      <th style={{ padding: '14px 18px' }}>Order Ref</th>
                      <th style={{ padding: '14px 18px' }}>Client Info</th>
                      <th style={{ padding: '14px 18px' }}>Pieces Ordered</th>
                      <th style={{ padding: '14px 18px' }}>Total Amount</th>
                      <th style={{ padding: '14px 18px' }}>Date</th>
                      <th style={{ padding: '14px 18px' }}>Status</th>
                      <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.orderNumber} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', transition: 'background 0.2s' }}>
                        <td style={{ padding: '16px 18px', fontWeight: 700, color: '#5C1A2E' }}>
                          {order.orderNumber}
                        </td>
                        <td style={{ padding: '16px 18px' }}>
                          <div style={{ fontWeight: 700, color: '#1A1A1A' }}>{order.firstName} {order.lastName}</div>
                          <div style={{ fontSize: '0.74rem', color: '#7A7067' }}>{order.email}</div>
                          <div style={{ fontSize: '0.72rem', color: '#887B72' }}>{order.phone} • {order.city}</div>
                        </td>
                        <td style={{ padding: '16px 18px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {order.items?.map((item, idx) => (
                              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <img
                                  src={item.image || '/images/royal_navy_ivory_half_saree.jpg'}
                                  alt={item.name}
                                  style={{ width: '28px', height: '28px', objectFit: 'cover', borderRadius: '2px' }}
                                  onError={(e) => (e.target.src = '/images/royal_navy_ivory_half_saree.jpg')}
                                />
                                <div>
                                  <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#2B2B2B' }}>
                                    {item.name?.slice(0, 32)}...
                                  </div>
                                  <div style={{ fontSize: '0.68rem', color: '#887B72' }}>
                                    Qty: {item.quantity} • {item.size}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td style={{ padding: '16px 18px', fontWeight: 700, color: '#5C1A2E', fontSize: '0.92rem' }}>
                          {formatPrice(order.totalINR)}
                        </td>
                        <td style={{ padding: '16px 18px', color: '#7A7067', fontSize: '0.76rem' }}>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '16px 18px' }}>
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.orderNumber, e.target.value)}
                            style={{
                              padding: '6px 10px',
                              borderRadius: '2px',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              outline: 'none',
                              cursor: 'pointer',
                              background: 
                                order.status === 'Confirmed' ? '#C6F6D5' :
                                order.status === 'In Production' || order.status === 'Processing' ? '#EBF8FF' :
                                order.status === 'Quality Inspection' ? '#FEFCBF' :
                                order.status === 'Out for Delivery' || order.status === 'Dispatched' ? '#E9D8FD' :
                                order.status === 'Delivered' ? '#C6F6D5' :
                                order.status === 'Declined' ? '#FED7D7' : '#FEFCBF',
                              color: 
                                order.status === 'Confirmed' ? '#22543D' :
                                order.status === 'In Production' || order.status === 'Processing' ? '#2B6CB0' :
                                order.status === 'Quality Inspection' ? '#744210' :
                                order.status === 'Out for Delivery' || order.status === 'Dispatched' ? '#553C9A' :
                                order.status === 'Delivered' ? '#22543D' :
                                order.status === 'Declined' ? '#9B2C2C' : '#744210',
                              border: '1px solid rgba(0,0,0,0.1)'
                            }}
                          >
                            <option value="Confirmed">✓ Confirmed</option>
                            <option value="In Production">🧵 In Production (Processing)</option>
                            <option value="Quality Inspection">🔍 Quality Inspection</option>
                            <option value="Out for Delivery">🚚 Out for Delivery</option>
                            <option value="Delivered">🎁 Delivered</option>
                            <option value="Declined">⚠️ Declined</option>
                          </select>
                        </td>
                        <td style={{ padding: '16px 18px', textAlign: 'right' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                            <button
                              onClick={() => setViewingOrder(order)}
                              style={{
                                background: 'none',
                                border: '1px solid rgba(212, 175, 122, 0.4)',
                                color: '#5C1A2E',
                                padding: '5px 10px',
                                borderRadius: '2px',
                                fontSize: '0.72rem',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              <Eye size={12} />
                              <span>Invoice</span>
                            </button>
                            <button
                              onClick={() => deleteOrder(order.orderNumber)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#9C1A1A',
                                cursor: 'pointer',
                                padding: '5px'
                              }}
                              title="Remove order record"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ----------------------------------------------------
            TAB 4: SALON RESERVATIONS & FITTINGS
           ---------------------------------------------------- */}
        {activeTab === 'appointments' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '1.6rem', color: '#5C1A2E', fontWeight: 600, margin: '0 0 4px 0' }}>
                  Kerala Salon Reservations & Fittings
                </h2>
                <p style={{ color: '#7A7067', fontSize: '0.84rem', margin: 0 }}>
                  VIP Consultation and bespoke fitting schedules across Kochi, Trivandrum, Kozhikode, Thrissur & Kumarakom.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                {appointments.length > 0 && (
                  <button
                    onClick={() => {
                      if (window.confirm('Clear all salon reservations history?')) {
                        clearAllAppointments();
                      }
                    }}
                    style={{
                      background: 'none',
                      border: '1px solid rgba(180, 40, 40, 0.3)',
                      color: '#9C1A1A',
                      padding: '8px 14px',
                      borderRadius: '2px',
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <Trash2 size={13} />
                    <span>Clear Reservations History</span>
                  </button>
                )}

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', color: '#7A7067', fontWeight: 600 }}>Filter Salon:</span>
                  <select
                    value={apptFilterLocation}
                    onChange={(e) => setApptFilterLocation(e.target.value)}
                    style={{
                      padding: '8px 14px',
                      background: '#FFFFFF',
                      border: '1px solid rgba(139, 115, 85, 0.3)',
                      borderRadius: '2px',
                      fontSize: '0.82rem',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="all">All Kerala Salons ({appointments.length})</option>
                    <option value="kochi">Kochi Flagship Maison</option>
                    <option value="trivandrum">Thiruvananthapuram Royal Salon</option>
                    <option value="kozhikode">Kozhikode Beachfront Atelier</option>
                    <option value="thrissur">Thrissur Heritage Studio</option>
                    <option value="kumarakom">Kumarakom Private Retreat</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Appointments Content */}
            {filteredAppts.length === 0 ? (
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '3px',
                  border: '1px solid rgba(139, 115, 85, 0.2)',
                  padding: '60px 24px',
                  textAlign: 'center'
                }}
              >
                <Calendar size={42} style={{ color: '#D4AF7A', opacity: 0.6, marginBottom: '12px' }} />
                <h3 style={{ fontSize: '1.2rem', color: '#5C1A2E', margin: '0 0 6px 0', fontWeight: 600 }}>
                  No Salon Reservations Found
                </h3>
                <p style={{ color: '#7A7067', fontSize: '0.86rem', maxWidth: '440px', margin: '0 auto' }}>
                  The salon appointments history is currently clear. Client consultation and bridal fitting requests across Kerala will appear here in real time.
                </p>
              </div>
            ) : (
              <div style={{ background: '#FFFFFF', borderRadius: '3px', border: '1px solid rgba(139, 115, 85, 0.25)', overflowX: 'auto', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
                  <thead>
                    <tr style={{ background: '#FAF7F2', borderBottom: '1px solid rgba(139, 115, 85, 0.2)', color: '#5C1A2E', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
                      <th style={{ padding: '14px 18px' }}>Booking Ref</th>
                      <th style={{ padding: '14px 18px' }}>Client Details</th>
                      <th style={{ padding: '14px 18px' }}>Salon Location</th>
                      <th style={{ padding: '14px 18px' }}>Service Type</th>
                      <th style={{ padding: '14px 18px' }}>Schedule</th>
                      <th style={{ padding: '14px 18px' }}>Special Customization Notes</th>
                      <th style={{ padding: '14px 18px' }}>Status</th>
                      <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAppts.map((appt) => (
                      <tr key={appt.bookingRef} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                        <td style={{ padding: '16px 18px', fontWeight: 700, color: '#5C1A2E' }}>
                          {appt.bookingRef}
                        </td>
                        <td style={{ padding: '16px 18px' }}>
                          <div style={{ fontWeight: 700, color: '#1A1A1A' }}>{appt.name}</div>
                          <div style={{ fontSize: '0.74rem', color: '#7A7067' }}>{appt.email}</div>
                          <div style={{ fontSize: '0.72rem', color: '#887B72' }}>{appt.phone}</div>
                        </td>
                        <td style={{ padding: '16px 18px', color: '#1A1A1A', fontWeight: 600 }}>
                          {appt.maisonName || appt.maisonId}
                        </td>
                        <td style={{ padding: '16px 18px', color: '#5C1A2E', fontWeight: 600 }}>
                          {appt.serviceTitle}
                        </td>
                        <td style={{ padding: '16px 18px' }}>
                          <div style={{ fontWeight: 700, color: '#1A1A1A' }}>{appt.date}</div>
                          <div style={{ fontSize: '0.74rem', color: '#7A7067' }}>{appt.time}</div>
                          {appt.eventDate && (
                            <div style={{ fontSize: '0.68rem', color: '#D4AF7A', marginTop: '2px' }}>
                              Wedding Date: {appt.eventDate}
                            </div>
                          )}
                        </td>
                        <td style={{ padding: '16px 18px', maxWidth: '240px', color: '#6E645D', fontSize: '0.75rem', lineHeight: 1.4 }}>
                          {appt.specialRequests || 'No specific requests.'}
                        </td>
                        <td style={{ padding: '16px 18px' }}>
                          <select
                            value={appt.status}
                            onChange={(e) => updateAppointmentStatus(appt.bookingRef, e.target.value)}
                            style={{
                              padding: '6px 10px',
                              borderRadius: '2px',
                              fontSize: '0.72rem',
                              fontWeight: 700,
                              outline: 'none',
                              cursor: 'pointer',
                              background: appt.status === 'Confirmed' ? '#C6F6D5' : '#E2E8F0',
                              color: appt.status === 'Confirmed' ? '#22543D' : '#4A5568',
                              border: '1px solid rgba(0,0,0,0.1)'
                            }}
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Rescheduled">Rescheduled</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td style={{ padding: '16px 18px', textAlign: 'right' }}>
                          <button
                            onClick={() => deleteAppointment(appt.bookingRef)}
                            style={{ background: 'none', border: 'none', color: '#9C1A1A', cursor: 'pointer' }}
                            title="Archive booking"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ----------------------------------------------------
            TAB 5: VIP CLIENTS DIRECTORY
           ---------------------------------------------------- */}
        {activeTab === 'clients' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '1.6rem', color: '#5C1A2E', fontWeight: 600, margin: '0 0 4px 0' }}>
                  VIP Client Directory
                </h2>
                <p style={{ color: '#7A7067', fontSize: '0.84rem', margin: 0 }}>
                  Manage registered atelier patrons, preferred Kerala salons, and couture preferences.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                {users.length > 0 && (
                  <button
                    onClick={() => {
                      if (window.confirm('Clear all VIP clients history?')) {
                        clearAllUsers();
                      }
                    }}
                    style={{
                      background: 'none',
                      border: '1px solid rgba(180, 40, 40, 0.3)',
                      color: '#9C1A1A',
                      padding: '8px 14px',
                      borderRadius: '2px',
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <Trash2 size={13} />
                    <span>Clear Client Directory</span>
                  </button>
                )}

                <button
                  onClick={() => setIsAddClientOpen(true)}
                  style={{
                    background: 'linear-gradient(135deg, #5C1A2E 0%, #3B0E1C 100%)',
                    border: '1px solid rgba(212, 175, 122, 0.5)',
                    color: '#FAF7F2',
                    padding: '10px 20px',
                    borderRadius: '2px',
                    fontSize: '0.78rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Plus size={16} />
                  <span>Register VIP Client</span>
                </button>
              </div>
            </div>

            {/* Incoming Privé Circle & Runway Requests Section */}
            {invitationRequests && invitationRequests.length > 0 && (
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(92, 26, 46, 0.04) 0%, rgba(212, 175, 122, 0.12) 100%)',
                  border: '1px solid #D4AF7A',
                  borderRadius: '4px',
                  padding: '22px',
                  marginBottom: '32px',
                  boxShadow: '0 4px 16px rgba(92, 26, 46, 0.05)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#5C1A2E', color: '#FAF7F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Ticket size={16} style={{ color: '#D4AF7A' }} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', color: '#5C1A2E', margin: 0, fontWeight: 700 }}>
                        📥 Incoming Le Cercle Privé & Runway Requests ({invitationRequests.filter(r => r.status === 'Pending Admin Review').length} Pending)
                      </h4>
                      <p style={{ fontSize: '0.76rem', color: '#7A7067', margin: 0 }}>
                        Patrons who submitted invitation requests via the website. Approving grants them official Runway access and unlocks code <strong>RUNWAY15</strong> (15% off).
                      </p>
                    </div>
                  </div>
                </div>

                <div style={{ background: '#FFFFFF', borderRadius: '3px', border: '1px solid rgba(212, 175, 122, 0.3)', overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.8rem' }}>
                    <thead>
                      <tr style={{ background: '#FAF7F2', borderBottom: '1px solid rgba(139, 115, 85, 0.2)', color: '#5C1A2E', textTransform: 'uppercase', fontSize: '0.68rem', letterSpacing: '0.08em' }}>
                        <th style={{ padding: '10px 16px' }}>Patron Name / Email</th>
                        <th style={{ padding: '10px 16px' }}>Requested On</th>
                        <th style={{ padding: '10px 16px' }}>Status</th>
                        <th style={{ padding: '10px 16px', textAlign: 'right' }}>Admin Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invitationRequests.map((req) => {
                        const isApproved = req.status === 'Approved' || runwayInvitedEmails.includes(req.email.toLowerCase());
                        return (
                          <tr key={req.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                            <td style={{ padding: '12px 16px' }}>
                              <div style={{ fontWeight: 700, color: '#1A1A1A' }}>{req.name || 'Patron'}</div>
                              <div style={{ fontSize: '0.74rem', color: '#5C1A2E' }}>{req.email}</div>
                            </td>
                            <td style={{ padding: '12px 16px', color: '#7A7067', fontSize: '0.76rem' }}>
                              {req.requestedAt || 'Recent'}
                            </td>
                            <td style={{ padding: '12px 16px' }}>
                              {isApproved ? (
                                <span style={{ background: 'rgba(34, 139, 34, 0.12)', color: '#1E7E34', padding: '3px 8px', borderRadius: '10px', fontSize: '0.66rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                                  ✓ Approved & 15% Pass Active
                                </span>
                              ) : (
                                <span style={{ background: 'rgba(212, 175, 122, 0.22)', color: '#5C1A2E', padding: '3px 8px', borderRadius: '10px', fontSize: '0.66rem', fontWeight: 700 }}>
                                  ⏳ Pending Admin Review
                                </span>
                              )}
                            </td>
                            <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                                {!isApproved ? (
                                  <button
                                    onClick={() => approveInvitationRequest(req.id)}
                                    style={{
                                      background: 'linear-gradient(135deg, #5C1A2E 0%, #3B0E1C 100%)',
                                      border: '1px solid #D4AF7A',
                                      color: '#FAF7F2',
                                      padding: '6px 12px',
                                      borderRadius: '2px',
                                      fontSize: '0.7rem',
                                      fontWeight: 700,
                                      cursor: 'pointer',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '4px',
                                      boxShadow: '0 2px 6px rgba(92, 26, 46, 0.2)'
                                    }}
                                    title="Approve request and dispatch official Runway Invitation with 15% code to patron inbox"
                                  >
                                    <Ticket size={12} style={{ color: '#D4AF7A' }} />
                                    <span>Approve & Send 15% Pass</span>
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => sendRunwayInvitation(req.email)}
                                    style={{
                                      background: 'none',
                                      border: '1px solid rgba(212, 175, 122, 0.4)',
                                      color: '#5C1A2E',
                                      padding: '5px 10px',
                                      borderRadius: '2px',
                                      fontSize: '0.68rem',
                                      fontWeight: 600,
                                      cursor: 'pointer'
                                    }}
                                    title="Re-send invitation pass"
                                  >
                                    Re-send Pass
                                  </button>
                                )}

                                <button
                                  onClick={() => deleteInvitationRequest(req.id)}
                                  style={{ background: 'none', border: 'none', color: '#A09890', cursor: 'pointer', padding: '4px' }}
                                  title="Archive request"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Registered VIP Clients Content */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <h4 style={{ fontSize: '0.92rem', color: '#5C1A2E', margin: 0, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Registered VIP Patrons Directory ({users.length})
              </h4>
            </div>

            {users.length === 0 ? (
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: '3px',
                  border: '1px solid rgba(139, 115, 85, 0.2)',
                  padding: '60px 24px',
                  textAlign: 'center'
                }}
              >
                <Users size={42} style={{ color: '#D4AF7A', opacity: 0.6, marginBottom: '12px' }} />
                <h3 style={{ fontSize: '1.2rem', color: '#5C1A2E', margin: '0 0 6px 0', fontWeight: 600 }}>
                  VIP Client Directory is Clear
                </h3>
                <p style={{ color: '#7A7067', fontSize: '0.86rem', maxWidth: '440px', margin: '0 auto 16px auto' }}>
                  No patrons are currently registered. You can register VIP clients manually or new client accounts will appear when guests sign up.
                </p>
                <button
                  onClick={() => setIsAddClientOpen(true)}
                  style={{
                    background: '#5C1A2E',
                    color: '#FAF7F2',
                    border: 'none',
                    padding: '8px 18px',
                    borderRadius: '2px',
                    fontSize: '0.76rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  + Add First Client
                </button>
              </div>
            ) : (
              <div style={{ background: '#FFFFFF', borderRadius: '3px', border: '1px solid rgba(139, 115, 85, 0.25)', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
                  <thead>
                    <tr style={{ background: '#FAF7F2', borderBottom: '1px solid rgba(139, 115, 85, 0.2)', color: '#5C1A2E', textTransform: 'uppercase', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
                      <th style={{ padding: '14px 18px' }}>Client Name</th>
                      <th style={{ padding: '14px 18px' }}>Email Address</th>
                      <th style={{ padding: '14px 18px' }}>VIP Status</th>
                      <th style={{ padding: '14px 18px' }}>Runway 15% Pass</th>
                      <th style={{ padding: '14px 18px' }}>Preferred Salon</th>
                      <th style={{ padding: '14px 18px' }}>Couture Preference</th>
                      <th style={{ padding: '14px 18px' }}>Member Since</th>
                      <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => {
                      const isInvited = runwayInvitedEmails.includes(u.email.toLowerCase()) || u.hasRunwayInvitation;
                      return (
                        <tr key={u.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                          <td style={{ padding: '16px 18px', fontWeight: 700, color: '#1A1A1A' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <Crown size={14} style={{ color: u.isVip ? '#B8860B' : '#A09890' }} />
                              <span>{u.name}</span>
                            </div>
                          </td>
                          <td style={{ padding: '16px 18px', color: '#5C1A2E' }}>
                            {u.email}
                          </td>
                          <td style={{ padding: '16px 18px' }}>
                            {u.isVip ? (
                              <span
                                style={{
                                  background: 'linear-gradient(135deg, #D4AF7A 0%, #AA7C39 100%)',
                                  color: '#1A1A1A',
                                  fontWeight: 800,
                                  padding: '3px 9px',
                                  borderRadius: '12px',
                                  fontSize: '0.66rem',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px',
                                  letterSpacing: '0.04em'
                                }}
                              >
                                <Crown size={11} />
                                VIP Privé Member
                              </span>
                            ) : (
                              <span
                                style={{
                                  background: 'rgba(139, 115, 85, 0.12)',
                                  color: '#7A7067',
                                  fontWeight: 600,
                                  padding: '3px 8px',
                                  borderRadius: '10px',
                                  fontSize: '0.66rem'
                                }}
                              >
                                Standard Patron
                              </span>
                            )}
                          </td>
                          <td style={{ padding: '16px 18px' }}>
                            {isInvited ? (
                              <span
                                style={{
                                  background: 'linear-gradient(135deg, rgba(212, 175, 122, 0.25) 0%, rgba(92, 26, 46, 0.15) 100%)',
                                  border: '1px solid #D4AF7A',
                                  color: '#5C1A2E',
                                  fontWeight: 800,
                                  padding: '3px 8px',
                                  borderRadius: '10px',
                                  fontSize: '0.66rem',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                              >
                                <Ticket size={11} style={{ color: '#D4AF7A' }} />
                                <span>RUNWAY15 Unlocked</span>
                              </span>
                            ) : (
                              <span style={{ color: '#A09890', fontSize: '0.7rem' }}>
                                No Pass
                              </span>
                            )}
                          </td>
                          <td style={{ padding: '16px 18px', color: '#6E645D' }}>
                            {u.city}
                          </td>
                          <td style={{ padding: '16px 18px', color: '#887B72' }}>
                            {u.preference}
                          </td>
                          <td style={{ padding: '16px 18px', color: '#887B72' }}>
                            {u.memberSince}
                          </td>
                          <td style={{ padding: '16px 18px', textAlign: 'right' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px', flexWrap: 'wrap' }}>
                              {/* Runway Invite Trigger */}
                              <button
                                onClick={() => openRunwayModal(u)}
                                style={{
                                  background: isInvited ? 'rgba(212, 175, 122, 0.12)' : 'linear-gradient(135deg, #4A1222 0%, #2A0914 100%)',
                                  border: '1px solid #D4AF7A',
                                  color: isInvited ? '#5C1A2E' : '#FAF7F2',
                                  padding: '5px 9px',
                                  borderRadius: '2px',
                                  fontSize: '0.67rem',
                                  fontWeight: 700,
                                  cursor: 'pointer',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '4px'
                                }}
                                title={isInvited ? "Re-send Runway invitation letter" : "Send official Runway Invitation and unlock 15% RUNWAY15 coupon"}
                              >
                                <Ticket size={11} style={{ color: '#D4AF7A' }} />
                                <span>{isInvited ? 'Re-send Invite' : 'Send Runway Invite'}</span>
                              </button>

                              {!u.isVip ? (
                                <button
                                  onClick={() => grantVipStatus(u.id)}
                                  style={{
                                    background: 'none',
                                    border: '1px solid rgba(139, 115, 85, 0.3)',
                                    color: '#5C1A2E',
                                    padding: '5px 8px',
                                    borderRadius: '2px',
                                    fontSize: '0.67rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '3px'
                                  }}
                                  title="Grant VIP Privé status and send official welcome letter to client inbox"
                                >
                                  <Crown size={10} style={{ color: '#B8860B' }} />
                                  <span>Grant VIP</span>
                                </button>
                              ) : (
                                <>
                                  <button
                                    onClick={() => openSendMessageModal(u)}
                                    style={{
                                      background: 'none',
                                      border: '1px solid rgba(139, 115, 85, 0.25)',
                                      color: '#5C1A2E',
                                      padding: '4px 7px',
                                      borderRadius: '2px',
                                      fontSize: '0.65rem',
                                      fontWeight: 600,
                                      cursor: 'pointer',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '3px'
                                    }}
                                    title="Send letter to client's Atelier Inbox"
                                  >
                                    <Mail size={10} />
                                    <span>Letter</span>
                                  </button>
                                  <button
                                    onClick={() => revokeVipStatus(u.id)}
                                    style={{
                                      background: 'none',
                                      border: '1px solid rgba(139, 115, 85, 0.2)',
                                      color: '#887B72',
                                      padding: '4px 6px',
                                      borderRadius: '2px',
                                      fontSize: '0.63rem',
                                      cursor: 'pointer'
                                    }}
                                    title="Downgrade to Standard Patron"
                                  >
                                    Revoke VIP
                                  </button>
                                </>
                              )}

                              {u.id !== 'admin-master' && (
                                <button
                                  onClick={() => deleteUser(u.id)}
                                  style={{ background: 'none', border: 'none', color: '#9C1A1A', cursor: 'pointer', padding: '4px' }}
                                  title="Remove client"
                                >
                                  <Trash2 size={13} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </main>

      {/* ========================================================
          4. MODAL: ADD NEW COUTURE DRESS (FULL SPECS)
         ======================================================== */}
      {isAddDressOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'rgba(15, 12, 11, 0.85)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsAddDressOpen(false);
          }}
        >
          <div
            style={{
              background: '#FAF7F2',
              width: '100%',
              maxWidth: '820px',
              maxHeight: '92vh',
              overflowY: 'auto',
              borderRadius: '3px',
              padding: '32px',
              border: '1px solid rgba(212, 175, 122, 0.5)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              position: 'relative'
            }}
          >
            <button
              onClick={() => setIsAddDressOpen(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#5C1A2E', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ fontSize: '0.72rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: '#D4AF7A', fontWeight: 700 }}>
                Atelier Catalog Expansion
              </div>
              <h3 style={{ fontSize: '1.6rem', color: '#5C1A2E', margin: '4px 0 0 0', fontWeight: 600 }}>
                Publish New Couture Dress to Store
              </h3>
            </div>

            <form onSubmit={handleDressSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5C1A2E', marginBottom: '6px' }}>
                    Dress Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aadrika Emerald & Gold Kasavu Dhavani"
                    value={dressForm.name}
                    onChange={(e) => setDressForm({ ...dressForm, name: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', background: '#FFFFFF', border: '1px solid rgba(139, 115, 85, 0.3)', borderRadius: '2px', outline: 'none', fontSize: '0.86rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5C1A2E', marginBottom: '6px' }}>
                    Price in INR (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1000"
                    max="500000"
                    placeholder="18500"
                    value={dressForm.priceINR}
                    onChange={(e) => setDressForm({ ...dressForm, priceINR: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', background: '#FFFFFF', border: '1px solid rgba(139, 115, 85, 0.3)', borderRadius: '2px', outline: 'none', fontSize: '0.86rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5C1A2E', marginBottom: '6px' }}>
                    Collection
                  </label>
                  <select
                    value={dressForm.collection}
                    onChange={(e) => setDressForm({ ...dressForm, collection: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', background: '#FFFFFF', border: '1px solid rgba(139, 115, 85, 0.3)', borderRadius: '2px', outline: 'none', fontSize: '0.86rem' }}
                  >
                    <option value="Kerala Festive Churidar Heritage">✦ Kerala Festive Churidar Heritage</option>
                    <option value="Churidar & Anarkali Silk Collection">✦ Churidar & Anarkali Silk Collection</option>
                    <option value="Royal Kasavu Churidar Edition">✦ Royal Kasavu Churidar Edition</option>
                    <option value="Muhurtham Bridal Heritage">Muhurtham Bridal Heritage</option>
                    <option value="Royal Heritage Dhavani">Royal Heritage Dhavani</option>
                    <option value="Artisanal Pastel Weaves">Artisanal Pastel Weaves</option>
                    <option value="Imperial Royal Bridal">Imperial Royal Bridal</option>
                    <option value="Festive Classics">Festive Classics</option>
                    <option value="Bespoke Kerala Kasavu">Bespoke Kerala Kasavu</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5C1A2E', marginBottom: '6px' }}>
                    Category
                  </label>
                  <select
                    value={dressForm.category}
                    onChange={(e) => setDressForm({ ...dressForm, category: e.target.value })}
                    style={{ width: '100%', padding: '10px 14px', background: '#FFFFFF', border: '1px solid rgba(139, 115, 85, 0.3)', borderRadius: '2px', outline: 'none', fontSize: '0.86rem' }}
                  >
                    <option value="churidar">Churidar & Anarkali Suits</option>
                    <option value="half-sarees">Half Sarees & Dhavanis</option>
                    <option value="bridal">Bridal Lehengas & Gowns</option>
                    <option value="crop-tops">Modern Brocade Crop Sets</option>
                    <option value="sarees">Heritage Pattu Sarees</option>
                    <option value="blouses">Bespoke Maggam Blouses</option>
                    <option value="gowns">Couture Evening Gowns</option>
                  </select>
                </div>
              </div>

              {/* Descriptions */}
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5C1A2E', marginBottom: '6px' }}>
                  Editorial Narrative & Craftsmanship Description
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the silhouette, handloom weave, 24k gold zari borders, and regal South Indian heritage motifs..."
                  value={dressForm.description}
                  onChange={(e) => setDressForm({ ...dressForm, description: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', background: '#FFFFFF', border: '1px solid rgba(139, 115, 85, 0.3)', borderRadius: '2px', outline: 'none', fontSize: '0.84rem' }}
                />
              </div>

              {/* Craftsmanship Specs */}
              <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '2px', border: '1px solid rgba(139, 115, 85, 0.2)', marginBottom: '20px' }}>
                <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#5C1A2E', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
                  ✦ Master Craftsmanship Specifications
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.68rem', color: '#887B72', textTransform: 'uppercase' }}>Atelier Hours</label>
                    <input
                      type="text"
                      value={dressForm.atelierHours}
                      onChange={(e) => setDressForm({ ...dressForm, atelierHours: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', background: '#FAF7F2', border: '1px solid rgba(139, 115, 85, 0.2)', borderRadius: '2px', fontSize: '0.78rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.68rem', color: '#887B72', textTransform: 'uppercase' }}>Pure Materials</label>
                    <input
                      type="text"
                      value={dressForm.materials}
                      onChange={(e) => setDressForm({ ...dressForm, materials: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', background: '#FAF7F2', border: '1px solid rgba(139, 115, 85, 0.2)', borderRadius: '2px', fontSize: '0.78rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.68rem', color: '#887B72', textTransform: 'uppercase' }}>Embellishment</label>
                    <input
                      type="text"
                      value={dressForm.embellishment}
                      onChange={(e) => setDressForm({ ...dressForm, embellishment: e.target.value })}
                      style={{ width: '100%', padding: '8px 10px', background: '#FAF7F2', border: '1px solid rgba(139, 115, 85, 0.2)', borderRadius: '2px', fontSize: '0.78rem' }}
                    />
                  </div>
                </div>
              </div>

              {/* Image Selection Presets */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5C1A2E', marginBottom: '8px' }}>
                  Select Editorial Runway Image (or enter custom URL)
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(70px, 1fr))', gap: '8px', marginBottom: '12px' }}>
                  {PRESET_DRESS_IMAGES.map((img) => {
                    const isSel = dressForm.image === img.url;
                    return (
                      <div
                        key={img.url}
                        onClick={() => setDressForm({ ...dressForm, image: img.url })}
                        style={{
                          height: '70px',
                          borderRadius: '2px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          border: isSel ? '2px solid #5C1A2E' : '1px solid rgba(0,0,0,0.15)',
                          position: 'relative',
                          opacity: isSel ? 1 : 0.7
                        }}
                        title={img.label}
                      >
                        <img src={img.url} alt={img.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        {isSel && (
                          <div style={{ position: 'absolute', top: '2px', right: '2px', background: '#5C1A2E', borderRadius: '50%', padding: '2px' }}>
                            <Check size={10} style={{ color: '#FFFFFF' }} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <input
                  type="text"
                  placeholder="Or enter custom image URL path (e.g. /images/...)"
                  value={dressForm.image}
                  onChange={(e) => setDressForm({ ...dressForm, image: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', background: '#FFFFFF', border: '1px solid rgba(139, 115, 85, 0.3)', borderRadius: '2px', outline: 'none', fontSize: '0.84rem', marginBottom: '12px' }}
                />

                {/* Live Fitted Image Preview */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', background: '#FFFFFF', padding: '12px', borderRadius: '2px', border: '1px solid rgba(139, 115, 85, 0.2)' }}>
                  <div style={{ width: '64px', height: '84px', borderRadius: '2px', overflow: 'hidden', background: '#F8F5EE', flexShrink: 0 }}>
                    <img
                      src={dressForm.image || '/images/royal_navy_ivory_half_saree.jpg'}
                      alt="Dress Silhouette Preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                      onError={(e) => {
                        e.target.src = '/images/royal_navy_ivory_half_saree.jpg';
                      }}
                    />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#5C1A2E' }}>✦ Fitted Silhouette Preview</div>
                    <div style={{ fontSize: '0.68rem', color: '#7A7067', marginTop: '2px' }}>
                      Rendered in high-fashion 3:4 portrait ratio with top-center alignment for all customer catalog views.
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '14px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setIsAddDressOpen(false)}
                  style={{ background: 'none', border: '1px solid rgba(139, 115, 85, 0.3)', padding: '12px 20px', borderRadius: '2px', color: '#6E645D', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #5C1A2E 0%, #3B0E1C 100%)',
                    color: '#FAF7F2',
                    border: '1px solid rgba(212, 175, 122, 0.5)',
                    padding: '12px 28px',
                    borderRadius: '2px',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(92, 26, 46, 0.25)'
                  }}
                >
                  Publish Dress to User Store
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          5. MODAL: REGISTER VIP CLIENT
         ======================================================== */}
      {isAddClientOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'rgba(15, 12, 11, 0.85)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsAddClientOpen(false);
          }}
        >
          <div
            style={{
              background: '#FAF7F2',
              width: '100%',
              maxWidth: '520px',
              borderRadius: '3px',
              padding: '32px',
              border: '1px solid rgba(212, 175, 122, 0.5)',
              position: 'relative'
            }}
          >
            <button
              onClick={() => setIsAddClientOpen(false)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#5C1A2E', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Crown size={20} style={{ color: '#D4AF7A' }} />
              <h3 style={{ fontSize: '1.35rem', color: '#5C1A2E', margin: 0, fontWeight: 600 }}>
                Register VIP Privé Client
              </h3>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#7A7067', margin: '0 0 20px 0', lineHeight: 1.4 }}>
              Registering this patron will grant <strong>👑 VIP Privé Status</strong> and automatically dispatch the official <strong>VIP Induction Welcome Letter</strong> to their Atelier Inbox.
            </p>

            <form onSubmit={handleClientSubmit}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#5C1A2E', marginBottom: '6px' }}>Client Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Radhika Menon"
                  value={clientForm.name}
                  onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', background: '#FFFFFF', border: '1px solid rgba(139, 115, 85, 0.3)', borderRadius: '2px', outline: 'none' }}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#5C1A2E', marginBottom: '6px' }}>Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="radhika@example.com"
                  value={clientForm.email}
                  onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', background: '#FFFFFF', border: '1px solid rgba(139, 115, 85, 0.3)', borderRadius: '2px', outline: 'none' }}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#5C1A2E', marginBottom: '6px' }}>Preferred Kerala Salon</label>
                <select
                  value={clientForm.city}
                  onChange={(e) => setClientForm({ ...clientForm, city: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', background: '#FFFFFF', border: '1px solid rgba(139, 115, 85, 0.3)', borderRadius: '2px', outline: 'none' }}
                >
                  <option value="Kochi Flagship Maison">Kochi Flagship Maison (Panampilly Nagar)</option>
                  <option value="Thiruvananthapuram Royal Salon">Thiruvananthapuram Royal Salon (Kowdiar Palace)</option>
                  <option value="Kozhikode Beachfront Atelier">Kozhikode Beachfront Atelier (PT Usha Road)</option>
                  <option value="Thrissur Heritage Studio">Thrissur Heritage Studio (Palace Road)</option>
                  <option value="Kumarakom Backwaters Retreat">Kumarakom Backwaters Retreat</option>
                </select>
              </div>

              <div style={{ marginBottom: '22px' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#5C1A2E', marginBottom: '6px' }}>Couture Preference</label>
                <input
                  type="text"
                  placeholder="e.g. Bridal Half Saree, Churidar, Kasavu & Zardozi"
                  value={clientForm.preference}
                  onChange={(e) => setClientForm({ ...clientForm, preference: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', background: '#FFFFFF', border: '1px solid rgba(139, 115, 85, 0.3)', borderRadius: '2px', outline: 'none' }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #5C1A2E 0%, #3B0E1C 100%)',
                  border: '1px solid #D4AF7A',
                  color: '#FAF7F2',
                  padding: '12px',
                  borderRadius: '2px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Crown size={15} style={{ color: '#D4AF7A' }} />
                <span>Register VIP Patron & Send Letter</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          5B. MODAL: SEND DIRECT ATELIER LETTER TO PATRON
         ======================================================== */}
      {isSendMessageOpen && messageTargetUser && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'rgba(15, 12, 11, 0.85)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsSendMessageOpen(false);
              setMessageTargetUser(null);
            }
          }}
        >
          <div
            style={{
              background: '#FAF7F2',
              width: '100%',
              maxWidth: '560px',
              borderRadius: '3px',
              padding: '32px',
              border: '1px solid rgba(212, 175, 122, 0.5)',
              position: 'relative'
            }}
          >
            <button
              onClick={() => {
                setIsSendMessageOpen(false);
                setMessageTargetUser(null);
              }}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#5C1A2E', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <Mail size={20} style={{ color: '#5C1A2E' }} />
              <h3 style={{ fontSize: '1.35rem', color: '#5C1A2E', margin: 0, fontWeight: 600 }}>
                Dispatch Atelier Letter
              </h3>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#7A7067', margin: '0 0 20px 0', lineHeight: 1.4 }}>
              Sending official correspondence to <strong>{messageTargetUser.name}</strong> ({messageTargetUser.email}).
            </p>

            <form onSubmit={handleSendMessageSubmit}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#5C1A2E', marginBottom: '6px' }}>Letter Subject</label>
                <input
                  type="text"
                  required
                  value={directMessageForm.subject}
                  onChange={(e) => setDirectMessageForm({ ...directMessageForm, subject: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', background: '#FFFFFF', border: '1px solid rgba(139, 115, 85, 0.3)', borderRadius: '2px', outline: 'none' }}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#5C1A2E', marginBottom: '6px' }}>Letter Badge / Category</label>
                <select
                  value={directMessageForm.badge}
                  onChange={(e) => setDirectMessageForm({ ...directMessageForm, badge: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', background: '#FFFFFF', border: '1px solid rgba(139, 115, 85, 0.3)', borderRadius: '2px', outline: 'none' }}
                >
                  <option value="Atelier Letter">Atelier Letter</option>
                  <option value="VIP Privé Notice">VIP Privé Notice</option>
                  <option value="Bespoke Fitting Update">Bespoke Fitting Update</option>
                  <option value="Master Karigar Consultation">Master Karigar Consultation</option>
                  <option value="Private Preview Invitation">Private Preview Invitation</option>
                </select>
              </div>

              <div style={{ marginBottom: '22px' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#5C1A2E', marginBottom: '6px' }}>Letter Message Body</label>
                <textarea
                  required
                  rows={5}
                  value={directMessageForm.body}
                  onChange={(e) => setDirectMessageForm({ ...directMessageForm, body: e.target.value })}
                  style={{ width: '100%', padding: '12px 14px', background: '#FFFFFF', border: '1px solid rgba(139, 115, 85, 0.3)', borderRadius: '2px', outline: 'none', lineHeight: 1.6 }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  background: '#5C1A2E',
                  color: '#FAF7F2',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '2px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Mail size={15} />
                <span>Deliver Letter to Patron Inbox</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          5C. MODAL: DISPATCH RUNWAY INVITATION & 15% PASS
         ======================================================== */}
      {isRunwayModalOpen && runwayTargetUser && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'rgba(15, 12, 11, 0.88)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsRunwayModalOpen(false);
              setRunwayTargetUser(null);
            }
          }}
        >
          <div
            style={{
              background: '#FAF7F2',
              width: '100%',
              maxWidth: '560px',
              borderRadius: '3px',
              padding: '32px',
              border: '1px solid rgba(212, 175, 122, 0.6)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              position: 'relative'
            }}
          >
            <button
              onClick={() => {
                setIsRunwayModalOpen(false);
                setRunwayTargetUser(null);
              }}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#5C1A2E', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(212, 175, 122, 0.2)', border: '1px solid #D4AF7A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#5C1A2E' }}>
                <Ticket size={18} />
              </div>
              <h3 style={{ fontSize: '1.35rem', color: '#5C1A2E', margin: 0, fontWeight: 600 }}>
                Dispatch Runway Invitation & 15% Code
              </h3>
            </div>

            <p style={{ fontSize: '0.8rem', color: '#7A7067', margin: '0 0 18px 0', lineHeight: 1.5 }}>
              Sending official Front-Row Invitation to <strong>{runwayTargetUser.name}</strong> ({runwayTargetUser.email}). This grants them exclusive access to use coupon code <strong>RUNWAY15</strong> for 15% off in the boutique.
            </p>

            <div style={{ background: 'linear-gradient(135deg, rgba(92, 26, 46, 0.06) 0%, rgba(212, 175, 122, 0.2) 100%)', border: '1px dashed #D4AF7A', borderRadius: '4px', padding: '14px', marginBottom: '18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.66rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#887B72', fontWeight: 700 }}>Exclusive Privilege Pass</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#5C1A2E' }}>15% Off All Couture Creations</div>
              </div>
              <div style={{ background: '#5C1A2E', color: '#FAF7F2', padding: '6px 12px', borderRadius: '3px', fontFamily: 'monospace', fontWeight: 800, fontSize: '0.95rem', letterSpacing: '0.1em' }}>
                RUNWAY15
              </div>
            </div>

            <form onSubmit={handleRunwaySubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', color: '#5C1A2E', marginBottom: '6px' }}>Personal Note from Atelier Director</label>
                <textarea
                  rows={4}
                  value={runwayCustomNote}
                  onChange={(e) => setRunwayCustomNote(e.target.value)}
                  placeholder="Add custom greetings or salon seating details..."
                  style={{ width: '100%', padding: '12px 14px', background: '#FFFFFF', border: '1px solid rgba(139, 115, 85, 0.3)', borderRadius: '2px', outline: 'none', lineHeight: 1.5 }}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #5C1A2E 0%, #3B0E1C 100%)',
                  border: '1px solid #D4AF7A',
                  color: '#FAF7F2',
                  padding: '13px',
                  borderRadius: '2px',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Ticket size={16} style={{ color: '#D4AF7A' }} />
                <span>Send Runway Invite & Unlock 15% Code</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          6. MODAL: VIEW ORDER INVOICE / RECEIPT
         ======================================================== */}
      {viewingOrder && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'rgba(15, 12, 11, 0.85)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setViewingOrder(null)}
        >
          <div
            style={{
              background: '#FFFFFF',
              width: '100%',
              maxWidth: '650px',
              maxHeight: '90vh',
              overflowY: 'auto',
              borderRadius: '2px',
              padding: '36px',
              border: '1px solid rgba(212, 175, 122, 0.4)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setViewingOrder(null)}
              style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#5C1A2E', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>

            <div style={{ textAlign: 'center', paddingBottom: '20px', borderBottom: '1px solid rgba(212, 175, 122, 0.3)', marginBottom: '24px' }}>
              <div style={{ fontFamily: 'var(--font-signature)', fontSize: '2.4rem', color: '#5C1A2E', lineHeight: 0.9 }}>
                Emmy's
              </div>
              <div style={{ fontSize: '0.72rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#887B72', fontWeight: 600, marginTop: '4px' }}>
                COUTURE ATELIER INVOICE
              </div>
              <div style={{ fontSize: '0.78rem', color: '#5C1A2E', fontWeight: 700, marginTop: '8px' }}>
                Order #{viewingOrder.orderNumber}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px', fontSize: '0.8rem' }}>
              <div>
                <div style={{ fontWeight: 700, color: '#887B72', textTransform: 'uppercase', fontSize: '0.68rem', marginBottom: '4px' }}>Billed To:</div>
                <div style={{ fontWeight: 700, color: '#1A1A1A' }}>{viewingOrder.firstName} {viewingOrder.lastName}</div>
                <div style={{ color: '#6E645D' }}>{viewingOrder.email}</div>
                <div style={{ color: '#6E645D' }}>{viewingOrder.phone}</div>
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#887B72', textTransform: 'uppercase', fontSize: '0.68rem', marginBottom: '4px' }}>Delivery Address:</div>
                <div style={{ color: '#2B2B2B' }}>{viewingOrder.address}</div>
                <div style={{ color: '#2B2B2B' }}>{viewingOrder.city}, {viewingOrder.postalCode}</div>
                <div style={{ color: '#887B72', marginTop: '4px' }}>Payment: {viewingOrder.paymentMethod}</div>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontWeight: 700, color: '#5C1A2E', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>
                Items Ordered
              </div>
              {viewingOrder.items?.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.84rem', color: '#1A1A1A' }}>{item.name}</div>
                    <div style={{ fontSize: '0.72rem', color: '#7A7067' }}>Size: {item.size} • Color: {item.color} • Qty: {item.quantity}</div>
                  </div>
                  <div style={{ fontWeight: 700, color: '#5C1A2E', fontSize: '0.9rem' }}>
                    {formatPrice(item.priceUSD * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '2px solid #5C1A2E' }}>
              <span style={{ fontSize: '1rem', fontWeight: 700, color: '#5C1A2E' }}>Grand Total (INR):</span>
              <span style={{ fontSize: '1.4rem', fontWeight: 700, color: '#5C1A2E', fontFamily: 'var(--font-serif-editorial)' }}>
                {formatPrice(viewingOrder.totalINR)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
