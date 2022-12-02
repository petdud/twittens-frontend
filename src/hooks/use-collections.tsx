import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { ICollection } from "../core/collection.interface";

export const useCollections = () => {
  const [data, setData] = useState<ICollection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchCollections = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/collections");
      data && setData(data);
      setIsLoading(false);
    } catch(err) {
      setIsLoading(false);
      setError(true);
    }
  }, [])

  useEffect(() => {
      fetchCollections();
  }, [fetchCollections]);

  return {
    data,
    isLoading,
    error
  };
} 