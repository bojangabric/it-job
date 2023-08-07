import { FieldRow } from 'components/profile/field-row';
import { UpdateResume } from './update-resume';
import { AddResume } from './add-resume';

export const Resume = ({ resume }: { resume: string | null }) => {
  return (
    <FieldRow fieldName="CV">
      <div className="relative flex items-center justify-between rounded-md border border-gray-200 py-3 pl-3 pr-4 text-sm">
        {resume ? <UpdateResume resume={resume} /> : <AddResume />}
      </div>
    </FieldRow>
  );
};
