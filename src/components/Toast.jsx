import React from 'react';
import { useShop } from '../context/ShopContext';
import { Sparkles } from 'lucide-react';

export const Toast = () => {
  const { toast } = useShop();

  if (!toast) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '90px',
        right: '28px',
        zIndex: 1100,
        background: '#FAF7F2',
        border: '1px solid rgba(139, 115, 85, 0.4)',
        borderRadius: '1px',
        padding: '14px 20px',
        boxShadow: '0 10px 30px rgba(26, 26, 26, 0.12), 0 0 20px rgba(201, 169, 97, 0.15)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        maxWidth: '380px',
        animation: 'slideInRight 0.35s ease'
      }}
    >
      <div
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          background: 'rgba(201, 169, 97, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--bronze-highlight)',
          flexShrink: 0
        }}
      >
        <Sparkles size={14} />
      </div>

      <div>
        <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--bronze-highlight)', fontWeight: 700 }}>
          {toast.title}
        </div>
        <div style={{ fontSize: '0.82rem', color: 'var(--color-primary-text)', fontWeight: 500 }}>
          {toast.message}
        </div>
      </div>
    </div>
  );
};
