import React, { createContext, useState, useContext } from 'react';
import { UserPreviewModal } from '../components/user-preview-modal/user-preview-modal';
import { ICollection, IUser } from './collection.interface';
import { useCollections } from '../hooks/use-collections';

export enum PAGES {
  Profile = "Profile",
  Followers = "Followers",
  Following = "Following",
  Posts = "Posts",
  Communities = "Communities",
}

const USER_PROFILE_URL_PARAM = "profile";

interface IUserProfileModalContext {
  isOpen: boolean;
  collections: ICollection[];
  user: IUser | null;
  openUserProfile: (user: IUser, page?: PAGES) => void;
  closeUserProfile: () => void;
  currentPage: PAGES;
  changePage: (page: PAGES) => void;
}

const UserProfileModalContext = createContext<IUserProfileModalContext>({
  isOpen: false,
  collections: [],
  user: null,
  currentPage: PAGES.Profile,
  openUserProfile: () => {},
  closeUserProfile: () => {},
  changePage: () => {}
});

export const UserProfileModalProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: collections } = useCollections({select: "slug,name,image.thumbnailUrl"});
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [page, setPage] = useState(PAGES.Profile);

  const openUserProfile = (user: IUser, page?: PAGES) => {
    setPage(page || PAGES.Profile);
    addProfileToUrl(user);
    setUser(user);
    setIsOpen(true);
  };

  const closeUserProfile = () => {
    removeProfileFromUrl();
    setUser(null);
    setIsOpen(false);
  };

  const changePage = (page: PAGES) => {
    setPage(page);
  }

  React.useEffect(() => {
    const profileName = getProfileFromUrl();
    if (!profileName) {
      return;
    }
    // TODO: FIX THIS
    // const user = dataUsers.find(user => user.address === profileName?.toLowerCase() || user.name === profileName?.toLowerCase());
    // user && setSelectedUser(user);
    // setOpenProfile(Boolean(profileName));
  }, []);


  return (
    <UserProfileModalContext.Provider
      value={{
        collections,
        isOpen,
        user,
        openUserProfile,
        closeUserProfile,
        currentPage: page,
        changePage,
      }}
    >
      {children}
      {isOpen && user && (
        <UserPreviewModal open={isOpen}  onClose={closeUserProfile} user={user} collections={collections} />
      )}
    </UserProfileModalContext.Provider>
  );
};

export const useUserProfileModal = () => useContext(UserProfileModalContext);

const getProfileFromUrl = () => {
  const urlParams = new URLSearchParams(location.search);
  const profileName = urlParams.get(USER_PROFILE_URL_PARAM);
  return profileName;
}

const addProfileToUrl = (user: IUser) => {
  const urlParams = new URLSearchParams(location.search);
  urlParams.set(USER_PROFILE_URL_PARAM, user.name || user.address);
  const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
  window.history.replaceState({ path: newUrl }, '', newUrl);
}

const removeProfileFromUrl = () => {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.delete(USER_PROFILE_URL_PARAM);
  const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
  window.history.replaceState({ path: newUrl }, '', newUrl);
}
