import { Spinner } from 'components/spinner';
import { useUploadResume } from 'utils/upload/use-upload-resume';

export const AddResume = () => {
  const { uploadResume, status } = useUploadResume();

  return (
    <div className="ml-2">
      <label className="cursor-pointer font-medium text-blue-600 hover:text-blue-500">
        <span>Upload CV</span>
        <input
          type="file"
          className="hidden"
          accept=".pdf"
          onChange={e => void uploadResume(e)}
        />
      </label>
      {status === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center rounded-md backdrop-blur-[3px] backdrop-contrast-[95%]">
          <Spinner className="!h-6 stroke-gray-500" />
        </div>
      )}
    </div>
  );
};
