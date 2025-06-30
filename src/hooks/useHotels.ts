// src/hooks/useHotels.ts
import { useEffect, useState } from 'react';
import { getHotels }           from '@/services/hotelService';
import type { Hotel }          from '@/services/hotelService';

/* ───────────────────────────────────────────
   State model
─────────────────────────────────────────── */
export type UseHotelsState =
  | { status: 'loading' }
  | { status: 'error';   error: Error }
  | { status: 'success'; data:  Hotel[] };

/* ───────────────────────────────────────────
   Hook
─────────────────────────────────────────── */
export default function useHotels(): UseHotelsState {
  const [state, setState] = useState<UseHotelsState>({ status: 'loading' });

  useEffect(() => {
    let mounted = true;

    getHotels()
      .then(data => {
        if (mounted) setState({ status: 'success', data });
      })
      .catch(err => {
        if (mounted) setState({ status: 'error', error: err });
      });

    /* Prevent setState after unmount */
    return () => {
      mounted = false;
    };
  }, []);

  return state;
}
