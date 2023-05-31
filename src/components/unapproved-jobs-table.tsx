import { type ReactNode } from 'react';

type TableLayoutProps = {
  children: ReactNode;
};

export const UnapprovedJobsTable = ({ children }: TableLayoutProps) => {
  return (
    <div className="mx-auto my-20 max-w-7xl">
      <table className="mt-8 w-full text-left text-sm text-gray-500 shadow-md sm:rounded-lg">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3 text-center">
              Odobren
            </th>
            <th scope="col" className="px-6 py-3">
              Pozicija
            </th>
            <th scope="col" className="px-6 py-3">
              Datum objave
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};
