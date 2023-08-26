import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import * as setCookieParser from 'set-cookie-parser';
import { Cookie } from 'set-cookie-parser';
import { getHSContactByName } from '../../../lib/hubspot';
import { getPointBalance } from '../../../lib/points';

type NextAuthOptionsCallback = (
  req: NextApiRequest,
  res: NextApiResponse
) => NextAuthOptions;

const nextAuthOptions: NextAuthOptionsCallback = (req, res) => {
  const useSecureCookies = process.env.NEXTAUTH_URL?.startsWith('https://');
  const hostName = new URL(process.env.NEXTAUTH_URL ?? '').hostname;
  return {
    cookies: {
      sessionToken: {
        name: `next-auth.session-token`,
        options: {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
          secure: useSecureCookies,
          domain: hostName == 'localhost' ? hostName : '.sportsbookreview.com',
        },
      },
      callbackUrl: {
        name: `next-auth.callback-url`,
        options: {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
          secure: useSecureCookies,
          domain: hostName == 'localhost' ? hostName : '.sportsbookreview.com',
        },
      },
      csrfToken: {
        name: `next-auth.csrf-token`,
        options: {
          httpOnly: true,
          sameSite: 'lax',
          path: '/',
          secure: useSecureCookies,
          domain: hostName == 'localhost' ? hostName : '.sportsbookreview.com',
        },
      },
    },
    session: {
      strategy: 'jwt',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    },
    providers: [
      CredentialsProvider({
        name: 'Username and Password',
        credentials: {
          username: { label: 'Username', type: 'text' },
          password: { label: 'Password', type: 'password' },
        },
        // This is were you can put your own external API call to validate Email and Password
        authorize: async (credentials) => {
          const username = credentials?.username;
          const password = credentials?.password;

          const url = `${process.env.API_CLASSIC}/users/authenticate/`;

          const authResponse = await fetch(url, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify({ username, password }),
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const user = await authResponse.json();

          if (authResponse.ok && user) {
            res.setHeader('Set-Cookie', getCookies(authResponse));

            const balance = await getPointBalance(user.slug);

            return {
              //Classic-API user details
              ...user,
              avatar:
                balance.account?.avatar ??
                'https://img.sportsbookreview.com/images/avatars/blue.png?fm=webp&auto=format&auto=compress&h=120&w=120&fit=crop',
            };
          }
          return null;
        },
      }),
    ],
    theme: {
      colorScheme: 'dark',
    },
    pages: {
      signIn: '/login/',
    },
    callbacks: {
      jwt: async ({ token, user }) => {
        if (user) {
          token.jwtToken = user.jwtToken;
          token.avatar = user.avatar;
          token.slug = user.slug;
          token.username = user.username;
          token.userId = +user.id;
          token.expiresAt = user.expiresAt;
        }

        /**
         * Calling HS api everytime session is accessed
         * Will cause a lot of requests...
         */
        const hsAccount = await getHSContactByName(token.username, [
          'firstname',
          'lastname',
          'email',
          'phone',
          'login_name',
          'betting_experience',
          'favorite_sportsbooks',
          'favorite_leagues',
          'membership_level',
          'membership_renewal_date',
          'membership_start_date',
        ]);

        if (hsAccount?.total === 0) console.log('No hubspot account found');

        //Hubspot account info
        token.hubspot = {
          id: hsAccount?.results[0]?.id ?? '',
          firstname: hsAccount?.results[0]?.properties?.firstname ?? '',
          lastname: hsAccount?.results[0]?.properties?.lastname ?? '',
          email: hsAccount?.results[0]?.properties?.email ?? '',
          phone: hsAccount?.results[0]?.properties?.phone ?? '',
          login_name: hsAccount?.results[0]?.properties?.login_name ?? '',
          betting_experience:
            hsAccount?.results[0]?.properties?.betting_experience ?? '',
          favorite_sportsbooks:
            hsAccount?.results[0]?.properties?.favorite_sportsbooks ?? '',
          favorite_leagues:
            hsAccount?.results[0]?.properties?.favorite_leagues ?? '',
          membership_level:
            hsAccount?.results[0]?.properties?.membership_level ?? '',
          membership_renewal_date:
            hsAccount?.results[0]?.properties?.membership_renewal_date ?? '',
          membership_start_date:
            hsAccount?.results[0]?.properties?.membership_start_date ?? '',
        };

        const shouldRefreshTime = Math.round(
          token.expiresAt - Math.floor(+new Date() / 1000)
        );

        // If the token is still valid, just return it.
        if (shouldRefreshTime > 0) {
          return Promise.resolve(token);
        }

        // If the token has expired, refresh the token
        token = await refreshAccessToken(token, req, res);

        return Promise.resolve(token);
      },

      session({ session, token }) {
        if (token && session.user) {
          session.user.id = token.userId;
          session.user.jwtToken = token.jwtToken;
          session.user.expiresAt = token.expiresAt;
          session.user.avatar = token.avatar;
          session.user.username = token.username;
          session.user.slug = token.slug;

          //Hubspot account info
          session.hubspot = {
            id: token.hubspot.id,
            firstname: token.hubspot.firstname,
            lastname: token.hubspot.lastname,
            email: token.hubspot.email,
            phone: token.hubspot.phone,
            login_name: token.hubspot.login_name,
            betting_experience: token.hubspot.betting_experience,
            favorite_sportsbooks: token.hubspot.favorite_sportsbooks,
            favorite_leagues: token.hubspot.favorite_leagues,
            membership_level: token.hubspot.membership_level,
            membership_renewal_date: token.hubspot.membership_renewal_date,
            membership_start_date: token.hubspot.membership_start_date,
          };
        }
        return session;
      },
    },
  };
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};

async function refreshAccessToken(
  tokenObject: JWT,
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const url = `${process.env.API_CLASSIC}/users/refresh-token/`;

    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        cookie: `sbrtoken=${req.cookies['sbrtoken']}`,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text);
    }

    const tokenResponse = await response.json();

    // Update the header
    res.setHeader('Set-Cookie', getCookies(response));

    return {
      ...tokenObject,
      jwtToken: tokenResponse.jwtToken,
      userId: +tokenResponse.id,
      expiresAt: tokenResponse.expiresAt,
    };
  } catch (error) {
    return {
      ...tokenObject,
      error: 'RefreshAccessTokenError',
    };
  }
}

function getCookies(response: Response): string[] {
  const hostName = new URL(process.env.NEXTAUTH_URL ?? '').hostname;
  const combinedCookieHeader = response.headers.get('set-cookie') ?? '';
  const splitCookieHeaders =
    setCookieParser.splitCookiesString(combinedCookieHeader);
  const parsedCookies = setCookieParser.parse(splitCookieHeaders);

  const cookiesToSet = parsedCookies.map(
    (parsedCookie: Cookie) =>
      `${parsedCookie.name}=${parsedCookie.value}; expires=${
        parsedCookie.expires
      }; domain=${
        hostName === 'localhost' ? 'localhost' : parsedCookie.domain
      }; path=${parsedCookie.path}; ${parsedCookie.httpOnly ? 'httpOnly;' : ''}`
  );

  return cookiesToSet;
}
