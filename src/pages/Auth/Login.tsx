// src/pages/Auth/Login.tsx
import { useState }        from 'react';
import { useNavigate }     from 'react-router-dom';
import useAuth             from '@/hooks/useAuth';      // ⬅️ default import
import AuthForm            from '@/components/AuthForm';

export default function Login() {
  const { login } = useAuth();          // hook gives you { login, … }
  const nav       = useNavigate();
  const [error, setError] = useState<string | null>(null);

  async function handleLogin(email: string, password: string) {
    try {
      await login(email, password);     // POST /auth/login
      nav('/');                         // success → dashboard
    } catch {
      setError('Invalid credentials');
    }
  }

  return (
    <main className="max-w-sm mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center">Log In</h1>

      {error && (
        <p className="text-red-600 text-center mt-4" role="alert">
          {error}
        </p>
      )}

      {/* reusable form component */}
      <AuthForm submitLabel="Log in" onSubmit={handleLogin} />
    </main>
  );
}


