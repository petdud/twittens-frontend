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
import { UserListHeader } from "../user-list/user-list-header";
import { DEFAULT_SORTING_TYPE } from "../user-list/user-list-sorting-helpers";
import { ICommonCollections, getCommonCollections } from "./collection-view-helpers";
import { useTopHoldersFromCollection } from "../../hooks/use-top-holders-from-collection";

const ENABLE_COMMON_COLLECTION_FOR_MIN_USERS = 1;
export const USER_PROFILE_URL_PARAM = "profile";

export const CollectionViewContent = ({slug}: {slug: string}) => {
  const { data, isLoading, error } = useActiveUsersFromCommunity(slug);
  const { data: collections } = useCollections({select: "slug,name,image.thumbnailUrl"});
  const [selectedUser, setSelectedUser] = React.useState<IUser | undefined>(undefined);
  const [openProfile, setOpenProfile] = React.useState(false);
  const [sortedUsers, setSortedUsers] = React.useState<IUser[] | undefined>(undefined);

  const dataUsers = React.useMemo(() => {
    if (data && !isLoading) {
      
      return DEFAULT_SORTING_TYPE.callback({users: data.users});
    }
    return []
  }, [data, isLoading]);

  React.useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const profileName = urlParams.get(USER_PROFILE_URL_PARAM);

    const user = dataUsers.find(user => user.address === profileName?.toLowerCase() || user.name === profileName?.toLowerCase());
    user && setSelectedUser(user);
    setOpenProfile(Boolean(profileName));
  }, [dataUsers]);

  const sortUsers = React.useCallback(
    (sortingType: any) => {
      setSortedUsers(sortingType?.callback({
        users: [...dataUsers],
      }));
  }, [dataUsers]);

  const onUserClick = React.useCallback((address: string) => {
    const user = dataUsers.find(user => user.address === address);
    if (user) {
      const urlParams = new URLSearchParams(location.search);
      urlParams.set(USER_PROFILE_URL_PARAM, user.name || user.address);
      const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
      window.history.pushState({ path: newUrl }, '', newUrl);

      setSelectedUser(user);
      setOpenProfile(true);
    }
  }, [dataUsers]);

  const onClose = () => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete(USER_PROFILE_URL_PARAM);
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.pushState({ path: newUrl }, '', newUrl);

    setOpenProfile(false);
  };

  const onFilter = (filter: string[]) => {
    if (filter.length === 0) {
      setSortedUsers(dataUsers);
    } else {
      const filteredUsers = dataUsers.filter(user => {
        return filter.every(slug => {
          return user.activeCommunities.some(community => community.slug === slug);
        });
      });
      setSortedUsers(filteredUsers);
    }
  }

  const commonCollections = React.useMemo(() => getCommonCollections(slug, dataUsers), [dataUsers, slug]);

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

  return (
    <div className="flex pt-4">
      <div className={classNames(
        "w-full",
        FEATURE_FLAGS.ENABLE_SIDEBAR ? "lg:w-8/12" : ""
    )}>
        {!isLoading && dataUsers.length > 0 && 
          <UserListHeader onSort={sortUsers} onFilter={onFilter} commonCollections={commonCollections} />
        }
        <UserList 
          onUserClick={onUserClick}
          collections={collections}
          users={sortedUsers || dataUsers}
          slug={slug}
          isLoading={isLoading}
        />
      </div>

      {FEATURE_FLAGS.ENABLE_SIDEBAR && 
        <div className="hidden lg:block w-4/12 ">
          <div className="flex gap-8 flex-col pl-4 ml-4 xl:pl-6 xl:ml-6 border-left-2 border-l border-gray-200 dark:border-neutral-700">
            <MostFollowedInCollection users={[...dataUsers]} isLoading={isLoading} error={false} slug={slug} onUserClick={onUserClick} />
            <TopHoldersInCollection users={[...dataUsers]} isLoading={isLoading} error={false} slug={slug} onUserClick={onUserClick} />
            {!isLoading && <MostActiveList users={[...dataUsers]} error={false} slug={slug} onUserClick={onUserClick} />}
            {!isLoading && <RecentUserList slug={slug} onUserClick={onUserClick} />}
            {!isLoading && dataUsers.length >= ENABLE_COMMON_COLLECTION_FOR_MIN_USERS && <CommonCollectionsList collections={commonCollections} />}
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

interface ITopHoldersInCollectionProps {
  users: IUser[]; 
  onUserClick: (address: string) => void;
  slug: string;
  error?: boolean;
  isLoading?: boolean;
}

interface IUserWithTokenCount extends IUser {
  tokenCount: number;
}

export const TopHoldersInCollection = ({users, isLoading, error, onUserClick, slug}: ITopHoldersInCollectionProps) => {
  const { data: topHolders, isLoading: isTopHoldersLoading, error: isTopHoldersError, } = useTopHoldersFromCollection(slug);

  const holders = React.useMemo(() => {
    if (!topHolders || !users) {
      return [];
    }

    const holders: IUserWithTokenCount[] = [];
    topHolders.map(({address, tokenCount}) => {
      const user = users.find(user => user.address === address);
      if (user && tokenCount > 1) {
        holders.push({
          ...user,
          tokenCount
        })
      }
    })
    return holders;
  }, [topHolders, users])

  if (isLoading || isTopHoldersLoading) {
    return <CollectionViewListSkeleton />
  } 

  if (!holders || holders.length === 0 || error) {
    return null;
  }

  const maxUsers = holders.length < 5 ? holders.length : 5;

  return (
    <CollectionViewList
      title={
        <div className="flex items-center gap-3">
          Top holders
        </div>
      }
      asideLabel="Tokens"
    >
      <>
        {holders.slice(0, maxUsers).map(({address, twitter, tokenCount}) => (
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
            asideContent={tokenCount}
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

interface ICommonCollectionsListProps {
  collections: ICommonCollections[];
}

export const CommonCollectionsList = ({collections}: ICommonCollectionsListProps) => {
  if (!collections) {
    return null;
  }

  const maxCollections = collections.length < 5 ? collections.length : 5;

  const onClick = (slug: string) => {
    window.open(`/collections/${slug}`, "_blank");
  }

  return (
    <CollectionViewList
      title={
        <div className="flex items-center gap-3">
          Mutual collections
        </div>
      }
      asideLabel="Owned by"
    >
      {collections.slice(0, maxCollections).map(({slug, count, imageUrl, name}) => (
        <CollectionViewListItem
          key={slug}
          id={slug}
          imageSrc={imageUrl}
          imageAlt={name}
          onClick={() => onClick(slug)}
          title={
            <div className="flex items-center font-light">
              {name}
            </div>
          }      
          asideContent={count}
        />   
      ))}
    </CollectionViewList>
  )
};
