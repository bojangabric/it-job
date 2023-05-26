import { Switch } from '@headlessui/react';

export const Toggle = ({
  enabled,
  onChange
}: {
  enabled: boolean;
  onChange: () => void;
}) => {
  return (
    <Switch
      checked={enabled}
      onChange={onChange}
      className={`${enabled ? 'bg-green-500' : 'bg-gray-300'}
          relative inline-flex h-[30px] w-[60px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span className="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        className={`${enabled ? 'translate-x-[30px]' : 'translate-x-0'}
            pointer-events-none inline-block h-[25px] w-[25px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Switch>
  );
};
