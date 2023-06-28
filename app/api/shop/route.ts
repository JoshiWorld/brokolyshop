import { Request } from 'next/dist/compiled/@edge-runtime/primitives';
import prisma from '@/lib/prisma';
import { verifyJwt } from '@/lib/jwt';

export async function GET(request: Request) {
  const shopArticles = await prisma.post.findMany({
    where: { authorId: +params.id },
    include: {
      author: {
        select: {
          email: true,
          name: true
        }
      }
    }
  });

  return new Response(JSON.stringify(userPosts));
}
