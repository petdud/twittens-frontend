import React from "react";
import { ICollection } from "../../core/collection.interface";
import { useMostFollowedCollections } from "../../hooks/use-most-followed-collections";
import { Spinner } from '../spinner/spinner';
import { Table, TableBody, TableColumn, TableHeader, TableHeaderItem, TableRow } from '../table/table';

export const LeaderboardCollections = () => {
  const { data: collections, isLoading } = useMostFollowedCollections();
  
  if (isLoading) {
    return <div className="mt-6"><Spinner /></div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableHeaderItem name="Rank" isFirst={true} />
        <TableHeaderItem name="Collection" />
        <TableHeaderItem name="Twitter account" />
        {/* <TableHeaderItem name="Users" /> */}
        <TableHeaderItem name="Followers" isLast={true} />
      </TableHeader>

      <TableBody>
        {collections.map((collection, index) => (
          <LeaderboardRow key={collection.address} collection={collection} position={index+1} />
        ))}
      </TableBody>
    </Table>
  )
}

interface ILeaderboardRow {
  collection: ICollection;
  position: number;
}

const LeaderboardRow = ({collection, position}: ILeaderboardRow) => {
  const { address, name, image, twitter, slug } = collection;
  const onClick = React.useCallback(() => window.open(`/collections/${slug}`, "_blank"), [slug]);

  // const users = React.useMemo(() => {
  //   let users: IAvatarGroupItemProps[] = [];
    
  //   for (const user of activeUsers) {
  //     if (user?.twitter?.avatar) {
  //       users.push({ name: user.twitter.username, imageUrl: user.twitter.avatar });
  //     }
  //   }
  //   return users;
  // }, [activeUsers]);

  if (!twitter) {
    return null;
  }

  return (
    <TableRow onClick={onClick} >
      <TableColumn isFirst={true}>
        <div className="font-medium text-gray-900 dark:text-gray-50">{position}</div>
      </TableColumn>
      <TableColumn>
        <div className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image.thumbnailUrl} className="rounded-full mr-2 h-8 w-8" alt={name || address} aria-hidden="true" />
          <div className="font-semibold text-gray-600 dark:text-slate-50 truncate ...">{name}</div>
        </div>
      </TableColumn>
      <TableColumn>
        <div className="flex items-center truncate ...">
        {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="h-10 w-10 rounded-full mr-2" src={twitter.avatar} alt={twitter.username} aria-hidden="true" />
          <div>
            <div className="font-semibold text-gray-600 dark:text-slate-50">{twitter.name}</div>
            <div className="text-xs text-gray-400">@{twitter.username}</div>
          </div>
        </div>
      </TableColumn>
      {/* <TableColumn>
        <AvatarGroup items={users} maxItems={5} size={6} placeholderInherited={false} />
      </TableColumn> */}
      <TableColumn isLast={true}>
        <div className="text-base font-semibold text-gray-600 dark:text-white">
          {twitter?.followers.toLocaleString()}
        </div>
      </TableColumn>
    </TableRow>
  )
}
