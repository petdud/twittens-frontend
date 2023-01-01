import { useMostFollowedUsers } from "../../hooks/use-most-followed-users";
import { shortenedAddress } from '../../utils';
import Image from "next/image";
import { Spinner } from "../spinner/spinner";
import { Table, TableHeader, TableHeaderItem, TableBody, TableRow, TableColumn } from "../table/table";
import React from "react";

export const LeaderboardUsers = () => {
  const { data: users, isLoading } = useMostFollowedUsers();
  
  if (isLoading) {
    return <div className="mt-6"><Spinner /></div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableHeaderItem name="Rank" isFirst={true} />
        <TableHeaderItem name="Name" />
        <TableHeaderItem name="Twitter" />
        <TableHeaderItem name="Followers" isLast={true} />
      </TableHeader>

      <TableBody>
        {users.map(({address, name, twitter}, index) => (
          <React.Fragment key={address}>
            {twitter && <TableRow>
              <TableColumn isFirst={true}>
                <div className="font-medium text-gray-900 dark:text-gray-50">{index + 1}</div>
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
            </TableRow>}
          </React.Fragment>
        ))}
      </TableBody>
    </Table>
  )
}
