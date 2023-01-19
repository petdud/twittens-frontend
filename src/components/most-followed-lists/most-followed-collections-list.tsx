import React from "react";
import { useRouter } from "next/router";
import { useMostFollowedCollections } from "../../hooks/use-most-followed-collections";
import { Spinner } from "../spinner/spinner";
import { MostFollowedList, MostFollowedListItem } from "./most-followed-list";
import { IoIosPhotos } from 'react-icons/io';

export const MostFollowedCollectionsList = () => {
  const { data: collections, isLoading } = useMostFollowedCollections();
  const router = useRouter();

  const onClick = React.useCallback((slug: string) => {
    router.push(`/collections/${slug}`);
  }, [router]);


  if (isLoading) {
    return <div className="mt-6"><Spinner /></div>;
  }

  return (
    <MostFollowedList
      title={
        <div className="flex items-center gap-3">
          <IoIosPhotos className="text-indigo-400 text-sm" /> Collections with the most followers
        </div>
      }
      footerLink="/leaderboard#collections"
    >
      {collections.slice(0, 5).map(({address, image, name, twitter, slug}, index) => (
        <MostFollowedListItem 
          key={address}
          id={slug}
          rank={index + 1}
          imageSrc={image.thumbnailUrl}
          imageAlt={name}
          title={name}
          subtitle={"@" + twitter?.username}
          followers={twitter?.followers.toLocaleString() || ""}
          onClick={onClick}
        />
      ))}
    </MostFollowedList>
  )
};
