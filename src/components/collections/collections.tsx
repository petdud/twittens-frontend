import Link from "next/link";
import { CardSkeleton } from "../card/card";
import { Card } from "../card/card";
import { ICollection } from "../../core/collection.interface";
import { classNames } from "../../utils";
import { MainViewHeader } from "../main-view-header/main-view-header";

interface ICollectionsProps {
  isLoading?: boolean;
  collections: ICollection[];
  isHorizontal?: boolean;
  title?: string;
}

export const Collections = ({isLoading, collections, isHorizontal, title}: ICollectionsProps) =>  {
  const containerClass = isHorizontal || isLoading ? "flex overflow-x-auto hide-scrollbar space-x-6" : "grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6";

  return (
    <>
      {title && (isLoading || collections?.length > 0) && 
        <div className="pb-4 mt-8">
          <MainViewHeader title={title} />
        </div>
      }
      <ul role="list" className={containerClass}>
        {isLoading ? 
          ["1a", "2a", "3a", "4a", "5a", "6a"].map(i =>  (
            <li key={i} className={classNames("flex justify-center relative top-0", isHorizontal ? "w-96" : "")}>
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
              isHorizontal={isHorizontal}
            />
          ))
        }
      </ul>
    </>
  )
}

interface ICollectionsItemProps {
  imageUrl: string;
  name: string;
  path: string;
  isFeatured: boolean;
  description?: string;
  isHorizontal?: boolean;
}

const CollectionsItem = ({ description, isFeatured, imageUrl, name, path, isHorizontal}: ICollectionsItemProps) => {
  const className = isHorizontal ? "flex-shrink-0 w-52 md:w-60" : "";

  return (
    <li className={className}>
      <Link href={path} className="flex justify-center relative top-0 hover:-top-1 transition top-ease delay-200">
        <Card description={description} imageUrl={imageUrl} name={name} isFeatured={isFeatured} />
      </Link>
    </li>
  )
}
