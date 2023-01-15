import { FiUsers } from 'react-icons/fi';
import { IoIosPhotos } from 'react-icons/io';
import Image from "next/image";
import { useCallback, useState } from 'react';
import { TabMenuButtons, TabMenuButtonsItem } from '../tab-menu-buttons/tab-menu-buttons';
import { LeaderboardUsers } from './leaderboard-users';
import { LeaderboardCollections } from './leaderboard-collections';

const DEFAULT_TAB = "Users";
const LEADERBOARD_TITLE_ID = "leaderboard-title-panel";

export const Leaderboard = () => {
  const [tab, setTab] = useState<"Users" | "Collections">(DEFAULT_TAB);
  const onTabSelect = useCallback((value: string) => setTab(value as "Users" | "Collections"), [])

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <div className="flex items-center gap-2">
            <Image
              className="h-8 w-auto"
              width="163"
              height="50"
              src="/twittens_symbol.png"
              alt="Twittens"
            />
            <h1 className="text-3xl font-semibold text-gray-900 dark:text-white" id={LEADERBOARD_TITLE_ID}>Leaderboard</h1>
          </div>
          <p className="mt-2 text-sm text-gray-700 dark:text-neutral-300">
            The most followed Twitter accounts in our supported NFT collections.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 xs:w-full sm:flex-none">
          <TabMenuButtons onTabSelect={onTabSelect} ariaLabelledBy={LEADERBOARD_TITLE_ID} defaultSelectedValue={tab} >
            <TabMenuButtonsItem 
              ariaControl="leaderboard-users-panel"
              id="leaderboard-users-tab"
              value="Users"
              icon={
                <FiUsers className={
                  tab === "Users" ? "text-indigo-700 dark:text-indigo-400" : "text-neutral-500 dark:text-neutral-400"
                } />
              } 
            />
            <TabMenuButtonsItem
              ariaControl="leaderboard-collection-panel"
              id="leaderboard-collections-tab"
              value="Collections"
              icon={
                <IoIosPhotos className={
                  tab === "Collections" ? "text-indigo-700 dark:text-indigo-400" : "text-neutral-500 dark:text-neutral-400"} 
                />
              }
            />
          </TabMenuButtons>
        </div>
      </div>
      <div className="mt-8">
        {tab === "Users" ? 
          <div id="leaderboard-users-panel" role="tabpanel" tabIndex={0} aria-labelledby="leaderboard-users-tab">
            <LeaderboardUsers />
          </div> 
          : 
          <div id="leaderboard-collection-panel" role="tabpanel" tabIndex={0} aria-labelledby="leaderboard-collections-tab">
            <LeaderboardCollections />
          </div>
        }
      </div>
    </div>
  )
}
