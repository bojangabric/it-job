import { Row } from 'components/tables/row';
import { TableLayout } from 'components/tables/table-layout';
import { type GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { authOptions } from 'server/auth';

export const SavedJobs = () => {
  const { data } = useSession();

  if (data?.user.role !== 'CANDIDATE') return <></>;

  const savedJobs = data?.user.candidate.savedJobs;

  if (!savedJobs || savedJobs.length === 0)
    return (
      <div className="mx-auto my-20 max-w-2xl justify-center rounded bg-blue-50 px-8 py-4 text-lg">
        You have not saved any jobs for now. See all{' '}
        <Link href="/jobs" className="text-blue-600">
          open positions
        </Link>
        .
      </div>
    );

  return (
    <div className="mx-auto my-20 max-w-7xl shadow-md sm:rounded-lg">
      <TableLayout>
        {savedJobs?.map(job => (
          <Row {...job} key={job.id} />
        ))}
      </TableLayout>
    </div>
  );
};

export default SavedJobs;

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
