/**
 * Hook to load a restaurant's menu.
 */
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppState } from '../context/AppContext';
import { fetchMenu } from '../api/endpoints';

// PUBLIC_INTERFACE
export function useMenu(restaurantId) {
  /** Loads menu items for a restaurant and returns loading/error/data */
  const { menuByRestaurant } = useAppState();
  const dispatch = useAppDispatch();
  const cache = menuByRestaurant[restaurantId];
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    if (cache) {
      setLoading(false);
      return () => {};
    }
    (async () => {
      setLoading(true);
      try {
        const data = await fetchMenu(restaurantId);
        if (!active) return;
        dispatch({ type: 'SET_MENU', restaurantId, value: data });
      } catch (e) {
        if (!active) return;
        setError(e);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [dispatch, restaurantId, cache]);

  return { menu: cache || [], loading, error };
}
