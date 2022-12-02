import { ICollection } from "../../core/collection.interface";
import Image from "next/image";

const SHOW_MAX_MUTUAL_COMMUNITIES = 4;

interface IAvatarsWithPlaceholder {
  collections: ICollection[];
}

export const AvatarsWithPlaceholder = ({collections}: IAvatarsWithPlaceholder) => {


  const placeholderNumber = collections.length - SHOW_MAX_MUTUAL_COMMUNITIES;

  if (!collections || collections.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center">
      <div className="isolate flex -space-x-2 overflow-hidden">
        {collections?.slice(0, SHOW_MAX_MUTUAL_COMMUNITIES).map(({name, image}) => (
          <Image
            key={name}
            className={`relative bg-white dark:bg-neutral-900 inline-block rounded-full ring-2 ring-white dark:ring-neutral-800`}
            src={`/collections/${image}`}
            alt={name}
            loading="lazy"
            width="24"
            height="24"
          />
        ))}
        {placeholderNumber > 0 &&                         
          <span className="relative z-100 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-900 border-2 border-white p-2">
            <span className="font-medium text-sm leading-none text-gray-800">+{placeholderNumber}</span>
          </span>
        }
      </div>
    </div>
  )
}