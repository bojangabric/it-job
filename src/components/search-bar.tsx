import { MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useState, type ReactNode, useEffect } from 'react';

type InputProps = {
  icon: ReactNode;
  placeholder: string;
  onChange: (val: string) => void;
  value: string;
};

const Input = ({ icon, placeholder, onChange, value }: InputProps) => (
  <div className="relative w-full">
    <div className="absolute top-0 left-0 mt-[18px] ml-3 h-6 w-6 text-blue-500">
      {icon}
    </div>
    <input
      type="text"
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      className="w-full border-none bg-transparent py-5 pl-11 pr-5 leading-snug focus:outline-none"
      defaultValue={value}
    />
  </div>
);

export const SearchBar = () => {
  const { push, query, pathname } = useRouter();
  const [title, setTitle] = useState((query.Title as string) || '');
  const [location, setLocation] = useState((query.Location as string) || '');

  useEffect(() => {
    setTitle(query.Title as string);
    setLocation(query.Location as string);
  }, [query]);

  const search = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    void push({
      pathname,
      query: { ...query, Title: title, Location: location }
    });
  };

  return (
    <div className="flex justify-end space-x-16">
      <div className="w-52 flex-shrink-0"></div>
      <form className="flex w-full items-center divide-x rounded-l-md bg-white shadow">
        <Input
          icon={<MagnifyingGlassIcon />}
          placeholder="Product designer..."
          onChange={setTitle}
          value={title}
        />
        <Input
          icon={<MapPinIcon />}
          placeholder="Mesto"
          onChange={setLocation}
          value={location}
        />
        <button
          onClick={search}
          className="rounded-l-none rounded-r-md bg-blue-500 !py-5 !px-12 text-center text-white"
        >
          Pretrazi
        </button>
      </form>
    </div>
  );
};
