import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { LOCAL_API_PATHS } from "../core/routes";

const LIMIT = 500;

export interface ITopHolder {
  address: string;
  tokenCount: number;
}

export const useTopHoldersFromCollection = (slug: string, limit = LIMIT): {
  data?: ITopHolder[], 
  isLoading: boolean,
  error: boolean
} => {
  const [data, setData] = useState<ITopHolder[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchTopHolders = useCallback(async (slug: string) => {
    try {
      const { data } = await axios.get(LOCAL_API_PATHS.GET_TOP_HOLDERS_FROM_COLLECTION(slug), {
        params: {
          ...(limit && {limit}),
        }
      });
      if (data.data) { 
        const result = data.data;
        setData(result);
      }
      setIsLoading(false);
    } catch(err) {
      console.log(`Error fetching top holders from collection ${slug}:`, err);
      setIsLoading(false);
      setError(true);
    }
  }, [])

  useEffect(() => {
    slug && fetchTopHolders(slug);
  }, [fetchTopHolders, slug]);

  return {
    data,
    isLoading,
    error
  };
}
