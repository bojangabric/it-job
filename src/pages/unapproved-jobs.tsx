import { type GetServerSidePropsContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { api } from 'utils/api';
import { UnapprovedJobRow } from 'components/unapproved-job-row';
import { UnapprovedJobsTable } from 'components/unapproved-jobs-table';

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
  const session = await getSession(context);

  if (!session || session.user.role !== 'MODERATOR') {
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
