interface ICard {
  description: string;
  image: string;
  name: string;
}

export const Card = ({image, name, description}: ICard) => (
  <div className="rounded-lg shadow-lg bg-white max-w-sm dark:bg-neutral-800">
    <img className="rounded-t-lg" src={`collections/${image}`} alt={name} />
    <div className="p-4">
      <h5 className="text-gray-900 text-lg font-medium mb-1 dark:text-white">{name}</h5>
      <p className="text-gray-500 text-sm flex items-center dark:text-neutral-200">
        {description}
      </p>
    </div>
  </div>
)

export const CardSkeleton = () => (
  <div role="status" className="p-4 w-full rounded-lg shadow-lg animate-pulse dark:bg-neutral-800">
    <div className="flex justify-center items-center mb-4 h-48 bg-gray-300 rounded dark:bg-gray-700">
      <svg className="w-12 h-12 text-gray-200 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/></svg>
    </div>
    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-4"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-20"></div>
    <span className="sr-only">Loading...</span>
  </div>
)
