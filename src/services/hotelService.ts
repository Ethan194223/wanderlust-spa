// src/services/hotelService.ts
import { api } from '@/utils/api';

/* ───────────────────────────────────────────────
   Domain model
─────────────────────────────────────────────── */
export interface Hotel {
  id:       string;
  name:     string;
  city:     string;
  price:    number;          // nightly price (HKD)
  imageUrl?: string | null;
}

/* ───────────────────────────────────────────────
   Data fetch + normaliser
─────────────────────────────────────────────── */
/**
 * GET /hotels
 * Always resolves to a plain Hotel[] no matter how the backend wraps it.
 * Logs the raw payload so you can inspect it in DevTools → Console.
 */
export async function getHotels(): Promise<Hotel[]> {
  const raw = await api<any>('/hotels');
  console.log('🛬 /hotels raw payload', raw);        // DEBUG: check console

  /* 1️⃣  Plain array */
  if (Array.isArray(raw)) return raw;

  /* 2️⃣  Common wrappers */
  if (Array.isArray(raw.hotels)) return raw.hotels;   // { hotels: [...] }
  if (Array.isArray(raw.data))   return raw.data;     // { data: [...] }
  if (Array.isArray(raw.result)) return raw.result;   // { result: [...] }

  /* 3️⃣  Empty but valid response */
  if (raw && typeof raw === 'object') {
    const firstArray = Object.values(raw).find(Array.isArray);
    if (Array.isArray(firstArray)) return firstArray as Hotel[];
  }

  /* 4️⃣  Anything else → treat as error */
  throw new Error('Unexpected /hotels response shape');
}
