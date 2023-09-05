import { type JobPostWithEmployer } from 'next-auth';
import { Table } from 'components/unapproved-jobs-table/table';
import { Row } from 'components/unapproved-jobs-table/row';

export const UnapprovedJobsTable = ({
  jobs
}: {
  jobs: JobPostWithEmployer[];
}) => {
  return (
    <Table>
      {jobs.map(job => (
        <Row key={job.id} {...job} />
      ))}
    </Table>
  );
};
