import * as bcrypt from 'bcrypt';
import { getUserByEmail } from '@/services/user-service';
import { signJwtAccessToken } from '@/lib/jwt';

interface RequestBody {
  username: string;
  password: string;
}

export async function POST(request: Request) {
  const body: RequestBody = await request.json();

  const user = await getUserByEmail(body.username);

  if(user && (await bcrypt.compare(body.password, user.password))) {
    const {password, ...userWithoutPass} = user;
    const accessToken = signJwtAccessToken(userWithoutPass);
    const result = {
      ...userWithoutPass,
      accessToken
    }

    return new Response(JSON.stringify(result));
  } else return new Response(JSON.stringify(null));
}
