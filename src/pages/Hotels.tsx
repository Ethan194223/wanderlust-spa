import { useEffect, useState } from 'react';
import { fetchHotels, Hotel } from '../services/hotels';

export default function Hotels() {
  const [data, setData]     = useState<Hotel[]>([]);
  const [loading, setLoad]  = useState(true);
  const [error, setError]   = useState('');

  useEffect(() => {
    fetchHotels()
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoad(false));
  }, []);

  if (loading) return <p className="text-center mt-8">Loading…</p>;
  if (error)   return <p className="text-center mt-8 text-red-600">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl mb-6 font-semibold">Hotels</h1>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b font-medium">
            <th>Name</th>
            <th>City</th>
            <th>Price / night</th>
          </tr>
        </thead>
        <tbody>
          {data.map((h) => (
            <tr key={h.id} className="border-b hover:bg-gray-50">
              <td>{h.name}</td>
              <td>{h.city}</td>
              <td>${h.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
