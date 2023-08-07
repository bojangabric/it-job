import { type GetServerSidePropsContext } from 'next';
import { CandidateProfile } from 'components/profiles/candidate';
import { CompanyProfile } from 'components/profiles/company';
import { ModeratorProfile } from 'components/profiles/moderator';
import { type Session, getServerSession } from 'next-auth';
import { authOptions } from 'server/auth';
import { useSession } from 'next-auth/react';

const Profile = () => {
  const { data: session } = useSession();
  const user = session?.user;

  if (!user) return <></>;

  if (user.role === 'CANDIDATE') {
    return <CandidateProfile user={user} />;
  }

  if (user.role === 'COMPANY') {
    return <CompanyProfile user={user} />;
  }

  if (user.role === 'MODERATOR') {
    return <ModeratorProfile user={user} />;
  }
};

export default Profile;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/?modal=Login',
        permanent: false
      }
    };
  }

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)) as Session
    }
  };
}
