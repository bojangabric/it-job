import { HeartIcon } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import { api } from 'utils/api';

export const SaveJobToFavorites = ({ jobId }: { jobId: string }) => {
  const { data, update } = useSession();
  const addToFavorites = api.jobPosts.addToFavorites.useMutation({
    onSuccess: update
  });
  const removeFromFavorites = api.jobPosts.removeFromFavorites.useMutation({
    onSuccess: update
  });

  if (data?.user.role !== 'KANDIDAT') return <></>;

  if (data.user.favoriteJobs.includes(jobId)) {
    return (
      <div
        className="absolute top-0 right-0 w-6"
        onClick={() => removeFromFavorites.mutate(jobId)}
      >
        <HeartIcon className="cursor-pointer text-red-500" />
      </div>
    );
  }

  return (
    <div
      className="absolute top-0 right-0 w-6"
      onClick={() => addToFavorites.mutate(jobId)}
    >
      <HeartIcon className="cursor-pointer text-gray-300 transition hover:text-red-400" />
    </div>
  );
};
