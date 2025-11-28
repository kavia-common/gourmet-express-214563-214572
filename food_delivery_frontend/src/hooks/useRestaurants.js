/**
 * Hook to load restaurants with graceful fallback.
 */
import { useEffect, useState } from 'react';
import { fetchRestaurants } from '../api/endpoints';
import { useAppDispatch, useAppState } from '../context/AppContext';

// PUBLIC_INTERFACE
export function useRestaurants() {
  /** Loads restaurants and returns loading/error states */
  const { restaurants } = useAppState();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(!restaurants || restaurants.length === 0);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      try {
        const data = await fetchRestaurants();
        if (!active) return;
        dispatch({ type: 'SET_RESTAURANTS', value: data });
      } catch (e) {
        if (!active) return;
        setError(e);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [dispatch]);

  return { restaurants, loading, error };
}
