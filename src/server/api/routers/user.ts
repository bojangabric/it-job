import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from 'server/api/trpc';

export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        role: z.string(),
        name: z.string(),
        email: z.string(),
        password: z.string(),
        location: z.string().optional()
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.user.create({
        data: input
      });
    }),
  getById: publicProcedure
    .input(z.string())
    .query(
      async ({ input, ctx }) =>
        await ctx.prisma.user.findUnique({ where: { id: input } })
    )
});
