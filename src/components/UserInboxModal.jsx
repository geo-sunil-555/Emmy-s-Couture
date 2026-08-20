import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Mail, 
  X, 
  Crown, 
  Sparkles, 
  Check, 
  Trash2, 
  Clock, 
  ShieldCheck, 
  Calendar,
  ChevronRight,
  ArrowLeft,
  Award,
  Ticket
} from 'lucide-react';

export const UserInboxModal = () => {
  const { 
    isInboxOpen, 
    setIsInboxOpen, 
    currentUser, 
    userMessages, 
    markMessageAsRead, 
    deleteUserMessage,
    openAppointmentModal,
    applyPromo,
    setIsCartOpen
  } = useShop();

  const [selectedMessage, setSelectedMessage] = useState(null);

  const cleanText = (str) => {
    if (!str || typeof str !== 'string') return str || '';
    return str
      .replace(/Emmy's Haute Couture/gi, "Emmy's Couture")
      .replace(/Haute Couture/gi, "Couture")
      .replace(/Haute /gi, "")
      .replace(/ haute /gi, " ")
      .replace(/Emmy's Couture Atelier Directorate/gi, "Emmy's Couture Atelier")
      .replace(/Master Atelier Directorate/gi, "Master Atelier")
      .replace(/Atelier Directorate/gi, "Emmy's Couture Atelier")
      .replace(/Master Couture Directorate/gi, "Emmy's Couture Maison")
      .replace(/Emmy's Couture Directorate/gi, "Emmy's Couture")
      .replace(/Salon Directorate/gi, "Salon Concierge")
      .replace(/Quality Directorate/gi, "Master Quality Team")
      .replace(/Couture Directorate/gi, "Couture Maison")
      .replace(/Directorate/gi, "Maison");
  };

  if (!isInboxOpen) return null;

  // Filter messages for current user
  const clientEmail = (currentUser?.email || '').toLowerCase();
  const myMessages = userMessages.filter(
    (m) => (m.recipientEmail || '').toLowerCase() === clientEmail || m.recipientId === currentUser?.id || !m.recipientEmail
  );

  const unreadCount = myMessages.filter((m) => !m.read).length;

  const handleSelectMessage = (msg) => {
    setSelectedMessage(msg);
    if (!msg.read) {
      markMessageAsRead(msg.id);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(18, 11, 14, 0.82)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.25s ease'
      }}
      onClick={() => setIsInboxOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '780px',
          maxHeight: '88vh',
          background: '#FDFBF7',
          borderRadius: '4px',
          border: '1px solid rgba(212, 175, 122, 0.45)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.45)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Modal Top Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, #4A1222 0%, #2A0914 100%)',
            borderBottom: '1px solid rgba(212, 175, 122, 0.35)',
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#FAF7F2'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(212, 175, 122, 0.15)',
                border: '1px solid rgba(212, 175, 122, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#D4AF7A'
              }}
            >
              <Mail size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 600, color: '#FAF7F2', fontFamily: 'var(--font-serif-primary)' }}>
                  Atelier Inbox & Maison Letters
                </h3>
                {currentUser?.isVip && (
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #D4AF7A 0%, #AA7C39 100%)',
                      color: '#1A1A1A',
                      fontSize: '0.64rem',
                      fontWeight: 800,
                      padding: '2px 8px',
                      borderRadius: '10px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase'
                    }}
                  >
                    <Crown size={11} />
                    Privé VIP Member
                  </span>
                )}
              </div>
              <p style={{ margin: '2px 0 0 0', fontSize: '0.76rem', color: '#D4AF7A' }}>
                Official correspondence from Emmy's Couture Maison & Master Karigars
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {unreadCount > 0 && (
              <span
                style={{
                  background: '#9C1A1A',
                  color: '#FFFFFF',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: '12px'
                }}
              >
                {unreadCount} New
              </span>
            )}
            <button
              onClick={() => setIsInboxOpen(false)}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#FAF7F2',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: selectedMessage ? '24px' : '0' }}>
          {selectedMessage ? (
            /* Detailed Letter View */
            <div>
              <button
                onClick={() => setSelectedMessage(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#5C1A2E',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '20px',
                  padding: 0
                }}
              >
                <ArrowLeft size={15} />
                <span>Back to All Letters</span>
              </button>

              {/* Parchment Styled Letter Container */}
              <div
                style={{
                  background: '#FFFDF9',
                  border: '1px solid rgba(212, 175, 122, 0.4)',
                  borderRadius: '3px',
                  padding: '36px 32px',
                  boxShadow: '0 8px 30px rgba(92, 26, 46, 0.06)',
                  position: 'relative'
                }}
              >
                {/* Letter Masthead with Wax Seal in Flex Row */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '20px',
                    borderBottom: '1px solid rgba(212, 175, 122, 0.25)',
                    paddingBottom: '20px',
                    marginBottom: '24px'
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.7rem', color: '#887B72', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '6px' }}>
                      From: {cleanText(selectedMessage.sender) || "Emmy's Couture Atelier"}
                    </div>
                    <h2 style={{ fontSize: 'clamp(1.2rem, 2.4vw, 1.45rem)', color: '#5C1A2E', margin: '0 0 10px 0', fontFamily: 'var(--font-serif-primary)', wordBreak: 'break-word', lineHeight: 1.3 }}>
                      {cleanText(selectedMessage.subject)}
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.76rem', color: '#7A7067', flexWrap: 'wrap' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={13} style={{ color: '#D4AF7A' }} />
                        {selectedMessage.date || 'Today'}
                      </span>
                      {selectedMessage.badge && (
                        <span
                          style={{
                            background: 'rgba(212, 175, 122, 0.18)',
                            color: '#5C1A2E',
                            fontWeight: 700,
                            padding: '3px 10px',
                            borderRadius: '2px',
                            fontSize: '0.68rem',
                            border: '1px solid rgba(212, 175, 122, 0.3)'
                          }}
                        >
                          {selectedMessage.badge}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Wax Seal Decoration */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      flexShrink: 0
                    }}
                  >
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, #8A223B 0%, #5C1A2E 100%)',
                        border: '2px solid #D4AF7A',
                        boxShadow: '0 4px 12px rgba(92, 26, 46, 0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#D4AF7A'
                      }}
                    >
                      <Crown size={22} />
                    </div>
                    <span style={{ fontSize: '0.58rem', fontWeight: 800, color: '#5C1A2E', letterSpacing: '0.12em', marginTop: '4px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                      Maison Seal
                    </span>
                  </div>
                </div>

                {/* Letter Content */}
                <div
                  style={{
                    fontSize: '0.94rem',
                    lineHeight: 1.8,
                    color: '#2B2B2B',
                    whiteSpace: 'pre-line',
                    fontFamily: 'var(--font-serif-editorial)'
                  }}
                >
                  {cleanText(selectedMessage.body)}
                </div>

                {/* VIP Perks Highlight Banner (If VIP Conferred Message) */}
                {(selectedMessage.isVipConferred || selectedMessage.badge === 'VIP Privé Induction') && (
                  <div
                    style={{
                      marginTop: '28px',
                      background: 'linear-gradient(135deg, rgba(92, 26, 46, 0.05) 0%, rgba(212, 175, 122, 0.15) 100%)',
                      border: '1px solid rgba(212, 175, 122, 0.4)',
                      borderRadius: '3px',
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#5C1A2E', fontWeight: 700, fontSize: '0.86rem' }}>
                      <Sparkles size={16} style={{ color: '#D4AF7A' }} />
                      <span>Your Exclusive Privé Privileges:</span>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.82rem', color: '#4A3E39', lineHeight: 1.6 }}>
                      <li><strong>Complimentary Private Champagne Salon Fittings:</strong> Unlimited access at Kochi, Trivandrum, Kozhikode, Thrissur & Kumarakom.</li>
                      <li><strong>1-on-1 Master Couturière Access:</strong> Dedicated head karigar assigned to your bespoke wedding & gala ensembles.</li>
                      <li><strong>Pre-Release Runway Previews:</strong> Browse new collections 14 days before public release.</li>
                      <li><strong>Zero Waiting List:</strong> Priority loom allocation on master pit-looms.</li>
                    </ul>

                    <div style={{ marginTop: '6px' }}>
                      <button
                        onClick={() => {
                          setIsInboxOpen(false);
                          openAppointmentModal();
                        }}
                        style={{
                          background: '#5C1A2E',
                          color: '#FDFBF7',
                          border: '1px solid #D4AF7A',
                          padding: '10px 20px',
                          borderRadius: '2px',
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        <Calendar size={14} />
                        <span>Reserve VIP Salon Fitting</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Runway Invitation & 15% Coupon Box */}
                {(selectedMessage.hasRunwayCoupon || selectedMessage.couponCode === 'RUNWAY15' || selectedMessage.badge === 'Runway Pass (15% Off)' || selectedMessage.subject?.includes('Runway')) && (
                  <div
                    style={{
                      marginTop: '28px',
                      background: 'linear-gradient(135deg, #2A0914 0%, #4A1222 100%)',
                      border: '2px solid #D4AF7A',
                      borderRadius: '4px',
                      padding: '24px',
                      color: '#FAF7F2',
                      boxShadow: '0 10px 30px rgba(74, 18, 34, 0.35)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(212, 175, 122, 0.2)', border: '1px solid #D4AF7A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4AF7A' }}>
                          <Ticket size={19} />
                        </div>
                        <div>
                          <div style={{ fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#D4AF7A', fontWeight: 700 }}>
                            Official Front-Row Runway Pass
                          </div>
                          <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#FAF7F2' }}>
                            15% Couture Offer Unlocked
                          </div>
                        </div>
                      </div>

                      <div style={{ background: 'rgba(0, 0, 0, 0.45)', border: '1px dashed #D4AF7A', padding: '8px 16px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '0.72rem', color: '#D4AF7A', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Code:</span>
                        <span style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '0.15em', color: '#FFFFFF', fontFamily: 'monospace' }}>
                          RUNWAY15
                        </span>
                      </div>
                    </div>

                    <p style={{ margin: 0, fontSize: '0.84rem', color: '#E2D9D0', lineHeight: 1.6 }}>
                      As an official invitee of the Emmy's Couture Runway, this code unlocks <strong>15% savings</strong> on all handloom sarees, churidars, and bridal masterworks in your bag.
                    </p>

                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => {
                          applyPromo('RUNWAY15');
                          setIsInboxOpen(false);
                          setIsCartOpen(true);
                        }}
                        style={{
                          background: 'linear-gradient(135deg, #D4AF7A 0%, #AA7C39 100%)',
                          color: '#1A1A1A',
                          border: 'none',
                          padding: '10px 20px',
                          borderRadius: '2px',
                          fontSize: '0.78rem',
                          fontWeight: 800,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: '0 4px 14px rgba(212, 175, 122, 0.4)'
                        }}
                      >
                        <Sparkles size={14} />
                        <span>Apply 15% Code & Open Bag</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsInboxOpen(false);
                          openAppointmentModal();
                        }}
                        style={{
                          background: 'transparent',
                          color: '#FAF7F2',
                          border: '1px solid rgba(212, 175, 122, 0.6)',
                          padding: '10px 18px',
                          borderRadius: '2px',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Calendar size={14} style={{ color: '#D4AF7A' }} />
                        <span>Reserve Front-Row Salon Fitting</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Letter Sign-off */}
                <div style={{ marginTop: '36px', borderTop: '1px solid rgba(212, 175, 122, 0.2)', paddingTop: '20px' }}>
                  <div style={{ fontFamily: 'var(--font-signature)', fontSize: '2.4rem', color: '#5C1A2E', lineHeight: 1 }}>
                    Emmy's Couture
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#7A7067', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '4px' }}>
                    Master Couture Atelier • Kerala Flagship Maison
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Letters List View */
            <div>
              {myMessages.length === 0 ? (
                <div style={{ padding: '60px 20px', textAlign: 'center' }}>
                  <Mail size={44} style={{ color: '#D4AF7A', opacity: 0.5, marginBottom: '14px' }} />
                  <h4 style={{ fontSize: '1.15rem', color: '#5C1A2E', margin: '0 0 6px 0', fontWeight: 600 }}>
                    No Letters in Your Inbox
                  </h4>
                  <p style={{ color: '#887B72', fontSize: '0.84rem', maxWidth: '400px', margin: '0 auto' }}>
                    Official correspondence from Emmy's Couture, VIP invitations, and bespoke fitting updates will appear here.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {myMessages.map((msg) => (
                    <div
                      key={msg.id}
                      onClick={() => handleSelectMessage(msg)}
                      style={{
                        padding: '20px 24px',
                        borderBottom: '1px solid rgba(139, 115, 85, 0.12)',
                        background: msg.read ? '#FDFBF7' : '#FFF9F0',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '16px',
                        transition: 'background 0.2s ease',
                        position: 'relative'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#F6EFE6')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = msg.read ? '#FDFBF7' : '#FFF9F0')}
                    >
                      {!msg.read && (
                        <div
                          style={{
                            position: 'absolute',
                            left: '8px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: '#9C1A1A'
                          }}
                        />
                      )}

                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: msg.badge === 'VIP Privé Induction' ? 'rgba(212, 175, 122, 0.25)' : 'rgba(92, 26, 46, 0.08)',
                            border: msg.badge === 'VIP Privé Induction' ? '1px solid #D4AF7A' : '1px solid rgba(92, 26, 46, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: msg.badge === 'VIP Privé Induction' ? '#976F2F' : '#5C1A2E',
                            flexShrink: 0,
                            marginTop: '2px'
                          }}
                        >
                          {msg.badge === 'VIP Privé Induction' ? <Crown size={17} /> : <Mail size={16} />}
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '0.74rem', color: '#887B72', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                              {cleanText(msg.sender) || "Emmy's Couture Atelier"}
                            </span>
                            {msg.badge && (
                              <span
                                style={{
                                  background: msg.badge === 'VIP Privé Induction' ? '#5C1A2E' : 'rgba(212, 175, 122, 0.2)',
                                  color: msg.badge === 'VIP Privé Induction' ? '#FAF7F2' : '#5C1A2E',
                                  fontSize: '0.62rem',
                                  fontWeight: 700,
                                  padding: '1px 6px',
                                  borderRadius: '2px'
                                }}
                              >
                                {msg.badge}
                              </span>
                            )}
                          </div>

                          <div
                            style={{
                              fontSize: '0.94rem',
                              fontWeight: msg.read ? 500 : 700,
                              color: '#1A1A1A',
                              marginBottom: '4px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            {cleanText(msg.subject)}
                          </div>

                          <p
                            style={{
                              margin: 0,
                              fontSize: '0.8rem',
                              color: '#6E645D',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              lineHeight: 1.4
                            }}
                          >
                            {cleanText(msg.body)?.slice(0, 110)}...
                          </p>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                        <span style={{ fontSize: '0.72rem', color: '#887B72' }}>
                          {msg.date || 'Recent'}
                        </span>
                        <ChevronRight size={16} style={{ color: '#D4AF7A' }} />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteUserMessage(msg.id);
                          }}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#B0A8A0',
                            cursor: 'pointer',
                            padding: '4px',
                            borderRadius: '2px'
                          }}
                          title="Delete message"
                          onMouseEnter={(e) => (e.currentTarget.style.color = '#9C1A1A')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = '#B0A8A0')}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '14px 24px',
            background: '#FAF7F2',
            borderTop: '1px solid rgba(139, 115, 85, 0.18)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.74rem',
            color: '#7A7067'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={14} style={{ color: '#D4AF7A' }} />
            <span>Official Encrypted Atelier Correspondence</span>
          </div>

          <button
            onClick={() => setIsInboxOpen(false)}
            style={{
              background: 'none',
              border: '1px solid rgba(139, 115, 85, 0.3)',
              padding: '6px 14px',
              borderRadius: '2px',
              color: '#5C1A2E',
              fontWeight: 600,
              fontSize: '0.76rem',
              cursor: 'pointer'
            }}
          >
            Close Inbox
          </button>
        </div>
      </div>
    </div>
  );
};
