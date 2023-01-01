import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { IUser } from "../core/collection.interface";
import { LOCAL_API_PATHS } from "../core/constants";

export const useMostFollowedUsers = () => {
  const [data, setData] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchMostFollowedUsers = useCallback(async () => {
    try {
      const { data } = await axios.get(LOCAL_API_PATHS.GET_MOST_FOLLOWED_USERS);
      data && setData(data);
      setIsLoading(false);
    } catch(err) {
      setIsLoading(false);
      setError(true);
    }
  }, [])

  useEffect(() => {
      fetchMostFollowedUsers();
  }, [fetchMostFollowedUsers]);

  return {
    data,
    isLoading,
    error
  };
}
