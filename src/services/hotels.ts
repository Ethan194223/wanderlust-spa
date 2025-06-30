// src/services/hotels.ts
export interface Hotel {
  id:   string;
  name: string;
  city: string;
  price: number;
}

/**
 * The backend might send a bare array *or* an object that wraps the array
 * (e.g. `{ data, meta }`).  This union captures both shapes.
 */
export type HotelsResponse =
  | Hotel[]
  | { data: Hotel[]; meta?: { page: number; pages: number } };

export async function fetchHotels(query = ''): Promise<HotelsResponse> {
  const res = await fetch(`/hotels${query}`);
  if (!res.ok) throw new Error('Failed to load hotels');
  return res.json();               // Fastify will serialise whatever you return
}

