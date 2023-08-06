import { AppliedRow } from 'components/tables/applied-row';
import { TableLayoutApplied } from 'components/tables/table-layout-applied';
import { type GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { authOptions } from 'server/auth';

export const AppliedJobs = () => {
  const { data: session } = useSession();

  if (session?.user.role !== 'CANDIDATE') return <></>;

  const appliedJobs = session?.user.candidate.applications.map(application => ({
    ...application.job,
    status: application.status
  }));

  if (!appliedJobs || appliedJobs.length === 0)
    return (
      <div className="mx-auto my-20 max-w-2xl justify-center rounded bg-blue-50 px-8 py-4 text-lg">
        You haven&apos;t applied to any jobs yet. View all{' '}
        <Link href="/jobs" className="text-blue-600">
          open positions
        </Link>
        .
      </div>
    );

  return (
    <div className="mx-auto my-20 max-w-7xl shadow-md sm:rounded-lg">
      <TableLayoutApplied>
        {appliedJobs.map(job => (
          <AppliedRow {...job} key={job.id} />
        ))}
      </TableLayoutApplied>
    </div>
  );
};

export default AppliedJobs;

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
