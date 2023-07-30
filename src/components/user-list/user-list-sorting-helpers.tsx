import { IUser } from "../../core/collection.interface";

interface ISortByProps {
  users: IUser[];
}

const getPriority = (user: IUser): number => (user.isPromoted ? 0 : 1);

export const customSortMethod = ({ users }: ISortByProps) =>
  users.sort((a, b) => {
    const priorityComparison = getPriority(a) - getPriority(b);
    if (priorityComparison !== 0) {
      return priorityComparison;
    }
    return (b?.twitter?.followers || 0) - (a?.twitter?.followers || 0);
  });

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
  { id: "by_followers", name: 'Followers', callback: sortByNumOfFollowers },
  { id: "by_following", name: 'Following', callback: sortByNumOfFollowing },
  { id: "tweet_count", name: 'Tweet count', callback: sortByTweetCount },
  { id: "alphabetical", name: 'A-Z', callback: sortAlphabetically },
];

export const DEFAULT_SORTING_TYPE = SORTING_TYPES[0];
