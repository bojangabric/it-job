import { z } from 'zod';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from 'server/api/trpc';

export const companyRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
        location: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.account.create({
        data: {
          name: input.name,
          role: 'POSLODAVAC',
          email: input.email,
          password: input.password,
          company: {
            create: {
              location: input.location
            }
          }
        }
      });
    }),
  removeJobPost: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.job.delete({
        where: {
          id: input
        }
      });
    }),
  toggleJob: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const value = await ctx.prisma.job.findUnique({
        where: {
          id: input
        }
      });

      if (!value) return;

      await ctx.prisma.job.update({
        where: {
          id: input
        },
        data: {
          active: !value.active
        }
      });
    }),
  createJobPost: protectedProcedure
    .input(
      z.object({
        active: z.boolean(),
        title: z.string(),
        experience: z.enum([
          'STUDENT',
          'JUNIOR',
          'MID_LEVEL',
          'SENIOR',
          'LEAD'
        ]),
        type: z.enum(['PRAKSA', 'PART_TIME', 'FULL_TIME', 'CONTRACT']),
        position: z.enum([
          'FRONT_END_DEVELOPER',
          'BACK_END_DEVELOPER',
          'FULL_STACK_DEVELOPER',
          'UI_UX_DESIGNER',
          'SYSTEM_ADMINISTRATOR'
        ]),
        skills: z.string().array(),
        description: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.job.create({
        data: {
          ...input,
          postedBy: {
            connect: {
              accountId: ctx.session.user.id
            }
          }
        }
      });
    }),
  rejectCandidate: protectedProcedure
    .input(z.object({ candidateId: z.string(), jobId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.application.updateMany({
        where: {
          candidateId: input.candidateId,
          jobId: input.jobId
        },
        data: {
          status: 'REJECTED'
        }
      });
    }),
  acceptCandidate: protectedProcedure
    .input(z.object({ candidateId: z.string(), jobId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.application.updateMany({
        where: {
          candidateId: input.candidateId,
          jobId: input.jobId
        },
        data: {
          status: 'ACCEPTED'
        }
      });
    })
});
