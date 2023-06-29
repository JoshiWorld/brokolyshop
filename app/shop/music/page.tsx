"use client"

import React, { useState, useEffect } from 'react';
import MusicShopPage from './MusicShopPage';

export default function ShopPageDynamic() {
  const [showShopPage, setShowShopPage] = useState(false);

  useEffect(() => {
    setShowShopPage(true);
  }, []);

  return (
    <div>
      {showShopPage && <MusicShopPage />}
    </div>
  );
}
