// src/pages/Login.tsx
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AuthForm from '../components/AuthForm';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  return (
    <>
      <h1 className="text-2xl text-center my-6">Log In</h1>
      <AuthForm
        submitLabel="Log In"
        onSubmit={async (e, p) => {
          await login(e, p);
          nav('/');
        }}
      />
      <p className="text-center mt-4">
        No account? <Link to="/register" className="text-blue-600 underline">Register</Link>
      </p>
    </>
  );
}
