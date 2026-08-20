import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  CheckCircle, 
  CreditCard, 
  Truck, 
  Lock, 
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutModal = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartTotalUSD, 
    formatPrice, 
    packagingChoice, 
    selectedFragranceSample,
    showToast,
    saveOrder,
    clearCart 
  } = useShop();

  const [stage, setStage] = useState('form');
  const [orderNumber, setOrderNumber] = useState('');

  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'France',
    postalCode: '',
    specialInstructions: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('card');

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (!shippingData.firstName || !shippingData.email || !shippingData.address) {
      showToast("Please complete your delivery address details.", "Address Incomplete");
      return;
    }

    const generatedOrderNum = `EMMY-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrderNum);

    // Snapshot cart and total before clearing
    const orderItems = [...cart];
    const orderTotalUSD = cartTotalUSD;

    setStage('success');

    // Save Order to Supabase PostgreSQL & remove checked-out items from Private Bag
    if (saveOrder) {
      await saveOrder({
        orderNumber: generatedOrderNum,
        firstName: shippingData.firstName,
        lastName: shippingData.lastName,
        email: shippingData.email,
        phone: shippingData.phone,
        address: shippingData.address,
        city: shippingData.city,
        country: shippingData.country,
        postalCode: shippingData.postalCode,
        items: orderItems,
        totalUSD: orderTotalUSD,
        totalINR: orderTotalUSD,
        packagingChoice,
        fragranceSample: selectedFragranceSample,
        paymentMethod
      });
    }

    if (clearCart) {
      clearCart(true);
    }

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#C9A961', '#F5F0E6', '#4A1220']
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStage('form');
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className="glass-panel modal-content-animated"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '850px',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: '36px',
          position: 'relative',
          borderRadius: '2px',
          background: '#FAF7F2',
          border: '1px solid rgba(139, 115, 85, 0.35)',
          boxShadow: 'var(--shadow-modal)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.92)',
            border: '1px solid rgba(139, 115, 85, 0.25)',
            color: '#1A1A1A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(26, 26, 26, 0.08)'
          }}
          aria-label="Close Checkout"
        >
          <X size={18} />
        </button>

        {stage === 'form' ? (
          <div>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div style={{ fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--bronze-highlight)', fontWeight: 700, marginBottom: '4px' }}>
                Privé Client Checkout
              </div>
              <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary-text)', fontWeight: 600 }}>
                South Indian Bespoke Commission & Acquisition
              </h2>
            </div>

            <form onSubmit={handleSubmitOrder} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
              
              {/* Left Column: Delivery Address */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h3 style={{ fontSize: '1rem', color: 'var(--bronze-highlight)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Truck size={16} style={{ color: 'var(--bronze-highlight)' }} />
                  <span>White Glove Delivery Destination</span>
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--color-muted-text)', fontWeight: 600, marginBottom: '4px' }}>First Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ananya"
                      value={shippingData.firstName}
                      onChange={(e) => setShippingData({ ...shippingData, firstName: e.target.value })}
                      style={{ width: '100%', background: '#FFFFFF', border: '1px solid rgba(139, 115, 85, 0.3)', color: 'var(--color-primary-text)', padding: '10px', fontSize: '0.82rem', borderRadius: '1px', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--color-muted-text)', fontWeight: 600, marginBottom: '4px' }}>Last Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nambiar"
                      value={shippingData.lastName}
                      onChange={(e) => setShippingData({ ...shippingData, lastName: e.target.value })}
                      style={{ width: '100%', background: '#FFFFFF', border: '1px solid rgba(139, 115, 85, 0.3)', color: 'var(--color-primary-text)', padding: '10px', fontSize: '0.82rem', borderRadius: '1px', outline: 'none' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--color-muted-text)', fontWeight: 600, marginBottom: '4px' }}>Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="client@domain.com"
                      value={shippingData.email}
                      onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                      style={{ width: '100%', background: '#FFFFFF', border: '1px solid rgba(139, 115, 85, 0.3)', color: 'var(--color-primary-text)', padding: '10px', fontSize: '0.82rem', borderRadius: '1px', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--color-muted-text)', fontWeight: 600, marginBottom: '4px' }}>Phone / WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={shippingData.phone}
                      onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                      style={{ width: '100%', background: '#FFFFFF', border: '1px solid rgba(139, 115, 85, 0.3)', color: 'var(--color-primary-text)', padding: '10px', fontSize: '0.82rem', borderRadius: '1px', outline: 'none' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--color-muted-text)', fontWeight: 600, marginBottom: '4px' }}>Street Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="Poes Garden, Residence 14"
                    value={shippingData.address}
                    onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                    style={{ width: '100%', background: '#FFFFFF', border: '1px solid rgba(139, 115, 85, 0.3)', color: 'var(--color-primary-text)', padding: '10px', fontSize: '0.82rem', borderRadius: '1px', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--color-muted-text)', fontWeight: 600, marginBottom: '4px' }}>City *</label>
                    <input
                      type="text"
                      required
                      placeholder="Chennai"
                      value={shippingData.city}
                      onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                      style={{ width: '100%', background: '#FFFFFF', border: '1px solid rgba(139, 115, 85, 0.3)', color: 'var(--color-primary-text)', padding: '10px', fontSize: '0.82rem', borderRadius: '1px', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--color-muted-text)', fontWeight: 600, marginBottom: '4px' }}>Country</label>
                    <input
                      type="text"
                      value="India"
                      readOnly
                      style={{ width: '100%', background: '#FAF7F2', border: '1px solid rgba(139, 115, 85, 0.3)', color: 'var(--color-primary-text)', padding: '10px', fontSize: '0.82rem', borderRadius: '1px', outline: 'none' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.72rem', color: 'var(--color-muted-text)', fontWeight: 600, marginBottom: '4px' }}>Special Delivery Instructions</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Private concierge entrance, call upon arrival."
                    value={shippingData.specialInstructions}
                    onChange={(e) => setShippingData({ ...shippingData, specialInstructions: e.target.value })}
                    style={{ width: '100%', background: '#FFFFFF', border: '1px solid rgba(139, 115, 85, 0.3)', color: 'var(--color-primary-text)', padding: '10px', fontSize: '0.82rem', borderRadius: '1px', outline: 'none', resize: 'none' }}
                  />
                </div>
              </div>

              {/* Right Column: Payment & Order Review */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <h3 style={{ fontSize: '1rem', color: 'var(--bronze-highlight)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Lock size={16} style={{ color: 'var(--bronze-highlight)' }} />
                  <span>Secure Atelier Payment (INR ₹)</span>
                </h3>

                {/* Payment Selector */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div
                    onClick={() => setPaymentMethod('card')}
                    style={{
                      padding: '12px 14px',
                      background: paymentMethod === 'card' ? 'rgba(201, 169, 97, 0.18)' : '#FFFFFF',
                      border: paymentMethod === 'card' ? '1px solid #C9A961' : '1px solid rgba(139, 115, 85, 0.2)',
                      borderRadius: '1px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: 'var(--color-primary-text)', fontWeight: 600 }}>
                      <CreditCard size={16} style={{ color: 'var(--bronze-highlight)' }} />
                      <span>UPI / NetBanking / Visa Infinite / Mastercard</span>
                    </div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('wire')}
                    style={{
                      padding: '12px 14px',
                      background: paymentMethod === 'wire' ? 'rgba(201, 169, 97, 0.18)' : '#FFFFFF',
                      border: paymentMethod === 'wire' ? '1px solid #C9A961' : '1px solid rgba(139, 115, 85, 0.2)',
                      borderRadius: '1px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: 'var(--color-primary-text)', fontWeight: 600 }}>
                      <Sparkles size={16} style={{ color: 'var(--bronze-highlight)' }} />
                      <span>Direct RTGS / NEFT Maison Atelier Wire</span>
                    </div>
                  </div>
                </div>

                {/* Mock Card Inputs */}
                {paymentMethod === 'card' && (
                  <div style={{ background: '#FAF7F2', padding: '14px', borderRadius: '1px', border: '1px solid rgba(139, 115, 85, 0.2)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input
                      type="text"
                      placeholder="Cardholder Name"
                      defaultValue="Ananya Nambiar"
                      style={{ width: '100%', background: '#FFFFFF', border: '1px solid rgba(139, 115, 85, 0.3)', color: 'var(--color-primary-text)', padding: '8px 10px', fontSize: '0.78rem', borderRadius: '1px', outline: 'none' }}
                    />
                    <input
                      type="text"
                      placeholder="•••• •••• •••• 8888"
                      defaultValue="4000 1234 5678 8888"
                      style={{ width: '100%', background: '#FFFFFF', border: '1px solid rgba(139, 115, 85, 0.3)', color: 'var(--color-primary-text)', padding: '8px 10px', fontSize: '0.78rem', borderRadius: '1px', outline: 'none' }}
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <input
                        type="text"
                        placeholder="MM / YY"
                        defaultValue="12/28"
                        style={{ width: '100%', background: '#FFFFFF', border: '1px solid rgba(139, 115, 85, 0.3)', color: 'var(--color-primary-text)', padding: '8px 10px', fontSize: '0.78rem', borderRadius: '1px', outline: 'none' }}
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        defaultValue="888"
                        style={{ width: '100%', background: '#FFFFFF', border: '1px solid rgba(139, 115, 85, 0.3)', color: 'var(--color-primary-text)', padding: '8px 10px', fontSize: '0.78rem', borderRadius: '1px', outline: 'none' }}
                      />
                    </div>
                  </div>
                )}

                {/* Summary Box */}
                <div style={{ background: '#FFFFFF', border: '1px solid rgba(139, 115, 85, 0.25)', boxShadow: '0 4px 12px rgba(26, 26, 26, 0.04)', padding: '16px', borderRadius: '1px', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-muted-text)' }}>
                    <span>Pieces Commissioned:</span>
                    <span style={{ color: 'var(--color-primary-text)', fontWeight: 600 }}>{cart.length} item(s)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-muted-text)' }}>
                    <span>Maison Packaging:</span>
                    <span style={{ color: 'var(--bronze-highlight)', fontWeight: 600 }}>{packagingChoice}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-muted-text)' }}>
                    <span>Fragrance Sample:</span>
                    <span style={{ color: 'var(--bronze-highlight)', fontWeight: 600 }}>{selectedFragranceSample}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', color: 'var(--color-primary-text)', fontWeight: 700, paddingTop: '8px', borderTop: '1px solid rgba(139, 115, 85, 0.15)' }}>
                    <span>Grand Total:</span>
                    <span style={{ color: 'var(--color-primary-text)' }}>{formatPrice(cartTotalUSD)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-gold"
                  style={{ width: '100%', padding: '16px', fontSize: '0.88rem' }}
                >
                  <Lock size={15} />
                  <span>Authorize & Commission Order ({formatPrice(cartTotalUSD)})</span>
                </button>
              </div>

            </form>
          </div>
        ) : (
          /* SUCCESS STAGE */
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                background: 'rgba(201, 169, 97, 0.15)',
                border: '1px solid var(--gold-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto',
                color: 'var(--bronze-highlight)'
              }}
            >
              <CheckCircle size={38} />
            </div>

            <div className="badge-gold" style={{ marginBottom: '10px' }}>
              Acquisition Confirmed: {orderNumber}
            </div>

            <h3 style={{ fontSize: '1.8rem', color: 'var(--color-primary-text)', fontWeight: 600, marginBottom: '10px' }}>
              Thank You, {shippingData.firstName}
            </h3>

            <p style={{ color: 'var(--color-muted-text)', fontSize: '0.92rem', maxWidth: '540px', margin: '0 auto 24px auto', lineHeight: 1.6 }}>
              Your Emmy's South Indian Couture commission is officially registered with our master atelier.
              Master tailors are preparing your pure Kanchipuram mulberry silk allocations and custom pattern drafting.
            </p>

            {/* Receipt Summary Card */}
            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(139, 115, 85, 0.25)',
                boxShadow: '0 4px 12px rgba(26, 26, 26, 0.05)',
                borderRadius: '2px',
                padding: '20px 24px',
                textAlign: 'left',
                maxWidth: '540px',
                margin: '0 auto 28px auto',
                fontSize: '0.82rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div><strong>Order Reference:</strong> {orderNumber}</div>
              <div><strong>Delivery Destination:</strong> {shippingData.address}, {shippingData.city}, {shippingData.country}</div>
              <div><strong>Packaging:</strong> Signature Velvet Chest & {selectedFragranceSample}</div>
              <div><strong>Estimated Handcraft Completion:</strong> 4–6 Weeks (Direct Stylist Updates via WhatsApp)</div>
              <div><strong>Official Invoice Receipt:</strong> Sent to {shippingData.email}</div>
            </div>

            <button
              onClick={handleClose}
              className="btn-gold"
              style={{ padding: '14px 38px', fontSize: '0.86rem' }}
            >
              Return to Emmy's Couture
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
