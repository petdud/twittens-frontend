import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { IUser } from "../core/collection.interface";
import { LOCAL_API_PATHS } from "../core/routes";

const LIMIT = 100;

export const useMostFollowedUsers = () => {
  const [data, setData] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  const fetchMostFollowedUsers = useCallback(async () => {
    try {
      const { data: responseData } = await axios.get(LOCAL_API_PATHS.GET_MOST_FOLLOWED_USERS, {
        params: {
          page,
          limit: LIMIT,
        },
      });
      responseData && setData(prevData => [...prevData, ...responseData]);
      setIsLoading(false);
    } catch(err) {
      setIsLoading(false);
      setError(true);
    }
  }, [page])

  useEffect(() => {
      fetchMostFollowedUsers();
  }, [fetchMostFollowedUsers]);
  
  const fetchMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return {
    data,
    isLoading,
    error,
    fetchMore
  };
}
