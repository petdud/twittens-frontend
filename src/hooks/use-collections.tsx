import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { ICollection, statusTypes } from "../core/collection.interface";
import { LOCAL_API_PATHS } from "../core/constants";

export const useCollections = (status?: statusTypes) => {
  const [data, setData] = useState<ICollection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchCollections = useCallback(async () => {
    try {
      const params = status ? `?status=${status}` : '';
      const { data } = await axios.get(`${LOCAL_API_PATHS.GET_COLLECTIONS}${params}`);
      data && setData(data);
      setIsLoading(false);
    } catch(err) {
      setIsLoading(false);
      setError(true);
    }
  }, [status])

  useEffect(() => {
      fetchCollections();
  }, [fetchCollections]);

  return {
    data,
    isLoading,
    error
  };
} 