import { Request } from 'next/dist/compiled/@edge-runtime/primitives';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const shopArticles = await prisma.product.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      stock: true,
      discount: true,
      price: true,
      image: true,
      category: true,
    }
  });

  return new Response(JSON.stringify(shopArticles));
}
