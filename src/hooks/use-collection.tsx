import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { ICollectionApiData } from "../core/collection.interface";

export const useCollection = (slug: string): {data?: ICollectionApiData, isLoading: boolean, error: boolean} => {
  const [data, setData] = useState<ICollectionApiData>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchCollection = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/collections/${slug}`);
      data && setData(data);
      setIsLoading(false);
    } catch(err) {
      console.log(`Error fetching collection ${slug}:`, err);
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