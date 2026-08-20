import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const Footer = () => {
  const { openAppointmentModal, showToast, setIsAdminOpen, requestInvitation } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    requestInvitation(newsletterEmail);
    setSubscribed(true);

    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.8 },
        colors: ['#C9A961', '#5C1A2E']
      });
    } catch (err) {
      console.log(err);
    }
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer style={{ background: '#FDFBF7', borderTop: '1px solid rgba(212, 175, 122, 0.25)', paddingTop: '80px', paddingBottom: '40px' }}>
      <div className="container-couture">
        
        {/* Top Newsletter Card */}
        <div
          className="glass-panel"
          style={{
            padding: '48px 36px',
            borderRadius: '2px',
            border: '1px solid rgba(139, 115, 85, 0.25)',
            boxShadow: '0 10px 30px rgba(26, 26, 26, 0.05)',
            marginBottom: '70px',
            textAlign: 'center',
            background: '#FFFFFF'
          }}
        >
          <div style={{ fontSize: '0.74rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'var(--bronze-highlight)', fontWeight: 700, marginBottom: '8px' }}>
            Privé Circle Membership
          </div>
          <h3 style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)', color: 'var(--color-primary-text)', fontWeight: 600, marginBottom: '12px' }}>
            Join Le Cercle Privé Emmy's Couture
          </h3>
          <p style={{ color: 'var(--color-muted-text)', fontSize: '0.9rem', maxWidth: '620px', margin: '0 auto 28px auto', lineHeight: 1.6 }}>
            Request private access to Emmy's South Indian Couture runway showcases and rare handloom releases. Once your invitation is officially approved and dispatched by the Master Atelier Admin, you will receive your 15% welcome privilege pass in your inbox.
          </p>

          {!subscribed ? (
            <form
              onSubmit={handleSubscribe}
              style={{
                display: 'flex',
                maxWidth: '480px',
                margin: '0 auto',
                gap: '8px',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}
            >
              <input
                type="email"
                required
                placeholder="Enter your private email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                style={{
                  flex: '1 1 280px',
                  background: '#FAF7F2',
                  border: '1px solid rgba(139, 115, 85, 0.3)',
                  color: 'var(--color-primary-text)',
                  padding: '12px 18px',
                  fontSize: '0.84rem',
                  borderRadius: '1px',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                className="btn-gold"
                style={{ padding: '12px 24px', fontSize: '0.8rem' }}
              >
                <span>Request Invitation</span>
                <ArrowRight size={14} />
              </button>
            </form>
          ) : (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                background: 'linear-gradient(135deg, rgba(92, 26, 46, 0.06) 0%, rgba(212, 175, 122, 0.2) 100%)',
                border: '1px solid var(--gold-border)',
                padding: '12px 24px',
                borderRadius: '2px',
                color: '#5C1A2E',
                fontSize: '0.86rem',
                fontWeight: 600,
                maxWidth: '650px',
                lineHeight: 1.5,
                textAlign: 'left'
              }}
            >
              <Sparkles size={18} style={{ color: '#D4AF7A', flexShrink: 0 }} />
              <span>
                ✦ <strong>Invitation Request Submitted:</strong> Your dossier is in review by Emmy's Couture Maison. The 15% Runway & Privé offer will be activated in your inbox upon Admin approval.
              </span>
            </div>
          )}
        </div>

        {/* Footer 4 Columns Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '60px'
          }}
        >
          {/* Col 1: Brand Info */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-signature)',
                  fontSize: '2.4rem',
                  color: 'var(--gold-accent)',
                  display: 'block',
                  lineHeight: 0.9
                }}
              >
                Emmy's
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.74rem',
                  letterSpacing: '0.42em',
                  textTransform: 'uppercase',
                  color: 'var(--color-primary-text)',
                  fontWeight: 700
                }}
              >
                COUTURE
              </span>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--color-muted-text)', lineHeight: 1.65, marginBottom: '16px' }}>
              Authentic Kerala Kasavu sarees, bespoke Kanchipuram bridal dhavanis, and royal bridal couture crafted with master weavers in Kerala.
            </p>

            <div style={{ fontSize: '0.76rem', color: 'var(--bronze-highlight)', fontWeight: 600 }}>
              Panampilly Nagar Main Avenue, Kochi, Kerala
            </div>
          </div>

          {/* Col 2: Atelier Maisons */}
          <div>
            <h4 style={{ fontSize: '0.88rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--bronze-highlight)', fontWeight: 700, marginBottom: '18px' }}>
              Kerala Atelier Salons
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem', color: 'var(--color-muted-text)' }}>
              <li>📍 <strong>Kochi:</strong> Panampilly Nagar & Fort Kochi</li>
              <li>📍 <strong>Thiruvananthapuram:</strong> Kowdiar Palace Avenue</li>
              <li>📍 <strong>Kozhikode:</strong> PT Usha Road Coastal Suite</li>
              <li>📍 <strong>Thrissur:</strong> Palace Road Heritage Studio</li>
              <li>📍 <strong>Kumarakom:</strong> Backwaters Private Villa</li>
              <li>
                <button
                  onClick={() => openAppointmentModal()}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--bronze-highlight)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    textDecoration: 'underline',
                    padding: 0
                  }}
                >
                  Book Kerala Salon Fitting →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Maison Experience */}
          <div>
            <h4 style={{ fontSize: '0.88rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--bronze-highlight)', fontWeight: 700, marginBottom: '18px' }}>
              Maison Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem', color: 'var(--color-muted-text)' }}>
              <li>
                <button onClick={() => scrollTo('collections')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
                  Churidar & Anarkali Silk Sets
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('collections')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
                  Kanchipuram & Kasavu Sarees
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('lookbook')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
                  South Indian Runway Catwalk
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('heritage')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
                  Handloom Craftsmanship & Zari
                </button>
              </li>
              <li>
                <button onClick={() => openAppointmentModal("virtual-vip")} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer' }}>
                  Virtual VIP Global Styling Suite
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Private Concierge */}
          <div>
            <h4 style={{ fontSize: '0.88rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--bronze-highlight)', fontWeight: 700, marginBottom: '18px' }}>
              Private Concierge
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem', color: 'var(--color-muted-text)' }}>
              <div>Direct Atelier Phone: <strong style={{ color: 'var(--color-primary-text)' }}>+91 44 2833 9000</strong></div>
              <div>VIP Client WhatsApp: <strong style={{ color: 'var(--color-primary-text)' }}>+91 98400 12345</strong></div>
              <div>Concierge Email: concierge@emmyscouture.com</div>
              <div style={{ marginTop: '8px', fontSize: '0.74rem', color: 'var(--color-muted-text)' }}>
                Concierge hours: 24/7 dedicated assistance for bridal orders and private salon fittings across India & worldwide.
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Trademark & Legal */}
        <div
          style={{
            paddingTop: '30px',
            borderTop: '1px solid rgba(139, 115, 85, 0.15)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            fontSize: '0.74rem',
            color: 'var(--color-muted-text)'
          }}
        >
          <div>
            © 2026 EMMY'S COUTURE. ALL RIGHTS RESERVED.
          </div>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span>Privacy Policy</span>
            <span>Terms of Bespoke Commission</span>
            <span>Sustainable Mulberry Silk Charter</span>
            <span>Sitemap</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
