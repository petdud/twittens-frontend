import React, { Fragment } from "react";
import { UserListFilter } from "./user-list-filter";
import { classNames } from "../../utils";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import { DEFAULT_SORTING_TYPE, SORTING_TYPES } from "./user-list-sorting-helpers";
import { ICommonCollections } from "../collection-view/collection-view-helpers";
import { Dropdown, DropdownMenuItemClick } from "../dropdown/dropdown";
import { BsFilter } from "react-icons/bs";


interface IUserListHeaderProps {
  onSort: (sortingType: any) => void;
  onFilter: (filter: string[]) => void
  commonCollections: ICommonCollections[]
}

export const UserListHeader = ({onSort, onFilter, commonCollections}: IUserListHeaderProps) => {
  const [open, setOpen] = React.useState(false);
  const [activeFilter, setActiveFilter] = React.useState<number>(0);

  const handleFilter = (filter: string[]) => {
    onFilter(filter);
    setActiveFilter(filter.length);
  }
  
  {/* px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-800 hover:bg-gray-50 shadow-sm" : "bg-transparent hover:text-underline py-0.5 */}
  return (
    <div className="flex py-2 justify-end">
      <div className="flex gap-2">
        <SortByDropdown onSort={onSort} />
        <div>
          <button 
            className={classNames(
              "gap-2 inline-flex items-center w-full justify-center rounded-md text-sm font-medium text-neutral-800 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 px-2.5 py-1.5 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 shadow-sm",
              activeFilter > 0 ? "bg-indigo-500 dark:bg-indigo-800" : "bg-white dark:bg-neutral-800"
            )}
            onClick={() => setOpen(true)}
          >
            <BsFilter className="text-lg" />{activeFilter > 0 && `(${activeFilter})`}
          </button>
          <UserListFilter onFilter={handleFilter} commonCollections={commonCollections} open={open} setOpen={setOpen} />
        </div>
      </div>
    </div>
  )
}

const SortByDropdown = ({ onSort }: {onSort: (sortingType: any) => void}) => {
  const [selectedSortBy, setSelectedSortBy] = React.useState(DEFAULT_SORTING_TYPE);

  return (
    <Dropdown name={`Sort by: ${selectedSortBy.name}`} appearance="button">
      {SORTING_TYPES.map((sortingType) => {

        const onClick = () => {
          setSelectedSortBy(sortingType);
          onSort(sortingType);
        }
        
        return (
          <DropdownMenuItemClick
            key={sortingType.name}
            name={sortingType.name}
            onClick={onClick}
            isSelected={selectedSortBy.id === sortingType.id}
          />
        )
      })}
    </Dropdown>
  )
};
