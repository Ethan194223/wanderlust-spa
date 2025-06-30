export interface Hotel {
  id: string;
  name: string;
  city: string;
  price: number;          // nightly price in USD (adjust as you like)
}

export async function fetchHotels(query = ''): Promise<Hotel[]> {
  const res = await fetch(`/hotels${query}`);
  if (!res.ok) throw new Error('Failed to load hotels');
  return res.json();      // assumes { data: Hotel[] } OR a bare array → align with your backend
}
