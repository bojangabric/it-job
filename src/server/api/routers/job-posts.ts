import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from 'server/api/trpc';
import { z } from 'zod';

export const jobPostsRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z
        .object({
          experience: z
            .enum(['STUDENT', 'JUNIOR', 'MID_LEVEL', 'SENIOR', 'LEAD'])
            .array()
            .optional(),
          type: z
            .enum(['PRAKSA', 'PART_TIME', 'FULL_TIME', 'CONTRACT'])
            .array()
            .optional(),
          position: z
            .enum([
              'FRONT_END_DEVELOPER',
              'BACK_END_DEVELOPER',
              'FULL_STACK_DEVELOPER',
              'UI_UX_DESIGNER',
              'SYSTEM_ADMINISTRATOR'
            ])
            .array()
            .optional(),
          title: z.string().optional(),
          location: z.string().optional()
        })
        .optional()
    )
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.jobPost.findMany({
        include: {
          postedBy: {
            select: {
              name: true,
              location: true,
              image: true
            }
          }
        },
        where: {
          experience: {
            in: input?.experience
          },
          type: {
            in: input?.type
          },
          position: {
            in: input?.position
          },
          title: {
            contains: input?.title,
            mode: 'insensitive'
          },
          postedBy: {
            location: {
              contains: input?.location,
              mode: 'insensitive'
            }
          },
          active: true
        }
      });
    }),
  saveJob: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id
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
      await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id
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
  getById: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    return await ctx.prisma.jobPost.findFirst({
      include: {
        comments: {
          include: {
            writtenBy: {
              select: {
                name: true,
                image: true
              }
            }
          }
        },
        postedBy: {
          select: {
            name: true,
            location: true,
            image: true
          }
        }
      },
      where: {
        id: input
      }
    });
  }),
  apply: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id
        },
        data: {
          appliedJobs: {
            connect: {
              id: input
            }
          }
        }
      });
    }),
  cancelApplication: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id
        },
        data: {
          appliedJobs: {
            disconnect: {
              id: input
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
          jobId: {
            connect: {
              id: input.jobId
            }
          },
          writtenBy: {
            connect: {
              id: ctx.session.user.id
            }
          }
        }
      });
    }),
  removeJobPost: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.jobPost.delete({
        where: {
          id: input
        }
      });
    }),
  toggleJob: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const value = await ctx.prisma.jobPost.findUnique({
        where: {
          id: input
        }
      });

      if (!value) return;

      await ctx.prisma.jobPost.update({
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
      return await ctx.prisma.jobPost.create({
        data: {
          ...input,
          postedBy: {
            connect: {
              id: ctx.session.user.id
            }
          }
        }
      });
    })
});
