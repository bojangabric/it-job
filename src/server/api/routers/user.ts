import { z } from 'zod';
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from 'server/api/trpc';
import cloudinary from 'cloudinary';
import { env } from 'env.mjs';

cloudinary.v2.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET
});

export const userRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.string())
    .query(
      async ({ input, ctx }) =>
        await ctx.prisma.account.findUnique({ where: { id: input } })
    ),
  updateImage: protectedProcedure
    .input(
      z.object({
        file: z.string(),
        fileName: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const uploadResult = await cloudinary.v2.uploader.upload(input.file, {
        public_id: input.fileName
      });

      return await ctx.prisma.account.update({
        where: {
          id: ctx.session.user.id
        },
        data: {
          image: uploadResult.url
        }
      });
    })
});
