import { Filter } from 'components/filter';
import { JobList } from 'components/job-list';
import { SearchBar } from 'components/search-bar';
import { useEffect } from 'react';

const Jobs = () => {
  useEffect(() => {
    document.body.classList.add('bg-gray-100');
  });

  return (
    <div className="mx-auto max-w-7xl py-10">
      <SearchBar />
      <div className="my-10 flex space-x-16">
        <Filter />
        <JobList />
      </div>
    </div>
  );
};

export default Jobs;
