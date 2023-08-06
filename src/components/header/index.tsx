import Link from 'next/link';
import { Logo } from 'svgs/logo';
import { useSession } from 'next-auth/react';
import { Modal } from 'components/modal';
import { LoginForm } from 'components/login-form';
import { RegisterForm } from 'components/register/register-form';
import UserMenu from './user-menu';

export const Header = () => {
  const { data } = useSession();

  return (
    <div className="relative z-10 bg-blue-500 py-8 text-sm text-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4">
        <Link
          href="/"
          className="w-28 text-3xl font-bold transition hover:text-gray-300"
        >
          <Logo />
        </Link>
        <div className="flex gap-2">
          {data ? (
            <UserMenu />
          ) : (
            <>
              <Modal buttonName="Login">
                <LoginForm />
              </Modal>
              /
              <Modal buttonName="Register">
                <RegisterForm />
              </Modal>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
