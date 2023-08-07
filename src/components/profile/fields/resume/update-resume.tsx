import { PaperClipIcon } from '@heroicons/react/24/solid';
import { Spinner } from 'components/spinner';
import { useFileUpload } from 'utils/use-upload-file';

export const UpdateResume = ({ resume }: { resume: string }) => {
  const { uploadResume, status } = useFileUpload();

  return (
    <>
      <div className="flex w-0 flex-1 items-center">
        <PaperClipIcon
          className="h-5 w-5 flex-shrink-0 text-gray-400"
          aria-hidden="true"
        />
        <span className="ml-2 w-0 flex-1 truncate text-gray-600 hover:text-gray-900">
          <a target="_blank" href={resume} rel="noreferrer">
            {resume.split('/').pop()}
          </a>
        </span>
      </div>
      <div className="ml-4 flex-shrink-0">
        <label className="cursor-pointer font-medium text-blue-600 hover:text-blue-500">
          <span>Update CV</span>
          <input
            type="file"
            className="hidden"
            accept=".pdf"
            onChange={e => void uploadResume(e)}
          />
        </label>
      </div>
      {status === 'uploading' && (
        <div className="absolute inset-0 flex items-center justify-center rounded-md backdrop-blur-[3px] backdrop-contrast-[95%]">
          <Spinner className="!h-6 stroke-gray-500" />
        </div>
      )}
    </>
  );
};
