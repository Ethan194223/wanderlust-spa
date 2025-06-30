// src/pages/Auth/Login.tsx
import { useState }            from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import useAuth, { useAuth as useAuthNamed } from '@/hooks/useAuth'; // works with either import style
import AuthForm               from '@/components/AuthForm';

export default function Login() {
  /* ──────────────── auth & router ──────────────── */
  const { user, login } = useAuth();          // or useAuthNamed()
  const nav             = useNavigate();

  /* ──────────────── local state ──────────────── */
  const [error, setError] = useState<string | null>(null);

  /* ──────────────── redirect if already logged-in ──────────────── */
  if (user) return <Navigate to="/" replace />;

  /* ──────────────── form handler ──────────────── */
  async function handleLogin(email: string, password: string) {
    try {
      await login(email, password);   // saves JWT + sets user
      nav('/');                       // jump to home
    } catch {
      setError('Invalid e-mail or password');
    }
  }

  /* ──────────────── UI ──────────────── */
  return (
    <main className="max-w-sm mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Log In</h1>

      {error && (
        <p className="text-red-600 text-center mb-4" role="alert">
          {error}
        </p>
      )}

      {/* Reusable form component already collects e-mail + password */}
      <AuthForm submitLabel="Log in" onSubmit={handleLogin} />
    </main>
  );
}


