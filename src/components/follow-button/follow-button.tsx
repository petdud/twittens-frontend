// import React from 'react';
// // import {
// //   Profile,
// //   ProfileOwnedByMe,
// //   useFollow,
// //   useUnfollow
// // } from '@lens-protocol/react-web';
// import { FaSpinner } from 'react-icons/fa';
// import { FiUserPlus } from 'react-icons/fi';
// // import { useUserAuth } from '../../core/user-auth-provider';
// import { Spinner } from '../spinner/spinner';
// import { classNames } from '../../utils';
// import { FEATURE_FLAGS } from '../../core/feature-flags';

// const BUTTON_CLASS =
//   'px-2 py-1 text-sm inline-flex self-center items-center rounded-md shadow-sm gap-2';
// const BUTTON_FOCUS_CLASS =
//   'focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-gray-100';

// interface IFollowButtonProps {
//   profile: Profile;
//   onHandleFollow?: (event: React.SyntheticEvent) => void;
//   onHandleUnfollow?: (event: React.SyntheticEvent) => void;
// }

// export const FollowButton = (props: IFollowButtonProps) => {
//   const { wallet } = useUserAuth();
//   const { followStatus, ownedByMe } = props.profile;

//   if (!wallet || !followStatus || ownedByMe || !FEATURE_FLAGS.ENABLE_FOLLOW_USERS) {
//     return null;
//   }

//   const { canFollow, canUnfollow, isFollowedByMe } = followStatus;

//   if (!isFollowedByMe) {
//     return <FollowButtonAction isEnabled={canFollow} wallet={wallet} {...props} />;
//   }

//   if (isFollowedByMe) {
//     return <UnfollowButtonAction isEnabled={canUnfollow} wallet={wallet} {...props} />;
//   }

//   return null;
// };

// interface IActionButton extends IFollowButtonProps {
//   wallet: ProfileOwnedByMe;
//   isEnabled: boolean;
// }

// interface IFollowButtonActionProps extends Omit<IActionButton, 'onHandleUnfollow'> {}

// const FollowButtonAction = ({
//   isEnabled,
//   profile,
//   wallet,
//   onHandleFollow
// }: IFollowButtonActionProps) => {
//   const [followExecuted, setFollowExecuted] = React.useState(false);
//   const {
//     execute: follow,
//     error,
//     isPending
//   } = useFollow({
//     followee: profile,
//     follower: wallet
//   });

//   const handleFollow = React.useCallback(
//     (event: React.SyntheticEvent) => {
//       onHandleFollow?.(event);
//       follow();
//       setFollowExecuted(true);
//     },
//     [follow, onHandleFollow]
//   );

//   if (isPending) {
//     return <Spinner />;
//   }

//   if (error) {
//     console.log('error', error);
//     return <ErrorMessage message={error.message} />;
//   }

//   return (
//     <button
//       className={classNames(
//         BUTTON_CLASS,
//         BUTTON_FOCUS_CLASS,
//         'font-medium text-white bg-black ',
//         'dark:text-black dark:bg-white ',
//         'border border-gray-300',
//         isEnabled ? 'cursor-pointer' : 'opacity-60 cursor-not-allowed',
//         isEnabled
//           ? 'hover:bg-violet-600 hover:dark:bg-violet-600 hover:dark:text-white hover:border-violet-500'
//           : ''
//       )}
//       onClick={handleFollow}
//       disabled={isPending || !isEnabled ? true : false}
//     >
//       {(followExecuted && !isEnabled) || isPending ? <FaSpinner /> : <FiUserPlus />}{' '}
//       Follow
//     </button>
//   );
// };

// interface IUnfollowButtonActionProps extends Omit<IActionButton, 'onHandleFollow'> {}

// const UnfollowButtonAction = ({
//   isEnabled,
//   profile,
//   wallet,
//   onHandleUnfollow
// }: IUnfollowButtonActionProps) => {
//   const [unfollowExecuted, setUnfollowExecuted] = React.useState(false);
//   const {
//     execute: unfollow,
//     error,
//     isPending
//   } = useUnfollow({
//     followee: profile,
//     follower: wallet
//   });
//   const [isHovered, setIsHovered] = React.useState(false);

//   const handleUnfollow = React.useCallback(
//     (event: React.SyntheticEvent) => {
//       onHandleUnfollow?.(event);
//       unfollow();
//       setUnfollowExecuted(true);
//     },
//     [unfollow, onHandleUnfollow]
//   );

//   const handleMouseEnter = () => {
//     setIsHovered(true);
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//   };

//   if (isPending) {
//     return <Spinner />;
//   }

//   if (error) {
//     console.log('error', error);
//     return <ErrorMessage message={error.message} />;
//   }

//   return (
//     <button
//       className={classNames(
//         BUTTON_CLASS,
//         BUTTON_FOCUS_CLASS,
//         'text-neutral-800 bg-white',
//         'dark:text-slate-50 dark:bg-neutral-800',
//         'border border-gray-300 dark:border-gray-500 ',
//         isEnabled ? 'cursor-pointer' : 'opacity-60 cursor-not-allowed',
//         isEnabled
//           ? 'hover:font-medium hover:dark:border-red-500 hover:border-red-500 hover:text-red-500 hover:dark:text-red-500'
//           : ''
//       )}
//       onClick={handleUnfollow}
//       disabled={isPending || !isEnabled ? true : false}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       {(unfollowExecuted && !isEnabled) || isPending ? <FaSpinner /> : null}
//       {isHovered ? 'Unfollow' : 'Following'}
//     </button>
//   );
// };

// const ErrorMessage = ({ message }: { message: string }) => (
//   <div className="text-red-500 text-xs">{message}</div>
// );
