import {verifyJwt} from "@/lib/jwt";
import jwt_decode from "jwt-decode";

export function checkJwt(accessToken: string | null) {
  if(!accessToken || !verifyJwt(accessToken) || getDecodedAccessToken(accessToken).role !== "ADMIN") {
    return new Response(JSON.stringify({
      error: "unauthorized"
    }), {
      status: 401
    });
  }
}

export function getDecodedAccessToken(token: string): any {
  try {
    return jwt_decode(token);
  } catch(Error) {
    return null;
  }
}
