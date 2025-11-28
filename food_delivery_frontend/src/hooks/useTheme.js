/**
 * Hook to manage theme with persistence and CSS variable injection.
 */
import { useEffect } from 'react';
import { useAppDispatch, useAppState } from '../context/AppContext';
import { injectThemeCSS } from '../theme';

// PUBLIC_INTERFACE
export function useTheme() {
  /** Returns theme state and toggle function. Persists theme in localStorage. */
  const { theme } = useAppState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const persisted = window.localStorage.getItem('theme');
    if (persisted && (persisted === 'light' || persisted === 'dark')) {
      dispatch({ type: 'SET_THEME', value: persisted });
    }
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    injectThemeCSS();
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggle = () => {
    dispatch({ type: 'SET_THEME', value: theme === 'light' ? 'dark' : 'light' });
  };

  return { theme, toggle };
}
