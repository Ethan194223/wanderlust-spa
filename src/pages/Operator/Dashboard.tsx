// src/pages/Operator/Dashboard.tsx
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';      // ← two dots up, then hooks

export default function Dashboard() {
  const { user, logout } = useAuth();

  // not logged-in? kick back to /login
  if (!user) return <Navigate to="/login" replace />;

  return (
    <main style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1 className="text-3xl mb-6">Welcome&nbsp;{user.email}</h1>

      <button
        onClick={logout}
        className="rounded bg-gray-700 text-white py-2 px-4 hover:bg-gray-800"
      >
        Log&nbsp;out
      </button>
    </main>
  );
}
