'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import type { CartItem, Product } from '@/lib/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; selectedSize: string }
  | { type: 'REMOVE_ITEM'; productId: string; selectedSize: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; selectedSize: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_OPEN'; isOpen: boolean }
  | { type: 'LOAD_CART'; items: CartItem[] };

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, selectedSize: string) => void;
  removeItem: (productId: string, selectedSize: string) => void;
  updateQuantity: (productId: string, selectedSize: string, quantity: number) => void;
  clearCart: () => void;
  setCartOpen: (isOpen: boolean) => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(
        (item) => item.product.id === action.product.id && item.selectedSize === action.selectedSize
      );
      if (existingIndex > -1) {
        const newItems = [...state.items];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantity: newItems[existingIndex].quantity + 1,
        };
        return { ...state, items: newItems, isOpen: true };
      }
      return {
        ...state,
        items: [...state.items, { product: action.product, quantity: 1, selectedSize: action.selectedSize }],
        isOpen: true,
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          (item) => !(item.product.id === action.productId && item.selectedSize === action.selectedSize)
        ),
      };
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) => !(item.product.id === action.productId && item.selectedSize === action.selectedSize)
          ),
        };
      }
      const newItems = state.items.map((item) =>
        item.product.id === action.productId && item.selectedSize === action.selectedSize
          ? { ...item, quantity: action.quantity }
          : item
      );
      return { ...state, items: newItems };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'SET_OPEN':
      return { ...state, isOpen: action.isOpen };
    case 'LOAD_CART':
      return { ...state, items: action.items };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('melt-cart');
      if (saved) {
        dispatch({ type: 'LOAD_CART', items: JSON.parse(saved) });
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('melt-cart', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = useCallback((product: Product, selectedSize: string) => {
    dispatch({ type: 'ADD_ITEM', product, selectedSize });
  }, []);

  const removeItem = useCallback((productId: string, selectedSize: string) => {
    dispatch({ type: 'REMOVE_ITEM', productId, selectedSize });
  }, []);

  const updateQuantity = useCallback((productId: string, selectedSize: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, selectedSize, quantity });
  }, []);

  const clearCart = useCallback(() => dispatch({ type: 'CLEAR_CART' }), []);
  const setCartOpen = useCallback((isOpen: boolean) => dispatch({ type: 'SET_OPEN', isOpen }), []);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items: state.items, isOpen: state.isOpen, addItem, removeItem, updateQuantity, clearCart, setCartOpen, totalItems, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
