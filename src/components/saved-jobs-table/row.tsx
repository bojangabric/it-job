import { type JobPostWithEmployer } from 'next-auth';
import { transformExperienceToValue } from 'utils/transform-experience-to-value';
import { transformPositionToValue } from 'utils/transform-position-to-value';
import { transformTypeToValue } from 'utils/transform-type-to-value';

export const Row = ({
  title,
  postedBy,
  position,
  experience,
  type,
  skills,
  id
}: JobPostWithEmployer) => {
  return (
    <tr className="border-b bg-white hover:bg-gray-50">
      <th
        scope="row"
        className="flex items-center whitespace-nowrap px-6 py-4 text-gray-900"
      >
        <img className="h-10 w-10" src={postedBy.image} />
        <div className="pl-3">
          <div className="text-base font-semibold">{title}</div>
          <div className="font-normal text-gray-500">{postedBy.name}</div>
        </div>
      </th>
      <td className="px-6 py-4">{transformPositionToValue(position)}</td>
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
        <a href={`/jobs/${id}`} className="text-blue-500 hover:text-blue-700">
          Vidi oglas
        </a>
      </td>
    </tr>
  );
};
