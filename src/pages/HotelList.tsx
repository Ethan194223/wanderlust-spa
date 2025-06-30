/* ────────────────────────────────────────────
   HotelList.tsx  – infinite scroll, StrictMode-safe
──────────────────────────────────────────── */
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { getHotels, type Hotel } from '@/services/hotelService';
import { formatPrice } from '@/utils/formatPrice';
import SkeletonCard from '@/components/SkeletonCard';

const DEFAULT_CURRENCY = 'HKD';
const PAGE_SIZE        = 4;           // fetch 4 per batch

export default function HotelList() {
  /* ─── state ─── */
  const [hotels, setHotels]   = useState<Hotel[]>([]);
  const [page,   setPage]     = useState(0);          // 0-based page index
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  /* refs */
  const sentinelRef  = useRef<HTMLDivElement | null>(null);
  const seenPagesRef = useRef<Set<number>>(new Set());     // ← StrictMode guard
  const obsRef       = useRef<IntersectionObserver | null>(null);

  /* ─── fetch helper (safe against double-mount) ─── */
  const fetchPage = useCallback(async (idx: number) => {
    if (seenPagesRef.current.has(idx)) return;       // already fetched in this session
    seenPagesRef.current.add(idx);

    setLoading(true);
    try {
      const batch = await getHotels(idx * PAGE_SIZE, PAGE_SIZE);

      /* merge + dedupe by id */
      setHotels(prev => {
        const map = new Map<string, Hotel>();
        prev.forEach(h => map.set(h.id, h));
        batch.forEach(h => map.set(h.id, h));
        return Array.from(map.values());
      });

      setHasMore(batch.length === PAGE_SIZE);
    } catch (err: any) {
      setError(err.message ?? String(err));
    } finally {
      setLoading(false);
    }
  }, []);

  /* first page on mount */
  useEffect(() => { fetchPage(0); }, [fetchPage]);

  /* fetch next page whenever `page` increments (> 0) */
  useEffect(() => {
    if (page > 0) fetchPage(page);
  }, [page, fetchPage]);

  /* ─── IntersectionObserver for infinite scroll ─── */
  useEffect(() => {
    if (!hasMore) return;
    const el = sentinelRef.current;
    if (!el) return;

    /* clean up previous observer (hot reload etc.) */
    obsRef.current?.disconnect();
    obsRef.current = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading) {
          setPage(p => p + 1);
        }
      },
      { rootMargin: '200px' }           // pre-fetch a bit before the bottom
    );
    obsRef.current.observe(el);
    return () => obsRef.current?.disconnect();
  }, [hasMore, loading]);

  /* ─── UI ─── */
  return (
    <main className="mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Available Hotels</h1>

      {error && <p className="text-center text-red-600">{error}</p>}

      <div
        className="
          grid gap-6 justify-items-center
          sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5
        "
      >
        {hotels.map(hotel => {
          /* keep backward-compat with old `price` field */
          const nightly =
            (hotel as any).pricePerNight ?? (hotel as any).price ?? null;

          return (
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
                {nightly != null ? (
                  <>
                    {formatPrice(nightly, DEFAULT_CURRENCY)}
                    <span className="text-sm font-normal"> / night</span>
                  </>
                ) : (
                  <span className="italic text-gray-500">Price on request</span>
                )}
              </p>

              <Link
                to={`/hotels/${hotel.id}`}
                className="mt-4 inline-block text-blue-600 underline self-start"
              >
                View details →
              </Link>
            </article>
          );
        })}

        {/* skeletons while loading next page */}
        {loading &&
          Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <SkeletonCard key={`skeleton-${i}`} />
          ))}
      </div>

      {/* sentinel for IntersectionObserver */}
      {hasMore && <div ref={sentinelRef} className="h-20" />}
    </main>
  );
}

