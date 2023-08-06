import { type GetServerSidePropsContext } from 'next';
import { useSession } from 'next-auth/react';
import { api } from 'utils/api';
import { UnapprovedJobRow } from 'components/unapproved-job-row';
import { UnapprovedJobsTable } from 'components/unapproved-jobs-table';
import { getServerSession } from 'next-auth';
import { authOptions } from 'server/auth';

const UnapprovedJobs = () => {
  const { data } = useSession();
  const user = data?.user;
  const { data: allJobs } = api.moderator.getAllJobs.useQuery();

  if (user?.role !== 'MODERATOR' || !allJobs) return <></>;

  return (
    <UnapprovedJobsTable>
      {allJobs.map(job => (
        <UnapprovedJobRow key={job.id} {...job} />
      ))}
    </UnapprovedJobsTable>
  );
};

export default UnapprovedJobs;

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
