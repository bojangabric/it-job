import { useSession } from 'next-auth/react';
import { type ChangeEvent } from 'react';
import { api } from 'utils/api';
import { useFileUpload } from 'utils/upload/use-upload-file';

export const useUploadResume = () => {
  const { update } = useSession();
  const { upload } = useFileUpload();

  const { mutate: updateResume, status } =
    api.candidate.updateResume.useMutation({
      onSuccess: update
    });

  const uploadResume = (event: ChangeEvent<HTMLInputElement>) => {
    void upload(event, updateResume);
  };

  return { uploadResume, status };
};
