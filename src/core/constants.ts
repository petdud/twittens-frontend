export const BASE_API_URL = process.env.NEXT_PUBLIC_API_BACKEND_PROD;
// export const BASE_API_URL = "http://localhost:3333/";

// paths in this application (twittens.xyz)
export const LOCAL_API_PATHS = {
  UPDATE_COLLECTION_STATUS: "/api/collections/update-status", // provide collection's slug and new status
  GET_COLLECTIONS: "/api/collections", // get all collections; provide status in query (active, hidden)
  GET_COLLECTION: "/api/collections", // provide collection's slug
  // DELETE_COLLECTION: "/api/collections/:slug/delete", // delete a collection by providing its slug
  GET_COLLECTION_OWNERS: "/api/collections/get-owners", // provide collection's contract address
  EDIT_COLLECTION: "/api/collections/edit", // provide collection's slug and new data
  CREATE_COLLECTION: "/api/collections/create" // create a new collection
}

// paths outside of this application (api.twittens.xyz)
export const API_PATHS = {
  UPDATE_COLLECTION_STATUS: "collections/update-status", // provide collection's slug and new status
  GET_COLLECTION_OWNERS: "collections/get-owners", // provide collection's contract address
  COLLECTIONS: "collections",
  COLLECTIONS_TWITTER_COUNTS: "collections/twitter-counts",
  USERS: "users",
}

export const GOOGLE_FORM_GET_LISTED = "https://forms.gle/ytsimNMo8LiDRbjN8";
export const GOOGLE_FEEDBACK_FORM = "https://forms.gle/QkXy6dr1oGqxJxCP6";
export const HOW_TO_ADD_TWITTER_TO_ENS = "https://dudis.notion.site/How-to-add-your-Twitter-df8b2389dd664d08a85eb333b32f076d";
export const TWITTENS_TWITTER_URL = "https://www.twitter.com/twittensxyz";
export const TWITTENS_DISCORD_URL = "https://discord.gg/txXEVWckAV";
export const OPENSEA_API_ENDPOINT = "https://api.opensea.io/api/v1/"; 

export const CLOUDINARY_COLLECTION_FOUNDER = process.env.NODE_ENV === "production" ? "collections" : "test";
