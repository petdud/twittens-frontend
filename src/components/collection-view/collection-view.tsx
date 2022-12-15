import Link from "next/link"
import { useCollection } from "../../hooks/use-collection";
import { CollectionHeader, CollectionHeaderSkeleton } from "../collection-header/collection-header";
import { MainViewHeader } from "../main-view-header/main-view-header";
import { FaDiscord } from 'react-icons/fa';
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useHistory } from "../../core/history-manager-provider";
import { useRouter } from "next/router";
import React from "react";
import { BsTwitter } from "react-icons/bs";
import { TwitterList, TwitterListSkeleton } from "../twitter-list/twitter-list";
import { Divider } from "../../layouts/main-slot";

interface ICollectionView {
  slug: string;
}

export const CollectionView = ({slug}: ICollectionView) =>  {
  return (
    <div className="md:py-6 py-2 max-w-5xl m-auto">
      <div className="max-w-full px-4 sm:px-6 md:px-8 mx-5">
        <BreadCrumbNavigation />
        <Collection slug={slug}/>
      </div>
    </div>
  )
}

const Collection = ({slug}: {slug: string}) => {
  const { data, isLoading, error } = useCollection(slug);

  if (error) {
    return (
      <div className="py-6">
        <MainViewHeader title={<div>Sorry, something went wrong 🫣.</div>} />
      </div>
    )
  }

  if (!data && !isLoading) {
    return (
      <div className="py-6">
        <MainViewHeader title={<div>Sorry, we didn&apos;t find a collection called {slug} 🫣.</div>} />
      </div>
    )
  }

  if (isLoading || !data) {
    return (
      <>
        <CollectionHeaderSkeleton /> 
        <TwitterListSkeleton />
      </>
    )
  }

  const { collection, users } = data;
  const twitterAccountsCount = users.filter(user => user.twitter).length;

  return (
    <>
      <CollectionHeader 
        name={<>{collection?.name} <span className="font-normal">on</span> <span className="text-blue-400">Twitter</span>!</>} 
        imageUrl={collection?.imageUrl}
        imageAlt={collection?.name || ""} 
        description={<CollectionDescription owners={collection.numberOfOwners} supply={collection.totalSupply} twitterAccountsCount={twitterAccountsCount} />}
        social={<SocialLinks twitter={collection?.twitterUsername} discord={collection?.discordUrl} />}
      />
      <TwitterList users={users} />
    </>
  )
}

interface ICollectionDescription {
  owners?: number,
  supply?: number,
  twitterAccountsCount: number
}

const CollectionDescription = ({owners, supply, twitterAccountsCount}: ICollectionDescription) => (
  <div className="flex gap-3">
    {supply && <div>Items: <span className="dark:text-slate-200 text-neutral-700 font-semibold">{supply}</span></div>}
    {owners && <div>Owners: <span className="dark:text-slate-200 text-neutral-700 font-semibold">{owners}</span></div>}
    <div>Twitter members: <span className="dark:text-slate-200 text-neutral-700 font-semibold">{twitterAccountsCount}</span></div>
  </div>
)

interface ISocialLinks {
  discord?: string | null;
  twitter?: string | null;
}

const SocialLinks = ({discord, twitter}: ISocialLinks) => (
  <div className="flex mt-1">
    {twitter && <Link href={`https://www.twitter.com/${twitter}`} target="_blank" className="p-2 hover:bg-gray-200 rounded-md dark:hover:bg-gray-700">
      <BsTwitter className="text-sky-500 dark:text-sky-300" />
    </Link> 
    }
    {discord && <Link href={discord} target="_blank" className="p-2 hover:bg-gray-200 rounded-md dark:hover:bg-gray-700">
      <FaDiscord className="text-indigo-800 dark:text-indigo-500"/>
    </Link> 
  }
  </div>
)

const BreadCrumbNavigation = () => {
  const router = useRouter();
  const historyManager = useHistory();
  const canGoBack = historyManager.canGoBack();
  
  const onNavigationClick = React.useCallback(() => (
    canGoBack ? router.back() : router.push('/')
  ), [canGoBack, router]);

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-2">
        <ol role="list" className="flex items-center space-x-4">
          <li className="text-sm">
            <button onClick={onNavigationClick} aria-current="page" className="font-medium text-gray-500 dark:text-neutral-300 hover:text-gray-600 dark:hover:text-white cursor-pointer hover:underline">
              <div className="flex items-center gap-1 p-1">
                <MdOutlineArrowBackIosNew /> {canGoBack ? "Back" : "All collections"}
              </div>
            </button>
          </li>
        </ol>
      </nav>
      <Divider wrapperClass="mb-4 max-w-2xl" />
    </>
  )
}
