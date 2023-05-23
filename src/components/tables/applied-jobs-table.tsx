import { Row } from 'components/tables/row';
import { useSession } from 'next-auth/react';
import { TableLayout } from './table-layout';

export const AppliedJobsTable = () => {
  const { data } = useSession();
  const appliedJobs = data?.user.appliedJobs;

  return (
    <TableLayout>
      {appliedJobs?.map(job => (
        <Row {...job} key={job.id} />
      ))}
    </TableLayout>
  );
};
