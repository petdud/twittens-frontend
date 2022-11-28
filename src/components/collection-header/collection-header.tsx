interface ICollectionHeader {
  name: string | JSX.Element;
  image: string;
  description?: string | JSX.Element;
  rightButtons?: JSX.Element;
  social: JSX.Element;
}

export const CollectionHeader = ({name, image, description, rightButtons}: ICollectionHeader) => (
  <div className="md:flex md:items-center md:justify-between md:space-x-5">
    <div className="flex items-start space-x-5">
      <div className="flex-shrink-0">
        <div className="relative">
          <img
            className="h-24 w-24 rounded-full"
            src={image}
            alt={name}
          />
          <span className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
        </div>
      </div>
      {/*
        Use vertical padding to simulate center alignment when both lines of text are one line,
        but preserve the same layout if the text wraps without making the image jump around.
      */}
      <div className="pt-1.5">
        <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
        {description && <p className="text-sm font-medium text-gray-500">
          {description}
        </p>}
      </div>
    </div>
    {rightButtons && <div className="justify-stretch mt-6 flex flex-col-reverse space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-y-0 sm:space-x-3 sm:space-x-reverse md:mt-0 md:flex-row md:space-x-3">
      {rightButtons}
    </div>}
  </div>

)