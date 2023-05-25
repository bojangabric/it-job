import { useSession } from 'next-auth/react';
import { api } from 'utils/api';
import { FieldRow } from 'components/profile/field-row';
import { handleFileUpload } from 'utils/upload/handle-upload-file';

export const Image = ({ image }: { image: string }) => {
  const { update } = useSession();

  const { mutate: updateImage } = api.user.updateImage.useMutation({
    onSuccess: update
  });

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
              onChange={e => void handleFileUpload(e, updateImage)}
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
