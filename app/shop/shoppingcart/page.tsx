"use client"

import React, { useState, useEffect } from 'react';
import ShoppingCartPage from './ShoppingCartPage';

export default function ShoppingCartPageDynamic() {
  const [showShopPage, setShowShopPage] = useState(false);

  useEffect(() => {
    setShowShopPage(true);
  }, []);

  return (
    <div>
      {showShopPage && <ShoppingCartPage />}
    </div>
  );
}
