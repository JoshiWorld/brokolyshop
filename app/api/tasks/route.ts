import { Request } from 'next/dist/compiled/@edge-runtime/primitives';
import { verifyJwt } from '@/lib/jwt';
import prisma from '@/lib/prisma';
import jwt_decode from 'jwt-decode'

export async function GET(request: Request) {
  const accessToken = request.headers.get("authorization");

  if(!accessToken || !verifyJwt(accessToken) || getDecodedAccessToken(accessToken).role !== "ADMIN") {
    return new Response(JSON.stringify({
      error: "unauthorized"
    }), {
      status: 401
    });
  }

  const tasks = await prisma.task.findMany();

  return new Response(JSON.stringify(tasks));
}

function getDecodedAccessToken(token: string): any {
  try {
    return jwt_decode(token);
  } catch(Error) {
    return null;
  }
}
