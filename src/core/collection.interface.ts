export type chainTypes =
  | 'eth-mainnet'
  | 'polygon-mainnet'
  | 'arb-mainnet'
  | 'opt-mainnet';
export type statusTypes =
  | 'initiated'
  | 'creating'
  | 'error'
  | 'ready'
  | 'hidden'
  | 'active';
export type dataSourceTypes = 'alchemy' | 'reservoir';

export interface IUserEns {
  avatar: string;
  twitter: string;
}

interface IStats {
  oneDayVolume: number;
  oneDayChange: number;
  oneDaySales: number;
  oneDaySalesChange: number;
  oneDayAveragePrice: number;
  oneDayDifference: number;
  sevenDayVolume: number;
  sevenDayChange: number;
  sevenDaySales: number;
  sevenDayAveragePrice: number;
  sevenDayDifference: number;
  thirtyDayVolume: number;
  thirtyDayChange: number;
  thirtyDaySales: number;
  thirtyDayAveragePrice: number;
  thirtyDayDifference: number;
  totalVolume: number;
  totalSales: number;
  averagePrice: number;
  numReports: number;
  marketCap: number;
  floorPrice: number;
}

export interface IImage {
  url: string;
  thumbnailUrl: string;
  extension: string;
  publicId: string;
  id: string;
  width: number;
  height: number;
  externalUrl: string;
}

export interface IUser {
  _id: string;
  address: string;
  name: string | undefined;
  ens: IUserEns | null;
  twitter: ITwitter | null;
  activeCommunities: ICollection[];
  isPromoted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ITag {
  _id: string;
  name: string; // in lowercase
}

export interface ICollection {
  _id: string;
  slug: string;
  address: string;
  name: string;
  description: string;
  image: IImage;
  totalSupply?: number; // can be dynamic, e.g. events
  numberOfOwners: number;
  ownersWithTwitterCount: number;
  ownersWithLensCount: number;
  twitterUsername: string | null;
  discordUrl: string | null;
  externalUrl: string | null;
  isFeatured: string;
  status: statusTypes;
  twitter: ITwitter | null;
  stats: IStats | null;
  chain: chainTypes;
  activeUsers: IUser[];
  tags: ITag[];
  createdAt: string;
  updatedAt: string;
  dataSource: dataSourceTypes;
}

export interface ICollectionApiData {
  collection: ICollection;
}

export interface ITwitter {
  _id: string;
  twitterId: string;
  avatar: string;
  name: string;
  username: string;
  description: string;
  verified: boolean;
  protected: boolean;
  url: string;
  followers: number;
  following: number;
  tweetCount: number;
  listedCount: number;
  creationDate: string;
}

export interface IUserCommunity {
  user: IUser;
  community: ICollection;
  joinedAt: Date;
  leavedAt?: Date;
  rejoined?: boolean;
  isActive: boolean;
}
