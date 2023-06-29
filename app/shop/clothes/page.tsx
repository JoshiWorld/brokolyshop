"use client"

import React, { useState, useEffect } from 'react';
import ClothesShopPage from './ClothesShopPage';

export default function ShopPageDynamic() {
  const [showShopPage, setShowShopPage] = useState(false);

  useEffect(() => {
    setShowShopPage(true);
  }, []);

  return (
    <div>
      {showShopPage && <ClothesShopPage />}
    </div>
  );
}
