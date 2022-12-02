import React from "react";
import { ICollection } from "../../core/collection.interface";
import { TwitterItem } from "./twitter-item";

interface ITwitterList {
  collection?: ICollection;
}

export const TwitterList = ({collection}: ITwitterList) => {
  return (
    <ul role="list" className="space-y-8 py-12 max-w-2xl">
      {collection && collection.users?.map(({address, collections, name, twitter}) => {
        return (
          twitter && <TwitterItem 
            key={address} 
            address={address}
            collections={collections}
            name={name}
            twitter={twitter}
            displayedCollectionSlug={collection.slug}
          />
        )
      })}
    </ul>
  )
}