import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    if((
      req.nextUrl.pathname.startsWith("/orders") ||
      req.nextUrl.pathname.startsWith("/admin")
    ) && req.nextauth.token?.role !== "ADMIN") {
      return NextResponse.rewrite(new URL("/auth/login?message=You are not Authorized!", req.url));
    }

    if(req.nextUrl.pathname.startsWith("/user") && req.nextauth.token?.role !== "USER") {
      return NextResponse.rewrite(new URL("/auth/login?message=You are not Authorized!", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({token}) => !!token,
    }
  }
);

export const config = {
  matcher: ["/orders/:path*", "/admin/:path*", "/user/:path*"]
}
