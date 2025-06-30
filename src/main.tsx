// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './hooks/useAuth';

// pages
import Login      from './pages/Auth/Login';
import Register   from './pages/Register';
import Dashboard  from './pages/Operator/Dashboard';
import HotelList  from './pages/HotelList';      // ← fixed path

// route guard
import ProtectedRoute from './routes/ProtectedRoute';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* public */}
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/hotels"   element={<HotelList />} />

          {/* protected */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

