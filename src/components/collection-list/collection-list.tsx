import { useCollections } from "../../hooks/use-collections";
import { CardSkeleton } from "../card/card";
import { MainViewHeader } from "../main-view-header/main-view-header";
import { SearchBar } from "../search-bar/search-bar";
import { CollectionItem } from "./collection-item";


export const CollectionList = () =>  {
  const { data: collections, isLoading, error } = useCollections();

  if (error || (!isLoading && collections.length === 0)) {
    return (
      <div className="md:py-6 py-2 mb-12">
        <div className="pb-4">Sorry, something went wrong 🫣</div>
      </div>
    )
  }

  return (
    <div className="md:py-6 py-2 mb-12">
      <div className="pb-4">
        <MainViewHeader title={<div>Find your <span className="text-blue-400">Twitter</span> frens!</div>} />
        <div className="md:hidden px-6 mt-4 mb-3">
          <SearchBar />
        </div>
      </div>
      <div className="max-w-full px-2 sm:px-6 md:px-8 mx-2 md:mx-5">
        <ul role="list" className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {isLoading ? 
            Array.from(Array(10)).map(i =>  (
              <li key={i} className="flex justify-center relative top-0">
                <CardSkeleton />
              </li>
            ))
          :           
            collections && collections?.map(({image, name, users, slug}) => {
              const userTwitterCount = users.filter(user => user.twitter).length;
              return ( 
                <CollectionItem key={slug} description={`${userTwitterCount} members on Twitter`} image={image} name={name} path={`/collections/${slug}`} />
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}
