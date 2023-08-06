import { z } from 'zod';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from 'server/api/trpc';
import bcrypt from 'bcrypt';

export const candidateRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        password: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.account.create({
        data: {
          name: input.name,
          role: 'CANDIDATE',
          email: input.email,
          password: await bcrypt.hash(input.password, 10),
          candidate: {
            create: {}
          }
        }
      });
    }),
  getById: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    return await ctx.prisma.candidate.findUnique({
      where: {
        id: input
      },
      include: {
        account: true
      }
    });
  }),
  updateResume: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.account.update({
        where: {
          id: ctx.session.user.id
        },
        data: {
          candidate: {
            update: {
              resume: input
            }
          }
        }
      });
    }),
  saveJob: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.candidate.update({
        where: {
          accountId: ctx.session.user.id
        },
        data: {
          savedJobs: {
            connect: {
              id: input
            }
          }
        }
      });
    }),
  removeSavedJob: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.candidate.update({
        where: {
          accountId: ctx.session.user.id
        },
        data: {
          savedJobs: {
            disconnect: {
              id: input
            }
          }
        }
      });
    }),
  apply: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.candidate.update({
        where: { accountId: ctx.session.user.id },
        data: {
          applications: {
            create: {
              status: 'APPLIED',
              jobId: input
            }
          }
        }
      });
    }),
  cancelApplication: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.candidate.update({
        where: { accountId: ctx.session.user.id },
        data: {
          applications: {
            deleteMany: {
              jobId: input
            }
          }
        }
      });
    }),
  comment: protectedProcedure
    .input(
      z.object({
        comment: z.string(),
        jobId: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.comment.create({
        data: {
          comment: input.comment,
          job: {
            connect: {
              id: input.jobId
            }
          },
          writtenBy: {
            connect: {
              accountId: ctx.session.user.id
            }
          }
        }
      });
    })
});
