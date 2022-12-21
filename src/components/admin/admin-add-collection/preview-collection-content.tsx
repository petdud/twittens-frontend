import { CheckIcon } from "@heroicons/react/20/solid";
import { chainTypes } from "../../../core/collection.interface";
import { CLOUDINARY_COLLECTION_FOUNDER } from "../../../core/constants";
import { useGetCollectionOwners } from "../../../hooks/use-get-collection-owners";
import { AddCollectionProps } from "./admin-add-collection";
import { ICloudinary, UploadWidget } from "./upload-widget";


interface IPreviewCollectionContentProps {
  contractAddress: string;
  chain: chainTypes;
  data: AddCollectionProps;
  onImageUploaded: (info: ICloudinary) => void;
}

export const PreviewCollectionContent = ({contractAddress, chain, data, onImageUploaded}: IPreviewCollectionContentProps) => {
  const { data: owners, isLoading } = useGetCollectionOwners(contractAddress, chain);

  if (!data) {
    return null;
  }

  const {
    slug,
    name,
    description,
    address,
    twitterUsername,
    discordUrl,
    externalUrl,
    totalSupply,
    image,
  } = data;

  const dataItemClassName = "pt-2 font-semibold text-grey-700 dark:text-white";

  return (
    <div className="text-left text-black dark:text-gray-400">
      <h2 className="text-2xl font-bold text-black  dark:text-white">{name}</h2>
      <div className="truncate ... pt-2">{description}</div>
      <div>
        <span className={dataItemClassName}>Total supply: </span>
        <span>{totalSupply}</span>
      </div>
      <div>
        <span className={dataItemClassName}>Owners: </span>
        {isLoading && <span className="text-yellow-700 font-semibold">Loading... please wait</span>}
        {!isLoading && (!owners || owners.length === 0) && <span className="text-red-700 font-semibold">Something wrong, no owners found on API</span>}
        {owners && owners.length > 0 && owners.length > 10000 && <span className="text-red-700 font-semibold">{owners.length} - is that correct?</span>}
        {owners && owners.length > 0 && owners.length <= 10000 && <span className="text-green-700 font-semibold">{owners.length}</span>}
      </div>
      <div>
        <div className={dataItemClassName}>Contract: </div>
        <span>{address}</span>
      </div>
      <div>
        <div className={dataItemClassName}>External URL: </div>
        <span>{externalUrl}</span>
      </div>
      <div>
        <span className={dataItemClassName}>Twitter username: </span>
        {twitterUsername}
      </div>
      <div>
        <span className={dataItemClassName}>Discord URL: </span>
        <span>{discordUrl}</span>
      </div>
      <div>
        <span className={dataItemClassName}>Chain: </span>
        <span>{chain}</span>
      </div>
      {!data.image.id && <UploadWidget folder={CLOUDINARY_COLLECTION_FOUNDER} onSuccess={onImageUploaded} />}
      {data.image.id && <div className="flex items-center gap-2">
      <CheckIcon className="text-green-700 w-6" /> Image uploaded
      </div>}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image.externalUrl} alt={name} className="pt-2 m-auto"/>
    </div>
  )
}
