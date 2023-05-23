import { Row } from 'components/tables/row';
import { useSession } from 'next-auth/react';
import { TableLayout } from './table-layout';

export const SavedJobsTable = () => {
  const { data } = useSession();
  const savedJobs = data?.user.savedJobs;

  return (
    <TableLayout>
      {savedJobs?.map(job => (
        <Row {...job} key={job.id} />
      ))}
    </TableLayout>
  );
};
