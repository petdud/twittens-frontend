import React from "react";
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
        <TableHeaderItem name="Followers" isLast={true} />
      </TableHeader>

      <TableBody>
        {collections.map(({address, image, name, twitter}, index) => (
          <React.Fragment key={address}>
            {twitter && <TableRow key={address}>
              <TableColumn isFirst={true}>
                <div className="font-medium text-gray-900 dark:text-gray-50">{index + 1}</div>
              </TableColumn>
              <TableColumn>
                <div className="flex items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image.thumbnailUrl} className="rounded-full mr-2 h-8 w-8" alt={name || address} aria-hidden="true" />
                  <div className="font-semibold text-gray-600 dark:text-slate-50">{name}</div>
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
            </TableRow>}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  )
}
