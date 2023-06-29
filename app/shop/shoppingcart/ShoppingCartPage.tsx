"use client";

import { shopConfig } from '@/config/shop';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import React, { useState, useEffect, useMemo, useContext } from 'react';
import { ShoppingCartContext } from '@/app/shop/ShoppingCartContext';

interface ArticleStructure {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

function ShoppingCartPage() {
  // @ts-ignore
  const { shoppingCart } = useContext(ShoppingCartContext);
  // @ts-ignore
  const { addItemToCart } = useContext(ShoppingCartContext);
  const [articles, setArticles] = useState<ArticleStructure[]>([]);
  const memoizedArticles = useMemo(() => articles, [articles]);

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Warenkorb <br className="hidden sm:inline" />
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Alle Artikel in deinem Warenkorb
        </p>
      </div>

      <div className="grid gap-3 items-center">
        {
          // @ts-ignore
          shoppingCart?.map((item, index) => {
          // @ts-ignore
          const isInCart = shoppingCart.find((cartItem) => cartItem.id === item.id);

          return (
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
                <Button
                  onClick={() => addItemToCart(item)}
                  /*@ts-ignore*/
                  disabled={isInCart}
                  className={isInCart ? 'disabled' : ''}
                >
                  {isInCart ? <Icons.checkMark className="text-gray-500" /> : <Icons.shoppingCart />}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

export default ShoppingCartPage;
