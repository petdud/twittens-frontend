import React from 'react';
import { FEATURE_FLAGS } from '../../core/feature-flags';
import { CollectionHeader } from '../collection-header/collection-header';
import { CollectionViewContent } from './collection-view-content';

interface ICollectionView {
  slug: string;
}

export const CollectionView = ({ slug }: ICollectionView) => {
  const styleWidth = FEATURE_FLAGS.ENABLE_SIDEBAR ? 'max-w-5xl' : 'max-w-2xl';
  return (
    <div className={`m-auto ${styleWidth}`}>
      <CollectionHeader slug={slug} />
      <CollectionViewContent slug={slug} />
    </div>
  );
};
