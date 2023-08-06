import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { ButtonLink } from 'components/button-link';
import Testimonials from 'components/testimonials';
import { type GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { authOptions } from 'server/auth';
import { Pattern } from 'svgs/pattern';

const Home = () => {
  const { data } = useSession();

  return (
    <>
      <div className="overflow-hidden bg-blue-500 text-white">
        <div className="relative my-32 mx-auto max-w-3xl text-center">
          <div className="absolute top-0 right-0 hidden h-52 w-52 text-blue-700 md:-mr-64 md:-mt-20 md:block">
            <Pattern />
          </div>
          <div className="absolute bottom-0 left-0 -ml-64 -mb-12 hidden h-52 w-52 text-blue-700 md:block">
            <Pattern />
          </div>
          <div className="text-5xl font-bold">Find your dream job.</div>
          <div className="my-10 font-medium text-blue-100">
            More than 3000 job posts. Find your new job today.
          </div>
          <div className="flex justify-center space-x-6">
            <ButtonLink
              link="/jobs"
              className="bg-blue-700"
              text="Find a job"
            />
            <ButtonLink
              link={
                data?.user
                  ? data?.user.role === 'COMPANY'
                    ? '/posted-jobs'
                    : '/jobs'
                  : '?modal=Login'
              }
              className="bg-yellow-400 text-gray-800"
              text="Post a job"
            />
          </div>
        </div>
      </div>
      <div className="my-32 mx-auto flex max-w-5xl items-center space-x-16">
        <div className="w-1/2 space-y-8">
          <p className="text-3xl font-bold">
            We can help you find your job easier
          </p>
          <div className="flex items-start space-x-2">
            <div className="flex items-center">
              <CheckCircleIcon className="-mt-px h-8 w-8 text-blue-500" />
            </div>
            <div className="space-y-2">
              <p className="text-xl font-semibold">Keyword search</p>
              <p className="text-gray-600">
                ITJob allows you to search over 3000 jobs per technologies that
                suit you
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <div className="flex items-center">
              <CheckCircleIcon className="-mt-px h-8 w-8 text-blue-500" />
            </div>
            <div className="space-y-2">
              <p className="text-xl font-semibold">Remote work</p>
              <p className="text-gray-600">
                Most of our jobs allow you to work from home
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <div className="flex items-center">
              <CheckCircleIcon className="-mt-px h-8 w-8 text-blue-500" />
            </div>
            <div className="space-y-2">
              <p className="text-xl font-semibold">Various benefits</p>
              <p className="text-gray-600">
                Each company has its own benefit that distinguishes it from
                others (foosball, in-office kitchen, trips to conferences...)
              </p>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <img className="rounded-md" src="/images/work.jpg" />
        </div>
      </div>
      <Testimonials />
      <div className="bg-blue-500 text-white">
        <div className="mx-auto max-w-5xl py-12 px-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-0">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            <span className="block">Ready to search?</span>
            <span className="block text-blue-200">
              Start by uploading your CV!
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <ButtonLink
              className="bg-blue-700 text-white"
              link={data ? '/profile  ' : '?modal=Login'}
              text="Upload CV"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  return {
    props: {
      session
    }
  };
}
