export const BASE_API_URL = process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_API_BACKEND_PROD : "http://localhost:3333/";

// paths in this application (twittens.xyz)
export const LOCAL_API_PATHS = {
  UPDATE_COLLECTION_STATUS: "/api/collections/update-status", // provide collection's slug and new status
  GET_COLLECTIONS: "/api/collections", // get all collections; provide status in query (active, hidden)
  GET_COLLECTION: "/api/collections", // provide collection's slug
  DELETE_COLLECTION: (slug: string) => `/api/collections/${slug}/delete`, // delete a collection by providing its slug
  UPDATE_COLLECTION: (slug: string) => `/api/collections/${slug}/update`, // update a collection data (users/details) by providing its slug
  GET_COLLECTION_OWNERS: "/api/collections/get-owners", // provide collection's contract address
  EDIT_COLLECTION: "/api/collections/edit", // provide collection's slug and new data
  CREATE_COLLECTION: "/api/collections/create", // create a new collection
  GET_MOST_FOLLOWED_USERS: "/api/users/most-followed",
  GET_MOST_FOLLOWED_COLLECTIONS: "/api/collections/most-followed",
  GET_ACTIVE_USERS_FROM_COLLECTION: (slug: string) => `/api/collections/${slug}/active-users`,
  GET_RECENT_USERS_FROM_COLLECTION: (slug: string) => `/api/collections/${slug}/recent-users`,
  GET_TAGS: () => `/api/tags`,
  GET_MULTI_COLLECTION_ACTIVE_USERS: () => `/api/collections/multi-community-active-users`, // provide multiple slugs separated by comma
  GET_TOP_HOLDERS_FROM_COLLECTION: (slug: string) => `/api/collections/${slug}/top-holders`,
  
}

// paths outside of this application (api.twittens.xyz)
export const API_PATHS = {
  UPDATE_COLLECTION_STATUS: "collections/update-status", // provide collection's slug and new status
  GET_COLLECTION_OWNERS: "collections/get-owners", // provide collection's contract address
  GET_MOST_FOLLOWED_COLLECTIONS: "collections/most-followed",
  COLLECTIONS: "collections",
  USERS: "users",
  GET_MOST_FOLLOWED_USERS: "users/most-followed",
  UPDATE_COLLECTION: "collections/update", // provide collection's slug - update collection data (details and members)
  GET_ACTIVE_USERS_FROM_COLLECTION: (slug: string) => `collections/${slug}/active-users`,
  GET_RECENT_USERS_FROM_COLLECTION: (slug: string) => `collections/${slug}/recent-users`,
  GET_TAGS: () => `tags`,
  GET_MULTI_COLLECTION_ACTIVE_USERS: () => `collections/multi-community-active-users`, // provide multiple slugs separated by comma
  GET_TOP_HOLDERS_FROM_COLLECTION: (slug: string) => `collections/${slug}/top-holders`,
}

export const ROUTES = {
  FEEDBACK: "/feedback",
  GET_LISTED: "/get-listed",
  TWITTER: "/twitter",
  DISCORD: "/discord",
  HOW_TO_ADD_TWITTER: "/how-to-add-twitter",
  LENSENS: "https://lensens.xyz"
}

export const SET_TWITTER_URL = "https://set.twittens.xyz";

export const GOOGLE_FORM_GET_LISTED = "https://forms.gle/ytsimNMo8LiDRbjN8";
export const GOOGLE_FEEDBACK_FORM = "https://forms.gle/QkXy6dr1oGqxJxCP6";
export const HOW_TO_ADD_TWITTER_TO_ENS = "https://dudis.notion.site/How-to-add-your-Twitter-df8b2389dd664d08a85eb333b32f076d";
export const TWITTENS_TWITTER_URL = "https://www.twitter.com/twittensxyz";
export const TWITTENS_DISCORD_URL = "https://discord.gg/txXEVWckAV";

export const OPENSEA_API_ENDPOINT = "https://api.opensea.io/api/v1/"; 

export const CLOUDINARY_COLLECTION_FOLDER = process.env.NODE_ENV === "production" ? "collections" : "test";
