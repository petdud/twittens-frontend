import React from "react";
import { AiFillLock } from "react-icons/ai";
import { GoVerified } from "react-icons/go";
import { IUser } from "../../core/collection.interface";
import { FEATURE_FLAGS } from "../../core/feature-flags";
import { useActiveUsersFromCommunity } from "../../hooks/use-active-users-from-community";
import { useCollections } from "../../hooks/use-collections";
import { useRecentUsersFromCommunity } from "../../hooks/use-recent-users-from-community";
import { classNames } from "../../utils";
import { MainViewHeader } from "../main-view-header/main-view-header";
import { UserList } from "../user-list/user-list";
import { UserPreviewModal } from "../user-preview-modal/user-preview-modal";
import { CollectionViewList, CollectionViewListItem, CollectionViewListSkeleton } from "./collection-view-list";
import { formatDistance } from 'date-fns'

export const CollectionViewContent = ({slug}: {slug: string}) => {
  const { data, isLoading, error } = useActiveUsersFromCommunity(slug);
  const { data: collections } = useCollections({select: "slug,name,image.thumbnailUrl"});
  const [selectedUser, setSelectedUser] = React.useState<IUser | undefined>(undefined);
  const [openProfile, setOpenProfile] = React.useState(false);

  const onUserClick = React.useCallback((address: string) => {
    const user = data?.users.find(user => user.address === address);
    if (user) {
      setSelectedUser(user);
      setOpenProfile(true);
    }
  }, [data]);

  const onClose = React.useCallback(() => {
    setOpenProfile(false);
  }, []);

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

  const users = data?.users || [];

  return (
    <div className="flex pt-8">
      <div className={classNames(
        "w-full",
        FEATURE_FLAGS.ENABLE_SIDEBAR ? "lg:w-8/12" : ""
    )}>
        <UserList 
          onUserClick={onUserClick}
          collections={collections}
          users={users}
          slug={slug}
          isLoading={isLoading}
        />
      </div>

      {FEATURE_FLAGS.ENABLE_SIDEBAR && 
        <div className="hidden lg:block w-4/12 ">
          <div className="flex gap-8 flex-col pl-4 ml-4 xl:pl-6 xl:ml-6 border-left-2 border-l border-gray-200 dark:border-neutral-700">
            <MostFollowedInCollection users={users} isLoading={isLoading} error={false} slug={slug} onUserClick={onUserClick} />
            {!isLoading && <MostActiveList users={users} error={false} slug={slug} onUserClick={onUserClick} />}
            {!isLoading && <RecentUserList slug={slug} onUserClick={onUserClick} />}
          </div>
        </div>
      }
      {selectedUser && <UserPreviewModal open={openProfile} onClose={onClose} user={selectedUser} collections={collections} />}
    </div>
  )
}

interface IMostFollowedInCollectionProps {
  users: IUser[]; 
  onUserClick: (address: string) => void;
  slug: string;
  error?: boolean;
  isLoading?: boolean;
}

export const MostFollowedInCollection = ({users, isLoading, error, onUserClick, slug}: IMostFollowedInCollectionProps) => {
  if (isLoading) {
    return <CollectionViewListSkeleton />
  } 

  if (!users || error) {
    return null;
  }
  
  users.sort((b, a) => (a?.twitter?.followers || 0) - (b?.twitter?.followers || 0));

  const maxUsers = users.length < 5 ? users.length : 5;

  return (
    <CollectionViewList
      title={
        <div className="flex items-center gap-3">
          Most followers
        </div>
      }
      asideLabel="Followers"
    >
      <>
        {users.slice(0, maxUsers).map(({address, twitter}) => (
          <CollectionViewListItem
            key={address}
            id={address}
            imageSrc={twitter?.avatar}
            imageAlt={twitter?.username}
            onClick={onUserClick}
            title={
              <div className="flex items-center">
                {twitter?.name}
                {twitter?.verified && <span className="inline-block flex-shrink-0 text-sky-400 pl-1.5">
                  <GoVerified aria-label="Twitter verified" />
                </span>}
                {twitter?.protected && <span className="inline-block flex-shrink-0 text-yellow-600 pl-1.5">
                  <AiFillLock aria-label="Twitter private account" />
                </span>}
              </div>
            }
            asideContent={twitter?.followers.toLocaleString() || ""}
          />
        ))}
      </>
    </CollectionViewList>
  )
};

interface IMostActiveListProps {
  users: IUser[]; 
  onUserClick: (address: string) => void;
  slug: string;
  error?: boolean;
  isLoading?: boolean;
}

export const MostActiveList = ({users, isLoading, error, onUserClick, slug}: IMostActiveListProps) => {
  if (isLoading) {
    return <CollectionViewListSkeleton />
  } 

  if (!users || error) {
    return null;
  }

  users.sort((b, a) => (a?.twitter?.tweetCount || 0) - (b?.twitter?.tweetCount || 0));

  const maxUsers = users.length < 5 ? users.length : 5;

  return (
    <CollectionViewList
      title={
        <div className="flex items-center gap-3">
          Most active
        </div>
      }
      asideLabel="# tweets"
    >
      {users.slice(0, maxUsers).map(({address, twitter}) => (
        <CollectionViewListItem
          key={address}
          id={address}
          imageSrc={twitter?.avatar}
          imageAlt={twitter?.username}
          onClick={onUserClick} 
          title={
            <div className="flex items-center">
              {twitter?.name}
              {twitter?.verified && <span className="inline-block flex-shrink-0 text-sky-400 pl-1.5">
                <GoVerified aria-label="Twitter verified" />
              </span>}
              {twitter?.protected && <span className="inline-block flex-shrink-0 text-yellow-600 pl-1.5">
                <AiFillLock aria-label="Twitter private account" />
              </span>}
            </div>
          }      
          asideContent={twitter?.tweetCount.toLocaleString() || ""}
        />   
      ))}
    </CollectionViewList>
  )
};


interface IRecentUserListProps {
  onUserClick: (address: string) => void;
  slug: string;
}

export const RecentUserList = ({onUserClick, slug}: IRecentUserListProps) => {
  const { data, isLoading, error } = useRecentUsersFromCommunity(slug);

  if (isLoading) {
    return <CollectionViewListSkeleton />
  } 

  if (!data || error) {
    return null;
  }

  const { users } = data;

  const maxUsers = users.length < 5 ? users.length : 5;

  return (
    <CollectionViewList
      title={
        <div className="flex items-center gap-3 h-full">
          Recently joined
        </div>
      }
      asideLabel="Joined at"
    >
      {users.length === 0 
      ? <div className="text-gray-500 text-sm">No recent users</div>
      :
      users.slice(0, maxUsers).map(({address, twitter, joinedAt}) => {
        const time = formatDistance(
          new Date(joinedAt), new Date(), { addSuffix: true }
        ).replace("about ", "",).replace("hours", "hrs");

        return (
          <CollectionViewListItem
            key={address}
            id={address}
            imageSrc={twitter?.avatar}
            imageAlt={twitter?.username}
            onClick={onUserClick}
            title={
              <div className="flex items-center">
                {twitter?.name}
                {twitter?.verified && <span className="inline-block flex-shrink-0 text-sky-400 pl-1.5">
                  <GoVerified aria-label="Twitter verified" />
                </span>}
                {twitter?.protected && <span className="inline-block flex-shrink-0 text-yellow-600 pl-1.5">
                  <AiFillLock aria-label="Twitter private account" />
                </span>}
              </div>
            }
            asideContent={<div className="text-xs font-light">{time}</div>}
          />
        )
      })}
    </CollectionViewList>
  )
};
