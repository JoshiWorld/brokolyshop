declare module 'next-auth' {
  interface Session {
    user: {
      id?: number;
      email?: string;
      name?: string | null | undefined;
      role?: string;
      userName?: string;
      accessToken?: string;
    }
  }
}
