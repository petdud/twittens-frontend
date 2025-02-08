import { getImage } from '../../utils';
import { INft } from '../../core/nft.interface';

interface IUserNfts {
  nfts?: INft[];
  isLoading: boolean;
}
export const NftPreview = ({ nfts, isLoading }: IUserNfts) => (
  <ul role="list" className="grid grid-cols-3 gap-x-4 gap-y-2">
    {isLoading &&
      ['a1', 'b2', 'c3', 'd4', 'e5', 'f6', 'g7', 'h8', 'i9'].map(key => (
        <div
          key={key}
          role="status"
          className="max-w-sm rounded border-gray-200 shadow animate-pulse"
        >
          <div className="flex justify-center items-center mb-4 h-24 bg-gray-300 rounded dark:bg-gray-700">
            <svg
              className="w-12 h-12 text-gray-200 dark:text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 640 512"
            >
              <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
            </svg>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      ))}
    {!isLoading &&
      nfts?.slice(0, 8).map(nft => <NftPreviewItem nft={nft} key={nft.tokenId} />)}
  </ul>
);

const NftPreviewItem = ({ nft }: { nft: INft }) => {
  const image = getImage(nft);
  const { title } = nft;

  if (!image) {
    return null;
  }

  return (
    <li className="relative">
      <div className="block w-full overflow-hidden bg-gray-100 rounded-lg group aspect-w-10 aspect-h-7 auto-rows-min focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500">
        {image && image?.endsWith('.mp4') ? (
          <video width="320" height="240" controls>
            <source src={image} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={title}
            loading="lazy"
            width="100%"
            height="100%"
            style={{ maxHeight: '264px' }}
            className="object-cover pointer-events-none group-hover:opacity-75 bg-neutral-200 dark:bg-neutral-800"
          />
        )}
        <button
          type="button"
          className="absolute inset-0 focus:outline-none"
          tabIndex={0}
        >
          <span className="sr-only">View details for {title}</span>
        </button>
      </div>
    </li>
  );
};
