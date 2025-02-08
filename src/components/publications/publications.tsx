export const Publications = () => null;

// import React from 'react';
// import { ProfileId, usePublications } from '@lens-protocol/react-web';
// import ReactMarkdown from 'react-markdown';
// import { GENERIC_AVATAR, formatDate, formatPicture, formatTimeAgo } from '../../utils';
// import { Spinner } from '../spinner/spinner';
// import { ShowMoreButton } from '../user-preview-modal/user-preview-modal-list';
// import { GeneralLensProfile } from '../../hooks/use-lens-profile';

// const LIMIT = 10;

// export const Publications = ({ profile }: { profile: GeneralLensProfile }) => {
//   const { data, hasMore, next, loading } = usePublications({
//     profileId: profile?.id as ProfileId,
//     limit: LIMIT
//   });

//   const publications = React.useMemo(
//     () =>
//       data?.map(publication => {
//         if (publication.__typename === 'Mirror') {
//           return publication.mirrorOf;
//         } else {
//           return publication;
//         }
//       }),
//     [data]
//   );

//   return (
//     <>
//       {!loading && publications?.length === 0 ? (
//         <div className="dark:text-white">The user hasn&apos;t posted anything yet.</div>
//       ) : (
//         publications?.map(
//           (pub: any, index: number) =>
//             profile && <Publication key={index} pub={pub} profile={profile} />
//         )
//       )}
//       {loading && <Spinner />}
//       {!loading && hasMore && next && !(publications && publications.length < LIMIT) && (
//         <ShowMoreButton onClick={next} />
//       )}
//     </>
//   );
// };

// const Publication = ({ profile, pub }: { pub: any; profile: GeneralLensProfile }) => {
//   const onImageError = React.useCallback((event: any) => {
//     event.target.onerror = null;
//     event.target.src = GENERIC_AVATAR;
//   }, []);

//   return (
//     <div className="py-4 bg-slate-100 dark:bg-zinc-900 rounded mb-4 px-4 dark:text-white">
//       <div className="flex items-start">
//         <div className="mr-2">
//           <div
//             className="w-8 h-8 overflow-hidden rounded-full"
//             style={{ aspectRatio: '1/1' }}
//           >
//             {/* eslint-disable-next-line @next/next/no-img-element */}
//             <img
//               src={formatPicture(profile?.picture)}
//               alt={profile?.handle}
//               aria-hidden="true"
//               className="w-full h-full object-cover"
//               onError={onImageError}
//             />
//           </div>
//         </div>
//         <div className="flex-grow">
//           <div className="flex items-center mb-1">
//             <span className="font-medium mr-1">{profile?.name}</span>
//             <span
//               className="text-xs text-gray-500 dark:text-gray-400 ml-1"
//               title={formatDate(pub.createdAt)}
//             >
//               {formatTimeAgo(pub.createdAt)}
//             </span>
//           </div>
//           <ReactMarkdown className="overflow-wrap-anywhere break-spaces max-w-full">
//             {pub.metadata.content}
//           </ReactMarkdown>
//           {pub.metadata?.media[0]?.original &&
//             ['image/jpeg', 'image/png'].includes(
//               pub.metadata?.media[0]?.original.mimeType
//             ) && (
//               <a
//                 href={formatPicture(pub.metadata.media[0])}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {/* eslint-disable-next-line @next/next/no-img-element */}
//                 <img
//                   width="300"
//                   height="300"
//                   alt={profile?.handle}
//                   className="rounded-xl mt-6 mb-2"
//                   src={formatPicture(pub.metadata.media[0])}
//                 />
//               </a>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };
