import { type GetServerSidePropsContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { PostedJobsTable } from 'components/posted-jobs-table';
import { PostedJobRow } from 'components/posted-job-row';

const PostedJobs = () => {
  const { data } = useSession();
  const user = data?.user;

  if (!user) return <></>;

  return (
    <PostedJobsTable>
      {user.postedJobs.map(job => (
        <PostedJobRow key={job.id} {...job} />
      ))}
    </PostedJobsTable>
  );
};

export default PostedJobs;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/?modal=Uloguj+se',
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
}
