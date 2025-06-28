import { useAuth } from '../hooks/useAuth';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h1 className="text-3xl mb-4">Welcome {user?.email}</h1>
      <button
        onClick={logout}
        className="rounded bg-gray-700 text-white py-2 px-4"
      >
        Log out
      </button>
    </div>
  );
}
