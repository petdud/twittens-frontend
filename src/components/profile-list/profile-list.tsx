import React from "react";
import { IUser } from "../../core/collection.interface";
import { UserPreviewModal } from "../user-preview-modal/user-preview-modal";
import { useGetUsersByNames } from "../../hooks/use-get-users-by-names";
import { useGetUsersByCollectionTag } from "../../hooks/use-get-users-by-collection-tag";
import { useCollections } from "../../hooks/use-collections";
import { ProfileItem } from "./profile-item";
import { MainViewHeader } from "../main-view-header/main-view-header";

interface IProfileListProps {
  users: IUser[];
  title?: string;
  isLoading?: boolean;
}

export const ProfileList = ({users, title, isLoading}: IProfileListProps) => {
  const { data: collections } = useCollections({select: "slug,name,image.thumbnailUrl"});

  const [selectedUser, setSelectedUser] = React.useState<IUser | undefined>(undefined);
  const [openProfile, setOpenProfile] = React.useState(false);

  const onClick = (address: string) => {
    const user = users.find(user => user.address === address);
    if (user) {
      setSelectedUser(user);
      setOpenProfile(true);
    }
  };

  const onClose = () => {
    setOpenProfile(false);
  };

  if (isLoading || !users || users.length < 2) {
    return null;
  }

  return (
    <>
      {title && 
        <div className="pb-4 mt-8">
          <MainViewHeader title={title} />
        </div>
      }
      <div className="overflow-x-auto hide-scrollbar">
        <ul className="flex flex-nowrap list-none gap-5">
          {users.map((user) => (
            user && <ProfileItem key={user.address} user={user} onClick={onClick} />
          ))}
        </ul>
        {selectedUser && <UserPreviewModal open={openProfile} onClose={onClose} user={selectedUser} collections={collections} />}
      </div>
    </>
  )
}

interface IProfileListByNamesProps {
  names: string[];
  title?: string;
}

export const ProfileListByNames = ({names, title}: IProfileListByNamesProps) => {
  const { data: users, isLoading } = useGetUsersByNames(names);

  return (
    <ProfileList users={users} title={title} isLoading={isLoading} />
  )
}

interface ProfileListByCollectionTagProps {
  tag: string;
  title?: string;
}

export const ProfileListByCollectionTag = ({tag, title}: ProfileListByCollectionTagProps) => {
  const { data: users, isLoading } = useGetUsersByCollectionTag(tag);

  return (
    <ProfileList users={users} title={title} isLoading={isLoading} />
  )
}
