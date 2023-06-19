import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import * as React from 'react';
import { ordersConfig } from '@/config/orders';

const OrdersPage = () => {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          {ordersConfig.headline} <br className="hidden sm:inline" />
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          {ordersConfig.description}
        </p>
      </div>
      <div className="flex gap-4">
        {ordersConfig.mainPageButtons?.length ? (
          <nav className="flex gap-6">
            {ordersConfig.mainPageButtons?.map(
              (item, index) =>
                item.href && (
                  <Link
                    href={item.href}
                    rel="noreferrer"
                    className={buttonVariants()}
                  >
                    {item.title}
                  </Link>
                )
            )}
          </nav>
        ) : null}
      </div>
    </section>
  );
}

export default OrdersPage;
