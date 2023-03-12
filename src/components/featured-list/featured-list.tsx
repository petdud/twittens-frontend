import React from "react";
import { useRouter } from "next/router";

export interface IFeaturedListItem {
  slug: string;
  name: string;
  image: string | undefined;
  stat: number;
}

interface IFeatureList {
  items: IFeaturedListItem[];
  isLoading: boolean;
  title: string;
}

export const FeaturedList = ({items, isLoading, title}: IFeatureList) => {
  const router = useRouter();

  const onClick = (slug: string) => {
    router.push(`/collections/${slug}`);
  };

  if (isLoading) {
    return <FeauredListSkeleton />
  }

  return (
    <div className="py-4 px-6 mt-2 rounded-lg bg-white dark:bg-neutral-800 shadow-lg">
      <>
        <div className="flex justify-between items-end">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {title}
          </h2>
          <div className="text-xs font-light text-gray-400 mr-2">
            Twitter members
          </div>
        </div>
        <div className="flow-root">
          <ul role="list" className="my-2 divide-y divide-gray-300 dark:divide-gray-600">
            {items.map(({image, name, slug, stat}) => (
              <FeaturedListItem 
                key={slug}
                slug={slug}
                image={image}
                stat={stat}
                name={name}
                onClick={onClick}
              />
            ))}
          </ul>
        </div>
      </>
    </div>
  )
};

interface IFeaturedListItemProps {
  slug: string;
  image: string | undefined;
  name: string;
  stat: number;
  onClick: (id: string) => void;
}


const FeaturedListItem = ({name, stat, slug, image, onClick}: IFeaturedListItemProps) => {
  const handleClick = () => {
    onClick(slug);
  }

  return (
    <li>
      <button 
        onClick={handleClick}
        className="px-2 py-2 w-full dark:bg-neutral-800 cursor-pointer hover:bg-slate-100 dark:hover:bg-neutral-900"
      >
        <div className="flex items-center space-x-3">
          <div className="min-w-0 flex-1 flex gap-4 items-center">
            {image &&
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="h-8 w-8 rounded-full" src={image} alt={name} aria-hidden="true" />
              </>
            }
            <div className="text-base font-semibold text-gray-600 dark:text-slate-50 text-left">
              <div>
                {name}
              </div>
            </div>
          </div>
        <div className="flex-shrink-0 text-sm font-semibold text-gray-600 dark:text-white">
          {stat}
        </div>
        </div>

      </button>
    </li>
  )
}

const FeauredListSkeleton = () => (
  <div role="status" className="w-full p-4 space-y-4 bg-white dark:bg-neutral-800 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
    <div className="flex items-center justify-between">
      <div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
    <div className="flex items-center justify-between pt-4">
      <div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
    <div className="flex items-center justify-between pt-4">
      <div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
    <div className="flex items-center justify-between pt-4">
      <div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
    <div className="flex items-center justify-between pt-4">
      <div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
    <span className="sr-only">Loading...</span>
  </div>
)
