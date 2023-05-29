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
import { type Candidate, type Company, type Job } from '@prisma/client';

declare module 'next-auth' {
  interface JobPostWithEmployer extends Job {
    postedBy: {
      image: string;
      name: string;
      location: string | null;
    };
  }

  interface Session extends DefaultSession {
    user:
      | {
          id: string;
          role: 'KANDIDAT';
          name: string;
          email: string;
          image: string;
          candidate: Candidate;
        }
      | {
          id: string;
          role: 'POSLODAVAC';
          name: string;
          email: string;
          image: string;
          company: Company;
        }
      | {
          id: string;
          role: 'MODERATOR';
          name: string;
          email: string;
          image: string;
        };
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
      const user = await prisma.account.findFirst({
        where: {
          email: session.user.email || ''
        },
        include: {
          company: true,
          candidate: true
        }
      });

      if (user) {
        session.user.role = user.role;
        session.user.id = user.id;
        session.user.image = user.image;
        if (session.user.role === 'POSLODAVAC' && user.company)
          session.user.company = user.company;
        if (session.user.role === 'KANDIDAT' && user.candidate)
          session.user.candidate = user.candidate;
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
        const user = await prisma.account.findFirst({
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
