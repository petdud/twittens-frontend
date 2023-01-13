const SHOW_MAX_MUTUAL_COMMUNITIES = 4;

interface IAvatarsWithPlaceholder {
  maxImages?: number;
  images: IAvatarWithPlaceholderImage[]
}

export interface IAvatarWithPlaceholderImage {
  imageUrl: string;
  name: string;
}

export const AvatarsWithPlaceholder = ({images, maxImages}: IAvatarsWithPlaceholder) => {
  const placeholderNumber = images.length - (maxImages || SHOW_MAX_MUTUAL_COMMUNITIES);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center">
      <div className="isolate flex -space-x-2 overflow-hidden">
        {images?.slice(0, SHOW_MAX_MUTUAL_COMMUNITIES).map(({imageUrl, name}) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            key={name}
            className="inline-block h-5 w-5 rounded-full"
            src={imageUrl}
            alt={name}
          />
        ))}
        {placeholderNumber > 0 &&                         
          <span className="relative z-100 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-900 border-2 border-white dark:border-neutral-700 p-2">
            <span className="font-medium text-sm leading-none text-gray-600 dark:text-neutral-200">+{placeholderNumber}</span>
          </span>
        }
      </div>
    </div>
  )
}
