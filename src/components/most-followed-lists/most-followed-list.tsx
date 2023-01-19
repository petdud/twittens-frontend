import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

interface IMostFollowedListProps {
  title: string | JSX.Element;
  children: JSX.Element | JSX.Element[];
  footerLink: string;
}

export const MostFollowedList = ({children, title, footerLink}: IMostFollowedListProps) => {
  return (
    <div className="py-4 px-6 mt-2 rounded-lg bg-white dark:bg-neutral-800 shadow-lg">
      <>
        <div className="flex justify-between items-end">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">
            {title}
          </h2>
          <div className="text-xs font-light text-gray-400 mr-2">
            Followers
          </div>
        </div>
        <div className="mt-6 flow-root">
          <ul role="list" className="-my-4 divide-y divide-gray-300 dark:divide-gray-600">
            {children}
          </ul>
        </div>
        {footerLink && 
          <div className="mt-6 text-center">
            <Link
              href={footerLink}
              className="text-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-white hover:underline"
            >
              View more
            </Link>
          </div>
        }
      </>
    </div>
  )
}

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
  const router = useRouter();

  const handleClick = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.(id);
  }, [id, onClick]);

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
            {imageSrc &&
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="h-6 w-6 rounded-full" src={imageSrc} alt={imageAlt} aria-hidden="true" />
              </>
            }
            <div className="text-sm font-semibold text-gray-600 dark:text-slate-50 text-left">
              <div>
                {title}
                {subtitle && 
                  <div className="text-xs font-light text-gray-400">
                    {subtitle}
                  </div>
                }
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 text-sm font-semibold text-gray-600 dark:text-white">
            {followers}
          </div>
        </div>
      </button>
    </li>
  )
}
