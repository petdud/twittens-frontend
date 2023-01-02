import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { INftsData } from "../core/nft.interface";

export const useUserNfts = (address: string): {data?: INftsData, isLoading: boolean, error: boolean} => {
  const [data, setData] = useState<INftsData>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchUserNfts = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/users/${address}/nfts`);
      data && setData(data);
      setIsLoading(false);
    } catch(err) {
      console.log(`Error fetching nfts for user address ${address}:`, err);
      setIsLoading(false);
      setError(true);
    }
  }, [address])

  useEffect(() => {
    setData(undefined);
    setIsLoading(true);
    address && fetchUserNfts();
  }, [fetchUserNfts, address]);

  return {
    data,
    isLoading,
    error
  };
}
