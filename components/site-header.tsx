"use client"

import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import MainNavDynamic from "@/components/main-nav-dynamic"
import { ThemeToggle } from "@/components/theme-toggle"
import LoginButton from '@/components/LoginButton';
import { Badge } from '@/components/ui/badge';
import { useContext, useEffect } from 'react';
import { ShoppingCartContext } from '@/app/shop/ShoppingCartContext';

export function SiteHeader() {
  // @ts-ignore
  const { shoppingCart } = useContext(ShoppingCartContext);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNavDynamic />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                <Icons.twitter className="h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.instagram}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                <Icons.instagram />
                <span className="sr-only">Instagram</span>
              </div>
            </Link>
            <Link
              href="/shop/shoppingcart"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: 'sm',
                  variant: 'ghost',
                })}
              >
                <Icons.shoppingCart />
                {shoppingCart.length > 0 ? (
                  <Badge variant="outline" className="bg-origin-padding">
                    {shoppingCart.length}
                  </Badge>
                ) : (
                  <></>
                )}
                <span className="sr-only">ShoppingCart</span>
              </div>
            </Link>
            <ThemeToggle />
            <LoginButton />
          </nav>
        </div>
      </div>
    </header>
  )
}
