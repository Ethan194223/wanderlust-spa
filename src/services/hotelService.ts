// src/services/hotelService.ts
import { api } from '@/utils/api';

/* ───────────────────────────────────────────────
   Domain model
─────────────────────────────────────────────── */
export interface Hotel {
  id:             string;
  name:           string;
  city:           string;
  /** preferred field – nightly rate in HKD (or chosen currency) */
  pricePerNight:  number | null;
  /** legacy seed field kept for backward-compat */
  price?:         number | null;
  imageUrl?:      string | null;
}

/* ───────────────────────────────────────────────
   Helper: coerce any raw object to our Hotel shape
─────────────────────────────────────────────── */
function toHotel(obj: any): Hotel {
  return {
    id:            obj.id,
    name:          obj.name,
    city:          obj.city,
    pricePerNight: obj.pricePerNight ?? obj.price ?? null,
    price:         obj.price,        // keep if callers still reference it
    imageUrl:      obj.imageUrl ?? null,
  };
}

/* ───────────────────────────────────────────────
   Data fetch + normaliser
─────────────────────────────────────────────── */
/**
 * GET /hotels?skip=&take=
 * • Always resolves to a plain `Hotel[]`.
 * • `skip` / `take` enable infinite scroll pagination.
 * • Logs the raw payload for easy inspection in DevTools.
 */
export async function getHotels(
  skip: number = 0,
  take: number = 20
): Promise<Hotel[]> {
  const raw = await api<any>('/hotels', { params: { skip, take } });
  console.log('🛬 /hotels raw payload', raw);          // DEBUG

  /* 1️⃣  Plain array */
  if (Array.isArray(raw)) return raw.map(toHotel);

  /* 2️⃣  Common wrappers */
  if (Array.isArray(raw.hotels)) return raw.hotels.map(toHotel);
  if (Array.isArray(raw.data))   return raw.data.map(toHotel);
  if (Array.isArray(raw.result)) return raw.result.map(toHotel);

  /* 3️⃣  Empty-but-valid object → pick first array-like property */
  if (raw && typeof raw === 'object') {
    const firstArray = Object.values(raw).find(Array.isArray);
    if (Array.isArray(firstArray)) return (firstArray as any[]).map(toHotel);
  }

  /* 4️⃣  Anything else → treat as error */
  throw new Error('Unexpected /hotels response shape');
}
