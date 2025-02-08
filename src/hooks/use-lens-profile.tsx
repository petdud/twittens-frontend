import React from 'react';
import { Profile, useProfile } from '@lens-protocol/react-web';
import { ILensProfile } from '../core/collection.interface';

export type GeneralLensProfile = ILensProfile | Profile | null | undefined;

// Type guard to check if the value is of type Profile
export function isProfile(profile: GeneralLensProfile): profile is Profile {
  return (
    profile !== null &&
    profile !== undefined &&
    (profile as any).followStatus !== undefined
  );
}

export const useLensProfile = (storedProfile: ILensProfile | null) => {
  let { data: fetchedProfile, loading } = useProfile({
    forHandle: storedProfile?.handle || '' // it has been changed
  });

  const isProfileFetched =
    storedProfile &&
    fetchedProfile &&
    storedProfile?.id === fetchedProfile?.id &&
    !loading;

  const profile = React.useMemo(
    () => (isProfileFetched ? fetchedProfile : storedProfile),
    [fetchedProfile, isProfileFetched, storedProfile]
  );

  return {
    storedProfile,
    fetchedProfile,
    profile,
    loading
  };
};
