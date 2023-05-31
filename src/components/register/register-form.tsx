/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { RadioButton } from 'components/register/radio-button';
import { Button } from 'components/button';
import { useForm, type SubmitHandler } from 'react-hook-form';
import {
  FIELDS,
  type FORM_FIELDS,
  type ROLE
} from 'components/register/fields';
import { api } from 'utils/api';

export const RegisterForm = () => {
  const [selectedRole, setSelectedRole] = useState<ROLE>('KANDIDAT');
  const [error, setError] = useState(false);
  const { register, handleSubmit, getValues } = useForm<FORM_FIELDS>();

  const { mutate: registerCompany } = api.company.register.useMutation({
    onError: () => setError(true),
    onSuccess: async () => {
      await signIn('credentials', {
        email: getValues('email'),
        password: getValues('password'),
        redirect: false
      });
    }
  });

  const { mutate: registerCandidate } = api.candidate.register.useMutation({
    onError: () => setError(true),
    onSuccess: async () => {
      await signIn('credentials', {
        email: getValues('email'),
        password: getValues('password'),
        redirect: false
      });
    }
  });

  const onSubmit: SubmitHandler<FORM_FIELDS> = data => {
    if (selectedRole === 'KANDIDAT')
      registerCandidate({
        ...data
      });
    else
      registerCompany({
        ...data
      });
  };

  return (
    <form className="space-y-6" method="POST" onSubmit={handleSubmit(onSubmit)}>
      <p className="-mb-2 text-center font-medium">Vi ste:</p>
      <RadioButton
        values={['KANDIDAT', 'POSLODAVAC']}
        selected={selectedRole}
        onChange={setSelectedRole}
      />
      {FIELDS[selectedRole].map(({ name, type, label }) => (
        <label key={name} className="block">
          {label}
          <input
            type={type}
            className="block w-full rounded-md border border-gray-300 p-3"
            {...register(name, { required: true })}
          />
        </label>
      ))}
      <Button label="Registruj se" />
      {error && (
        <p className="rounded bg-red-200 px-4 py-3 text-red-600">
          Ovaj email je već registrovan.
        </p>
      )}
    </form>
  );
};
