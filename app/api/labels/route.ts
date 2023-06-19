import { Request } from 'next/dist/compiled/@edge-runtime/primitives';
import prisma from '@/lib/prisma';

export async function GET(request: Request, {params}:{params:{id:number}}) {
  const labels = await prisma.label.findMany();

  return new Response(JSON.stringify(labels));
}
