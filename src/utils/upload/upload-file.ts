const cloudName = 'dzjr25qbl';
const uploadPreset = 'i9igsfde';

interface UploadApiResponse {
  url: string;
}

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);
  formData.append('public_id', file.name.replace(/\.[^\/.]+$/, ''));

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
    {
      method: 'POST',
      body: formData
    }
  );

  return (await response.json()) as UploadApiResponse;
};
