import Link from 'next/link';
import { FaDiscord } from 'react-icons/fa';
import { BsGlobe } from 'react-icons/bs';
import { FaXTwitter } from 'react-icons/fa6';
import { MarketplaceDropdownOptions } from '../wallet-dropdown-options/wallet-dropdown-options';
import { BiLinkExternal } from 'react-icons/bi';

interface ICollectionHeaderSocialProps {
  address: string;
  discord?: string | null;
  externalUrl?: string | null;
  twitter?: string | null;
  slug: string;
}

export const CollectionHeaderSocial = ({
  address,
  discord,
  externalUrl,
  twitter,
  slug
}: ICollectionHeaderSocialProps) => (
  <div className="flex items-center flex-col lg:items-end">
    <div className="flex mt-1 items-center">
      {externalUrl && (
        <Link
          href={externalUrl}
          target="_blank"
          className="p-2 hover:bg-gray-200 rounded-md dark:hover:bg-gray-700"
        >
          <BsGlobe className="text-gray-700 dark:text-gray-300" />
        </Link>
      )}
      {twitter && (
        <Link
          href={`https://x.com/${twitter}`}
          target="_blank"
          className="p-2 hover:bg-gray-200 rounded-md dark:hover:bg-gray-700"
        >
          <FaXTwitter className="text-gray-500 dark:text-gray-300" />
        </Link>
      )}
      {discord && (
        <Link
          href={discord}
          target="_blank"
          className="p-2 hover:bg-gray-200 rounded-md dark:hover:bg-gray-700"
        >
          <FaDiscord className="text-indigo-800 dark:text-indigo-500" />
        </Link>
      )}
      <MarketplaceDropdownOptions
        name="View collection"
        icon={<BiLinkExternal />}
        address={address}
        appearance="button"
        slug={slug}
      />
    </div>
  </div>
);
