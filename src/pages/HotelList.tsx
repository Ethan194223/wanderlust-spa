// src/pages/HotelList.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getHotels, type Hotel } from '@/services/hotelService';
import SkeletonCard from '@/components/SkeletonCard';   // ← NEW

/* ───────────────────────────────────────────
   Component
─────────────────────────────────────────── */
export default function HotelList() {
  const [hotels, setHotels]   = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  /* Fetch once on mount */
  useEffect(() => {
    const controller = new AbortController();

    getHotels()
      .then(setHotels)
      .catch(err => {
        if (!controller.signal.aborted) setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  /* ───── UI ───── */
  return (
    <main className="mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Available Hotels</h1>

      {/* Error state */}
      {error && (
        <p className="text-center mt-10 text-red-600" role="alert">
          {error}
        </p>
      )}

      {/* Empty-result state (only after loading completes) */}
      {!loading && hotels.length === 0 && !error && (
        <p>No hotels found.</p>
      )}

      {/* Skeletons OR real cards */}
      {(loading || hotels.length > 0) && (
        <div
          className="
            grid gap-6 justify-items-center
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            2xl:grid-cols-5
          "
        >
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            : hotels.map(hotel => (
                <article
                  key={hotel.id}
                  className="
                    rounded-2xl shadow hover:shadow-lg transition p-4
                    flex flex-col bg-white
                  "
                >
                  <img
                    src={hotel.imageUrl ?? '/placeholder.jpg'}
                    alt={hotel.name}
                    className="h-40 w-full object-cover rounded-xl mb-4"
                    loading="lazy"
                  />

                  <h2 className="text-xl font-semibold mb-1 truncate">
                    {hotel.name}
                  </h2>
                  <p className="text-sm text-gray-600 flex-1">{hotel.city}</p>

                  <p className="mt-2 font-medium">
                    {hotel.price != null ? (
                      <>
                        HK${hotel.price.toLocaleString()}
                        <span className="text-sm font-normal"> / night</span>
                      </>
                    ) : (
                      <span className="italic text-gray-500">
                        Price on request
                      </span>
                    )}
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
      )}
    </main>
  );
}
