import { z } from 'zod';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from 'server/api/trpc';

export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(
      z.object({
        role: z.enum(['KANDIDAT', 'POSLODAVAC', 'MODERATOR']),
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
    ),
  updateImage: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id
        },
        data: {
          image: input
        }
      });
    })
});
