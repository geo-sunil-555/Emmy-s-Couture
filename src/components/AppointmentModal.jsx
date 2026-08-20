import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ATELIER_MAISONS, CONSULTATION_SERVICES } from '../data/ateliers';
import { 
  X, 
  Sparkles, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle, 
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';

const TIME_SLOTS = [
  "10:30 AM — Morning Champagne Salon",
  "01:30 PM — Afternoon Master Fitting",
  "04:00 PM — Golden Hour Design Session",
  "06:30 PM — Private Evening VIP Lounge"
];

export const AppointmentModal = () => {
  const { 
    isAppointmentOpen, 
    setIsAppointmentOpen, 
    appointmentInitialData, 
    showToast,
    saveAppointment 
  } = useShop();

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(
    CONSULTATION_SERVICES.find((s) => s.id === appointmentInitialData?.serviceId) || CONSULTATION_SERVICES[0]
  );
  const [selectedMaison, setSelectedMaison] = useState(
    ATELIER_MAISONS.find((m) => m.id === appointmentInitialData?.maisonId) || ATELIER_MAISONS[0]
  );
  const [selectedDate, setSelectedDate] = useState('2026-08-25');
  const [selectedTime, setSelectedTime] = useState(TIME_SLOTS[0]);

  const [clientInfo, setClientInfo] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    specialRequests: ''
  });

  const [bookingRef, setBookingRef] = useState('');

  React.useEffect(() => {
    if (isAppointmentOpen) {
      if (appointmentInitialData?.serviceId) {
        const foundSvc = CONSULTATION_SERVICES.find((s) => s.id === appointmentInitialData.serviceId);
        if (foundSvc) setSelectedService(foundSvc);
      }
      if (appointmentInitialData?.maisonId) {
        const foundMsn = ATELIER_MAISONS.find((m) => m.id === appointmentInitialData.maisonId);
        if (foundMsn) setSelectedMaison(foundMsn);
      }
      setStep(1);
    }
  }, [isAppointmentOpen, appointmentInitialData]);

  if (!isAppointmentOpen) return null;

  const handleNextStep = async () => {
    if (step === 4) {
      if (!clientInfo.name || !clientInfo.email) {
        showToast("Please provide your name and contact email for the salon guest list.", "Guest Details Needed");
        return;
      }
      const ref = `EMMY-${selectedMaison.id.toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setBookingRef(ref);
      setStep(5);

      // Save to Supabase PostgreSQL database
      if (saveAppointment) {
        saveAppointment({
          bookingRef: ref,
          name: clientInfo.name,
          email: clientInfo.email,
          phone: clientInfo.phone,
          maisonId: selectedMaison.id,
          maisonName: selectedMaison.name,
          serviceId: selectedService.id,
          serviceTitle: selectedService.title,
          date: selectedDate,
          time: selectedTime,
          eventDate: clientInfo.eventDate,
          specialRequests: clientInfo.specialRequests
        });
      }

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C9A961', '#F5F0E6', '#4A1220']
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const handleClose = () => {
    setIsAppointmentOpen(false);
    setStep(1);
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div
        className="glass-panel modal-content-animated"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '780px',
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
          aria-label="Close Appointment Modal"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--bronze-highlight)', fontWeight: 700, marginBottom: '4px' }}>
            Privé South Indian Salon Booking
          </div>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--color-primary-text)', fontWeight: 600 }}>
            Reserve Private South Indian Consultation
          </h2>

          {/* Progress Indicators */}
          {step < 5 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  style={{
                    width: '36px',
                    height: '3px',
                    borderRadius: '1px',
                    background: s <= step ? 'var(--bronze-highlight)' : 'rgba(139, 115, 85, 0.2)',
                    transition: 'background 0.3s ease'
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* STEP 1: Select Service */}
        {step === 1 && (
          <div>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--bronze-highlight)', fontWeight: 600, marginBottom: '16px' }}>
              Step 1: Choose Your Couture Experience
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {CONSULTATION_SERVICES.map((srv) => {
                const isSelected = selectedService.id === srv.id;
                return (
                  <div
                    key={srv.id}
                    onClick={() => setSelectedService(srv)}
                    style={{
                      padding: '16px 20px',
                      borderRadius: '1px',
                      background: isSelected ? 'rgba(201, 169, 97, 0.18)' : '#FFFFFF',
                      border: isSelected ? '1px solid #C9A961' : '1px solid rgba(139, 115, 85, 0.2)',
                      boxShadow: '0 2px 8px rgba(26, 26, 26, 0.03)',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--color-primary-text)', fontSize: '0.96rem' }}>
                        {srv.title}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-muted-text)', marginTop: '3px' }}>
                        {srv.description}
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', minWidth: '90px' }}>
                      <div style={{ color: 'var(--bronze-highlight)', fontSize: '0.85rem', fontWeight: 700 }}>
                        {srv.price}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-text)' }}>
                        {srv.duration}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: Select Maison */}
        {step === 2 && (
          <div>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--bronze-highlight)', fontWeight: 600, marginBottom: '16px' }}>
              Step 2: Select Salon Location
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {ATELIER_MAISONS.map((m) => {
                const isSelected = selectedMaison.id === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMaison(m)}
                    style={{
                      padding: '16px 20px',
                      borderRadius: '1px',
                      background: isSelected ? 'rgba(201, 169, 97, 0.18)' : '#FFFFFF',
                      border: isSelected ? '1px solid #C9A961' : '1px solid rgba(139, 115, 85, 0.2)',
                      boxShadow: '0 2px 8px rgba(26, 26, 26, 0.03)',
                      cursor: 'pointer',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <div style={{ fontWeight: 700, color: 'var(--color-primary-text)', fontSize: '0.96rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <MapPin size={16} style={{ color: 'var(--bronze-highlight)' }} />
                        <span>{m.city}</span>
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-muted-text)', fontWeight: 600 }}>
                        {m.leadStylist}
                      </div>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--color-body-text)', marginBottom: '4px' }}>
                      {m.address}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-muted-text)' }}>
                      {m.atmosphere}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: Date & Time */}
        {step === 3 && (
          <div>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--bronze-highlight)', fontWeight: 600, marginBottom: '16px' }}>
              Step 3: Choose Consultation Date & Time Slot
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-muted-text)', fontWeight: 600, marginBottom: '8px' }}>
                  Preferred Date:
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min="2026-08-10"
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#FFFFFF',
                    border: '1px solid rgba(139, 115, 85, 0.3)',
                    color: 'var(--color-primary-text)',
                    padding: '12px 14px',
                    borderRadius: '1px',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-muted-text)', fontWeight: 600, marginBottom: '8px' }}>
                  Location Confirmed:
                </label>
                <div style={{ padding: '12px', background: '#FFFFFF', border: '1px solid rgba(139, 115, 85, 0.2)', borderRadius: '1px', fontSize: '0.82rem', color: 'var(--bronze-highlight)', fontWeight: 700 }}>
                  📍 {selectedMaison.city}
                </div>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-muted-text)', fontWeight: 600, marginBottom: '10px' }}>
                Available Private Fitting Slots:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {TIME_SLOTS.map((slot, i) => {
                  const isSelected = selectedTime === slot;
                  return (
                    <div
                      key={i}
                      onClick={() => setSelectedTime(slot)}
                      style={{
                        padding: '12px 14px',
                        background: isSelected ? 'rgba(201, 169, 97, 0.18)' : '#FFFFFF',
                        border: isSelected ? '1px solid #C9A961' : '1px solid rgba(139, 115, 85, 0.2)',
                        color: 'var(--color-primary-text)',
                        fontWeight: isSelected ? 600 : 400,
                        fontSize: '0.8rem',
                        borderRadius: '1px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <Clock size={14} style={{ color: 'var(--bronze-highlight)' }} />
                      <span>{slot}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Client Information */}
        {step === 4 && (
          <div>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--bronze-highlight)', fontWeight: 600, marginBottom: '16px' }}>
              Step 4: Guest Credentials & Styling Notes
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-muted-text)', fontWeight: 600, marginBottom: '6px' }}>
                  Full Name / Title: *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lady Victoria Sterling"
                  value={clientInfo.name}
                  onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })}
                  style={{
                    width: '100%',
                    background: '#FFFFFF',
                    border: '1px solid rgba(139, 115, 85, 0.3)',
                    color: 'var(--color-primary-text)',
                    padding: '12px',
                    borderRadius: '1px',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-muted-text)', fontWeight: 600, marginBottom: '6px' }}>
                    Email Address: *
                  </label>
                  <input
                    type="email"
                    placeholder="guest@domain.com"
                    value={clientInfo.email}
                    onChange={(e) => setClientInfo({ ...clientInfo, email: e.target.value })}
                    style={{
                      width: '100%',
                      background: '#FFFFFF',
                      border: '1px solid rgba(139, 115, 85, 0.3)',
                      color: 'var(--color-primary-text)',
                      padding: '12px',
                      borderRadius: '1px',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.74rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-muted-text)', fontWeight: 600, marginBottom: '6px' }}>
                    Telephone / WhatsApp:
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={clientInfo.phone}
                    onChange={(e) => setClientInfo({ ...clientInfo, phone: e.target.value })}
                    style={{
                      width: '100%',
                      background: '#FFFFFF',
                      border: '1px solid rgba(139, 115, 85, 0.3)',
                      color: 'var(--color-primary-text)',
                      padding: '12px',
                      borderRadius: '1px',
                      fontSize: '0.85rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-muted-text)', fontWeight: 600, marginBottom: '6px' }}>
                  Target Occasion or Wedding Gala Date:
                </label>
                <input
                  type="date"
                  value={clientInfo.eventDate}
                  onChange={(e) => setClientInfo({ ...clientInfo, eventDate: e.target.value })}
                  style={{
                    width: '100%',
                    background: '#FFFFFF',
                    border: '1px solid rgba(139, 115, 85, 0.3)',
                    color: 'var(--color-primary-text)',
                    padding: '12px',
                    borderRadius: '1px',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.74rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-muted-text)', fontWeight: 600, marginBottom: '6px' }}>
                  Specific Preferences for Champagne Service & Garments:
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Interested in Kanchipuram bridal pattu drape and aari embroidery."
                  value={clientInfo.specialRequests}
                  onChange={(e) => setClientInfo({ ...clientInfo, specialRequests: e.target.value })}
                  style={{
                    width: '100%',
                    background: '#FFFFFF',
                    border: '1px solid rgba(139, 115, 85, 0.3)',
                    color: 'var(--color-primary-text)',
                    padding: '12px',
                    borderRadius: '1px',
                    fontSize: '0.85rem',
                    outline: 'none',
                    resize: 'none'
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Booking Confirmation */}
        {step === 5 && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
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
              <CheckCircle size={36} />
            </div>

            <div className="badge-gold" style={{ marginBottom: '10px' }}>
              Booking Confirmed: {bookingRef}
            </div>

            <h3 style={{ fontSize: '1.6rem', color: 'var(--color-primary-text)', fontWeight: 600, marginBottom: '10px' }}>
              We Await Your Visit, {clientInfo.name}
            </h3>

            <p style={{ color: 'var(--color-muted-text)', fontSize: '0.88rem', maxWidth: '520px', margin: '0 auto 24px auto', lineHeight: 1.6 }}>
              Your private appointment at <strong>{selectedMaison.city}</strong> for <strong>{selectedService.title}</strong> has been secured for <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong>.
            </p>

            {/* Appointment Summary Card */}
            <div
              style={{
                background: '#FFFFFF',
                border: '1px solid rgba(139, 115, 85, 0.25)',
                boxShadow: '0 4px 12px rgba(26, 26, 26, 0.05)',
                borderRadius: '2px',
                padding: '18px 24px',
                textAlign: 'left',
                maxWidth: '520px',
                margin: '0 auto 24px auto',
                fontSize: '0.82rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div><strong>Salon Address:</strong> {selectedMaison.address}</div>
              <div><strong>Lead Couturière:</strong> {selectedMaison.leadStylist}</div>
              <div><strong>Confirmation Notice:</strong> Dispatched to {clientInfo.email}</div>
            </div>

            <button
              onClick={handleClose}
              className="btn-gold"
              style={{ padding: '14px 36px', fontSize: '0.84rem' }}
            >
              Return to Maison Experience
            </button>
          </div>
        )}

        {/* Modal Footer Controls */}
        {step < 5 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '32px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(139, 115, 85, 0.15)'
            }}
          >
            {step > 1 ? (
              <button
                onClick={() => setStep((prev) => prev - 1)}
                className="btn-ghost"
                style={{ padding: '10px 20px', fontSize: '0.78rem' }}
              >
                <ArrowLeft size={14} />
                <span>Back</span>
              </button>
            ) : <div />}

            <button
              onClick={handleNextStep}
              className="btn-gold"
              style={{ padding: '12px 28px', fontSize: '0.82rem' }}
            >
              <span>{step === 4 ? "Confirm VIP Appointment" : "Proceed"}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
