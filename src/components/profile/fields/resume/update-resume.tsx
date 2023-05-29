import { PaperClipIcon } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import { api } from 'utils/api';
import { handleFileUpload } from 'utils/upload/handle-upload-file';

export const UpdateResume = ({ resume }: { resume: string }) => {
  const { update } = useSession();

  const { mutate: updateResume } = api.candidate.updateResume.useMutation({
    onSuccess: update
  });

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
          <span>Novi CV</span>
          <input
            type="file"
            className="hidden"
            accept=".pdf"
            onChange={e => void handleFileUpload(e, updateResume)}
          />
        </label>
      </div>
    </>
  );
};
