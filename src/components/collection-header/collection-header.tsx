interface ICollectionHeader {
  name: string | JSX.Element;
  imageUrl: string;
  description?: string | JSX.Element;
  imageAlt: string;
  rightButtons?: JSX.Element;
  social: JSX.Element;
}

export const CollectionHeader = ({name, description, imageUrl, imageAlt, rightButtons, social}: ICollectionHeader) => (
  <div className="md:flex md:items-center md:justify-between md:space-x-5">
    <div className="flex items-start space-x-5">
      <div className="flex-shrink-0">
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="rounded-full"
            src={imageUrl}
            width={96}
            height={96}
            alt={imageAlt}
          />
          <span className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
        </div>
      </div>
      {/*
        Use vertical padding to simulate center alignment when both lines of text are one line,
        but preserve the same layout if the text wraps without making the image jump around.
      */}
      <div className="pt-1 flex justify-between items-between flex-col grow">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-neutral-200">{name}</h1>
          {description && <div className="text-sm font-medium text-gray-500 dark:text-neutral-400 pt-1">
            {description}
          </div>}
        </div>
        {social}
      </div>
    </div>
    {rightButtons && <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
      {rightButtons}
    </div>}
  </div>
)

export const CollectionHeaderSkeleton = () => (
  <div role="status" className="w-full animate-pulse dark:border-gray-700">  
    <div className="flex items-center space-x-3">
      <div className="flex ml-4 justify-center items-center w-28 h-28 bg-gray-300 rounded dark:bg-gray-700">
        <svg className="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/></svg>
      </div>

      <div>
        <div className="h-3.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
      </div>
    </div>
    <span className="sr-only">Loading...</span>
  </div>
)
