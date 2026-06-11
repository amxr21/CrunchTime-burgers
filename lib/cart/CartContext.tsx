"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import { menuSections } from "@/lib/data/menu";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  hydrated: boolean;
};

type CartAction =
  | { type: "HYDRATE"; items: CartItem[] }
  | { type: "ADD"; item: Omit<CartItem, "qty">; qty?: number }
  | { type: "REMOVE"; id: string }
  | { type: "SET_QTY"; id: string; qty: number }
  | { type: "CLEAR" };

const STORAGE_KEY = "crunchtime-cart";
const MAX_QTY = 20;

function seedItems(): CartItem[] {
  const allItems = menuSections.flatMap((section) => section.items);
  const seeds = ["original-crunchtime", "famous-crunch-fries", "fresh-lemonade"];

  return seeds
    .map((id) => allItems.find((item) => item.id === id))
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .map((item) => ({
      id: item.id,
      name: item.name,
      price: item.priceValue,
      image: item.image,
      qty: 1,
    }));
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.items, hydrated: true };

    case "ADD": {
      const existing = state.items.find((i) => i.id === action.item.id);
      const addQty = action.qty ?? 1;

      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.item.id
              ? { ...i, qty: Math.min(i.qty + addQty, MAX_QTY) }
              : i,
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { ...action.item, qty: Math.min(addQty, MAX_QTY) }],
      };
    }

    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };

    case "SET_QTY": {
      if (action.qty <= 0) {
        return { ...state, items: state.items.filter((i) => i.id !== action.id) };
      }

      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, qty: Math.min(action.qty, MAX_QTY) } : i,
        ),
      };
    }

    case "CLEAR":
      return { ...state, items: [] };

    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  hydrated: boolean;
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  subtotal: number;
  itemCount: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], hydrated: false });

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const items: CartItem[] = raw ? JSON.parse(raw) : seedItems();
      dispatch({ type: "HYDRATE", items });
    } catch {
      dispatch({ type: "HYDRATE", items: seedItems() });
    }
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items, state.hydrated]);

  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const itemCount = state.items.reduce((sum, item) => sum + item.qty, 0);

  const value: CartContextValue = {
    items: state.items,
    hydrated: state.hydrated,
    addItem: (item, qty) => dispatch({ type: "ADD", item, qty }),
    removeItem: (id) => dispatch({ type: "REMOVE", id }),
    setQty: (id, qty) => dispatch({ type: "SET_QTY", id, qty }),
    clear: () => dispatch({ type: "CLEAR" }),
    subtotal,
    itemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
