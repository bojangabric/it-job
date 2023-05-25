import { FieldRow } from 'components/profile/field-row';

export const TextField = ({
  field,
  value
}: {
  field: string;
  value: string;
}) => {
  return (
    <FieldRow fieldName={field}>
      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
        {value}
      </dd>
    </FieldRow>
  );
};
