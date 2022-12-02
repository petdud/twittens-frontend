import React from "react";
import { ICollection } from "../../core/collection.interface";
import { TwitterItem } from "./twitter-item";

interface ITwitterList {
  collection?: ICollection;
}

export const TwitterList = ({collection}: ITwitterList) => {
  return (
    <ul role="list" className="space-y-8 py-12 max-w-2xl">
      {collection && collection.users?.map(({address, collections, name, twitter}) => {
        return (
          twitter && <TwitterItem 
            key={address} 
            address={address}
            collections={collections}
            name={name}
            twitter={twitter}
            displayedCollectionSlug={collection.slug}
          />
        )
      })}
    </ul>
  )
}

export const TwitterListSkeleton = () => (
  <ul role="list" className="space-y-8 py-2 max-w-2xl">
    <div role="status" className="p-4 space-y-8 w-full rounded animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
      {["a", "b", "c", "d"].map(alp => (
        <div key={alp} className="shadow bg-white rounded-md">
          <div className="px-4 py-1 bg-slate-50 border-b-2 border-slate-100 flex items-center gap-3 justify-between">
            <div className="flex items-center gap-2 h-6">
              <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
          </div>
          <div className="flex items-start p-4 gap-3">
            <svg className="h-16 md:w-16 text-gray-200 dark:text-gray-700" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>
            <div className="pt-3">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                <div className="w-64 h-1.5 bg-gray-200 rounded-full dark:bg-gray-700 mb-2"></div>
                <div className="w-48 h-1.5 bg-gray-200 rounded-full dark:bg-gray-700 mt-4"></div>
            </div>
          </div>
        </div>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  </ul>
)
