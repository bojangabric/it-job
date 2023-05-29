import { z } from 'zod';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from 'server/api/trpc';

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
          role: 'KANDIDAT',
          email: input.email,
          password: input.password,
          candidate: {
            create: {}
          }
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
    })
});
