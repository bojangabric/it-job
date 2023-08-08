import { useSession } from 'next-auth/react';
import { type ChangeEvent } from 'react';
import { api } from 'utils/api';
import { useFileUpload } from 'utils/upload/use-upload-file';

export const useUploadImage = () => {
  const { update } = useSession();
  const { upload } = useFileUpload();

  const { mutate: updateImage, status } = api.user.updateImage.useMutation({
    onSuccess: update
  });

  const uploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    void upload(event, updateImage);
  };

  return { uploadImage, status };
};
