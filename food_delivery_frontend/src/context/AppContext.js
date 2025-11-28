/**
 * App-wide context and reducer for state management.
 */
import React, { createContext, useContext, useReducer, useMemo } from 'react';
import { oceanTheme } from '../theme';

const AppStateContext = createContext(null);
const AppDispatchContext = createContext(null);

const initialState = {
  theme: 'light',
  themeTokens: oceanTheme,
  restaurants: [],
  menuByRestaurant: {},
  cart: {
    items: [], // {id, name, price, qty, restaurantId}
  },
  order: {
    currentOrderId: null,
    status: null
  }
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.value };
    case 'SET_RESTAURANTS':
      return { ...state, restaurants: action.value };
    case 'SET_MENU':
      return {
        ...state,
        menuByRestaurant: { ...state.menuByRestaurant, [action.restaurantId]: action.value }
      };
    case 'ADD_TO_CART': {
      const exists = state.cart.items.find(i => i.id === action.item.id);
      const items = exists
        ? state.cart.items.map(i => (i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i))
        : [...state.cart.items, { ...action.item, qty: 1 }];
      return { ...state, cart: { ...state.cart, items } };
    }
    case 'REMOVE_FROM_CART': {
      const items = state.cart.items
        .map(i => (i.id === action.id ? { ...i, qty: i.qty - 1 } : i))
        .filter(i => i.qty > 0);
      return { ...state, cart: { ...state.cart, items } };
    }
    case 'CLEAR_CART':
      return { ...state, cart: { ...state.cart, items: [] } };
    case 'SET_ORDER':
      return { ...state, order: { ...state.order, ...action.value } };
    default:
      return state;
  }
}

// PUBLIC_INTERFACE
export function AppProvider({ children }) {
  /** Provides app state via context */
  const [state, dispatch] = useReducer(reducer, initialState);
  const memoState = useMemo(() => state, [state]);
  return (
    <AppStateContext.Provider value={memoState}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useAppState() {
  /** Hook to read app state */
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppProvider');
  return ctx;
}

// PUBLIC_INTERFACE
export function useAppDispatch() {
  /** Hook to dispatch actions */
  const ctx = useContext(AppDispatchContext);
  if (!ctx) throw new Error('useAppDispatch must be used within AppProvider');
  return ctx;
}
