import { Request } from 'next/dist/compiled/@edge-runtime/primitives';
import prisma from '@/lib/prisma';
import { verifyJwt } from '@/lib/jwt';
import { JwtPayload } from 'jsonwebtoken';

export async function GET(request: Request, {params}:{params:{id:number}}) {
  const accessToken = request.headers.get("authorization");

  if(!accessToken || !verifyJwt(accessToken) || !checkUserMatchesRequestedId(verifyJwt(accessToken), params.id)) {
    return new Response(JSON.stringify({
      error: "unauthorized"
    }), {
      status: 401
    });
  }

  const user = await prisma.user.findFirst({
    where: { id: +params.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    }
  });

  return new Response(JSON.stringify(user));
}

function checkUserMatchesRequestedId(jwt: JwtPayload | null, requestedId: number) {
  // @ts-ignore
  return ((jwt.role == 'ADMIN') || (jwt.id == requestedId));
}
