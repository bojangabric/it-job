export type FORM_FIELDS = {
  name: string;
  email: string;
  password: string;
  location: string;
};

export const FIELDS = {
  CANDIDATE: [
    {
      name: 'name',
      type: 'text',
      label: 'Name'
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email'
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password'
    }
  ] as const,
  COMPANY: [
    {
      name: 'name',
      type: 'text',
      label: 'Name'
    },
    {
      name: 'location',
      type: 'text',
      label: 'Location'
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email'
    },
    {
      name: 'password',
      type: 'password',
      label: 'Password'
    }
  ] as const
};

export const ROLES = ['CANDIDATE', 'COMPANY'] as const;

export type ROLE = (typeof ROLES)[number];
