import React from 'react';
import Link from 'next/link';
import { GENERIC_AVATAR } from '../../utils';

interface IMostFollowedListProps {
  title: string | JSX.Element;
  children: JSX.Element | JSX.Element[];
  footerLink: string;
  isLoading?: boolean;
}

export const MostFollowedList = ({
  children,
  title,
  footerLink,
  isLoading
}: IMostFollowedListProps) => {
  if (isLoading) {
    return <MostFollowedListSkeleton />;
  }

  return (
    <div className="py-4 px-6 mt-2 rounded-lg bg-white dark:bg-neutral-800 shadow-lg">
      <>
        <div className="flex justify-between items-end">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            {title}
          </h2>
          <div className="text-xs font-light text-gray-400 mr-2">Followers</div>
        </div>
        <div className="flow-root">
          <ul role="list" className="my-2 divide-y divide-gray-300 dark:divide-gray-600">
            {children}
          </ul>
        </div>
        {footerLink && (
          <div className="text-center">
            <Link
              href={footerLink}
              className="text-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-white hover:underline"
            >
              View more
            </Link>
          </div>
        )}
      </>
    </div>
  );
};

const MostFollowedListSkeleton = () => (
  <div
    role="status"
    className="w-full p-4 space-y-4 bg-white dark:bg-neutral-800 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
  >
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
);

interface IMostFollowedListItemProps {
  id: string;
  rank: number;
  imageSrc: string | undefined;
  imageAlt: string | undefined;
  title: string | JSX.Element;
  subtitle: string | undefined;
  followers: string;
  onClick?: (id: string) => void;
}

export const MostFollowedListItem = ({
  id,
  rank,
  imageSrc,
  imageAlt,
  title,
  subtitle,
  followers,
  onClick
}: IMostFollowedListItemProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.(id);
  };

  const onImageError = React.useCallback((event: any) => {
    event.target.onerror = null;
    event.target.src = GENERIC_AVATAR;
  }, []);

  return (
    <li>
      <button
        onClick={handleClick}
        className="px-2 py-2 w-full dark:bg-neutral-800 cursor-pointer hover:bg-slate-100 dark:hover:bg-neutral-900"
      >
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 text-gray-900 dark:text-gray-50 mr-4">
            <div>{rank}.</div>
          </div>
          <div className="min-w-0 flex-1 flex gap-2 items-center">
            {imageSrc && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="h-6 w-6 rounded-full"
                  src={imageSrc}
                  alt={imageAlt}
                  aria-hidden="true"
                  onError={onImageError}
                />
              </>
            )}
            <div className="text-sm font-semibold text-gray-600 dark:text-slate-50 text-left">
              <div>
                {title}
                {subtitle && (
                  <div className="text-xs font-light text-gray-400">{subtitle}</div>
                )}
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 text-sm font-semibold text-gray-600 dark:text-white">
            {followers}
          </div>
        </div>
      </button>
    </li>
  );
};
