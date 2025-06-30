// src/App.tsx
// ---------------------------------------------------------------
// Quick sanity-check: confirm Vite picked up your env variable
console.log('API base =', import.meta.env.VITE_API_BASE);
// ---------------------------------------------------------------

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { AuthProvider }  from '@/hooks/useAuth';
import ProtectedRoute    from '@/routes/ProtectedRoute';

/* 🆕  Navbar */
import Navbar            from '@/components/Navbar';

/* Pages */
import HotelList         from '@/pages/HotelList';
import Login             from '@/pages/Auth/Login';
import Register          from '@/pages/Register';
import Dashboard         from '@/Dashboard';        // “Welcome …” screen

/* Temporary placeholder until you build the real operator dashboard */
function OperatorDashboard() {
  return <div style={{ padding: '2rem' }}>Operator dashboard — TODO</div>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* ────── Site-wide layout wrapper ────── */}
        <div className="flex min-h-screen flex-col">
          <Navbar />                            {/* ⬅️  ← HERE */}

          <main className="flex-1">
            <Routes>
              {/* ───────── Public routes ───────── */}
              <Route index element={<HotelList />} />           {/* / */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/login"     element={<Login />} />
              <Route path="/register"  element={<Register />} />

              {/* ───────── Operator-only area ───────── */}
              <Route
                path="/operator/*"
                element={
                  <ProtectedRoute>
                    <OperatorDashboard />
                  </ProtectedRoute>
                }
              />

              {/* ───────── Catch-all: redirect home ───────── */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
