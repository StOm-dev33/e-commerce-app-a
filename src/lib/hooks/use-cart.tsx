'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const calculateTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = items.length > 0 ? 50 : 0; // Fixed shipping cost
  const tax = subtotal * 0.2; // 20% tax
  const total = subtotal + shipping + tax;

  return { subtotal, shipping, tax, total };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      let updatedItems;

      if (existingItem) {
        updatedItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        updatedItems = [...state.items, action.payload];
      }

      return {
        ...state,
        items: updatedItems,
        ...calculateTotals(updatedItems),
      };
    }

    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter((item) => item.id !== action.payload);
      return {
        ...state,
        items: updatedItems,
        ...calculateTotals(updatedItems),
      };
    }

    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return {
        ...state,
        items: updatedItems,
        ...calculateTotals(updatedItems),
      };
    }

    case 'CLEAR_CART':
      return {
        items: [],
        subtotal: 0,
        shipping: 0,
        tax: 0,
        total: 0,
      };

    default:
      return state;
  }
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const initialState: CartState = {
  items: [],
  subtotal: 0,
  shipping: 0,
  tax: 0,
  total: 0,
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : initialState;
    }
    return initialState;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(state));
    }
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}