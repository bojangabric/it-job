/* eslint-disable @typescript-eslint/no-misused-promises */
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Button } from 'components/button';
import { type SubmitHandler, useForm } from 'react-hook-form';

interface FormFields {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const [showError, setShowError] = useState(false);
  const { register, handleSubmit } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = async data => {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    });
    setShowError(!res?.ok);
  };

  return (
    <form className="space-y-6" method="POST" onSubmit={handleSubmit(onSubmit)}>
      <label className="block">
        Email
        <input
          type="email"
          className="block w-full rounded-md border border-gray-300 p-3"
          {...register('email', { required: true })}
        />
      </label>
      <label className="block">
        Password
        <input
          type="password"
          className="block w-full rounded-md border border-gray-300 p-3"
          {...register('password', { required: true })}
        />
      </label>
      <Button label="Login" />
      {showError && (
        <p className="rounded bg-red-200 px-2 py-2 text-red-600">
          Wrong email or password.
        </p>
      )}
    </form>
  );
};
