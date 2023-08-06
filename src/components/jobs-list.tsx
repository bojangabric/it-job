import { useFilters } from './filter/use-filters';
import { JobCard } from './job-card';
import { api } from 'utils/api';

export const JobsList = () => {
  const { activeEnumFilters } = useFilters();
  const { data: jobPosts, status } =
    api.jobPosts.getAll.useQuery(activeEnumFilters);

  if (status === 'loading')
    return (
      <div className="flex w-full items-center justify-center">
        <svg className="spinner" viewBox="0 0 50 50">
          <circle
            className="path"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke-width="5"
          ></circle>
        </svg>
      </div>
    );

  return (
    <div className="grid w-full grid-cols-3 gap-10 self-start">
      {!jobPosts || jobPosts.length === 0 ? (
        <div className="col-span-3 mx-auto mt-10 text-center">
          <p className="text-3xl font-semibold">
            No results for these filters.
          </p>
          <img src="/images/no_results.png" />
        </div>
      ) : (
        jobPosts.map(job => <JobCard key={job.id} {...job} />)
      )}
    </div>
  );
};
