import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Manage PWA Service Worker: Unregister in DEV to prevent stale cache, register only in PROD
if ('serviceWorker' in navigator) {
  if (import.meta.env.DEV) {
    // In development, unregister any existing service worker and clear caches to ensure fresh Vite HMR
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister();
      }
    });
    if ('caches' in window) {
      caches.keys().then((keys) => {
        for (const key of keys) {
          caches.delete(key);
        }
      });
    }
  } else if (window.location.protocol.startsWith('http')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((reg) => {
          console.log('Service Worker registered successfully:', reg.scope);
        })
        .catch((err) => {
          console.error('Service Worker registration failed:', err);
        });
    });
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
