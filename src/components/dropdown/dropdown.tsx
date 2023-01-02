import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { classNames } from '../../utils'
import { FiExternalLink } from 'react-icons/fi';

export type AppearanceType = "button" | "transparent";

interface IDropdownProps {
  name: JSX.Element | string;
  children: JSX.Element | JSX.Element[];
  appearance?: AppearanceType;
}

export const Dropdown = ({name, children, appearance = "button"}: IDropdownProps) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className={
          classNames(
            "inline-flex w-full justify-center rounded-md px-2.5 py-1.5 text-sm font-medium text-neutral-800 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100",
            appearance === "button" ? "border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-800 hover:bg-gray-50 shadow-sm" : "bg-transparent hover:text-underline"
          )}>
          {name}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
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
        <Menu.Items style={{zIndex: "10"}} className="absolute overflow-visible right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white dark:bg-neutral-800 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {children}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

interface IDropdownMenuItemProps {
  name: JSX.Element | string;
  link: string;
  isExternal?: boolean;
}

export const DropdownMenuItem = ({name, link, isExternal}: IDropdownMenuItemProps) => (
  <Menu.Item>
    {({ active }) => (
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className={classNames(
          active ? 'bg-gray-100 text-gray-900 dark:bg-neutral-900 dark:text-white rounded-md border-2 border-indigo-500' : 'text-gray-700 dark:text-slate-100',
          'block px-4 py-2 text-sm'
        )}
      >
        <div className="flex items-center">
          <span>{name}</span>
          {active && isExternal && <FiExternalLink className="ml-auto text-gray-400" />}
        </div>

      </a>
    )}
  </Menu.Item>
)
