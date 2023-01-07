import { useMostFollowedUsers } from "../../hooks/use-most-followed-users";
import { shortenedAddress } from '../../utils';
import Image from "next/image";
import { Spinner } from "../spinner/spinner";
import { Table, TableHeader, TableHeaderItem, TableBody, TableRow, TableColumn } from "../table/table";
import React from "react";
import { ProfilePreviewModal } from "../profile-preview-modal/profile-preview-modal";
import { IUser } from "../../core/collection.interface";

export const LeaderboardUsers = () => {
  const { data: users, isLoading } = useMostFollowedUsers();
  const [selectedUser, setSelectedUser] = React.useState<IUser>();

  const onClose = React.useCallback(() => {
    setSelectedUser(undefined);
  }, []);

  const onUserClick = React.useCallback((user: IUser) => {
    setSelectedUser(user);
  }, []);

  if (isLoading) {
    return <div className="mt-6"><Spinner /></div>;
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableHeaderItem name="Rank" isFirst={true} />
          <TableHeaderItem name="Name" />
          <TableHeaderItem name="Twitter" />
          <TableHeaderItem name="Followers" isLast={true} />
        </TableHeader>

        <TableBody>
          {users.map((user, index) => 
            <LeaderboardRow key={user.address} user={user} position={index+1} onClick={onUserClick} />
          )}
        </TableBody>
      </Table>
      {selectedUser && <ProfilePreviewModal open={!!selectedUser} onClose={onClose} user={selectedUser} />}
    </>
  )
}

interface ILeaderboardRow {
  user: IUser;
  position: number;
  onClick: (user: IUser) => void;
}

const LeaderboardRow = ({user, position, onClick}: ILeaderboardRow) => {
  const {address, name, twitter} = user;

  const onUserClick = React.useCallback(() => onClick(user), [user, onClick]);

  if (!twitter) {
    return null;
  }

  return (
    <TableRow onClick={onUserClick}>
      <TableColumn isFirst={true}>
        <div className="font-medium text-gray-900 dark:text-gray-50">{position}</div>
      </TableColumn>
      <TableColumn>
        <div className="flex items-center">
          <Image src="/ens_default.png" className="rounded-full mr-2" height={38} width={38} alt={name || address} aria-hidden="true" />
          <div>
            <div className="font-semibold text-gray-600 dark:text-slate-50">{name}</div>
            <div className="text-xs text-gray-400">{shortenedAddress(address)}</div>
          </div>
        </div>
      </TableColumn>
      <TableColumn>
        <div className="flex items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="h-10 w-10 rounded-full mr-2" src={twitter?.avatar} alt={twitter?.username} aria-hidden="true" />
          <div>
            <div className="font-semibold text-gray-600 dark:text-slate-50">{twitter?.name}</div>
            <div className="text-xs text-gray-400">@{twitter?.username}</div>
          </div>
        </div>
      </TableColumn>
      <TableColumn isLast={true}>
        <div className="text-base font-semibold text-gray-600 dark:text-white">
          {twitter?.followers.toLocaleString()}
        </div>
      </TableColumn>
    </TableRow>
  )
}
