import Link from 'next/link';
import { AiFillLock } from 'react-icons/ai';
import { FaWallet } from 'react-icons/fa';
import { GoVerified } from 'react-icons/go';
import { ITwitter } from '../../core/collection.interface';
import { shortenedAddress } from "../../utils";
import { AvatarsWithPlaceholder } from "../avatars-with-placeholder/avatars-with-placeholder";

interface ITwitterItem {
  address: string;
  name?: string;
  twitter: ITwitter;
}

// const userCollections = collections.filter(col => col.slug !== displayedCollectionSlug);
export const TwitterItem = ({address, name, twitter }: ITwitterItem) => (
  <li className="overflow-hidden bg-white shadow sm:rounded-md dark:bg-neutral-800">
    <Link href={`https://opensea.io/${address}`} target="_blank">
      <div className="px-4 py-1 bg-slate-50 hover:bg-slate-100 dark:bg-neutral-700 hover:dark:bg-gray-800 border-b-2 border-slate-100 dark:border-neutral-600 flex items-center gap-3 justify-between">
        <div className="flex items-center gap-2 dark:text-gray-200">
          <FaWallet className="text-gray-400 dark:text-neutral-300" /> {name} 
          <span className="text-xs text-gray-500 dark:text-neutral-300">({shortenedAddress(address)})</span>
        </div>
      </div>
    </Link>
    <div className="px-4 py-4 sm:px-6 focus-within:ring-indigo-500 hover:bg-gray-50 dark:hover:bg-gray-800 focus-within:ring-inset">
        <a
          href={`https://www.twitter.com/${twitter.username}`}
          target="_blank"
          rel="noopener noreferrer"
        >
        <div className="relative flex items-start">
          {twitter?.avatar && 
            <div className="flex-shrink-0 flex">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="h-12 w-12 md:h-16 md:w-16 rounded-full mr-4" src={twitter?.avatar} alt={twitter.username} aria-hidden="true" />
            </div>}
          <div className="min-w-0 flex-1 flex gap-2 flex-col">
            <div>

              <div className="flex items-center">
                <h3 className="text-base font-medium text-gray-900 dark:text-white">{twitter?.name}</h3>
                {twitter?.verified && <span className="inline-block flex-shrink-0 text-sky-400 pl-1.5">
                  <GoVerified aria-label="Twitter verified" />
                </span>}
                {twitter?.protected && <span className="inline-block flex-shrink-0 text-yellow-600 pl-1.5">
                  <AiFillLock aria-label="Twitter private account" />
                </span>}
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400">@{twitter?.username}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{twitter?.description}</p>
            </div>
            <div className="flex gap-4 text-sm items-center">
              <div className="flex flex-col-reverse dark:text-white md:flex-row md:gap-1"><span className="font-semibold">{twitter?.following.toLocaleString()}</span> <span className="text-gray-500 dark:text-gray-400 text-sm font-normal">Following</span></div>
              <div className="flex flex-col-reverse dark:text-white md:flex-row md:gap-1"><span className="font-semibold">{twitter?.followers.toLocaleString()}</span> <span className="text-gray-500 dark:text-gray-400 text-sm font-normal">Followers</span></div>
              {/* {userCollections.length > 0 && <div className="flex items-center flex-col-reverse md:flex-row gap-1">
                <AvatarsWithPlaceholder collections={userCollections}/> <span className="text-gray-500 dark:text-gray-400 text-sm font-normal">Communities</span>
              </div>} */}
            </div>
          </div>
      </div>
        </a>
    </div>
  </li>
)
