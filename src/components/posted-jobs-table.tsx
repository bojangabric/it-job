import { type ReactNode } from 'react';

type TableLayoutProps = {
  children: ReactNode;
};

export const PostedJobsTable = ({ children }: TableLayoutProps) => {
  return (
    <div className="mx-auto my-20 max-w-7xl shadow-md sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-500">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3 text-center">
              Aktivan
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
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};
