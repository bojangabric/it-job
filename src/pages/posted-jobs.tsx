import { type GetServerSidePropsContext } from 'next';
import { type Session, getServerSession } from 'next-auth';
import { authOptions } from 'server/auth';
import { useSession } from 'next-auth/react';
import { PostedJobsTable } from 'components/posted-jobs-table';

const PostedJobs = () => {
  const { data: session } = useSession();
  const user = session?.user;

  if (user?.role !== 'COMPANY') return <></>;

  return <PostedJobsTable jobs={user.company.jobs} />;
};

export default PostedJobs;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/?modal=Login',
        permanent: false
      }
    };
  }

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)) as Session
    }
  };
}
