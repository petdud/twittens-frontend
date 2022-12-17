import React, { Fragment, useCallback, useState } from 'react';
import { statusTypes } from '../../../core/collection.interface';
import { useCollections } from '../../../hooks/use-collections';
import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { classNames } from '../../../utils';
import axios from 'axios';
import { LOCAL_API_PATHS } from '../../../core/constants';
import Link from 'next/link';

export const AdminCollectionList = () => {
  const { data: collections } = useCollections();

  return (
    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700 mt-8 max-h-96 overflow-auto">
      {collections?.map(({imageUrl, slug, name, status}) => (
        <li key={slug} className=" dark:text-white flex justify-between hover:bg-gray-200 hover:dark:bg-gray-800">
          <Link href={`/collections/${slug}`} className="cursor-pointer py-2 px-3" target="_blank">
            <div className="flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt={name} className="inline-block h-6 w-6 rounded-full" />
              <span>{name}</span>
            </div>
          </Link>
          <StatusDropdown slug={slug} status={status} />
        </li>
      ))}
    </ul>
  )
}

const types: statusTypes[] = ["ready", "hidden", "active"];

const StatusDropdown = ({slug, status}: {slug: string, status: statusTypes}) => {
  const [selectedStatus, setSelectedStatus] = useState(status);
  const onStatusChange = useCallback(async (status: statusTypes) => {
    if (status !== selectedStatus) {
      console.log(status);
      const response = await axios.get(`${LOCAL_API_PATHS.UPDATE_COLLECTION_STATUS}?status=${status}&slug=${slug}`);
      if (response.status === 200 || response.status === 201) {
        setSelectedStatus(status);
      }
    }
  }, [selectedStatus, setSelectedStatus, slug]);

  return (
    <Listbox value={status} onChange={onStatusChange}>
      {({ open }) => (
        <>
          {/* <Listbox.Label className="block text-sm font-medium text-gray-700">Status</Listbox.Label> */}
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-pointer rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 py-1 pl-2 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
              <span className="block truncate">{selectedStatus}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-neutral-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {types.map((type) => (
                  <Listbox.Option
                    key={type}
                    className={({ active }) =>
                      classNames(
                        active ? 'text-white bg-indigo-600' : 'text-gray-900 dark:text-white',
                        'relative cursor-pointer select-none py-2 px-3'
                      )
                    }
                    value={type}
                  >
                    {({ selected }) => (
                      <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                        {type}
                      </span>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}