import { useFilters } from './filter/use-filters';
import { JobCard } from './job-card';
import { api } from 'utils/api';

export const JobsList = () => {
  const { activeFilters } = useFilters();
  const { data: jobPosts } = api.jobPosts.getAll.useQuery(activeFilters);

  if (!jobPosts) return <></>;

  return (
    <div className="grid w-full grid-cols-3 gap-10 self-start">
      {jobPosts.length === 0 ? (
        <div className="col-span-3 mx-auto mt-10 text-center">
          <p className="text-3xl font-semibold">
            Nema nikakvih oglasa za ovu pretragu.
          </p>
          <img src="/images/no_results.png" />
        </div>
      ) : (
        jobPosts.map(job => <JobCard key={job.id} job={job} />)
      )}
    </div>
  );
};
