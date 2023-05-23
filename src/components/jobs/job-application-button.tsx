import { useSession } from 'next-auth/react';
import { api } from 'utils/api';

export const JobApplicationButton = ({ jobId }: { jobId: string }) => {
  const { data, update } = useSession();
  const { mutate: apply } = api.jobPosts.apply.useMutation({
    onSuccess: update
  });
  const { mutate: cancelApplication } =
    api.jobPosts.cancelApplication.useMutation({
      onSuccess: update
    });

  const appliedJobsIds = data?.user.appliedJobs.map(jobPost => jobPost.id);

  if (appliedJobsIds?.includes(jobId)) {
    return (
      <div className="mt-10 text-center">
        <button
          onClick={() => cancelApplication(jobId)}
          className="rounded-md bg-red-200 px-5 py-3 text-base font-medium text-red-600 focus:outline-none disabled:bg-gray-300 disabled:text-gray-500"
        >
          Odjavi se
        </button>
      </div>
    );
  }

  return (
    <div className="mt-10 text-center">
      <button
        disabled={!data}
        onClick={() => apply(jobId)}
        className="rounded-md bg-blue-700 px-5 py-3 text-base font-medium text-white focus:outline-none disabled:bg-gray-300 disabled:text-gray-500"
      >
        Prijavi se na oglas
      </button>
      {!data && (
        <div className="mt-4 text-sm italic text-gray-700">
          Morate se ulogovati prvo da biste se prijavili na posao.
        </div>
      )}
    </div>
  );
};
