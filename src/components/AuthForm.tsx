// src/components/AuthForm.tsx
import { useState, FormEvent } from 'react';

export default function AuthForm({
  submitLabel,
  onSubmit,
}: {
  submitLabel: string;
  onSubmit: (email: string, password: string) => Promise<void>;
}) {
  const [email, setEmail] = useState('');
  const [pwd, setPwd]   = useState('');

  function handle(e: FormEvent) {
    e.preventDefault();
    onSubmit(email, pwd);
  }

  return (
    <form onSubmit={handle} className="flex flex-col gap-4 max-w-xs mx-auto mt-8">
      <input
        className="border rounded p-2"
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="email"
        required
      />
      <input
        className="border rounded p-2"
        type="password"
        value={pwd}
        onChange={e => setPwd(e.target.value)}
        placeholder="password"
        required
      />
      <button className="bg-blue-600 text-white py-2 rounded">{submitLabel}</button>
    </form>
  );
}

