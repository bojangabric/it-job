import { type ReactNode } from 'react';

export const FieldLayout = ({
  fieldName,
  children
}: {
  fieldName: string;
  children: ReactNode;
}) => {
  return (
    <div className="items-center px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
      <dt className="text-sm font-medium text-gray-500">{fieldName}</dt>
      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
        {children}
      </dd>
    </div>
  );
};
