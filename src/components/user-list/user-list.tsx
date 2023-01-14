import React, { useCallback, useState } from "react";
import { IUser } from "../../core/collection.interface";
import { useCollections } from "../../hooks/use-collections";
import { IAvatarGroupItemProps } from "../avatar-group/avatar-group";
import { UserPreviewModal } from "../user-preview-modal/user-preview-modal";
import { UserItem } from "./user-item";

interface IUserList {
  users: IUser[];
  slug: string;
}

export const UserList = ({ users, slug }: IUserList) => {
  const { data: collections } = useCollections({select: "slug,name,image.thumbnailUrl"});
  const [selectedUser, setSelectedUser] = useState<IUser | undefined>(undefined);
  const [openProfile, setOpenProfile] = useState(false);

  const onUserClick = useCallback((address: string) => {
    const user = users.find(user => user.address === address);
    if (user) {
      setSelectedUser(user);
      setOpenProfile(true);
    }
  }, [users]);

  const onClose = useCallback(() => {
    setOpenProfile(false);
  }, []);
  
  return (
    <>
      <ul role="list" className="space-y-8 py-12 max-w-2xl md:px-6">
        {users.map(({twitter, address, name, activeCommunities}) => {
          let communities: IAvatarGroupItemProps[] = [];

          for (const activeCommunity of activeCommunities) {
            if (activeCommunity.slug === slug || activeCommunity.status !== "active") continue; // skip current community and inactive communities
            const community = collections.find((collection) => collection.slug === activeCommunity.slug);
            if (community) {
              communities.push({ imageUrl: community.image.thumbnailUrl, name: community.name });
            }
          }
          
          return (
            twitter && <UserItem 
              key={address}
              onUserClick={onUserClick}
              address={address}
              name={name}
              twitter={twitter}
              communities={communities}
            />
          )
        })}
      </ul>
      {selectedUser && <UserPreviewModal open={openProfile} onClose={onClose} user={selectedUser} collections={collections} />}
    </>
  )
}

export const UserListSkeleton = () => (
  <ul role="list" className="space-y-8 py-2 max-w-2xl">
    <div role="status" className="py-2 space-y-8 w-full rounded animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
      {["a", "b", "c", "d"].map(alp => (
        <div key={alp} className="shadow bg-white rounded-md dark:bg-black">
          <div className="px-4 py-1 bg-slate-50 dark:bg-gray-600 border-b-2 border-slate-100 dark:border-neutral-700 flex items-center gap-3 justify-between">
            <div className="flex items-center gap-2 h-6">
              <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
          </div>
          <div className="flex items-start p-4 gap-3">
            <svg className="h-16 md:w-16 text-gray-200 dark:text-neutral-700" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>
            <div className="pt-3">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
                <div className="w-64 h-1.5 bg-gray-200 rounded-full dark:bg-gray-700 mb-2"></div>
                <div className="w-48 h-1.5 bg-gray-200 rounded-full dark:bg-gray-700 mt-4"></div>
            </div>
          </div>
        </div>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  </ul>
)
