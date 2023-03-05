import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { chainTypes, dataSourceTypes } from "../core/collection.interface";
import { LOCAL_API_PATHS } from "../core/routes";

export const useGetCollectionOwners = (contractAddress: string, chain: chainTypes, dataSource: dataSourceTypes = "alchemy"): {data?: string[], isLoading: boolean, error: boolean} => {
  const [data, setData] = useState<string[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchCollectionOwners = useCallback(async () => {
    try {
      const { data } = await axios.get(`${LOCAL_API_PATHS.GET_COLLECTION_OWNERS}?contractAddress=${contractAddress}&chain=${chain}&dataSource=${dataSource}`);
      data && setData(data);
      setIsLoading(false);
    } catch(err) {
      console.log(`Error fetching collection ${contractAddress}:`, err);
      setIsLoading(false);
      setError(true);
    }
  }, [contractAddress, chain, dataSource])

  useEffect(() => {
    contractAddress && fetchCollectionOwners();
  }, [contractAddress, fetchCollectionOwners]);

  return {
    data,
    isLoading,
    error
  };
}
