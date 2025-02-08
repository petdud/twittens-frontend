import { FaWallet } from 'react-icons/fa';
import { useUserAuth } from '../../core/user-auth-provider';
import { Dropdown, DropdownMenuItemClick } from '../dropdown/dropdown';
import React from 'react';

export const UserAuth = () => {
  const [isSmallScreen, setIsSmallScreen] = React.useState(false);
  const { login, logout, wallet } = useUserAuth();

  const checkScreenSize = React.useCallback(() => {
    setIsSmallScreen(window.innerWidth <= 768);
  }, []);

  React.useEffect(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [checkScreenSize]);

  if (isSmallScreen) {
    return null;
  }

  return (
    <>
      {!wallet && (
        <button
          className="inline-flex items-center rounded-md text-sm font-medium text-neutral-800 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-gray-100 px-2.5 py-1.5 border border-violet-500 bg-white dark:bg-neutral-800 hover:bg-gray-50 shadow-sm gap-2"
          onClick={login}
        >
          <FaWallet /> Connect wallet
        </button>
      )}

      {wallet && (
        <Dropdown
          name={
            <div className="inline-flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {wallet.picture?.__typename === 'MediaSet' && (
                <img
                  width="200"
                  height="200"
                  alt={wallet.handle}
                  className="rounded-full w-6 h-6"
                  src={wallet.picture?.original?.url}
                />
              )}
              {wallet.handle}
            </div>
          }
          appearance="button"
        >
          <DropdownMenuItemClick
            name="Disconnect"
            onClick={() => logout()}
            isSelected={false}
          />
        </Dropdown>
      )}
    </>
  );
};
