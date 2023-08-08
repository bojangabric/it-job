import { createTRPCRouter } from 'server/api/trpc';
import { userRouter } from 'server/api/routers/user';
import { companyRouter } from 'server/api/routers/company';
import { candidateRouter } from 'server/api/routers/candidate';
import { moderatorRouter } from 'server/api/routers/moderator';
import { jobPostsRouter } from 'server/api/routers/job-posts';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  company: companyRouter,
  candidate: candidateRouter,
  moderator: moderatorRouter,
  jobPosts: jobPostsRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
