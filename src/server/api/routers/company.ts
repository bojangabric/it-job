import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from 'server/api/trpc';

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
    })
});
