import { signIn } from 'next-auth/react';
import { useState, type FormEvent } from 'react';

export const LoginForm = () => {
  const [showError, setShowError] = useState(false);

  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const res = await signIn('credentials', {
      email: e.target.email.value,
      password: e.target.sifra.value,
      redirect: false
    });

    setShowError(!res?.ok);
  }

  return (
    <form className="space-y-6" method="POST" onSubmit={e => void login(e)}>
      <label className="block">
        Email
        <input
          type="email"
          className="block w-full rounded-md border border-gray-300 p-3"
          name="email"
          required
        />
      </label>
      <label className="block">
        Sifra
        <input
          type="password"
          className="block w-full rounded-md border border-gray-300 p-3"
          name="sifra"
          required
        />
      </label>
      <button
        type="submit"
        className="relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-3 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Uloguj se
      </button>
      {showError && (
        <p className="rounded bg-red-200 px-2 py-2 text-red-600">
          Pogresan email ili sifra.
        </p>
      )}
    </form>
  );
};
