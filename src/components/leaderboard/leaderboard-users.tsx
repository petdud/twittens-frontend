import React from 'react';
import Image from 'next/image';
import { useMostFollowedUsers } from '../../hooks/use-most-followed-users';
import { GENERIC_AVATAR, shortenedAddress } from '../../utils';
import { Spinner } from '../spinner/spinner';
import {
  Table,
  TableHeader,
  TableHeaderItem,
  TableBody,
  TableRow,
  TableColumn
} from '../table/table';
import { UserPreviewModal } from '../user-preview-modal/user-preview-modal';
import { ICollection, IUser } from '../../core/collection.interface';
import { useCollections } from '../../hooks/use-collections';
import { AvatarGroup, IAvatarGroupItemProps } from '../avatar-group/avatar-group';
import { GoVerified } from 'react-icons/go';
import { AiFillLock } from 'react-icons/ai';
import { useAvatar } from '../../hooks/use-avatar';
import { USER_PROFILE_URL_PARAM } from '../collection-view/collection-view-content';

export const LeaderboardUsers = () => {
  const { data: users, isLoading, fetchMore } = useMostFollowedUsers();
  const { data: collections } = useCollections({
    select: 'slug,name,image.thumbnailUrl'
  });
  const [selectedUser, setSelectedUser] = React.useState<IUser>();

  React.useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const profileName = urlParams.get(USER_PROFILE_URL_PARAM);
    if (!profileName) {
      return;
    }

    const user = users.find(
      user =>
        user.address === profileName?.toLowerCase() ||
        user.name === profileName?.toLowerCase()
    );
    user && setSelectedUser(user);
  }, [users]);

  const onClose = () => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete(USER_PROFILE_URL_PARAM);
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.replaceState({ path: newUrl }, '', newUrl);

    setSelectedUser(undefined);
  };

  const onUserClick = (user: IUser) => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set(USER_PROFILE_URL_PARAM, user.name || user.address);
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    window.history.replaceState({ path: newUrl }, '', newUrl);

    setSelectedUser(user);
  };

  const loadMore = () => {
    fetchMore();
  };

  if (isLoading) {
    return (
      <div className="mt-6">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableHeaderItem name="Rank" isFirst={true} />
          <TableHeaderItem name="Name" />
          <TableHeaderItem name="𝕏" />
          <TableHeaderItem name="A part of community" />
          <TableHeaderItem name="Followers" isLast={true} />
        </TableHeader>

        <TableBody>
          {users.map((user, index) => (
            <LeaderboardRow
              key={user.address}
              user={user}
              position={index + 1}
              onClick={onUserClick}
              collections={collections}
            />
          ))}
        </TableBody>
      </Table>
      {selectedUser && (
        <UserPreviewModal
          open={!!selectedUser}
          onClose={onClose}
          user={selectedUser}
          collections={collections}
        />
      )}
      {!isLoading && (
        <div className="flex justify-center mt-4">
          <button
            className="btn btn-primary bg-indigo-600 text-white px-4 py-2 rounded focus:outline-none"
            onClick={loadMore}
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
};

interface ILeaderboardRow {
  user: IUser;
  position: number;
  onClick: (user: IUser) => void;
  collections: ICollection[];
}

const LeaderboardRow = ({ user, position, onClick, collections }: ILeaderboardRow) => {
  const { address, name, twitter, activeCommunities } = user;

  const onUserClick = () => onClick(user);
  const { avatar } = useAvatar(name);

  const onImageError = React.useCallback((event: any) => {
    event.target.onerror = null;
    event.target.src = GENERIC_AVATAR;
  }, []);

  const communities = React.useMemo(() => {
    let communities: IAvatarGroupItemProps[] = [];

    for (const activeCommunity of activeCommunities) {
      if (activeCommunity.status !== 'active') continue; // skip inactive communities
      const community = collections.find(
        collection => collection.slug === activeCommunity.slug
      );
      if (community) {
        communities.push({
          name: community.name,
          imageUrl: community.image.thumbnailUrl
        });
      }
    }
    return communities;
  }, [activeCommunities, collections]);

  if (!twitter) {
    return null;
  }

  return (
    <TableRow onClick={onUserClick}>
      <TableColumn isFirst={true}>
        <div className="font-medium text-gray-900 dark:text-gray-50">{position}</div>
      </TableColumn>
      <TableColumn>
        <div className="flex items-center pr-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatar || '/ens_default.png'}
            className="rounded-full mr-2"
            height={38}
            width={38}
            alt={name || address}
            aria-hidden="true"
            onError={onImageError}
          />
          <div>
            <div className="font-semibold text-gray-600 dark:text-slate-50 truncate ...">
              {name}
            </div>
            <div className="text-xs text-gray-400">{shortenedAddress(address)}</div>
          </div>
        </div>
      </TableColumn>
      <TableColumn>
        <div className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="h-10 w-10 rounded-full mr-2"
            src={twitter.avatar}
            alt={twitter.username}
            aria-hidden="true"
            onError={onImageError}
          />
          <div>
            <div className="flex items-center">
              <h3 className="font-semibold text-gray-600 dark:text-slate-50">
                {twitter.name}
              </h3>
              {twitter.verified && (
                <span className="inline-block flex-shrink-0 text-sky-400 pl-1.5">
                  <GoVerified aria-label="Twitter verified" />
                </span>
              )}
              {twitter.protected && (
                <span className="inline-block flex-shrink-0 text-yellow-600 pl-1.5">
                  <AiFillLock aria-label="Twitter private account" />
                </span>
              )}
            </div>
            <div className="text-xs text-gray-400">@{twitter.username}</div>
          </div>
        </div>
      </TableColumn>
      <TableColumn>
        <AvatarGroup
          items={communities}
          maxItems={5}
          size={6}
          placeholderInherited={false}
        />
      </TableColumn>
      <TableColumn isLast={true}>
        <div className="text-base font-semibold text-gray-600 dark:text-white">
          {twitter?.followers.toLocaleString()}
        </div>
      </TableColumn>
    </TableRow>
  );
};
