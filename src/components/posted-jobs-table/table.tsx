import { type ReactNode } from 'react';
import { AddJobPost } from 'components/add-job-post';

type TableProps = {
  children: ReactNode;
};

export const Table = ({ children }: TableProps) => {
  return (
    <div className="mx-auto my-20 max-w-7xl">
      <AddJobPost />
      <table className="mt-8 w-full text-left text-sm text-gray-500 shadow-md sm:rounded-lg">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3 text-center">
              Active
            </th>
            <th scope="col" className="px-6 py-3">
              Position
            </th>
            <th scope="col" className="px-6 py-3">
              Experience
            </th>
            <th scope="col" className="px-6 py-3">
              Employment type
            </th>
            <th scope="col" className="px-6 py-3">
              Skills
            </th>
            <th scope="col" className="px-6 py-3">
              Posted
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};
