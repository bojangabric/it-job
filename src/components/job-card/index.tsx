import { transformTypeToValue } from 'utils/transform-type-to-value';
import { SaveJobButton } from './save-job-button';
import { type JobPostWithEmployer } from 'next-auth';

export const JobCard = ({
  title,
  skills,
  type,
  id,
  postedBy
}: JobPostWithEmployer) => {
  return (
    <div className="flex flex-col rounded-md bg-white p-6 shadow">
      <div className="flex items-center space-x-4">
        <div className="flex h-10 w-10 items-center">
          <img className="" src={postedBy.image} />
        </div>
        <div className="relative w-full">
          <div className="font-medium">{postedBy.name}</div>
          <div className="text-sm font-medium text-gray-500">
            {postedBy.location}
          </div>
          <SaveJobButton jobId={id} />
        </div>
      </div>
      <div className="mt-6 text-lg font-semibold">{title}</div>
      <div className="mt-4 flex-grow">
        <ul className="flex flex-wrap">
          {skills.map(skill => (
            <li
              key={skill}
              className="mr-2 mt-2 rounded-full bg-blue-100 px-2 py-0.5 text-sm text-blue-600"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8 flex items-center justify-between">
        <div className="mt-px text-sm font-medium text-gray-500">
          {transformTypeToValue(type)}
        </div>
        <a
          href={`/jobs/${id}`}
          className="font-medium text-blue-600 transition hover:text-blue-800"
        >
          Prijavi se
        </a>
      </div>
    </div>
  );
};
