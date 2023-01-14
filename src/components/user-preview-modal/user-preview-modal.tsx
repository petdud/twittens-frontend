import React, { Fragment } from 'react';
import Link from 'next/link';
import { Dialog, Transition } from '@headlessui/react'
import { ICollection, IUser } from '../../core/collection.interface';
import { shortenedAddress } from '../../utils';
import { AiFillLock, AiOutlineClose } from 'react-icons/ai';
import { CopyButton } from '../copy-button/copy-button';
import { BsTwitter } from "react-icons/bs";
import { WalletDropdownOptions } from '../wallet-dropdown-options/wallet-dropdown-options';
import { FaWallet } from 'react-icons/fa';
import { GoVerified } from 'react-icons/go';
import { AvatarGroup, IAvatarGroupItemProps } from '../avatar-group/avatar-group';

interface IUserPreviewModalProps {
  open: boolean;
  onClose: () => void;
  user: IUser;
  collections: ICollection[];
}

export const UserPreviewModal = ({open, onClose, user, collections}: IUserPreviewModalProps) => {
  const {address, name, twitter, activeCommunities} = user;

  const communities = React.useMemo(() => {
    let communities: IAvatarGroupItemProps[] = [];
    
    for (const activeCommunity of activeCommunities) {
      if (activeCommunity.status !== "active") continue; // skip inactive communities
      const community = collections.find((collection) => collection.slug === activeCommunity.slug);
      if (community) {
        communities.push({ name: community.name, imageUrl: community.image.thumbnailUrl, link: `/collections/${community.slug}` });
      }
    }
    return communities;
  }, [activeCommunities, collections]);


  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 dark:bg-black dark:bg-opacity-75 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform rounded-lg bg-white dark:bg-neutral-800 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-lg sm:p-6 sm:pt-4">
                <CloseButton onClose={onClose} />
                <div className="px-1 divide-y divide-gray-200 dark:divide-gray-700 mr-4">
                  <div className="flex items-center gap-3 justify-between divide-y-2 divide-gray-200 dark:divide-neutral-700">
                    <div className="flex items-center gap-2 dark:text-gray-200 mb-2">
                      <FaWallet className="text-gray-400 dark:text-neutral-300" /> {name} 
                      <span className="flex items-end text-xs text-gray-500 dark:text-neutral-400">({shortenedAddress(address)}) <CopyButton value={address} /></span>
                    </div>
                  </div>
                  <div className="py-3">
                    <div className="relative flex items-start">
                      {twitter?.avatar && 
                        <div className="flex-shrink-0 flex">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img className="h-12 w-12 md:h-16 md:w-16 rounded-full mr-4 mt-1" src={twitter?.avatar} alt={twitter.username} aria-hidden="true" />
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
                          <p className="text-xs text-gray-500 dark:text-gray-400">@{twitter?.username}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{twitter?.description}</p>
                        </div>
                        {communities &&  communities.length > 0 && (
                          <div className="mb-2 mt-1 overflow-hidden">
                            <span className="text-gray-500 dark:text-gray-400 text-sm font-normal pb-1">Communities:</span>
                            <AvatarGroup items={communities} size={10} scroll={true} />
                          </div>
                        )}
                        <div className="flex gap-4 text-sm items-center">
                          <div className="flex dark:text-white flex-row gap-1"><span className="font-semibold">{twitter?.following.toLocaleString()}</span> <span className="text-gray-500 dark:text-gray-400 text-sm font-normal">Following</span></div>
                          <div className="flex dark:text-white flex-row gap-1"><span className="font-semibold">{twitter?.followers.toLocaleString()}</span> <span className="text-gray-500 dark:text-gray-400 text-sm font-normal">Followers</span></div>
                        </div>
                        <FooterButtons address={address} twitterUsername={twitter?.username} />
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

const CloseButton = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="absolute top-0 right-0 text-lg p-2">
      <button onClick={onClose} className="p-2 text-gray-800 dark:text-gray-300 hover:dark:text-white hover:bg-neutral-100 hover:dark:bg-neutral-700 rounded-md">
        <AiOutlineClose />
      </button>
    </div>
  )
};

const FooterButtons = ({address, twitterUsername}: {address: string, twitterUsername?: string}) => (
  <div className="mt-5 sm:mt-4 flex gap-2">
    <Link
      href={`https://www.twitter.com/${twitterUsername}`}
      target="_blank"
      style={{background: "#1DA1F2"}}
      className="inline-flex gap-2 items-center rounded-md border border-transparent px-2.5 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <BsTwitter /><span>Twitter</span>
    </Link>
    <WalletDropdownOptions name={<><FaWallet /> Wallet</>} address={address} />
  </div>
)
