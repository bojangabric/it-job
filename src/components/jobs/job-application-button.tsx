import { useSession } from 'next-auth/react';
import { api } from 'utils/api';

export const JobApplicationButton = ({ jobId }: { jobId: string }) => {
  const { data, update } = useSession();
  const { mutate: apply } = api.candidate.apply.useMutation({
    onSuccess: update
  });
  const { mutate: cancelApplication } =
    api.candidate.cancelApplication.useMutation({
      onSuccess: update
    });

  if (!data)
    return (
      <div className="mt-10 text-center">
        <button
          disabled
          onClick={() => apply(jobId)}
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
    return (
      <div className="mt-10 text-center">
        <button
          onClick={() => cancelApplication(jobId)}
          className="rounded-md bg-red-200 px-5 py-3 text-base font-medium text-red-600 focus:outline-none disabled:bg-gray-300 disabled:text-gray-500"
        >
          Cancel application
        </button>
      </div>
    );

  return (
    <div className="mt-10 text-center">
      <button
        onClick={() => apply(jobId)}
        className="rounded-md bg-blue-700 px-5 py-3 text-base font-medium text-white focus:outline-none disabled:bg-gray-300 disabled:text-gray-500"
      >
        Apply to job
      </button>
    </div>
  );
};
