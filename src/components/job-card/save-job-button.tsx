import { HeartIcon } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import { api } from 'utils/api';

export const SaveJobButton = ({ jobId }: { jobId: string }) => {
  const { data, update } = useSession();
  const { mutate: saveJob } = api.jobPosts.saveJob.useMutation({
    onSuccess: update
  });
  const { mutate: removeSavedJob } = api.jobPosts.removeSavedJob.useMutation({
    onSuccess: update
  });

  if (data?.user.role !== 'KANDIDAT') return <></>;

  const savedJobsIds = data?.user.savedJobs.map(jobPost => jobPost.id);

  if (savedJobsIds.includes(jobId)) {
    return (
      <div
        className="absolute top-0 right-0 w-6"
        onClick={() => removeSavedJob(jobId)}
      >
        <HeartIcon className="cursor-pointer text-red-500" />
      </div>
    );
  }

  return (
    <div className="absolute top-0 right-0 w-6" onClick={() => saveJob(jobId)}>
      <HeartIcon className="cursor-pointer text-gray-300 transition hover:text-red-400" />
    </div>
  );
};
