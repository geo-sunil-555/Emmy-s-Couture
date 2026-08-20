import React, { Suspense, lazy } from 'react';
import { useShop } from '../context/ShopContext';

const AdminAuthGate = lazy(() => import('./AdminAuthGate').then((m) => ({ default: m.AdminAuthGate })));
const AdminPortal = lazy(() => import('./AdminPortal').then((m) => ({ default: m.AdminPortal })));

export const AdminPage = () => {
  const { isAdminAuthenticated } = useShop();

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
      {!isAdminAuthenticated ? <AdminAuthGate /> : <AdminPortal />}
    </Suspense>
  );
};
