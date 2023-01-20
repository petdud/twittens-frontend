import Link from "next/link";
import { CardSkeleton } from "../card/card";
import { Card } from "../card/card";
import { ICollection } from "../../core/collection.interface";

interface ICollectionsProps {
  isLoading?: boolean;
  collections: ICollection[];
}

export const Collections = ({isLoading, collections}: ICollectionsProps) =>  {
  return (
    <ul role="list" className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {isLoading ? 
        ["1a", "2a", "3a", "4a", "5a", "6a", "7a", "8a", "9a"].map(i =>  (
          <li key={i} className="flex justify-center relative top-0">
            <CardSkeleton />
          </li>
        ))
      :
        collections && collections?.map(({isFeatured, image, name, slug, ownersWithTwitterCount}) => ( 
          <CollectionsItem
            key={slug}
            description={ownersWithTwitterCount ? `${ownersWithTwitterCount} members on Twitter` : undefined}
            isFeatured={!!isFeatured}
            imageUrl={image?.url}
            name={name}
            path={`/collections/${slug}`}
          />
        ))
      }
    </ul>
  )
}

interface ICollectionsItemProps {
  imageUrl: string;
  name: string;
  path: string;
  isFeatured: boolean;
  description?: string;
}

const CollectionsItem = ({ description, isFeatured, imageUrl, name, path}: ICollectionsItemProps) => (
  <li>
    <Link href={path} className="flex justify-center relative top-0 hover:-top-1 transition top-ease delay-200">
      <Card description={description} imageUrl={imageUrl} name={name} isFeatured={isFeatured} />
    </Link>
  </li>
)
