import { useSession } from 'next-auth/react';
import { api } from 'utils/api';
import { handleFileUpload } from 'utils/upload/handle-upload-file';

export const AddResume = () => {
  const { update } = useSession();

  const { mutate: updateResume } = api.user.updateResume.useMutation({
    onSuccess: update
  });

  return (
    <div className="ml-2">
      <label className="cursor-pointer font-medium text-blue-600 hover:text-blue-500">
        <span>Dodaj CV</span>
        <input
          type="file"
          className="hidden"
          accept=".pdf"
          onChange={e => void handleFileUpload(e, updateResume)}
        />
      </label>
    </div>
  );
};
