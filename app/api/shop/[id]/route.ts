import { Request } from 'next/dist/compiled/@edge-runtime/primitives';
import prisma from '@/lib/prisma';

export async function GET(request: Request, {params}:{params:{id:number}}) {
  const articleById = await prisma.product.findFirst({
    where: { id: +params.id },
    select: {
      id: true,
      title: true,
      description: true,
      stock: true,
      discount: true,
      price: true,
      image: true,
      category: {
        select: {
          id: true,
          title: true
        }
      }
    }
  });

  return new Response(JSON.stringify(articleById));
}
