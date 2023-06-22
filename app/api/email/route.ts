import { sendEmail } from '@/services/email-service';
import { verifyJwt } from '@/lib/jwt';
import { Request } from 'next/dist/compiled/@edge-runtime/primitives';

export async function POST(request: Request) {
  const accessToken = request.headers.get("authorization");

  if(!accessToken || !verifyJwt(accessToken)) {
    return new Response(JSON.stringify({
      error: "unauthorized"
    }), {
      status: 401
    });
  }

  try {
    // Validate the request body (optional)
    // Perform input validation to ensure required fields are present and have the expected format
    // ...

    const user = await sendEmail();

    return new Response(JSON.stringify({result: 'OK'}));
  } catch (error) {
    console.error('Error creating user:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
