"use client"

import { shopConfig } from "@/config/shop"
import {Button} from "@/components/ui/button"
import * as React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function IndexPage() {
  const [isSending, setIsSending] = useState(false);
  const { data: session } = useSession();

  const handleClick = async () => {
    setIsSending(true);
    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          // @ts-ignore
          authorization: session?.user?.accessToken
        }
      });
      if (response.ok) {
        console.log('Email sent successfully!');
      } else {
        console.error('Error sending email:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending email:', error);
    } finally {
      setIsSending(false);
    }
  };

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
                <Button disabled={isSending} onClick={handleClick}>{isSending ? 'Sending...' : 'Warenkorb'}</Button>
              </CardFooter>
            </Card>
        )}
      </div>
    </section>
  )
}
