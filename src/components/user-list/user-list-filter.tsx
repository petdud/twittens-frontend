import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ICommonCollections } from '../collection-view/collection-view-helpers';

interface IUserListFilterProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  commonCollections: ICommonCollections[];
  onFilter: (filter: string[]) => void;
}

export const UserListFilter = ({open, setOpen, onFilter, commonCollections}: IUserListFilterProps) => {
  const [filter, setFilter] = useState<string[]>([]);

  const onAddFilter = (slug: string) => {
    const updatedFilter = [...filter, slug];
    setFilter(updatedFilter);
    onFilter(updatedFilter);
  }

  const onRemoveFilter = (slug: string) => {
    const updatedFilter = filter.filter((f) => f !== slug);
    setFilter(updatedFilter);
    onFilter(updatedFilter);
  }

  const onResetFilter = () => {
    setFilter([]);
    onFilter([]);
  }

  const onClose = () => {
    onResetFilter();
    setOpen(false);
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
      {/* <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child> */}
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col divide-y divide-gray-200 bg-white dark:bg-black dark:divide-gray-700 shadow-xl">
                    <div className="flex min-h-0 flex-1 flex-col overflow-y-scroll py-6">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            Filter by collections
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-white dark:bg-black text-gray-400 dark:text-gray-200 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              onClick={onClose}
                            >
                              <span className="sr-only">Close</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">

                        <fieldset>
                          <legend className="sr-only">Filter users by other collections</legend>
                          <div className="space-y-2">
                            {commonCollections.map(collection => 
                              <CollectionCheckbox key={collection.slug} isChecked={filter.includes(collection.slug)} onAdd={onAddFilter} onRemove={onRemoveFilter} {...collection} />
                            )}
                          </div>
                        </fieldset>
                      </div>
                    </div>
                    <div className="flex flex-shrink-0 justify-end px-4 py-4">
                      <button
                        type="button"
                        className="rounded-md bg-white px-3 py-2 dark:bg-gray-900 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400"
                        onClick={onClose}
                      >
                        Reset
                      </button>
                      <button
                        type="submit"
                        onClick={() => setOpen(false)}
                        className="ml-4 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export interface ICollectionCheckboxProps extends ICommonCollections {
  onAdd: (slug: string) => void;
  onRemove: (slug: string) => void;
  isChecked: boolean;
}

const CollectionCheckbox = ({onAdd, onRemove, count, isChecked, imageUrl, name, slug}: ICollectionCheckboxProps) => {

  const onToggle = (checked: boolean) => {
    if (!checked) {
      onAdd(slug);
    } else {
      onRemove(slug);
    }
  }

  return (
    <div className="relative flex items-start">
      <div className="flex h-6 items-center">
        <input
          id={slug}
          name={slug}
          checked={isChecked}
          onChange={() => onToggle(isChecked)}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 bg-white text-indigo-600 focus:ring-indigo-600 cursor-pointer"
        />
      </div>
      <div className="ml-3 text-sm leading-6">
        <label htmlFor={slug} className="font-medium text-gray-900 dark:text-white flex gap-2 cursor-pointer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} width={24} height={24} alt={name} aria-hidden={true} />
          {name} {' '}
            <span id="comments-description" className="text-gray-500 dark:text-gray-400">
              <span className="sr-only">{name} </span> ({count})
            </span>
        </label>
      </div>
    </div>
  )
}
