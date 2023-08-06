import { type APPLICATION_STATUS } from '@prisma/client';
import { type JobPostWithEmployer } from 'next-auth';
import Link from 'next/link';
import { transformExperienceToValue } from 'utils/transform-experience-to-value';
import { transformPositionToValue } from 'utils/transform-position-to-value';
import { transformTypeToValue } from 'utils/transform-type-to-value';

const Status = ({ status }: { status: APPLICATION_STATUS }) => {
  if (status === 'APPLIED')
    return (
      <div className="rounded-full bg-yellow-100 text-center font-medium text-yellow-700">
        Applied
      </div>
    );

  if (status === 'REJECTED')
    return (
      <div className="rounded-full bg-red-100 text-center font-medium text-red-600">
        Rejected
      </div>
    );

  return (
    <div className="rounded-full bg-green-100 text-center font-medium text-green-700">
      Accepted
    </div>
  );
};

export const AppliedRow = ({
  title,
  postedBy,
  position,
  experience,
  type,
  id,
  status
}: JobPostWithEmployer & { status: APPLICATION_STATUS }) => {
  return (
    <tr className="border-b bg-white">
      <th
        scope="row"
        className="flex items-center whitespace-nowrap px-6 py-4 text-gray-900"
      >
        <img className="h-10 w-auto" src={postedBy.account.image} />
        <div className="pl-3">
          <div className="text-base font-semibold">{title}</div>
          <div className="font-normal text-gray-500">
            {postedBy.account.name}
          </div>
        </div>
      </th>
      <td className="space-x-2 px-6 py-4">
        <Status status={status} />
      </td>
      <td className="px-6 py-4">{transformPositionToValue(position)}</td>
      <td className="px-6 py-4">{transformExperienceToValue(experience)}</td>
      <td className="px-6 py-4">{transformTypeToValue(type)}</td>
      <td className="px-6 py-4">
        <Link
          href={`/jobs/${id}`}
          className="text-blue-500 hover:text-blue-700"
        >
          View job
        </Link>
      </td>
    </tr>
  );
};
