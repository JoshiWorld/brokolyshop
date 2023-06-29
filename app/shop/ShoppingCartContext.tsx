"use client";

import React, { createContext, useState, useEffect } from 'react';

// @ts-ignore
export const ShoppingCartContext = createContext();

// @ts-ignore
export function ShoppingCartProvider({ children }) {
  const [shoppingCart, setShoppingCart] = useState([]);

  useEffect(() => {
    const storedItems = sessionStorage.getItem('shoppingCart');
    const parsedItems = storedItems ? JSON.parse(storedItems) : [];
    setShoppingCart(parsedItems);
  }, []);

  useEffect(() => {
    sessionStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
  }, [shoppingCart]);

  // @ts-ignore
  const addItemToCart = (item) => {
    // @ts-ignore
    setShoppingCart((prevCart) => [...prevCart, item]);
  };

  return (
    <ShoppingCartContext.Provider value={{ shoppingCart, addItemToCart }}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
