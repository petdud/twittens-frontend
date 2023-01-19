import React from "react";
import { AiFillLock } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { GoVerified } from "react-icons/go";
import { IUser } from "../../core/collection.interface";
import { useCollections } from "../../hooks/use-collections";
import { useMostFollowedUsers } from "../../hooks/use-most-followed-users";
import { Spinner } from "../spinner/spinner";
import { UserPreviewModal } from "../user-preview-modal/user-preview-modal";
import { MostFollowedList, MostFollowedListItem } from "./most-followed-list";

export const MostFollowedUsersList = () => {
  const { data: collections } = useCollections({select: "slug,name,image.thumbnailUrl"});
  const { data: users, isLoading } = useMostFollowedUsers();
  const [selectedUser, setSelectedUser] = React.useState<IUser | undefined>(undefined);
  const [openProfile, setOpenProfile] = React.useState(false);

  const onClick = React.useCallback((address: string) => {
    const user = users.find(user => user.address === address);
    if (user) {
      setSelectedUser(user);
      setOpenProfile(true);
    }
  }, [users]);

  const onClose = React.useCallback(() => {
    setOpenProfile(false);
  }, []);

  if (isLoading) {
    return <div className="mt-6"><Spinner /></div>;
  }

  return (
    <MostFollowedList
      title={
        <div className="flex items-center gap-3">
          <FiUsers className="text-indigo-400 text-sm" /> Users with the most followers
        </div>
      }
      footerLink="/leaderboard#users"
    >
      <>
        {users.slice(0, 5).map(({address, name, twitter}, index) => (
          <MostFollowedListItem 
            key={address}
            id={address}
            rank={index + 1}
            imageSrc={twitter?.avatar}
            imageAlt={twitter?.username}
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
            subtitle={name}
            followers={twitter?.followers.toLocaleString() || ""}
            onClick={onClick}
          />
        ))}
        {selectedUser && <UserPreviewModal open={openProfile} onClose={onClose} user={selectedUser} collections={collections} />}
      </>
    </MostFollowedList>
  )
};
