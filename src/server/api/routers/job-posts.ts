import { createTRPCRouter, publicProcedure } from 'server/api/trpc';
import { z } from 'zod';

export const jobPostsRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z
        .object({
          experience: z.string().array().optional(),
          type: z.string().array().optional(),
          position: z.string().array().optional(),
          title: z.string().optional(),
          location: z.string().optional()
        })
        .optional()
    )
    .query(async ({ input, ctx }) => {
      return await ctx.prisma.jobPost.findMany({
        include: {
          employer: {
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
          employer: {
            location: {
              contains: input?.location,
              mode: 'insensitive'
            }
          }
        }
      });
    })
});
