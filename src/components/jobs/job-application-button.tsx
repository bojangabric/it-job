import { useSession } from 'next-auth/react';
import { CancelApplication } from 'components/jobs/cancel-application';
import { ApplyToJob } from 'components/jobs/apply-to-job';

export const JobApplicationButton = ({ jobId }: { jobId: string }) => {
  const { data } = useSession();

  if (!data)
    return (
      <div className="mt-10 text-center">
        <button
          disabled
          className="rounded-md bg-blue-700 px-5 py-3 text-base font-medium text-white focus:outline-none disabled:bg-gray-300 disabled:text-gray-500"
        >
          Apply
        </button>
        <div className="mt-4 text-sm italic text-gray-700">
          You must log in first to apply for a job.
        </div>
      </div>
    );

  if (data.user.role !== 'CANDIDATE') return <></>;

  const application = data.user.candidate.applications.find(
    application => application.jobId === jobId
  );

  if (application?.status === 'REJECTED')
    return (
      <div className="mt-10 rounded bg-yellow-100 py-2 text-center text-yellow-700">
        {application.job.postedBy.account.name} looked at your profile and
        unfortunately you didn&apos;t make it to the next round.
      </div>
    );

  if (application?.status === 'ACCEPTED')
    return (
      <div className="mt-10 rounded bg-green-100 py-2 text-center text-green-700">
        Congratulations, {application.job.postedBy.account.name} has viewed your
        profile and you have moved on to the next round!
      </div>
    );

  if (application?.status === 'APPLIED')
    return <CancelApplication jobId={jobId} />;

  return <ApplyToJob jobId={jobId} />;
};
