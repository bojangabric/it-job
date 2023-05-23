import { HeartIcon } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import { api } from 'utils/api';

export const SaveJobToFavorites = ({ jobId }: { jobId: string }) => {
  const { data, update } = useSession();
  const { mutate: addToFavorites } = api.jobPosts.addToFavorites.useMutation({
    onSuccess: update
  });
  const { mutate: removeFromFavorites } =
    api.jobPosts.removeFromFavorites.useMutation({
      onSuccess: update
    });

  if (data?.user.role !== 'KANDIDAT') return <></>;

  const favoriteJobsIds = data?.user.favoriteJobs.map(jobPost => jobPost.id);

  if (favoriteJobsIds.includes(jobId)) {
    return (
      <div
        className="absolute top-0 right-0 w-6"
        onClick={() => removeFromFavorites(jobId)}
      >
        <HeartIcon className="cursor-pointer text-red-500" />
      </div>
    );
  }

  return (
    <div
      className="absolute top-0 right-0 w-6"
      onClick={() => addToFavorites(jobId)}
    >
      <HeartIcon className="cursor-pointer text-gray-300 transition hover:text-red-400" />
    </div>
  );
};
