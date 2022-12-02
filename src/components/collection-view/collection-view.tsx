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
  const { data: collection, isLoading, error } = useCollection(slug);

  if (error) {
    return (
      <div className="py-6">
        <MainViewHeader title={<div>Sorry, something went wrong 🫣.</div>} />
      </div>
    )
  }

  if (!collection && !isLoading) {
    return (
      <div className="py-6">
        <MainViewHeader title={<div>Sorry, we didn&apos;t find a collection called {slug} 🫣.</div>} />
      </div>
    )
  }

  return (
    <>
      {isLoading ? 
          <CollectionHeaderSkeleton /> 
        :
          <CollectionHeader 
            name={<>{collection?.name} <span className="font-normal">on</span> <span className="text-blue-400">Twitter</span>!</>} 
            image={`/collections/${collection?.image}`}
            imageAlt={collection?.name || ""} 
            // description={<>Items: {collection?.supply} | Owners: {collection?.owners} ({Math.round((collection.owners / collection.supply) * 100)}%) | Owners with ENS: {usersWithNamesCount} ({Math.round((usersWithNamesCount / collection.owners) * 100)}%) | ENS with Twitter: {usersWithTwitterCount} ({Math.round((usersWithTwitterCount / usersWithNamesCount) * 100)}%)</>}
            description={<>Items: {collection?.supply} | Owners: {collection?.owners}</>}
            social={<SocialLinks twitter={collection?.twitter} discord={collection?.discord} />}
          />
      }
      {isLoading ? <TwitterListSkeleton /> : <TwitterList collection={collection} />}
    </>
  )
}

interface ISocialLinks {
  discord?: string;
  twitter?: string;
}

const SocialLinks = ({discord, twitter}: ISocialLinks) => (
  <div className="flex mt-1">
    {twitter && <Link href={`https://www.twitter.com/${twitter}`} target="_blank" className="p-2 hover:bg-gray-200 rounded-md">
      <BsTwitter className="text-sky-500" />
    </Link> 
    }
    {discord && <Link href={discord} target="_blank" className="p-2 hover:bg-gray-200 rounded-md">
      <FaDiscord className="text-indigo-800"/>
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
            <button onClick={onNavigationClick} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600 cursor-pointer hover:underline">
              <div className="flex items-center gap-1 p-1">
                <MdOutlineArrowBackIosNew /> {canGoBack ? "Back" : "All collections"}
              </div>
            </button>
          </li>
        </ol>
      </nav>
      <div className="flex-grow border-t border-gray-200 mb-4"></div>
    </>
  )
}
