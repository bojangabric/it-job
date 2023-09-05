import { type ChangeEvent } from 'react';
import { convertToBase64 } from 'utils/upload/convert-to-base64';

export const useUploadFile = () => {
  const upload = async (
    event: ChangeEvent<HTMLInputElement>,
    callback: (input: { file: string; fileName: string }) => void
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const fileName = file.name.replace(/\.[^\/.]+$/, '');
    const base64 = await convertToBase64(file);

    try {
      const result = callback({ file: base64, fileName });
      console.log('File upload successful:', result);
    } catch (error) {
      console.error('File upload error:', error);
    }
  };

  return { upload };
};
