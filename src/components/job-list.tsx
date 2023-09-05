import { useFilters } from 'components/filter/use-filters';
import { JobCard } from 'components/job-card';
import { api } from 'utils/api';
import { Spinner } from 'components/spinner';

export const JobList = () => {
  const { activeEnumFilters } = useFilters();
  const { data: jobPosts, status } =
    api.jobPosts.getAll.useQuery(activeEnumFilters);

  if (status === 'loading')
    return (
      <div className="flex w-full items-center justify-center">
        <Spinner className="stroke-[#93bfec]" />
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
