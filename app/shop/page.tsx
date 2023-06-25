"use client"

import * as React from 'react';
import { shopConfig } from '@/config/shop';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import useSessionStorage from '@/hooks/useSessionStorage';
import { useEffect, useState } from 'react';

interface ArticleStructure {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

function ShopPage() {
  const [cartItems, setCartItems] = useState<ArticleStructure[]>([]);

  useEffect(() => {
    // @ts-ignore
    setCartItems(sessionStorage.getItem("shoppingCart") ? JSON.parse(sessionStorage.getItem("shoppingCart")) : []);
  }, []);

  function addItemToCart(item: ArticleStructure) {
    cartItems.push(item);
    sessionStorage.setItem("shoppingCart", JSON.stringify(cartItems));
  }

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          {shopConfig.headline} <br className="hidden sm:inline" />
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          {shopConfig.description}
        </p>
      </div>

      <div className="grid gap-3 items-center">
        {shopConfig.articles?.map(
          (item, index) =>
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{item.image}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p>{item.price} €</p>
                <Button onClick={() => addItemToCart(item)}><Icons.shoppingCart /></Button>
              </CardFooter>
            </Card>
        )}
      </div>
    </section>
  );
}

export default ShopPage;
