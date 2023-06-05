import { PaperClipIcon } from '@heroicons/react/24/solid';
import { FieldRow } from 'components/profile/field-row';
import { type GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { api } from 'utils/api';

const CandidateProfile = ({ profileId }: { profileId: string }) => {
  const { data: candidate } = api.candidate.getById.useQuery(profileId);

  if (!candidate) return <></>;

  return (
    <div className="mx-auto max-w-3xl py-10">
      <div className="py-5">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Informacije o kandidatu
        </h3>
      </div>
      <FieldRow fieldName="Slika">
        <div className="inline-block w-auto overflow-hidden rounded-md">
          <img src={candidate.account.image} className="block h-52 max-h-52" />
        </div>
      </FieldRow>
      <FieldRow fieldName="Ime i prezime">{candidate.account.name}</FieldRow>
      <FieldRow fieldName="Email">{candidate.account.email}</FieldRow>
      <FieldRow fieldName="CV">
        <div className="flex items-center justify-between rounded-md border border-gray-200 py-3 pl-3 pr-4 text-sm">
          <PaperClipIcon
            className="h-5 w-5 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
          <span className="ml-2 w-0 flex-1 truncate text-gray-600 hover:text-gray-900">
            {candidate.resume ? (
              <a target="_blank" href={candidate.resume} rel="noreferrer">
                {candidate.resume.split('/').pop()}
              </a>
            ) : (
              <>Kandidat nije dodao CV</>
            )}
          </span>
        </div>
      </FieldRow>
    </div>
  );
};

export default CandidateProfile;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/?modal=Uloguj+se',
        permanent: false
      }
    };
  }

  return {
    props: { profileId: context.params?.id }
  };
}
