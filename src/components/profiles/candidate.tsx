import { Image } from 'components/profile/fields/image';
import { Resume } from 'components/profile/fields/resume';
import { FieldRow } from 'components/profile/field-row';
import { type Session } from 'next-auth';

export const CandidateProfile = ({
  user
}: {
  user: Extract<Session['user'], { role: 'KANDIDAT' }>;
}) => {
  return (
    <div className="mx-auto max-w-3xl py-10">
      <div className="py-5">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Vaše informacije
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Ove informacije vide ljudi koji su postavili oglas na koji ste se
          prijavili.
        </p>
      </div>
      <Image image={user.image} />
      <FieldRow fieldName="Ime i prezime">{user.name}</FieldRow>
      <FieldRow fieldName="Email">{user.email}</FieldRow>
      <Resume resume={user.candidate.resume} />
    </div>
  );
};
