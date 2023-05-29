import { type GetServerSidePropsContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { CandidateProfile } from 'components/profiles/candidate';
import { CompanyProfile } from 'components/profiles/company';
import { ModeratorProfile } from 'components/profiles/moderator';

const Profile = () => {
  const { data } = useSession();
  const user = data?.user;

  if (!user) return <></>;

  if (user.role === 'KANDIDAT') {
    return <CandidateProfile user={user} />;
  }

  if (user.role === 'POSLODAVAC') {
    return <CompanyProfile user={user} />;
  }

  if (user.role === 'MODERATOR') {
    return <ModeratorProfile user={user} />;
  }
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
