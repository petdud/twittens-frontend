import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { ICollection } from "../core/collection.interface";

export const useCollection = (slug: string): {data?: ICollection, isLoading: boolean, error: boolean} => {
  const [data, setData] = useState<ICollection>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchCollection = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/collections/${slug}`);
      data && setData(data);
      setIsLoading(false);
    } catch(err) {
      setIsLoading(false);
      setError(true);
    }
  }, [slug])

  useEffect(() => {
      fetchCollection();
  }, [fetchCollection]);

  return {
    data,
    isLoading,
    error
  };
} 