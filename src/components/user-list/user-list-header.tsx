import React, { Fragment } from "react";
import { UserListFilter } from "./user-list-filter";
import { classNames } from "../../utils";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import { DEFAULT_SORTING_TYPE, SORTING_TYPES } from "./user-list-sorting-helpers";

interface IUserListHeaderProps {
  onSort: (sortingType: any) => void;
}

export const UserListHeader = ({onSort}: IUserListHeaderProps) => {
  const [open, setOpen] = React.useState(false);
  
  return (
    <>
      <SortByDropdown onSort={onSort} />
      <button onClick={() => setOpen(true)}>filter</button>
      <UserListFilter open={open} setOpen={setOpen} />
    </>
  )
}

const SortByDropdown = ({ onSort }: {onSort: (sortingType: any) => void}) => {
  const [selectedSortBy, setSelectedSortBy] = React.useState(DEFAULT_SORTING_TYPE);

  return (
    <Menu as="div" className="relative z-20 inline-block">
      <div className="flex">
        <Menu.Button className="inline-flex justify-center text-sm font-medium text-gray-700 group hover:text-gray-900">
          Sort ({selectedSortBy.name})
          <ChevronDownIcon
            className="flex-shrink-0 w-5 h-5 ml-1 -mr-1 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
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
        <Menu.Items className="absolute right-0 w-40 mt-2 origin-top-right bg-white rounded-md shadow-2xl z-100 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {SORTING_TYPES.map(sortingType => (
              <Menu.Item key={sortingType.name}>
                {({ active }) => {

                  const onClick = () => {
                    onSort(sortingType);
                    setSelectedSortBy(sortingType);
                  };

                  return (
                    <a
                      onClick={onClick}
                      className={classNames(
                        selectedSortBy.id === sortingType.id
                          ? 'font-medium text-gray-900'
                          : 'text-gray-500',
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm cursor-pointer'
                      )}
                    >
                      <div className="flex justify-between">
                        {sortingType.name}
                        {selectedSortBy.id === sortingType.id && (
                          <CheckIcon className="w-4 h-4" />
                        )}
                      </div>
                    </a>
                  );
                }}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
