import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { ICollection } from "../core/collection.interface";
import { LOCAL_API_PATHS } from "../core/constants";

export const useMostFollowedCollections = () => {
  const [data, setData] = useState<ICollection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchMostFollowedCollections = useCallback(async () => {
    try {
      const { data } = await axios.get(LOCAL_API_PATHS.GET_MOST_FOLLOWED_COLLECTIONS);
      data && setData(data);
      setIsLoading(false);
    } catch(err) {
      setIsLoading(false);
      setError(true);
    }
  }, [])

  useEffect(() => {
      fetchMostFollowedCollections();
  }, [fetchMostFollowedCollections]);

  return {
    data,
    isLoading,
    error
  };
}
