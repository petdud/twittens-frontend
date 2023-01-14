import { useCallback } from 'react';
import { AiFillLock } from 'react-icons/ai';
import { FaWallet } from 'react-icons/fa';
import { GoVerified } from 'react-icons/go';
import { ICollection, ITwitter } from '../../core/collection.interface';
import { shortenedAddress } from "../../utils";
import { AvatarGroup, IAvatarGroupItemProps } from '../avatar-group/avatar-group';

export type CommunitySelection = Pick<ICollection, "name" | "slug" | "image"> | null;

interface IUserItem {
  address: string;
  name?: string;
  twitter: ITwitter;
  onUserClick: (address: string) => void;
  communities: IAvatarGroupItemProps[]
}

export const UserItem = ({address, name, twitter, onUserClick, communities }: IUserItem) => {
  const onClick = useCallback(() => onUserClick(address), [address, onUserClick]);

  const {
    avatar,
    description,
    followers,
    following,
    name: twitterName,
    protected: isProtected,
    username: twitterUsername,
    verified,
  } = twitter;

  return (
    <li className="overflow-hidden bg-white shadow sm:rounded-md dark:bg-neutral-800">
      <button onClick={onClick} className="block w-full text-left focus-within:ring-indigo-500 focus-within:ring-inset group cursor-pointer">
        <div className="px-4 py-1 bg-slate-50 dark:bg-neutral-700 border-b-2 border-slate-100 dark:border-neutral-600 flex items-center gap-3 justify-between">
          <div className="flex items-center gap-2 dark:text-gray-200">
            <FaWallet className="text-gray-400 dark:text-neutral-300" /> {name} 
            <span className="text-xs text-gray-500 dark:text-neutral-300">({shortenedAddress(address)})</span>
          </div>
        </div>
        <div className="px-3 py-3 sm:px-5 group-hover:bg-gray-50 dark:group-hover:bg-neutral-800">
          <div className="relative flex items-start">
            {avatar && 
              <div className="flex-shrink-0 flex">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="h-12 w-12 md:h-16 md:w-16 rounded-full mr-4 mt-1" src={avatar} alt={twitterUsername} aria-hidden="true" />
              </div>}
            <div className="min-w-0 flex-1 flex gap-2 flex-col">
              <div>

                <div className="flex items-center">
                  <h3 className="text-base font-medium text-gray-900 dark:text-white">{twitterName}</h3>
                  {verified && <span className="inline-block flex-shrink-0 text-sky-400 pl-1.5">
                    <GoVerified aria-label="Twitter verified" />
                  </span>}
                  {isProtected && <span className="inline-block flex-shrink-0 text-yellow-600 pl-1.5">
                    <AiFillLock aria-label="Twitter private account" />
                  </span>}
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400">@{twitterUsername}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{description}</p>
              </div>
              <div className="flex gap-4 text-sm items-center">
                <div className="flex dark:text-white flex-col-reverse md:flex-row md:gap-1"><span className="font-semibold">{following.toLocaleString()}</span> <span className="text-gray-500 dark:text-gray-400 text-sm font-normal">Following</span></div>
                <div className="flex dark:text-white flex-col-reverse md:flex-row md:gap-1"><span className="font-semibold">{followers.toLocaleString()}</span> <span className="text-gray-500 dark:text-gray-400 text-sm font-normal">Followers</span></div>
                {communities && communities.length > 0 && <div className="flex items-center flex-col-reverse md:flex-row md:gap-1">
                  <AvatarGroup items={communities} maxItems={4} size={5} closer={true} placeholderInherited={true} /> <span className="text-gray-500 dark:text-gray-400 text-sm font-normal">Communities</span>
                </div>}
              </div>
            </div>
          </div>
        </div>
      </button>
    </li>
  )
}
