import Link from "next/link"
import { AiOutlineLink } from "react-icons/ai";
import { FaDiscord } from 'react-icons/fa';
import { BsTwitter } from "react-icons/bs";
import { MarketplaceDropdownOptions } from "../wallet-dropdown-options/wallet-dropdown-options";

interface ICollectionHeaderFooterLinksProps {
  address: string;
  discord?: string | null;
  externalUrl?: string | null;
  twitter?: string | null;
  slug: string;
}

export const CollectionHeaderFooterLinks = ({
  address,
  discord,
  externalUrl,
  twitter,
  slug
}: ICollectionHeaderFooterLinksProps) => {
  if (!discord && !externalUrl && !twitter) {
    return null;
  }
  
  return (
    <div className="flex items-center gap-2 mt-1">
      <div className="flex mt-1">
        {twitter && 
          <Link href={`https://www.twitter.com/${twitter}`} target="_blank" className="p-2 hover:bg-gray-200 rounded-md dark:hover:bg-gray-700">
            <BsTwitter className="text-sky-500 dark:text-sky-300" />
          </Link> 
        }
        {discord && 
          <Link href={discord} target="_blank" className="p-2 hover:bg-gray-200 rounded-md dark:hover:bg-gray-700">
            <FaDiscord className="text-indigo-800 dark:text-indigo-500"/>
          </Link>
        }
        {externalUrl && 
          <Link href={externalUrl} target="_blank" className="p-2 hover:bg-gray-200 rounded-md dark:hover:bg-gray-700">
            <AiOutlineLink className="text-gray-700 dark:text-gray-300"/>
          </Link>
        }
      </div>
      <MarketplaceDropdownOptions name="View collection" address={address} appearance="transparent" slug={slug} />
    </div>
  )
}
