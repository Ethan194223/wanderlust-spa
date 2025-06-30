// src/pages/Register.tsx
import { Link, useNavigate } from 'react-router-dom';
import useAuth       from '@/hooks/useAuth';      // default import – no braces
import AuthForm      from '@/components/AuthForm';

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();

  return (
    <>
      <h1 className="text-2xl text-center mt-8">Register</h1>

      <AuthForm
        submitLabel="Create account"
        onSubmit={async (email, password) => {
          // quick display-name taken from mailbox part
          const name = email.split('@')[0];

          await register(email, password, name); // ← 3 args now
          nav('/');                              // go to dashboard
        }}
      />

      <p className="text-center mt-4">
        Have an account?{' '}
        <Link to="/login" className="text-blue-600 underline">
          Log&nbsp;in
        </Link>
      </p>
    </>
  );
}


