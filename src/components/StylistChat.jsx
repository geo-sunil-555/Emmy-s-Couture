import React, { useState, useRef, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Sparkles, 
  X, 
  Send, 
  UserCheck
} from 'lucide-react';

const INITIAL_MESSAGES = [
  {
    sender: 'stylist',
    text: "Namaskaram and welcome to Emmy's Couture Maison. I am Meera, your Senior Bridal & Handloom Stylist Concierge. Whether you need guidance on Kerala Muhurtham silks, bespoke Kanchipuram half-sarees, or booking a private salon fitting in Kochi, Thiruvananthapuram, or Kozhikode, I am at your service."
  }
];

const PRESET_QUESTIONS = [
  "What is best for a Kerala Muhurtham ceremony?",
  "How do bespoke 32-point measurements work?",
  "Tell me about the Imperial Wine Zardozi Bridal collection.",
  "How do I reserve a private Kerala salon fitting?"
];

export const StylistChat = () => {
  const { 
    isStylistChatOpen, 
    setIsStylistChatOpen 
  } = useShop();

  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isStylistChatOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isStylistChatOpen]);

  const handleSend = (textToSend) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const newMessages = [...messages, { sender: 'user', text }];
    setMessages(newMessages);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      let reply = "Our master couturières and karigars would be delighted to assist with your bespoke creation. May I reserve a complimentary private salon fitting or consultation for you?";
      const lower = text.toLowerCase();

      if (lower.includes("muhurtham") || lower.includes("wedding") || lower.includes("bridal") || lower.includes("bride")) {
        reply = "For an unforgettable Muhurtham or wedding ceremony, we recommend our 'Aadrika Midnight & Ivory' royal Kanchipuram half-saree with 24k gold korvai temple borders, or the 'Kalyani Imperial Wine & 24k Zardozi' bridal lehenga.";
      } else if (lower.includes("measurement") || lower.includes("size") || lower.includes("fit") || lower.includes("bespoke")) {
        reply = "Every Emmy's Couture creation is tailored with 32-point anatomical precision. You can select 'Bespoke Made-to-Measure' directly during checkout, or our master tailors will guide you in person at our Kerala flagship salons.";
      } else if (lower.includes("booking") || lower.includes("fitting") || lower.includes("appointment") || lower.includes("salon")) {
        reply = "Our flagship salons in Kochi (Panampilly Nagar), Thiruvananthapuram (Kowdiar), Kozhikode (PT Usha Road), Thrissur, and Kumarakom are open for private fittings. Tap 'Book Kerala Salon Fitting' in the navigation to reserve your session.";
      } else if (lower.includes("saree") || lower.includes("kasavu") || lower.includes("handloom") || lower.includes("silk")) {
        reply = "Our handlooms are woven on authentic traditional pit-looms using 100% pure Mulberry silk, authentic Balaramapuram Kasavu, and certified gold zari bullion. Each piece requires 180 to 420 artisan hours.";
      }

      setMessages((prev) => [...prev, { sender: 'stylist', text: reply }]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <>
      {/* Floating Concierge Button */}
      <div
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 900
        }}
      >
        <button
          onClick={() => setIsStylistChatOpen(!isStylistChatOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: '#1A1A1A',
            color: '#FAF7F2',
            border: '1px solid #1A1A1A',
            borderRadius: '40px',
            padding: '14px 22px',
            cursor: 'pointer',
            boxShadow: '0 8px 30px rgba(26, 26, 26, 0.25)',
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            fontSize: '0.8rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            transition: 'var(--transition-smooth)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--bronze-highlight)';
            e.currentTarget.style.borderColor = 'var(--bronze-highlight)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#1A1A1A';
            e.currentTarget.style.borderColor = '#1A1A1A';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          aria-label="Open Stylist Concierge"
        >
          <Sparkles size={18} style={{ color: 'var(--gold-accent)' }} />
          <span className="hidden sm:inline">Stylist Concierge</span>
        </button>
      </div>

      {/* Floating Chat Window */}
      {isStylistChatOpen && (
        <div
          className="glass-panel"
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '28px',
            width: '380px',
            maxWidth: 'calc(100vw - 36px)',
            height: '520px',
            maxHeight: '75vh',
            borderRadius: '2px',
            background: '#FAF7F2',
            border: '1px solid rgba(139, 115, 85, 0.35)',
            boxShadow: '0 20px 60px rgba(26, 26, 26, 0.18)',
            zIndex: 950,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'slideUp 0.3s ease'
          }}
        >
          {/* Chat Header */}
          <div
            style={{
              padding: '16px 20px',
              background: '#F3ECE2',
              borderBottom: '1px solid rgba(139, 115, 85, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(201, 169, 97, 0.2)',
                  border: '1px solid var(--gold-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--bronze-highlight)'
                }}
              >
                <UserCheck size={18} />
              </div>
              <div>
                <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--color-primary-text)' }}>
                  Madame Camille
                </div>
                <div style={{ fontSize: '0.68rem', color: 'var(--color-muted-text)' }}>
                  Senior Stylist • South Indian Couture Atelier
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsStylistChatOpen(false)}
              style={{ background: 'none', border: 'none', color: 'var(--color-primary-text)', cursor: 'pointer' }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px',
              background: '#FAF7F2'
            }}
          >
            {messages.map((m, i) => {
              const isStylist = m.sender === 'stylist';
              return (
                <div
                  key={i}
                  style={{
                    alignSelf: isStylist ? 'flex-start' : 'flex-end',
                    maxWidth: '85%',
                    padding: '12px 16px',
                    borderRadius: isStylist ? '1px 12px 12px 12px' : '12px 1px 12px 12px',
                    background: isStylist ? '#FFFFFF' : '#1A1A1A',
                    color: isStylist ? 'var(--color-primary-text)' : '#FAF7F2',
                    border: isStylist ? '1px solid rgba(139, 115, 85, 0.2)' : 'none',
                    boxShadow: '0 2px 8px rgba(26, 26, 26, 0.04)',
                    fontSize: '0.82rem',
                    lineHeight: 1.55
                  }}
                >
                  {m.text}
                </div>
              );
            })}

            {isTyping && (
              <div
                style={{
                  alignSelf: 'flex-start',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  background: '#FFFFFF',
                  border: '1px solid rgba(139, 115, 85, 0.2)',
                  fontSize: '0.74rem',
                  color: 'var(--bronze-highlight)',
                  fontStyle: 'italic'
                }}
              >
                Camille is consulting South Indian atelier archives...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Preset Chips */}
          <div
            style={{
              padding: '8px 14px',
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              background: '#F3ECE2',
              borderTop: '1px solid rgba(139, 115, 85, 0.15)'
            }}
          >
            {PRESET_QUESTIONS.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                style={{
                  whiteSpace: 'nowrap',
                  padding: '5px 10px',
                  background: '#FFFFFF',
                  border: '1px solid rgba(139, 115, 85, 0.25)',
                  color: 'var(--color-primary-text)',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  borderRadius: '1px',
                  cursor: 'pointer'
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Chat Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            style={{
              padding: '12px 16px',
              background: '#FAF7F2',
              borderTop: '1px solid rgba(139, 115, 85, 0.2)',
              display: 'flex',
              gap: '8px'
            }}
          >
            <input
              type="text"
              placeholder="Ask Madame Camille for styling advice..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              style={{
                flex: 1,
                background: '#FFFFFF',
                border: '1px solid rgba(139, 115, 85, 0.3)',
                color: 'var(--color-primary-text)',
                padding: '8px 12px',
                fontSize: '0.8rem',
                borderRadius: '1px',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              style={{
                background: '#1A1A1A',
                color: '#FAF7F2',
                border: 'none',
                padding: '8px 14px',
                borderRadius: '1px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </form>

        </div>
      )}
    </>
  );
};
