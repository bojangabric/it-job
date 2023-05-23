import { Row } from 'components/tables/row';
import { TableLayout } from 'components/tables/table-layout';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export const AppliedJobs = () => {
  const { data } = useSession();
  const appliedJobs = data?.user.appliedJobs;

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
      <TableLayout>
        {appliedJobs?.map(job => (
          <Row {...job} key={job.id} />
        ))}
      </TableLayout>
    </div>
  );
};

export default AppliedJobs;
