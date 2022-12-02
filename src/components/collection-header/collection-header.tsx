
import Image from "next/image";

interface ICollectionHeader {
  name: string | JSX.Element;
  image: string;
  description?: string | JSX.Element;
  imageAlt: string;
  rightButtons?: JSX.Element;
  social: JSX.Element;
}

export const CollectionHeader = ({name, description, image, imageAlt, rightButtons, social}: ICollectionHeader) => (
  <div className="md:flex md:items-center md:justify-between md:space-x-5">
    <div className="flex items-start space-x-5">
      <div className="flex-shrink-0">
        <div className="relative">
          <Image
            className="rounded-full"
            src={image}
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
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{name}</h1>
          {description && <p className="text-sm font-medium text-gray-500">
            {description}
          </p>}
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
      <svg className="w-28 h-28 text-gray-200 dark:text-gray-700" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>
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
