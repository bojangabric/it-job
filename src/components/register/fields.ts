export type FORM_FIELDS = {
  name: string;
  email: string;
  password: string;
  location: string;
};

export const FIELDS = {
  KANDIDAT: [
    {
      name: 'name',
      type: 'text',
      label: 'Ime i prezime'
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email'
    },
    {
      name: 'password',
      type: 'password',
      label: 'Sifra'
    }
  ] as const,
  POSLODAVAC: [
    {
      name: 'name',
      type: 'text',
      label: 'Ime kompanije'
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email'
    },
    {
      name: 'password',
      type: 'password',
      label: 'Sifra'
    },
    {
      name: 'location',
      type: 'text',
      label: 'Lokacija kompanije'
    }
  ] as const
};

export const ROLES = ['KANDIDAT', 'POSLODAVAC'] as const;

export type ROLE = (typeof ROLES)[number];
