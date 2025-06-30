// src/pages/HotelList.tsx
// src/pages/HotelList.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { AxiosError, AxiosResponse } from 'axios';   // ← add “type”
import api from '@/utils/api';


export interface Hotel {
  id: string;
  name: string;
  city: string;
  price: number;      // nightly price
  imageUrl?: string;  // optional hero photo
}

export default function HotelList() {
  const [hotels, setHotels]   = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  useEffect(() => {
    api
      .get<Hotel[]>('/hotels')
      .then((res: AxiosResponse<Hotel[]>) => setHotels(res.data))
      .catch(
        (err: AxiosError<{ msg?: string }>) =>
          setError(err.response?.data?.msg ?? err.message),
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Loading hotels…</p>;
  if (error)   return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <div className="mx-auto max-w-6xl p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {hotels.map(hotel => (
        <article
          key={hotel.id}
          className="rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col"
        >
          <img
            src={hotel.imageUrl ?? '/placeholder.jpg'}
            alt={hotel.name}
            className="h-40 w-full object-cover rounded-xl mb-4"
          />
          <h2 className="text-xl font-semibold mb-1">{hotel.name}</h2>
          <p className="text-sm text-gray-600 flex-1">{hotel.city}</p>
          <p className="mt-2 font-medium">
            HK${hotel.price.toLocaleString()}
            <span className="text-sm font-normal"> / night</span>
          </p>
          <Link
            to={`/hotels/${hotel.id}`}
            className="mt-4 inline-block text-blue-600 underline self-start"
          >
            View details →
          </Link>
        </article>
      ))}
    </div>
  );
}
