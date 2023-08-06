import { type ReactNode } from 'react';

type TableLayoutProps = {
  children: ReactNode;
};

export const TableLayout = ({ children }: TableLayoutProps) => {
  return (
    <table className="w-full text-left text-sm text-gray-500">
      <thead className="bg-gray-50 text-xs uppercase text-gray-700">
        <tr>
          <th scope="col" className="px-6 py-3">
            Company
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
          <th scope="col" className="px-6 py-3"></th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};
