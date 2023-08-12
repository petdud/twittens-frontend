import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { IUser } from '../core/collection.interface';
import { LOCAL_API_PATHS } from '../core/routes';

const SOCIAL = 'twitter';

export const useGetUsersByCollectionTag = (tag: string) => {
  const [data, setData] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchUsersByCollectionTag = useCallback(async () => {
    try {
      const { data } = await axios.get(
        LOCAL_API_PATHS.GET_USERS_BY_COLLECTION_TAG() +
          '?social=' +
          SOCIAL +
          '&' +
          'tag=' +
          tag
      );
      data && setData(data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError(true);
    }
  }, [tag]);

  useEffect(() => {
    fetchUsersByCollectionTag();
  }, [fetchUsersByCollectionTag]);

  return {
    data,
    isLoading,
    error
  };
};
