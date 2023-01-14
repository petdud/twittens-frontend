import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { ICollection, statusTypes } from "../core/collection.interface";
import { LOCAL_API_PATHS } from "../core/routes";

interface IUseCollectionsProps {
  select?: string; // string separated by commas
  status?: statusTypes,
}

export const useCollections = ({
  select,
  status,
}: IUseCollectionsProps) => {
  const [data, setData] = useState<ICollection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchCollections = useCallback(async () => {
    try {
      const { data } = await axios.get(LOCAL_API_PATHS.GET_COLLECTIONS, {
        params: {
          ...(status && {status}),
          ...(select && {select}),
        }
      });
      data && setData(data);
      setIsLoading(false);
    } catch(err) {
      setIsLoading(false);
      setError(true);
    }
  }, [select, status])

  useEffect(() => {
      fetchCollections();
  }, [fetchCollections]);

  return {
    data,
    isLoading,
    error
  };
}
