import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { LOCAL_API_PATHS } from "../core/constants";

export const useGetCollectionOwners = (contractAddress: string, chain: string): {data?: string[], isLoading: boolean, error: boolean} => {
  const [data, setData] = useState<string[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchCollectionOwners = useCallback(async () => {
    try {
      const { data } = await axios.get(`${LOCAL_API_PATHS.GET_COLLECTION_OWNERS}?contractAddress=${contractAddress}&chain=${chain}`);
      data && setData(data);
      setIsLoading(false);
    } catch(err) {
      console.log(`Error fetching collection ${contractAddress}:`, err);
      setIsLoading(false);
      setError(true);
    }
  }, [contractAddress, chain])

  useEffect(() => {
    fetchCollectionOwners();
  }, [fetchCollectionOwners]);

  return {
    data,
    isLoading,
    error
  };
}
