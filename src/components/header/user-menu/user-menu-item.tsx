import { Menu } from '@headlessui/react';
import { type MouseEventHandler } from 'react';

type UserMenuItemProps =
  | {
      type: 'button';
      label: string;
      onClick: MouseEventHandler<HTMLButtonElement>;
    }
  | {
      type: 'link';
      label: string;
      href: string;
    };

export const UserMenuItem = (props: UserMenuItemProps) => {
  if (props.type === 'button') {
    return (
      <Menu.Item>
        {({ active }) => (
          <button
            onClick={props.onClick}
            className={`${
              active ? 'bg-blue-500 text-white' : 'text-gray-900'
            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
          >
            {props.label}
          </button>
        )}
      </Menu.Item>
    );
  }

  return (
    <Menu.Item>
      {({ active }) => (
        <a
          href={props.href}
          className={`${
            active ? 'bg-blue-500 text-white' : 'text-gray-900'
          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
        >
          {props.label}
        </a>
      )}
    </Menu.Item>
  );
};
