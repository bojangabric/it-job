import { useFilters } from './filter/use-filters';
import { JobCard } from './job-card';
import { api } from 'utils/api';

export const JobsList = () => {
  const { activeEnumFilters } = useFilters();
  const { data: jobPosts, status } =
    api.jobPosts.getAll.useQuery(activeEnumFilters);

  if (status === 'loading') return <></>;

  return (
    <div className="grid w-full grid-cols-3 gap-10 self-start">
      {!jobPosts || jobPosts.length === 0 ? (
        <div className="col-span-3 mx-auto mt-10 text-center">
          <p className="text-3xl font-semibold">
            Nema nikakvih oglasa za ovu pretragu.
          </p>
          <img src="/images/no_results.png" />
        </div>
      ) : (
        jobPosts.map(job => <JobCard key={job.id} {...job} />)
      )}
    </div>
  );
};
