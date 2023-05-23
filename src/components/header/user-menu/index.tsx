import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useSession } from 'next-auth/react';
import { UserMenuItem } from './user-menu-item';
import { signOut } from 'next-auth/react';

export default function UserMenu() {
  const { data } = useSession();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md text-base font-medium text-white  hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          {data?.user.name}
          <ChevronDownIcon
            className="ml-1 -mr-1 h-6 w-6 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <UserMenuItem
              label="Oglasi na koje ste se prijavili"
              type="link"
              href="/applied"
            />
            <UserMenuItem label="Sačuvani oglasi" type="link" href="/saved" />
          </div>
          <div className="px-1 py-1">
            <UserMenuItem label="Moj profil" type="link" href="/profile" />
          </div>
          <div className="px-1 py-1">
            <UserMenuItem
              label="Odjavi se"
              onClick={() => void signOut()}
              type="button"
            />
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}