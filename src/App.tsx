// src/App.tsx
// ------------------------------------------------------------------
// Quick sanity-check: make sure Vite is picking up your .env setting
console.log('API base =', import.meta.env.VITE_API_BASE);
// ------------------------------------------------------------------

import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import ProtectedRoute from './routes/ProtectedRoute';
import Login      from './pages/Auth/Login';
import HotelList  from './pages/HotelList';   // <-- fixed path

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* public pages ------------------------------------------------ */}
          <Route path="/"      element={<HotelList />} />
          <Route path="/login" element={<Login />} />

          {/* operator area (JWT-protected) ------------------------------ */}
          <Route
            path="/operator/*"
            element={
              <ProtectedRoute>
                <div style={{ padding: '2rem' }}>
                  Operator dashboard — TODO
                </div>
              </ProtectedRoute>
            }
          />

          {/* fallback for any other route ------------------------------- */}
          <Route path="*" element={<Outlet />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}



