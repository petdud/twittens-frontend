import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { IUser } from "../core/collection.interface";
import { LOCAL_API_PATHS } from "../core/routes";

export const useGetUsersByNames = (names: string[]) => {
  const [data, setData] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchUsersByNames = useCallback(async () => {
    try {
      const { data } = await axios.get(LOCAL_API_PATHS.GET_USERS_BY_NAMES + "?names=" + names.join(","));
      data && setData(data);
      setIsLoading(false);
    } catch(err) {
      setIsLoading(false);
      setError(true);
    }
  }, [names])

  useEffect(() => {
      fetchUsersByNames();
  }, [fetchUsersByNames]);

  return {
    data,
    isLoading,
    error
  };
}
