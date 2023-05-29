import { z } from 'zod';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from 'server/api/trpc';

export const userRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.string())
    .query(
      async ({ input, ctx }) =>
        await ctx.prisma.account.findUnique({ where: { id: input } })
    ),
  updateImage: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.account.update({
        where: {
          id: ctx.session.user.id
        },
        data: {
          image: input
        }
      });
    })
});
