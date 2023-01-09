import React from "react";
import { CollectionHeader } from "../collection-header/collection-header";
import { CollectionViewContent } from "./collection-view-content";


interface ICollectionView {
  slug: string;
}

export const CollectionView = ({slug}: ICollectionView) =>  {
  return (
    <div className="md:py-6 py-2 max-w-5xl m-auto">
      <div className="max-w-full px-2 mx-2">
        <CollectionHeader slug={slug}/>
        <CollectionViewContent slug={slug} />
      </div>
    </div>
  )
}
