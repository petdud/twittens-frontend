import React from 'react';
import { IAvatarGroupItemProps } from '../components/avatar-group/avatar-group';
import { ICollection } from '../core/collection.interface';

export const useUserCommunities = (
  activeCommunities: ICollection[],
  collections: ICollection[]
) => {
  return React.useMemo(() => {
    const uniqueCommunities: Set<string> = new Set(); // Use a Set to store unique communities
    const communities: IAvatarGroupItemProps[] = [];

    for (const activeCommunity of activeCommunities) {
      if (activeCommunity.status !== 'active') continue; // skip inactive communities
      const community = collections.find(
        collection => collection.slug === activeCommunity.slug
      );
      if (community && !uniqueCommunities.has(community.slug)) {
        uniqueCommunities.add(community.slug);
        communities.push({
          name: community.name,
          imageUrl: community.image.thumbnailUrl,
          link: `/collections/${community.slug}`
        });
      }
    }

    return communities;
  }, [activeCommunities, collections]);
};
