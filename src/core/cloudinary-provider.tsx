import { Cloudinary } from '@cloudinary/url-gen';
import React from 'react';

interface ICloudinaryProviderProps {
  children: JSX.Element;
}

const CloudinaryContext = React.createContext({} as Cloudinary);
CloudinaryContext.displayName = 'CloudinaryContext';

export const CloudinaryProvider = ({ children }: ICloudinaryProviderProps) => {
  const myCld = new Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    },
    url: {
      secure: true
    }
  });

  return (
    <CloudinaryContext.Provider value={myCld}>{children}</CloudinaryContext.Provider>
  );
};

export function useCloudinaryContext() {
  return React.useContext(CloudinaryContext);
}
