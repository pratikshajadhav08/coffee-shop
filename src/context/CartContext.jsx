import React, { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

// Menu prices are display strings like "₹320" — pull the number out so we
// can total them. Falls back to 0 for anything unparseable.
export function parsePrice(priceStr) {
  const num = parseFloat(String(priceStr).replace(/[^0-9.]/g, ""));
  return Number.isFinite(num) ? num : 0;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{ name, price, qty }]

  const addItem = (menuItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.name === menuItem.name);
      if (existing) {
        return prev.map((i) =>
          i.name === menuItem.name ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { name: menuItem.name, price: menuItem.price, qty: 1 }];
    });
  };

  const updateQty = (name, qty) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.name !== name)
        : prev.map((i) => (i.name === name ? { ...i, qty } : i))
    );
  };

  const removeItem = (name) =>
    setItems((prev) => prev.filter((i) => i.name !== name));

  const clearCart = () => setItems([]);

  const count = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items]);
  const total = useMemo(
    () => items.reduce((sum, i) => sum + parsePrice(i.price) * i.qty, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQty, removeItem, clearCart, count, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside a CartProvider");
  return ctx;
}