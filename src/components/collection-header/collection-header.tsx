import React from "react";
import { useCollection } from "../../hooks/use-collection";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useHistory } from "../../core/history-manager-provider";
import { useRouter } from "next/router";
import { MainViewHeader } from "../main-view-header/main-view-header";
import { CollectionHeaderFooterLinks } from "./collection-header-footer-links";
import { Divider } from "../divider/divider";

interface ICollectionHeader {
  slug: string;
}

const SELECT_FROM_COLLECTION = "address,discordUrl,externalUrl,image,name,numberOfOwners,ownersWithTwitterCount,totalSupply,twitterUsername";

export const CollectionHeader = ({ slug }: ICollectionHeader) => {
  const { data, isLoading, error } = useCollection(slug, {
    select: SELECT_FROM_COLLECTION
  });
  
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
        <BreadCrumbNavigation />
        <CollectionHeaderSkeleton /> 
      </>
    )
  }

  const { 
    collection: {
      address,
      discordUrl,
      externalUrl,
      image,
      name,
      numberOfOwners,
      ownersWithTwitterCount,
      totalSupply,
      twitterUsername
    } 
  } = data;

  return (
    <>
      <BreadCrumbNavigation />
      <div className="md:flex md:items-center md:justify-between md:space-x-5">
        <div className="flex items-start space-x-5">
          <CollectionImage imageUrl={image.url} altName={name} />
          <div className="pt-1 flex justify-between items-between flex-col grow">
            <CollectionTitle name={name} owners={numberOfOwners} supply={totalSupply} twitterAccountsCount={ownersWithTwitterCount} />
            <CollectionHeaderFooterLinks 
              address={address}
              slug={slug}
              twitter={twitterUsername}
              discord={discordUrl}
              externalUrl={externalUrl} 
            />
          </div>
        </div>
      </div>
    </>
  )
}

const CollectionHeaderSkeleton = () => (
  <div role="status" className="w-full animate-pulse dark:border-gray-700">  
    <div className="flex items-center space-x-3">
      <div className="flex ml-4 justify-center items-center w-28 h-28 bg-gray-300 rounded dark:bg-gray-700">
        <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/></svg>
      </div>

      <div>
        <div className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>
    </div>
    <span className="sr-only">Loading...</span>
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

interface ICollectionTitleProps {
  name: string;
  owners?: number;
  supply?: number;
  twitterAccountsCount?: number;
}

const CollectionTitle = ({name, owners, supply, twitterAccountsCount}: ICollectionTitleProps) => (
  <>
    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-neutral-200">
      <>{name} <span className="font-normal">on</span> <span className="text-blue-400">Twitter</span>!</>
    </h1>
    <div className="text-sm font-medium text-gray-500 dark:text-neutral-400 pt-1">
      <div className="flex gap-3">
        {supply && <div>Items: <span className="dark:text-slate-200 text-neutral-700 font-semibold">{supply}</span></div>}
        {owners && <div>Owners: <span className="dark:text-slate-200 text-neutral-700 font-semibold">{owners}</span></div>}
        {twitterAccountsCount && <div>Twitter members: <span className="dark:text-slate-200 text-neutral-700 font-semibold">{twitterAccountsCount}</span></div>}
      </div>
    </div>
  </>
)

const CollectionImage = ({imageUrl, altName}: {imageUrl: string, altName: string}) => (
  <div className="flex-shrink-0">
    <div className="relative">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="rounded-full"
        src={imageUrl}
        width={96}
        height={96}
        alt={altName}
        aria-hidden="true"
      />
    </div>
  </div>
)
