import 'next-auth';
import { DefaultSession } from 'next-auth';
import 'next-auth/jwt';

/** Example on how to extend the built-in session types */
declare module 'next-auth' {
  interface Session {
    hubspot: IHubspot;
    user: {
      /** The user's id. */
      id: number;
      avatar: string;
      username: string;
      slug: string;
      jwtToken: string;
      expiresAt: number;
    } & DefaultSession['user'];
  }

  interface User {
    username: string;
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
    hubspot: IHubspot;
    userId: number;
    avatar: string;
    username: string;
    slug: string;
    jwtToken: string;
    expiresAt: number;
  }
}

//Hubspot account info
interface IHubspot {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  login_name: string;
  betting_experience: string;
  favorite_sportsbooks: string;
  favorite_leagues: string;
  membership_level: Membership;
  membership_renewal_date: Date;
  membership_start_date: Date;
}

enum Membership {
  Pro = 'SBR Pro',
  Basic = 'Basic',
}
