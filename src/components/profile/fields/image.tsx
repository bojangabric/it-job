import { useSession } from 'next-auth/react';
import { type ChangeEvent } from 'react';
import { api } from 'utils/api';
import { FieldRow } from 'components/profile/field-row';

const cloudName = 'dzjr25qbl';
const uploadPreset = 'i9igsfde';

export interface UploadApiResponse {
  url: string;
}

export const Image = ({ image }: { image: string }) => {
  const { update } = useSession();

  const { mutate: updateImage } = api.user.updateImage.useMutation({
    onSuccess: update
  });

  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
      {
        method: 'POST',
        body: formData
      }
    );
    const data = (await response.json()) as UploadApiResponse;
    return data;
  };

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const result = await uploadFile(file);
        updateImage(result.url);
        console.log('File upload successful:', result);
      } catch (error) {
        console.error('File upload error:', error);
      }
    }
  };

  return (
    <FieldRow fieldName="Slika">
      <div className="group relative inline-block w-auto overflow-hidden rounded-md">
        <div className="absolute z-10 flex h-full w-full items-center justify-center font-semibold text-white opacity-0 transition group-hover:opacity-100">
          <label className="flex cursor-pointer flex-col items-center">
            <svg
              className="h-6 w-6"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span>Promeni sliku</span>
            <input
              type="file"
              className="hidden"
              onChange={e => void handleFileUpload(e)}
            />
          </label>
        </div>
        <img
          src={image}
          className="block h-52 max-h-52 filter transition group-hover:blur-[3px] group-hover:contrast-[40%]"
        />
      </div>
    </FieldRow>
  );
};
