// src/pages/Auth/Register.tsx
import { Link, useNavigate } from 'react-router-dom';
import useAuth               from '@/hooks/useAuth';
import AuthForm              from '@/components/AuthForm';

/**
 * Register Page
 * ────────────────────────────────────────────────
 * Re-uses <AuthForm /> to gather email + password.
 * Derives a quick display-name from the email prefix.
 */
export default function Register() {
  const { register } = useAuth();
  const nav          = useNavigate();

  return (
    <main className="max-w-sm mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center">Register</h1>

      <AuthForm
        submitLabel="Create account"
        onSubmit={async (email, password) => {
          const name = email.split('@')[0]; // simple default display-name
          await register(email, password, name);
          nav('/');                         // go to hotel list on success
        }}
      />

      <p className="text-center mt-4">
        Have an account?{' '}
        <Link to="/login" className="text-blue-600 underline">
          Log&nbsp;in
        </Link>
      </p>
    </main>
  );
}


