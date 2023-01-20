import React from "react";
import { AiFillLock } from "react-icons/ai";
import { GoVerified } from "react-icons/go";
import { IUser } from "../../core/collection.interface";
import { useActiveUsersFromCommunity } from "../../hooks/use-active-users-from-community";
import { useCollections } from "../../hooks/use-collections";
import { MainViewHeader } from "../main-view-header/main-view-header";
import { UserList } from "../user-list/user-list";
import { UserPreviewModal } from "../user-preview-modal/user-preview-modal";
import { CollectionViewList, CollectionViewListItem, CollectionViewListSkeleton } from "./collection-view-list";

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
    <div className="flex pt-12">
      <div className="w-full lg:w-8/12">
        <UserList 
          onUserClick={onUserClick}
          collections={collections}
          users={users}
          slug={slug}
          isLoading={isLoading}
        />
      </div>

      <div className="hidden lg:block w-4/12 pl-6 xl:pl-10">
        <div className="flex gap-8 flex-col">
          <MostFollowedInCollection slug={slug} onUserClick={onUserClick} />
          {/* <NewUserList slug={slug} onUserClick={onUserClick} /> */}
          <MostActiveList slug={slug} onUserClick={onUserClick} />
        </div>
      </div>
      {selectedUser && <UserPreviewModal open={openProfile} onClose={onClose} user={selectedUser} collections={collections} />}
    </div>
  )
}

interface IMostFollowedInCollectionProps {
  onUserClick: (address: string) => void;
  slug: string;
}

export const MostFollowedInCollection = ({onUserClick, slug}: IMostFollowedInCollectionProps) => {
  const { data, isLoading, error } = useActiveUsersFromCommunity(slug);

  if (isLoading) {
    return <CollectionViewListSkeleton />
  } 

  if (!data || error) {
    return null;
  }

  const { users } = data;
  
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
  onUserClick: (address: string) => void;
  slug: string;
}

export const MostActiveList = ({onUserClick, slug}: IMostActiveListProps) => {
  const { data, isLoading, error } = useActiveUsersFromCommunity(slug);

  if (isLoading) {
    return <CollectionViewListSkeleton />
  } 

  if (!data || error) {
    return null;
  }

  const { users } = data;

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


interface INewUserListProps {
  onUserClick: (address: string) => void;
  slug: string;
}

export const NewUserList = ({onUserClick, slug}: INewUserListProps) => {
  const { data, isLoading, error } = useActiveUsersFromCommunity(slug);

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
          asideContent ={twitter?.followers.toLocaleString() || ""}
        />
      ))}
    </CollectionViewList>
  )
};
