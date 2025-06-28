// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// ⬅️  If you put AuthProvider inside hooks/useAuth.ts, import from there.
//     If you created src/context/AuthContext.tsx, change the path accordingly.
import { AuthProvider } from './hooks/useAuth';

import Login      from './pages/Login';
import Register   from './pages/Register';
import Dashboard  from './pages/Dashboard';
import ProtectedRoute from './routes/ProtectedRoute';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Anything below is gated by <ProtectedRoute /> */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            {/* or use <Route index element={<Dashboard />} /> if you move the path to the wrapper */}
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
