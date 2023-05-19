import { JobApplicationButton } from 'components/jobs/job-application-button';
import { type GetServerSidePropsContext } from 'next';
import { api } from 'utils/api';

const JobPost = ({ jobId }: { jobId: string }) => {
  const { data: job } = api.jobPosts.getById.useQuery(jobId);

  return (
    <div className="py-20">
      <div className="mx-auto max-w-2xl">
        <div className="pb-20 text-center">
          <img className="mx-auto h-16" src={job?.postedBy.image} />
          <div>
            <h1 className="mt-10 text-5xl font-bold">{job?.title}</h1>
            <p className="mt-2 mb-8 text-3xl">{job?.postedBy.name}</p>
          </div>
        </div>
        <JobApplicationButton jobId={jobId} />
      </div>
    </div>
  );
};

export default JobPost;

export function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: { jobId: context.params?.id }
  };
}
