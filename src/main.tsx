// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// ⬇️  Auth provider (adjust import path if yours differs)
import { AuthProvider } from './hooks/useAuth';

// Pages
import Login      from './pages/Login';
import Register   from './pages/Register';
import Dashboard  from './pages/Dashboard';
import Hotels     from './pages/Hotels';         // ⬅️ new import

// Route guards
import ProtectedRoute from './routes/ProtectedRoute';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/hotels"   element={<Hotels />} />   {/* ⬅️ public catalogue */}

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            {/* Or: <Route index element={<Dashboard />} /> if you nest paths differently */}
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

