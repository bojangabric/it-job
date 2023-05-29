import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { formatDistance } from 'date-fns';
import { type JobWithCandidates } from 'next-auth';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { api } from 'utils/api';

export const CandidateRow = ({
  candidate,
  status,
  jobId,
  candidateId,
  appliedAt
}: JobWithCandidates['applicants'][number]) => {
  const { update } = useSession();
  const { mutate: rejectCandidate } = api.company.rejectCandidate.useMutation({
    onSuccess: update
  });
  const { mutate: acceptCandidate } = api.company.acceptCandidate.useMutation({
    onSuccess: update
  });

  return (
    <tr className="border-b">
      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4">
          <img
            src={candidate.account.image}
            className="h-12 w-12 rounded-full"
          />
          <div className="text-base font-semibold text-gray-900">
            {candidate.account.name}
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        {formatDistance(new Date(appliedAt), new Date(), {
          addSuffix: true
        })}
      </td>
      <td className="px-6 py-4">
        <Link
          href={`profile/${candidate.id}`}
          className="text-blue-600 hover:text-blue-800"
        >
          Pogledaj detalje
        </Link>
      </td>
      <td className="px-6 py-4 text-center">
        {status === 'APPLIED' && (
          <div className="inline-flex gap-2">
            <XCircleIcon
              onClick={() => rejectCandidate({ jobId, candidateId })}
              className="h-6 w-6 cursor-pointer text-gray-400 transition hover:text-red-400"
            />
            <CheckCircleIcon
              onClick={() => acceptCandidate({ jobId, candidateId })}
              className="h-6 w-6 cursor-pointer text-gray-400 transition hover:text-green-600"
            />
          </div>
        )}
        {status === 'ACCEPTED' && (
          <span className="text-green-600">Kandidat prihvaćen</span>
        )}
        {status === 'REJECTED' && (
          <span className="text-red-600">Kandidat odbijen</span>
        )}
      </td>
    </tr>
  );
};
