import { Image } from 'components/profile/fields/image';
import { FieldRow } from 'components/profile/field-row';
import { type Session } from 'next-auth';

export const ModeratorProfile = ({
  user
}: {
  user: Extract<Session['user'], { role: 'MODERATOR' }>;
}) => {
  return (
    <div className="mx-auto max-w-3xl py-10">
      <h3 className="py-5 text-lg font-medium leading-6 text-gray-900">
        Vaše informacije
      </h3>
      <Image image={user.image} />
      <FieldRow fieldName="Ime i prezime">{user.name}</FieldRow>
      <FieldRow fieldName="Email">{user.email}</FieldRow>
    </div>
  );
};
