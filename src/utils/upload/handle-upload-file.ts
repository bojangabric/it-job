import { type ChangeEvent } from 'react';
import { uploadFile } from './upload-file';

export const handleFileUpload = async (
  event: ChangeEvent<HTMLInputElement>,
  callBack: (url: string) => void
) => {
  const file = event.target.files?.[0];
  if (file) {
    try {
      const result = await uploadFile(file);
      callBack(result.url);
      console.log('File upload successful:', result);
    } catch (error) {
      console.error('File upload error:', error);
    }
  }
};
