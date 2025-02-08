import { IUser } from '../../core/collection.interface';

export interface ICommonCollections {
  name: string;
  count: number;
  imageUrl: string;
  slug: string;
}

export const getCommonCollections = (
  slug: string,
  users: IUser[]
): ICommonCollections[] => {
  const communityMap = new Map<string, ICommonCollections>();

  users.forEach(user => {
    user.activeCommunities.forEach(community => {
      if (community.slug === slug) {
        return;
      }
      const stats = communityMap.get(community.name);
      if (stats) {
        stats.count += 1;
      } else {
        communityMap.set(community.name, {
          name: community.name,
          count: 1,
          imageUrl: community.image?.thumbnailUrl || '',
          slug: community.slug
        });
      }
    });
  });

  return Array.from(communityMap.values()).sort((a, b) => b.count - a.count);
};
