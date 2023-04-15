import { IUser } from "../../core/collection.interface";

interface ISortByProps {
  users: IUser[];
}

// SORTING
const sortAlphabetically = ({ users }: ISortByProps) => 
  users.sort((a, b) => ((a?.name || "z").localeCompare((b.name || "z")))) || [];

const sortByNumOfFollowing = ({ users }: ISortByProps) =>
  users.sort((a, b) => (b?.twitter?.following || 0) - (a?.twitter?.following || 0));

const sortByNumOfFollowers = ({ users }: ISortByProps) =>
  users.sort((a, b) => (b?.twitter?.followers || 0) - (a?.twitter?.followers || 0));

const sortByTweetCount = ({ users }: ISortByProps) =>
  users.sort((a, b) => (b?.twitter?.tweetCount || 0) - (a?.twitter?.tweetCount || 0));


export const SORTING_TYPES = [
  { id: "alphabetical", name: 'A-Z', callback: sortAlphabetically },
  { id: "by_followers", name: 'Followers', callback: sortByNumOfFollowers },
  { id: "by_following", name: 'Following', callback: sortByNumOfFollowing },
  { id: "tweet_count", name: 'Tweet count', callback: sortByTweetCount },
];

export const DEFAULT_SORTING_TYPE = SORTING_TYPES[0];
