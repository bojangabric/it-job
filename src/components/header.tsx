import { LoginModal } from 'components/login/modal';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Logo } from 'svgs/logo';

export const Header = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="bg-blue-500 py-8 text-sm text-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4">
        <Link
          href="/"
          className="w-28 text-3xl font-bold transition hover:text-gray-300"
        >
          <Logo />
        </Link>
        {!sessionData && <LoginModal />}
        {sessionData && (
          <>
            <div>{sessionData.user.name}</div>
            <button onClick={() => void signOut()}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
};
