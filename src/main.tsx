// src/main.tsx
import './index.css';            // ①  must come first so Tailwind styles load

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';         // App already wraps AuthProvider + Router

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
