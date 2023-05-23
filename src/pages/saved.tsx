import { Row } from 'components/tables/row';
import { TableLayout } from 'components/tables/table-layout';
import { type GetServerSidePropsContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import Link from 'next/link';

export const SavedJobs = () => {
  const { data } = useSession();
  const savedJobs = data?.user.savedJobs;

  if (!savedJobs || savedJobs.length === 0)
    return (
      <div className="mx-auto my-20 max-w-2xl justify-center rounded bg-blue-50 px-8 py-4 text-lg">
        Niste sačuvali nijedan posao za sada. Pogledajte sve{' '}
        <Link href="/jobs" className="text-blue-600">
          otvorene pozicije
        </Link>
        .
      </div>
    );

  return (
    <div className="mx-auto my-20 max-w-7xl shadow-md sm:rounded-lg">
      <TableLayout>
        {savedJobs?.map(job => (
          <Row {...job} key={job.id} />
        ))}
      </TableLayout>
    </div>
  );
};

export default SavedJobs;

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
