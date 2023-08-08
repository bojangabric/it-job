import { Spinner } from 'components/spinner';
import { useSession } from 'next-auth/react';
import { api } from 'utils/api';

export const CancelApplication = ({ jobId }: { jobId: string }) => {
  const { update } = useSession();

  const { mutate: cancelApplication, status } =
    api.candidate.cancelApplication.useMutation({
      onSuccess: update
    });

  return (
    <div className="mt-10 text-center">
      <button
        onClick={() => cancelApplication(jobId)}
        className="relative rounded-md bg-red-200 px-5 py-3 text-base font-medium text-red-600 focus:outline-none disabled:bg-gray-300 disabled:text-gray-500"
      >
        Cancel application
        {status === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center rounded-md bg-red-400">
            <Spinner className="!h-6 stroke-red-100" />
          </div>
        )}
      </button>
    </div>
  );
};
