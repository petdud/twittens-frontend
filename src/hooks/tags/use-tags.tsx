import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { ITag } from "../../core/collection.interface";
import { LOCAL_API_PATHS } from "../../core/routes";

export const useTags = () => {
  const [data, setData] = useState<ITag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchTags = useCallback(async () => {
    try {
      const { data } = await axios.get(LOCAL_API_PATHS.GET_TAGS());
      data && setData(data);
      setIsLoading(false);
    } catch(err) {
      setIsLoading(false);
      setError(true);
    }
  }, [])

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  return {
    data,
    isLoading,
    error
  };
}
