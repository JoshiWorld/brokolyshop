import Link from "next/link"

import { shopConfig } from "@/config/shop"
import {Button, buttonVariants} from "@/components/ui/button"
import {cn} from '@/lib/utils';
import * as React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';

export default function IndexPage() {
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
            <Card>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{item.content}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p>{item.price} €</p>
                <Button>Warenkorb</Button>
              </CardFooter>
            </Card>
        )}
      </div>
    </section>
  )
}
