import axios from "axios";
import React from "react";

const formatPicture = (url: string) => {
  if (url.startsWith('ipfs://')) {
    let result = url.substring(7, url.length)
    return `http://lens.infura-ipfs.io/ipfs/${result}`
  } else if (url.startsWith('ar://')) {
    let result = url.substring(4, url.length)
    return `http://arweave.net/${result}`
  } else {
    return url
  }
}

export const useAvatar = (ensName: string | undefined) => {
  const [avatar, setAvatar] = React.useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  const fetchAvatar = React.useCallback(async () => {
    try {
      const url = `https://metadata.ens.domains/mainnet/avatar/${ensName}/meta`;
      const response = await axios.get(url);
      if (response?.data?.image) {
        setAvatar(formatPicture(response.data.image));
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching avatar:', error);
      setError(true);
    }
  }, [ensName]);

  React.useEffect(() => {
    fetchAvatar();
  }, [fetchAvatar]);

  return {
    avatar,
    isLoading,
    error
  };
};
