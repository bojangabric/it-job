import { AppliedRow } from 'components/tables/applied-row';
import { TableLayoutApplied } from 'components/tables/table-layout-applied';
import { type GetServerSidePropsContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Link from 'next/link';

export const AppliedJobs = () => {
  const { data } = useSession();

  if (data?.user.role !== 'KANDIDAT') return <></>;

  const appliedJobs = data?.user.candidate.applications.map(application => ({
    ...application.job,
    status: application.status
  }));

  if (!appliedJobs || appliedJobs.length === 0)
    return (
      <div className="mx-auto my-20 max-w-2xl justify-center rounded bg-blue-50 px-8 py-4 text-lg">
        Niste se prijavili ni na jedan posao za sada. Pogledajte sve{' '}
        <Link href="/jobs" className="text-blue-600">
          otvorene pozicije
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
