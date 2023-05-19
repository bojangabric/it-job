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
          }
        }
      });
    }),
  addToFavorites: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id
        },
        data: {
          favoriteJobs: {
            connect: {
              id: input
            }
          }
        }
      });
    }),
  removeFromFavorites: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id
        },
        data: {
          favoriteJobs: {
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
    })
});
