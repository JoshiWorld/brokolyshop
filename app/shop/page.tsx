"use client"

import React, { useState, useEffect } from 'react';
import ShopPage from './ShopPage';

export default function ShopPageDynamic() {
  const [showShopPage, setShowShopPage] = useState(false);

  useEffect(() => {
    setShowShopPage(true);
  }, []);

  return (
    <div>
      {showShopPage && <ShopPage />}
    </div>
  );
}
