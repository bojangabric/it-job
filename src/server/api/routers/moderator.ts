import { createTRPCRouter, protectedProcedure } from 'server/api/trpc';
import { z } from 'zod';

export const moderatorRouter = createTRPCRouter({
  getAllJobs: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.job.findMany({
      include: {
        postedBy: {
          select: {
            account: {
              select: {
                name: true,
                image: true,
                company: {
                  select: {
                    location: true
                  }
                }
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }),
  toggleApproveJob: protectedProcedure
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
          approved: !value.approved
        }
      });
    })
});
