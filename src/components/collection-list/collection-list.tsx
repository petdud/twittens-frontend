import { useCollections } from "../../hooks/use-collections";
import { MainViewHeader } from "../main-view-header/main-view-header";
import { SearchBar } from "../search-bar/search-bar";
import { CollectionItem } from "./collection-item";


export const CollectionList = () =>  {
  const { data: collections, isLoading } = useCollections();

  return (
    <div className="md:py-6 py-2">
      <div className="pb-4">
        <MainViewHeader title={<div>Find your <span className="text-blue-400">Twitter</span> frens!</div>} />
        <div className="md:hidden px-6 mt-4 mb-3">
          <SearchBar />
        </div>
      </div>
      <div className="max-w-full px-4 sm:px-6 md:px-8 mx-5">
        <ul role="list" className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {collections && collections?.map(({image, name, users, slug}) => {
            const userTwitterCount = users.filter(user => user.twitter).length;
            return ( 
              <CollectionItem key={slug} description={`${userTwitterCount} members are on Twitter`} image={image} name={name} path={`/collections/${slug}`} />
            )
          })}
        </ul>
      </div>
    </div>
  )
}
