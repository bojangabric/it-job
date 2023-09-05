import { Table } from 'components/posted-jobs-table/table';
import { Row } from 'components/posted-jobs-table/row';
import { useSession } from 'next-auth/react';
import { type JobWithCandidates } from 'next-auth';

export const PostedJobsTable = ({ jobs }: { jobs: JobWithCandidates[] }) => {
  const { data: session } = useSession();
  const user = session?.user;

  if (user?.role !== 'COMPANY') return <></>;

  return (
    <Table>
      {jobs.map(job => (
        <Row key={job.id} {...job} />
      ))}
    </Table>
  );
};
