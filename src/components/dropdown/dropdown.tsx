import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { classNames } from '../../utils';
import { FiExternalLink } from 'react-icons/fi';
import { AiOutlineCheck } from 'react-icons/ai';

export type AppearanceType = 'button' | 'transparent';

interface IDropdownProps {
  name: JSX.Element | React.ReactNode;
  children: JSX.Element | JSX.Element[];
  appearance?: AppearanceType;
  icon?: React.ReactNode;
}

export const Dropdown = ({
  name,
  children,
  appearance = 'button',
  icon
}: IDropdownProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className={classNames(
            'inline-flex w-full justify-center rounded-md text-sm font-medium text-neutral-800 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100',
            appearance === 'button'
              ? 'px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-800 hover:bg-gray-50 shadow-sm'
              : 'bg-transparent hover:text-underline py-0.5 px-0.5'
          )}
        >
          {name}
          {icon ? (
            icon
          ) : (
            <ChevronDownIcon className="-mr-1 ml-1 h-5 w-5" aria-hidden="true" />
          )}
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          style={{ zIndex: '10' }}
          className="absolute overflow-visible right-0 z-10 mt-2 w-44 origin-top-right border border-neutral-200 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-800 shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="py-1">{children}</div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

interface IDropdownMenuItemProps {
  name: JSX.Element | string;
  link: string;
  isExternal?: boolean;
}

export const DropdownMenuItem = ({ name, link, isExternal }: IDropdownMenuItemProps) => (
  <Menu.Item>
    {({ active }) => (
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className={classNames(
          active
            ? 'bg-indigo-600 text-white font-semibold'
            : 'text-gray-900 dark:text-neutral-200',
          'block px-4 py-2 text-sm'
        )}
      >
        <div className="flex items-center">
          <span>{name}</span>
          {active && isExternal && (
            <FiExternalLink className={classNames('ml-auto text-gray-200')} />
          )}
        </div>
      </a>
    )}
  </Menu.Item>
);

interface IDropdownMenuItemClickProps {
  name: JSX.Element | string;
  isSelected: boolean;
  onClick: () => void;
}

export const DropdownMenuItemClick = ({
  name,
  onClick,
  isSelected
}: IDropdownMenuItemClickProps) => (
  <Menu.Item>
    {({ active }) => (
      <button
        className={classNames(
          active
            ? 'bg-indigo-600 text-white font-semibold'
            : 'text-gray-900 dark:text-neutral-200',
          'block px-4 py-2 text-sm w-full'
        )}
        onClick={onClick}
      >
        <div className="flex items-center">
          <span>{name}</span>
          {isSelected && (
            <AiOutlineCheck
              className={classNames('ml-auto text-gray-600 dark:text-gray-200')}
            />
          )}
        </div>
      </button>
    )}
  </Menu.Item>
);
