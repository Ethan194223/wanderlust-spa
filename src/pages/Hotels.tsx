// src/pages/Hotels.tsx
import { useEffect, useState } from 'react';
import { fetchHotels }          from '../services/hotels';
import type { Hotel, HotelsResponse } from '../services/hotels'; // type-only imports

export default function Hotels() {
  const [data,    setData]    = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    fetchHotels()
      .then((res: HotelsResponse) => {
        // 🟢  res is either an array OR { data: array }
        if (Array.isArray(res)) {
          setData(res);
        } else if (Array.isArray(res.data)) {
          setData(res.data);
        } else {
          setError('Unexpected API response shape');
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-8">Loading…</p>;
  if (error)   return <p className="text-center mt-8 text-red-600">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl mb-6 font-semibold">Hotels</h1>

      {data.length === 0 ? (
        <p>No hotels found.</p>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b font-medium">
              <th className="py-2">Name</th>
              <th className="py-2">City</th>
              <th className="py-2">Price / night</th>
            </tr>
          </thead>
          <tbody>
            {data.map((h) => (
              <tr key={h.id} className="border-b hover:bg-gray-50">
                <td className="py-2">{h.name}</td>
                <td className="py-2">{h.city}</td>
                <td className="py-2">${h.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}


