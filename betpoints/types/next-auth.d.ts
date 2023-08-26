import 'next-auth';
import { DefaultSession } from 'next-auth';
import 'next-auth/jwt';

/** Example on how to extend the built-in session types */
declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's id. */
      id: number;
      avatar: string;
      slug: string;
      jwtToken: string;
      expiresAt: number;
    } & DefaultSession['user'];
  }

  interface User {
    avatar: string;
    slug: string;
    jwtToken: string;
    expiresAt: number;
  }
}

/** Example on how to extend the built-in types for JWT */
declare module 'next-auth/jwt' {
  interface JWT {
    /** This is an example. You can find me in types/next-auth.d.ts */
    userId: number;
    avatar: string;
    slug: string;
    jwtToken: string;
    expiresAt: number;
  }
}
