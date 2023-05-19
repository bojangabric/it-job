import { type GetServerSidePropsContext } from 'next';
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultSession
} from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from 'server/db';
import CredentialsProvider from 'next-auth/providers/credentials';
import { env } from 'env.mjs';
import { type Role } from '@prisma/client';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: Role;
      favoriteJobs: string[];
      appliedJobs: string[];
    } & DefaultSession['user'];
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 3000
  },
  secret: env.NEXTAUTH_SECRET,
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session }) {
      const user = await prisma.user.findFirst({
        where: {
          email: session.user.email || ''
        },
        include: {
          favoriteJobs: {
            select: {
              id: true
            }
          },
          appliedJobs: {
            select: {
              id: true
            }
          }
        }
      });

      if (user) {
        session.user.role = user.role;
        session.user.id = user.id;
        session.user.favoriteJobs = user.favoriteJobs.map(
          jobPost => jobPost.id
        );
        session.user.appliedJobs = user.appliedJobs.map(jobPost => jobPost.id);
      }
      return session;
    }
  },
  jwt: {
    secret: 'super-secret',
    maxAge: 15 * 24 * 30 * 60
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials?.email
          }
        });

        if (!user) return null;

        const verifyPassword = user.password === credentials?.password;

        if (!verifyPassword) return null;

        return user;
      }
    })
  ]
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
