import Link from "next/link"
import { useCollection } from "../../hooks/use-collection";
import { CollectionHeader } from "../collection-header/collection-header";
import { MainViewHeader } from "../main-view-header/main-view-header";
import { AiFillLock } from 'react-icons/ai';
import { FaWallet } from 'react-icons/fa';
import { GoVerified } from 'react-icons/go';
import { shortenedAddress } from "../../utils";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { useHistory } from "../../core/history-manager-provider";
import { useRouter } from "next/router";
import React from "react";
import { AvatarsWithPlaceholder } from "../avatars-with-placeholder/avatars-with-placeholder";

interface ICollectionView {
  slug: string;
}

export const CollectionView = ({slug}: ICollectionView) =>  {
  const { data: collection, isLoading } = useCollection(slug);

  const router = useRouter();
  const historyManager = useHistory();
  const canGoBack = historyManager.canGoBack();
  
  const onNavigationClick = React.useCallback(() => (
    canGoBack ? router.back() : router.push('/')
  ), [canGoBack, router]);

  


  if (!collection && !isLoading) {
    return (
      <div className="py-6">
        <MainViewHeader title={<div>Sorry, we didn&apos;t find a collection called {slug}.</div>} />
      </div>
    )
  }

  const usersWithNamesCount = collection?.users?.filter(user => user.name).length || 0;
  const usersWithTwitterCount = collection?.users?.filter(user => user.twitter).length || 0;

  return (
    <div className="py-6 max-w-4xl">
      <div className="max-w-full px-4 sm:px-6 md:px-8 mx-5">

        <nav aria-label="Breadcrumb" className="max-w-7xl mb-2">
          <ol role="list" className="flex items-center space-x-4">
            <li className="text-sm">
              <a onClick={onNavigationClick}  aria-current="page" className="font-medium text-gray-500 hover:text-gray-600 cursor-pointer hover:underline">
                <div className="flex items-center gap-1">
                  <MdOutlineArrowBackIosNew /> {canGoBack ? "Back" : "All collections"}
                </div>
              </a>
            </li>
          </ol>
        </nav>
        <div className="flex-grow border-t border-gray-200 mb-4"></div>

        {collection?.name && collection?.image && 
          <CollectionHeader 
            name={<>{collection?.name} <span className="font-normal">on</span> <span className="text-blue-400">Twitter</span>!</>} 
            image={`/collections/${collection?.image}`}
            imageAlt={collection.name} 
            description={<>Items: {collection?.supply} | Owners: {collection?.owners} ({Math.round((collection.owners / collection.supply) * 100)}%) | Owners with ENS: {usersWithNamesCount} ({Math.round((usersWithNamesCount / collection.owners) * 100)}%) | ENS with Twitter: {usersWithTwitterCount} ({Math.round((usersWithTwitterCount / usersWithNamesCount) * 100)}%)</>}
            social={<>dasdd</>}
          />
        }

        <ul role="list" className="space-y-3 pt-8">


        {collection && collection.users?.map(({address, collections, name, twitter}) => {
          const userCollections = collections.filter(col => col.slug !== collection?.slug);
          return (
            twitter?.name && (<li
              key={address}
              className="overflow-hidden bg-white shadow sm:rounded-md"
            >
              <div className="px-4 py-1 bg-slate-50 border-b-2 border-slate-100 flex items-center gap-3 justify-between">
                <div className="flex items-center gap-2">
                  <FaWallet className="text-gray-400" /> {name} <span className="text-xs text-gray-500">({shortenedAddress(address)})</span>
                </div>
              </div>
              <div className="px-4 py-4 sm:px-6 focus-within:ring-indigo-500 hover:bg-gray-50 focus-within:ring-inset">
                  <a
                    href={`https://www.twitter.com/${twitter.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                  <div className="relative flex items-start">
                    <div className="flex-shrink-0 flex">
                      <img className="h-16 w-16 rounded-full mr-4" src={twitter?.avatar} alt="" />
                    </div>
                    <div className="min-w-0 flex-1 flex gap-2 flex-col">
                      <div>

                        <div className="flex items-center">
                          <h3 className="text-base font-medium text-gray-900">{twitter?.name}</h3>
                          {twitter?.verified && <span className="inline-block flex-shrink-0 text-sky-400 pl-1.5">
                            <GoVerified aria-label="Twitter verified" />
                          </span>}
                          {twitter?.protected && <span className="inline-block flex-shrink-0 text-yellow-600 pl-1.5">
                            <AiFillLock aria-label="Twitter private account" />
                          </span>}
                        </div>

                        <p className="text-sm text-gray-500">@{twitter?.username}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-700 text-gray-600">{twitter?.description}</p>
                      </div>
                      <div className="flex gap-4 text-sm items-center">
                        <div><span className="font-semibold">{twitter?.following.toLocaleString()}</span> <span className="text-gray-500 text-sm font-normal">Following</span></div>
                        <div><span className="font-semibold">{twitter?.followers.toLocaleString()}</span> <span className="text-gray-500 text-sm font-normal">Followers</span></div>
                        {userCollections.length > 0 && <div className="flex items-center gap-1">
                          <AvatarsWithPlaceholder collections={userCollections}/> <span className="text-gray-500 text-sm font-normal">Communities</span>
                        </div>}
                      </div>
                    </div>
                </div>
                  </a>
              </div>
            </li>
            )
          )
        })}
        </ul>

      </div>
    </div>
  )
}
