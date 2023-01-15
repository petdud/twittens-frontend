import React from "react";
import { CollectionHeader } from "../collection-header/collection-header";
import { CollectionViewContent } from "./collection-view-content";


interface ICollectionView {
  slug: string;
}

export const CollectionView = ({slug}: ICollectionView) =>  {
  return (
    <div className="max-w-2xl m-auto">
      <CollectionHeader slug={slug}/>
      <CollectionViewContent slug={slug} />
    </div>
  )
}
