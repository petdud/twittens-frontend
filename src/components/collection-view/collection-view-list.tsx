import React from 'react';
import Link from 'next/link';
import { Divider } from '../divider/divider';
import { GENERIC_AVATAR } from '../../utils';

interface ICollectionViewProps {
  title: string | JSX.Element;
  asideLabel: string;
  children: JSX.Element | JSX.Element[];
  footerLink?: string;
  isLoading?: boolean;
}

export const CollectionViewList = ({
  children,
  title,
  asideLabel,
  footerLink,
  isLoading
}: ICollectionViewProps) => {
  if (isLoading) {
    return <CollectionViewListSkeleton />;
  }

  return (
    <div className="p-4 rounded bg-white dark:bg-neutral-800 shadow-sm">
      <div className="divide-y-2 divide-gray-200 dark:divide-neutral-700">
        <div className="flex justify-between items-end">
          <h2 className="text-base font-medium text-gray-700 dark:text-white">{title}</h2>
          <div className="text-xs font-light text-gray-400 mr-2">{asideLabel}</div>
        </div>
      </div>
      <Divider wrapperClass="my-2" />
      <div className="flow-root w-full">
        <ul role="list">{children}</ul>
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
    </div>
  );
};

export const CollectionViewListSkeleton = () => (
  <div
    role="status"
    className="w-full p-4 bg-white dark:bg-neutral-800 space-y-4 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
  >
    <div className="flex items-center justify-between">
      <div>
        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
    <div className="flex items-center justify-between pt-4">
      <div>
        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
    <div className="flex items-center justify-between pt-4">
      <div>
        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
    <div className="flex items-center justify-between pt-4">
      <div>
        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
    <div className="flex items-center justify-between pt-4">
      <div>
        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
      <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
    </div>
    <span className="sr-only">Loading...</span>
  </div>
);

interface ICollectionViewListItemProps {
  id: string;
  imageSrc: string | undefined;
  imageAlt: string | undefined;
  title: string | JSX.Element;
  subtitle?: string | undefined;
  asideContent: string | number | JSX.Element;
  onClick?: (id: string) => void;
}

export const CollectionViewListItem = ({
  id,
  imageSrc,
  imageAlt,
  title,
  subtitle,
  asideContent,
  onClick
}: ICollectionViewListItemProps) => {
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
        className="px-2 py-2 w-full cursor-pointer hover:bg-slate-100 dark:hover:bg-neutral-900"
      >
        <div className="flex items-center space-x-3">
          <div className="min-w-0 flex-1 flex gap-2 items-center">
            {imageSrc && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="h-5 w-5 rounded-full"
                  src={imageSrc}
                  alt={imageAlt}
                  aria-hidden="true"
                  onError={onImageError}
                />
              </>
            )}
            <div className="text-sm text-gray-600 dark:text-slate-50 text-left truncate ...">
              <div>
                {title}
                {subtitle && (
                  <div className="text-xs font-light text-gray-400">{subtitle}</div>
                )}
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 text-sm font-semibold text-gray-600 dark:text-white pl-2">
            {asideContent}
          </div>
        </div>
      </button>
    </li>
  );
};
