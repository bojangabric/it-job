import { forwardRef } from 'react';
import { CandidateRow } from 'components/view-candidates/row';
import { type JobWithCandidates } from 'next-auth';

export const Table = forwardRef<
  HTMLDivElement,
  { candidates: JobWithCandidates['applicants'] }
>(({ candidates }, ref) => {
  return (
    <div ref={ref} className="mx-auto my-20 w-full max-w-3xl  bg-white">
      <table className="w-full text-left text-sm text-gray-500 shadow-md sm:rounded-lg">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3">
              Candidates
            </th>
            <th scope="col" className="px-6 py-3">
              Applied
            </th>
            <th scope="col" className="px-6 py-3"></th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {candidates.map(candidate => (
            <CandidateRow key={candidate.id} {...candidate} />
          ))}
        </tbody>
      </table>
    </div>
  );
});

Table.displayName = 'Table';
