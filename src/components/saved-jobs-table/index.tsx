import { Row } from 'components/saved-jobs-table/row';
import { useSession } from 'next-auth/react';

export const SavedJobsTable = () => {
  const { data } = useSession();

  return (
    <table className="w-full text-left text-sm text-gray-500">
      <thead className="bg-gray-50 text-xs uppercase text-gray-700">
        <tr>
          <th scope="col" className="px-6 py-3">
            Kompanija
          </th>
          <th scope="col" className="px-6 py-3">
            Pozicija
          </th>
          <th scope="col" className="px-6 py-3">
            Iskustvo
          </th>
          <th scope="col" className="px-6 py-3">
            Tip zaposlenja
          </th>
          <th scope="col" className="px-6 py-3">
            Veštine
          </th>
          <th scope="col" className="px-6 py-3"></th>
        </tr>
      </thead>
      <tbody>
        {data?.user.favoriteJobs.map(job => (
          <Row {...job} key={job.id} />
        ))}
      </tbody>
    </table>
  );
};
