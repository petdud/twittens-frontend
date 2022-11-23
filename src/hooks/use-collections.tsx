import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export const useCollections = () => {
  const [data, setData] = useState<any[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchCollections = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/collections");
      console.log("collections", data);
      if (data?.data) {
        setData(data.data);
      }
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