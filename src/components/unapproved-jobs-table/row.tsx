import { api } from 'utils/api';
import { transformPositionToValue } from 'utils/transform-position-to-value';
import { Toggle } from 'components/toggle';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { formatDistance } from 'date-fns';
import Link from 'next/link';
import { type JobPostWithEmployer } from 'next-auth';

export const Row = ({
  title,
  position,
  id,
  createdAt,
  approved
}: JobPostWithEmployer) => {
  const utils = api.useContext();

  const { mutate: removeJob } = api.company.removeJobPost.useMutation({
    onSuccess: () => utils.moderator.getAllJobs.invalidate()
  });

  const { mutate: toggleApproveJob } =
    api.moderator.toggleApproveJob.useMutation({
      onSuccess: () => utils.moderator.getAllJobs.invalidate()
    });

  return (
    <tr className="border-b">
      <td className="flex items-center justify-center whitespace-nowrap px-6 py-4 text-gray-900">
        <Toggle enabled={approved} onChange={() => toggleApproveJob(id)} />
      </td>
      <td className="px-6 py-4">
        <Link href={`jobs/${id}`}>
          <div className="text-base font-semibold text-gray-900">{title}</div>
          <div className="font-normal text-gray-500">
            {transformPositionToValue(position)}
          </div>
        </Link>
      </td>
      <td className="px-6 py-4">
        {formatDistance(new Date(createdAt), new Date(), {
          addSuffix: true
        })}
      </td>
      <td className="flex items-center gap-2 px-6 py-4">
        <XCircleIcon
          className="h-8 w-8 cursor-pointer text-red-400 transition hover:text-red-600"
          onClick={() => removeJob(id)}
        />
      </td>
    </tr>
  );
};
