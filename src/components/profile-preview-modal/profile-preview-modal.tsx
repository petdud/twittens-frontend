import { Fragment, useCallback } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { IUser } from '../../core/collection.interface';
import { getImage, shortenedAddress } from '../../utils';
import { AiOutlineClose } from 'react-icons/ai';
import { useUserNfts } from '../../hooks/use-user-nfts';
import { INft } from '../../core/nft.interface';
import { CopyButton } from '../copy-button/copy-button';
import Link from 'next/link';
import { FiExternalLink } from 'react-icons/fi';
import { WalletDropdownOptions } from '../wallet-dropdown-options/wallet-dropdown-options';

interface IProfilePreviewModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  user: IUser;
}

export const ProfilePreviewModal = ({open, setOpen, user}: IProfilePreviewModalProps) => {
  const {address, name, twitter} = user;
  const onClose = useCallback(() => setOpen(false), [setOpen]);

  const { data, isLoading } = useUserNfts(address);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-neutral-900 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                {/* Close Button */}
                <div className="absolute top-0 right-0 text-lg p-2">
                  <button onClick={onClose} className="p-2 text-gray-800 dark:text-gray-300 hover:dark:text-white hover:bg-neutral-100 hover:dark:bg-neutral-700 rounded-md">
                    <AiOutlineClose />
                  </button>
                </div>
                <div className="py-2 px-1">
                  <div className="relative flex items-start">
                    {twitter?.avatar && 
                      <div className="flex">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className="h-14 w-14 md:h-20 md:w-20 rounded-full mr-4" src={twitter?.avatar} alt={twitter.username} aria-hidden="true" />
                      </div>}
                    <div className="min-w-0 flex-1 flex flex-col">
                      <div className="flex items-center">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white sm:text-2xl">{name}</h3>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        {shortenedAddress(address)}
                        <CopyButton value={address} />
                      </div>
                      {/* Badges */}
                      {data && data.totalCount && <div className="mt-2 flex items-center self-start rounded-full bg-gray-200 dark:bg-neutral-800 px-1.5 py-0.5 text-xs font-medium text-gray-800 dark:text-slate-200">
                        Total NFTs: {data.totalCount}
                      </div>}
                      {/* Buttons */}
                      <div className="mt-5 sm:mt-4 flex gap-2">
                        <WalletDropdownOptions address={address} />
                        <Link
                          href={`https://www.twitter.com/${twitter?.username}`}
                          target="_blank"
                          style={{background: "#1DA1F2"}}
                          className="inline-flex gap-2 items-center rounded-md border border-transparent px-2.5 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          <span>View Twitter</span> <FiExternalLink />
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* NFTs */}
                  <div className="mt-8">
                    <UserNfts nfts={data?.ownedNfts} isLoading={isLoading} />
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

interface IUserNfts {
  nfts?: INft[];
  isLoading: boolean;
}
const UserNfts = ({nfts, isLoading}: IUserNfts) => (
  <ul role="list" className="grid grid-cols-3 gap-x-4 gap-y-2">
    {isLoading && ["a1", "b2", "c3", "d4", "e5", "f6", "g7", "h8", "i9"].map((key) => 
      <div key={key} role="status" className="max-w-sm rounded border-gray-200 shadow animate-pulse">
        <div className="flex justify-center items-center mb-4 h-24 bg-gray-300 rounded dark:bg-gray-700">
          <svg className="w-12 h-12 text-gray-200 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/></svg>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    )}
    {!isLoading && nfts?.slice(0, 8).map((nft) => (
      <NftPreview nft={nft} key={nft.tokenId} />
    ))}
  </ul>
)

const NftPreview = ({nft}: {nft: INft}) => {
 const image = getImage(nft);
 const { title } = nft;

 if (!image) {
  return null
 }
 
 return (
  <li className="relative">
    <div className="block w-full overflow-hidden bg-gray-100 rounded-lg group aspect-w-10 aspect-h-7 auto-rows-min focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500">
      
      {image && image?.endsWith(".mp4") ?
        <video width="320" height="240" controls>
          <source src={image} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        :
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image}
          alt={title}
          loading="lazy" 
          width="100%"
          height="100%"
          style={{ maxHeight: "264px" }}
          className="object-cover pointer-events-none group-hover:opacity-75 bg-neutral-200 dark:bg-neutral-800"
        />
      }
      <button type="button" className="absolute inset-0 focus:outline-none" tabIndex={0}>
        <span className="sr-only">View details for {title}</span>
      </button>
    </div>
  </li>
 )
}
