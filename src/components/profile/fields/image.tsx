import { FieldRow } from 'components/profile/field-row';
import { Spinner } from 'components/spinner';
import { useFileUpload } from 'utils/use-upload-file';

export const Image = ({ image }: { image: string }) => {
  const { uploadImage, status } = useFileUpload();

  return (
    <FieldRow fieldName="Image">
      <div
        className={`${
          status === 'idle' ? 'group' : 'pointer-events-none'
        } relative inline-block w-auto overflow-hidden rounded-md`}
      >
        <label className="flex cursor-pointer flex-col items-center">
          <div className="absolute z-10 flex h-full w-full flex-col items-center justify-center font-semibold text-white opacity-0 transition group-hover:opacity-100">
            <svg
              className="h-6 w-6"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span>Update image</span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={e => void uploadImage(e)}
            />
          </div>
          {status === 'uploading' && (
            <div className="absolute z-10 flex h-full w-full flex-col items-center justify-center backdrop-blur-[3px] backdrop-contrast-[40%] transition">
              <Spinner className="stroke-gray-300" />
            </div>
          )}
        </label>
        <img
          src={image}
          className="max-h-52 max-w-[13rem] object-cover transition group-hover:blur-[3px] group-hover:contrast-[40%]"
        />
        {status === 'error' && (
          <div className="mt-2 rounded-full bg-yellow-100 px-3 py-0.5 text-sm text-yellow-700">
            Use image smaller than 1MB.
          </div>
        )}
      </div>
    </FieldRow>
  );
};
