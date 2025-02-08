export const UserAuthProvider = () => null;

// import React from 'react';
// import {
//   useWalletLogin,
//   useWalletLogout,
//   useActiveProfile,
//   ProfileOwnedByMe,
// } from '@lens-protocol/react-web';
// import { useAccount, useConnect, useDisconnect } from "wagmi";
// import { InjectedConnector } from 'wagmi/connectors/injected';

// interface UserAuthContext {
//   wallet: ProfileOwnedByMe | null | undefined
//   userAddress: string | null;
//   login: () => void;
//   logout: () => void;
// }

// const UserAuthContext = React.createContext<UserAuthContext>({
//   wallet: null,
//   userAddress: null,
//   login: () => {},
//   logout: () => {},
// });

// export const UserAuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const { execute: login } = useWalletLogin();
//   const { execute: logout } = useWalletLogout();
//   const { data: wallet } = useActiveProfile();
//   const { isConnected } = useAccount();
//   const { disconnectAsync } = useDisconnect();

//   const { connectAsync } = useConnect({
//     connector: new InjectedConnector(),
//   });

//   const [userAddress, setUserAddress] = React.useState<string | null>(null);

//   const handleLogin = React.useCallback(async () => {
//     if (isConnected) {
//       await disconnectAsync();
//     }
//     const { connector } = await connectAsync();
//     if (connector instanceof InjectedConnector) {
//       const walletClient = await connector.getWalletClient();
//       console.log("walletClient on login", walletClient);
//       await login({
//         address: walletClient.account.address,
//       });
//       setUserAddress(walletClient.account.address);
//     }
//   }, [connectAsync, disconnectAsync, isConnected, login]);

//   const handleLogout = React.useCallback(async () => {
//     await logout();
//     setUserAddress(null);
//   }, [logout]);

//   const value: UserAuthContext = {
//     login: handleLogin,
//     logout: handleLogout,
//     userAddress,
//     wallet,
//   };

//   return <UserAuthContext.Provider value={value}>{children}</UserAuthContext.Provider>;
// };

// export const useUserAuth = (): UserAuthContext => {
//   const context = React.useContext(UserAuthContext);
//   if (!context) {
//     throw new Error('useUserAuth must be used within a UserAuthProvider');
//   }
//   return context;
// };
