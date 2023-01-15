import Link from "next/link";
import { useCollections } from "../../hooks/use-collections";
import { CardSkeleton } from "../card/card";
import { MainViewHeader } from "../main-view-header/main-view-header";
import { SearchBar } from "../search-bar/search-bar";
import { Card } from "../card/card";

const SELECT_FROM_COLLECTIONS = "name,slug,image.url,ownersWithTwitterCount,isFeatured";

export const Collections = () =>  {
  const { data: collections, isLoading, error } = useCollections({
    status: "active", 
    select: SELECT_FROM_COLLECTIONS
  });

  if (error || (!isLoading && collections.length === 0)) {
    return (
      <div className="py-6">
        <MainViewHeader title="Sorry, something went wrong 🫣" />
      </div>
    )
  }

  return (
    <>
      <div className="pb-4">
        <div className="flex justify-between">
          <MainViewHeader title={<div>Find your <span className="text-blue-400">Twitter</span> frens!</div>} />
          {collections.length > 0 && <div className="hidden text-right md:block mt-2 text-base text-gray-500 dark:text-neutral-300">
            Collections: <span className="font-semibold">{collections.length}</span>
            {/* TODO: Sort it by list and not grid */}
          </div>}
        </div>
        <div className="md:hidden mt-4 mb-3">
          <SearchBar />
        </div>
      </div>
      <ul role="list" className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
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
    </>
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
