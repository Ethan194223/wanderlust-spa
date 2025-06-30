// src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const { login } = useAuth();
  const nav = useNavigate();

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      nav('/');
    } catch {
      setErr('Invalid credentials');
    }
  };

  return (
    <main style={{ marginTop: '4rem', textAlign: 'center' }}>
      <h1>Log In</h1>
      <form onSubmit={handle} style={{ display: 'inline-block', marginTop: 24 }}>
        <input
          style={{ display: 'block', marginBottom: 8, padding: 4 }}
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={{ display: 'block', marginBottom: 8, padding: 4 }}
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {err && <p style={{ color: 'red' }}>{err}</p>}
        <button style={{ padding: '4px 12px' }}>Log in</button>
      </form>
    </main>
  );
}

