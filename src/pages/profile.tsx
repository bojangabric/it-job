import { Image } from 'components/profile/fields/image';
import { TextField } from 'components/profile/fields/text-field';
import { type GetServerSidePropsContext } from 'next';
import { getSession, useSession } from 'next-auth/react';

const Profile = () => {
  const { data } = useSession();
  const user = data?.user;

  if (!user) return <></>;

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
      <TextField field="Ime i prezime" value={user.name} />
      <TextField field="Email" value={user.email} />
    </div>
  );
};

export default Profile;

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
    props: {}
  };
}
