import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { ButtonLink } from 'components/button-link';
import Testimonials from 'components/testimonials';
import { useSession } from 'next-auth/react';
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
          <div className="text-5xl font-bold">Nadji posao iz snova.</div>
          <div className="my-10 font-medium text-blue-100">
            Više od 3000 aktuelnih poslova sa 560 web mesta. Pronađite vaš novi
            posao danas.
          </div>
          <div className="flex justify-center space-x-6">
            <ButtonLink
              link="/jobs"
              className="bg-blue-700"
              text="Nađi posao"
            />
            <ButtonLink
              link={
                data?.user
                  ? data?.user.role === 'POSLODAVAC'
                    ? '/posted-jobs  '
                    : '/jobs'
                  : '?modal=Uloguj+se'
              }
              className="bg-yellow-400 text-gray-800"
              text="Postavi oglas"
            />
          </div>
        </div>
      </div>
      <div className="my-32 mx-auto flex max-w-5xl items-center space-x-16">
        <div className="w-1/2 space-y-8">
          <p className="text-3xl font-bold">
            Mi vam možemo pomoći da nadjete lakše posao
          </p>
          <div className="flex items-start space-x-2">
            <div className="flex items-center">
              <CheckCircleIcon className="-mt-px h-8 w-8 text-blue-500" />
            </div>
            <div className="space-y-2">
              <p className="text-xl font-semibold">
                Istraživanje ključnih reči
              </p>
              <p className="text-gray-600">
                ITJob vam omogućava da pretražite preko 3000 poslova po
                tehnologijama koje vama odgovaraju
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <div className="flex items-center">
              <CheckCircleIcon className="-mt-px h-8 w-8 text-blue-500" />
            </div>
            <div className="space-y-2">
              <p className="text-xl font-semibold">Rad od kuće</p>
              <p className="text-gray-600">
                Većina naših oglasa vam omogućava rad od kuće
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <div className="flex items-center">
              <CheckCircleIcon className="-mt-px h-8 w-8 text-blue-500" />
            </div>
            <div className="space-y-2">
              <p className="text-xl font-semibold">Različite beneficije</p>
              <p className="text-gray-600">
                Svaka kompanija ima neku svoju beneficiju po kojoj se razlikuje
                od ostalih (stoni fudbal, in-office kuhinja, putovanja na
                konferencije...)
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
            <span className="block">Spremni za pretragu?</span>
            <span className="block text-blue-200">
              Započnite upload-ovanjem vašeg CV-a!
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <ButtonLink
              className="bg-blue-700 text-white"
              link={data ? '/profile  ' : '?modal=Uloguj+se'}
              text="Postavi CV"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
