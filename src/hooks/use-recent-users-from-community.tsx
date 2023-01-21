import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { IUser } from "../core/collection.interface";
import { LOCAL_API_PATHS } from "../core/routes";

export interface IRecentUser extends IUser {
  joinedAt: string;
}

export const useRecentUsersFromCommunity = (slug: string): {
  data?: { users: IRecentUser[] }, 
  isLoading: boolean,
  error: boolean
} => {
  const [data, setData] = useState<{users: IRecentUser[]}>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchRecentUsers = useCallback(async (slug: string) => {
    try {
      const { data } = await axios.get(LOCAL_API_PATHS.GET_RECENT_USERS_FROM_COLLECTION(slug));
      data && setData(data);
      setIsLoading(false);
    } catch(err) {
      console.log(`Error fetching collection ${slug}:`, err);
      setIsLoading(false);
      setError(true);
    }
  }, [])

  useEffect(() => {
    slug && fetchRecentUsers(slug);
  }, [fetchRecentUsers, slug]);

  return {
    data,
    isLoading,
    error
  };
}
