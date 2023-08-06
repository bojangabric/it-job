import { type GetServerSidePropsContext } from 'next';
import { useSession } from 'next-auth/react';
import { PostedJobsTable } from 'components/posted-jobs-table';
import { PostedJobRow } from 'components/posted-job-row';
import { getServerSession } from 'next-auth';
import { authOptions } from 'server/auth';

const PostedJobs = () => {
  const { data } = useSession();
  const user = data?.user;

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
    props: {}
  };
}
