type chainTypes = "eth-mainnet" | "polygon-mainnet";
export type statusTypes = "initiated" | "created" | "updating" | "error" | "ready" | "hidden" | "active";

export interface IUserEns {
  avatar: string,
  twitter: string,
}

export interface IUser {
  _id: string,
  address: string,
  name: string | undefined,
  ens: IUserEns | null,
  twitter: ITwitter | null,
  createdAt: string,
  updatedAt: string
}

export interface ICollection {
  _id: string,
  slug: string,
  address: string,
  name: string,
  description: string,
  image: string,
  supply?: number, // can be dynamic, e.g. events
  owners: number,
  twitter: string,
  url: string,
  discord: string,
  isFeatured: string,
  status: statusTypes,
  chain: chainTypes,
  createdAt: string,
  updatedAt: string,
}

export interface ICollectionApiData {
  collection: ICollection,
  users: IUser[],
}

export interface ITwitter {
  _id: string;
  twitterId: string,
  avatar: string,
  name: string,
  username: string,
  description: string,
  verified: boolean,
  protected: boolean,
  url: string,
  followers: number,
  following: number,
  tweetCount: number,
  listedCount: number,
  creationDate: string,
}
