import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { IUser } from "../core/collection.interface";
import { LOCAL_API_PATHS } from "../core/constants";

interface IUsersByCommunityProps {
  data?: {
    users: IUser[]
  };
  isLoading: boolean;
  error: boolean;
}

export const useUsersByCommunity = (slug: string):IUsersByCommunityProps => {
  const [data, setData] = useState<{users: IUser[]}>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchUsersByCommunity = useCallback(async () => {
    try {
      const { data } = await axios.get(LOCAL_API_PATHS.GET_USERS_BY_COMMUNITY(slug));
      data && setData(data);
      setIsLoading(false);
    } catch(err) {
      console.log(`Error fetching collection ${slug}:`, err);
      setIsLoading(false);
      setError(true);
    }
  }, [slug])

  useEffect(() => {
    slug && fetchUsersByCommunity();
  }, [fetchUsersByCommunity, slug]);

  return {
    data,
    isLoading,
    error
  };
}
