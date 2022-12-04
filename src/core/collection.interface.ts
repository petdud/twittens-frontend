
export interface IUserEns {
  avatar: string,
  twitter: string,
  createdAt: string,
}

export interface IUser {
  _id: string,
  address: string,
  name: string | undefined,
  ens: IUserEns,
  collections: ICollection[],
  exCollections: ICollection[],
  twitter: ITwitter,
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
  supply: number,
  owners: number,
  twitter: string,
  url: string,
  discord: string,
  isReady: boolean,
  isFeatured: string,
  status: string,
  createdAt: string,
  updatedAt: string,
  users: IUser[]
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
  createdAt: string,
  updatedAt: string
  creationDate: string,
}
