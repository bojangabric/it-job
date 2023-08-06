import { type GetServerSidePropsContext } from 'next';
import { PostedJobsTable } from 'components/posted-jobs-table';
import { PostedJobRow } from 'components/posted-job-row';
import { getServerSession } from 'next-auth';
import { authOptions } from 'server/auth';
import { useSession } from 'next-auth/react';

const PostedJobs = () => {
  const { data: session } = useSession();
  const user = session?.user;

  if (user?.role !== 'COMPANY') return <></>;

  return (
    <PostedJobsTable>
      {user.company.jobs.map(job => (
        <PostedJobRow key={job.id} {...job} />
      ))}
    </PostedJobsTable>
  );
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
      session
    }
  };
}
