import { createUser } from '@/services/user-service';

interface RequestBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  try {
    // Validate the request body (optional)
    // Perform input validation to ensure required fields are present and have the expected format
    // ...

    const user = await createUser(body);

    const { password, ...result } = user;
    return new Response(JSON.stringify(result));
  } catch (error) {
    console.error('Error creating user:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
