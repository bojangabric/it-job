import { env } from 'env.mjs';
import { type ChangeEvent } from 'react';

interface UploadApiResponse {
  url: string;
}

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
  formData.append('public_id', file.name.replace(/\.[^\/.]+$/, ''));

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
    {
      method: 'POST',
      body: formData
    }
  );

  return (await response.json()) as UploadApiResponse;
};

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
