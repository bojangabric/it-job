import { Spinner } from 'components/spinner';
import { useSession } from 'next-auth/react';
import { api } from 'utils/api';

export const ApplyToJob = ({ jobId }: { jobId: string }) => {
  const { update } = useSession();
  const { mutate: apply, status: applyStatus } =
    api.candidate.apply.useMutation({
      onSuccess: update
    });

  return (
    <div className="mt-10 text-center">
      <button
        onClick={() => apply(jobId)}
        className="relative rounded-md bg-blue-700 px-5 py-3 text-base font-medium text-white focus:outline-none disabled:bg-gray-300 disabled:text-gray-500"
      >
        Apply to job
        {applyStatus === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center rounded-md bg-blue-400">
            <Spinner className="!h-6 stroke-blue-100" />
          </div>
        )}
      </button>
    </div>
  );
};
