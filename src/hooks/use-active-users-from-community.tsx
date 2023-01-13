import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { IUser } from "../core/collection.interface";
import { LOCAL_API_PATHS } from "../core/constants";

export const useActiveUsersFromCommunity = (slug: string): {
  data?: { users: IUser[] }, 
  isLoading: boolean,
  error: boolean
} => {
  const [data, setData] = useState<{users: IUser[]}>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchActiveUsers = useCallback(async (slug: string) => {
    try {
      const { data } = await axios.get(LOCAL_API_PATHS.GET_ACTIVE_USERS_FROM_COLLECTION(slug));
      data && setData(data);
      setIsLoading(false);
    } catch(err) {
      console.log(`Error fetching collection ${slug}:`, err);
      setIsLoading(false);
      setError(true);
    }
  }, [])

  useEffect(() => {
    slug && fetchActiveUsers(slug);
  }, [fetchActiveUsers, slug]);

  return {
    data,
    isLoading,
    error
  };
}
