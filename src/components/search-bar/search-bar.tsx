import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { useCollections } from '../../hooks/use-collections';
import { useState } from 'react'
import { Combobox } from '@headlessui/react'
import { classNames } from '../../utils';
import { useRouter } from 'next/router';

export const SearchBar = () => {
  const { data: collections } = useCollections();
  const router = useRouter();

  const [query, setQuery] = useState('')
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null)

  const onChange = React.useCallback((value: string) => {
    if (value) {
      setSelectedCollection(value);
      router.push(`/collections/${value}`);
    }
  }, [router]);

  const filteredCollections =
    query === ''
      ? collections
      : collections?.filter((collection) => {
          return collection.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <div className="px-0 md:px-3">
      <Combobox as="div" value={selectedCollection} onChange={onChange}>
        <div className="relative mt-1">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
            aria-hidden="true"
          >
            <MagnifyingGlassIcon className="mr-3 h-4 w-4 text-gray-800 dark:text-slate-100" aria-hidden="true" />
          </div>
          <Combobox.Input
            className="pl-8 w-full rounded-md border border-gray-300 dark:text-white dark:border-neutral-500 shadow-md bg-white dark:bg-neutral-900 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            onChange={(event) => setQuery(event.target.value)}
            // displayValue={(collection) => collection?.name}
            placeholder="Search collections"
            aria-label="Search collections"
            autoComplete="off"
          />

          {filteredCollections && filteredCollections.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white dark:bg-zinc-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredCollections?.map((collection) => (
                <Combobox.Option
                  key={collection.slug}
                  value={collection.slug}
                  className={({ active }) =>
                    classNames(
                      'relative cursor-pointer select-none py-2 pl-3 pr-9',
                      active ? 'bg-indigo-600 text-white' : 'text-gray-900 dark:text-neutral-200'
                    )
                  }
                >
                  {({ active, selected }) => (
                    <>
                      <div className="flex items-center">
                        <img src={`/collections/${collection.image}`} alt={collection.name} className="h-6 w-6 flex-shrink-0 rounded-full" />
                        <span className={classNames('ml-3 truncate', selected ? 'font-semibold' : '')}>{collection.name}</span>
                      </div>
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
    </div>
  )
}