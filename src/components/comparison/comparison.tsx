import React from "react"
import { ComparisonInput } from "./comparison-input"
import axios from "axios";
import { LOCAL_API_PATHS } from "../../core/routes";
import { UserList } from "../user-list/user-list";

const MAX_COLLECTIONS = 2;

export const Comparison = () => {
  const [collections, setCollections] = React.useState<string[]>([]);
  const [users, setUsers] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    const slugs = collections.join(",");
    try {
      const { data } = await axios.get(LOCAL_API_PATHS.GET_MULTI_COLLECTION_ACTIVE_USERS() + "?slugs=" + slugs);
      data && setUsers(data.users);
      console.log("data",data)
      setIsLoading(false);
    } catch(err) {
      console.log(`Error fetching collections ${slugs}:`, err);
      setIsLoading(false);
    }
  }

  const addCollection = (collection: string) => {
    if (collections.length < MAX_COLLECTIONS) {
      setCollections([...collections, collection]);
    }
  }

  const removeCollection = (collection: string) => {
    setCollections(collections.filter(c => c !== collection));
  }

  return (
    <div>
      {[...Array(MAX_COLLECTIONS)].map((_, index) => 
        <ComparisonInput key={index} id={`comparison-input-${index}`} addCollection={addCollection} removeCollection={removeCollection} />
      )}
      <div className="pt-4">
        <button
          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 dark:bg-indigo-800 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={handleClick}
        >
          Find twitter users
        </button>
      </div>
      <UserList 
          onUserClick={() => false}
          collections={[]}
          users={users}
          slug={""}
          isLoading={isLoading}
      />
    </div>
  )
}