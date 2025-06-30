// src/routes/ProtectedRoute.tsx
// src/routes/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import type { ReactElement } from 'react';   // 👈 type-only import fixes TS1484
import useAuth from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: ReactElement;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth();               // or const { token } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

