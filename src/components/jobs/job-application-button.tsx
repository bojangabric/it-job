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
          Prijavi se na oglas
        </button>
        <div className="mt-4 text-sm italic text-gray-700">
          Morate se ulogovati prvo da biste se prijavili na posao.
        </div>
      </div>
    );

  if (data.user.role !== 'KANDIDAT') return <></>;

  const application = data.user.candidate.applications.find(
    application => application.jobId === jobId
  );

  if (application?.status === 'REJECTED')
    return (
      <div className="mt-10 rounded bg-yellow-100 py-2 text-center text-yellow-700">
        Kompanija je pogledala Vaš profil i nažalost niste prošli u sledeći
        krug.
      </div>
    );

  if (application?.status === 'ACCEPTED')
    return (
      <div className="mt-10 rounded bg-green-100 py-2 text-center text-green-700">
        Čestitamo, kompanija je pogledala Vaš profil i prošli ste u sledeći
        krug!
      </div>
    );

  if (application?.status === 'APPLIED')
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

  return (
    <div className="mt-10 text-center">
      <button
        onClick={() => apply(jobId)}
        className="rounded-md bg-blue-700 px-5 py-3 text-base font-medium text-white focus:outline-none disabled:bg-gray-300 disabled:text-gray-500"
      >
        Prijavi se na oglas
      </button>
    </div>
  );
};
