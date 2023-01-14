import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { ICollectionApiData } from "../core/collection.interface";
import { LOCAL_API_PATHS } from "../core/routes";

interface IOptions {
  select?: string; // string separated by commas
}

export const useCollection = (slug: string, options: IOptions = {}): {data?: ICollectionApiData, isLoading: boolean, error: boolean} => {
  const select = options.select;
  const [data, setData] = useState<ICollectionApiData>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchCollection = useCallback(async (slug: string) => {
    try {
      const { data } = await axios.get(`${LOCAL_API_PATHS.GET_COLLECTION}/${slug}`, {
        params: {
          ...(select && {select}),
        }
      });
      data && setData(data);
      setIsLoading(false);
    } catch(err) {
      console.log(`Error fetching collection ${slug}:`, err);
      setIsLoading(false);
      setError(true);
    }
  }, [select])

  useEffect(() => {
    slug && fetchCollection(slug);
  }, [fetchCollection, slug]);

  return {
    data,
    isLoading,
    error
  };
}
