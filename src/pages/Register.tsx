import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import AuthForm from '../components/AuthForm';

export default function Register() {
  const { register } = useAuth();
  const nav = useNavigate();

  return (
    <>
      <h1 className="text-2xl text-center mt-8">Register</h1>
      <AuthForm
        submitLabel="Create account"
        onSubmit={async (e, p) => {
          await register(e, p);
          nav('/');           // go to dashboard
        }}
      />
      <p className="text-center mt-4">
        Have an account? <Link to="/login" className="text-blue-600 underline">Log in</Link>
      </p>
    </>
  );
}
