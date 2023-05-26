import { type JobPost } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { api } from 'utils/api';
import { transformExperienceToValue } from 'utils/transform-experience-to-value';
import { transformPositionToValue } from 'utils/transform-position-to-value';
import { transformTypeToValue } from 'utils/transform-type-to-value';
import { Toggle } from './toggle';
import { XCircleIcon } from '@heroicons/react/24/solid';
import { formatDistance } from 'date-fns';
import Link from 'next/link';

export const PostedJobRow = ({
  title,
  position,
  experience,
  type,
  skills,
  id,
  active,
  createdAt
}: JobPost) => {
  const { update } = useSession();

  const { mutate: removeJob } = api.jobPosts.removeJobPost.useMutation({
    onSuccess: update
  });

  const { mutate: toggleJob } = api.jobPosts.toggleJob.useMutation({
    onSuccess: update
  });

  return (
    <tr className="border-b bg-white hover:bg-gray-50">
      <td className="flex items-center justify-center whitespace-nowrap px-6 py-4 text-gray-900">
        <Toggle enabled={active} onChange={() => toggleJob(id)} />
      </td>
      <td className="px-6 py-4">
        <Link href={`jobs/${id}`}>
          <div className="text-base font-semibold text-gray-900">{title}</div>
          <div className="font-normal text-gray-500">
            {transformPositionToValue(position)}
          </div>
        </Link>
      </td>
      <td className="px-6 py-4">{transformExperienceToValue(experience)}</td>
      <td className="px-6 py-4">{transformTypeToValue(type)}</td>
      <td className="space-x-2 px-6 py-4">
        {skills.map(skill => (
          <span
            key={skill}
            className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-600"
          >
            {skill}
          </span>
        ))}
      </td>
      <td className="px-6 py-4">
        {formatDistance(new Date(createdAt), new Date(), {
          addSuffix: true
        })}
      </td>
      <td className="px-6 py-4">
        <button onClick={() => removeJob(id)}>
          <XCircleIcon className="h-8 w-8 text-gray-400 transition hover:text-red-400" />
        </button>
      </td>
    </tr>
  );
};
