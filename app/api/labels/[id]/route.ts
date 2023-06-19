import { Request } from 'next/dist/compiled/@edge-runtime/primitives';
import prisma from '@/lib/prisma';
import { verifyJwt } from '@/lib/jwt';

export async function GET(request: Request, {params}:{params:{id:number}}) {
  // const accessToken = request.headers.get("authorization");
  //
  // if(!accessToken || !verifyJwt(accessToken)) {
  //   return new Response(JSON.stringify({
  //     error: "unauthorized"
  //   }), {
  //     status: 401
  //   });
  // }

  const label = await prisma.label.findFirst({
    where: { id: +params.id }
  });

  return new Response(JSON.stringify(label));
}
