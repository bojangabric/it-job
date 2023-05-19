import { HeartIcon } from '@heroicons/react/24/solid';
import { type JobPost } from '@prisma/client';
import { useSession } from 'next-auth/react';

type JobCardProps = {
  job: JobPost & {
    employer: {
      image: string;
      name: string | null;
      location: string | null;
    };
  };
};

export const JobCard = ({ job }: JobCardProps) => {
  const { title, skills, type, id, employer } = job;
  const { data } = useSession();

  return (
    <div className="flex flex-col rounded-md bg-white p-6 shadow">
      <div className="flex items-center space-x-4">
        <div className="flex h-10 w-10 items-center">
          <img className="" src={employer.image} />
        </div>
        <div className="relative w-full">
          <div className="font-medium">{employer.name}</div>
          <div className="text-sm font-medium text-gray-500">
            {employer.location}
          </div>
          {data?.user.role === 'KANDIDAT' && (
            <div className="absolute top-0 right-0 w-6">
              <HeartIcon className="cursor-pointer text-gray-300" />
            </div>
          )}
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
        <div className="mt-px text-sm font-medium text-gray-500">{type}</div>
        <a
          href={`/oglasi/${id}`}
          className="font-medium text-blue-600 transition hover:text-blue-800"
        >
          Prijavi se
        </a>
      </div>
    </div>
  );
};
