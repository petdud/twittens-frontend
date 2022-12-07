import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { ICollection } from "../core/collection.interface";

export interface IColletionTwitterCount {
  slug: string;
  twitterCount: number;
}

export const useCollectionsTwitterCounts = () => {
  const [data, setData] = useState<IColletionTwitterCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchCollectionsTwitterCounts = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/collections/twitter-counts");
      data && setData(data);
      setIsLoading(false);
    } catch(err) {
      setIsLoading(false);
      setError(true);
    }
  }, [])

  useEffect(() => {
      fetchCollectionsTwitterCounts();
  }, [fetchCollectionsTwitterCounts]);

  return {
    data,
    isLoading,
    error
  };
} 