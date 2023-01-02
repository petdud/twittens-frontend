/** ALCHEMY */

export interface INftsData {
  /** The NFTs owned by the provided address. */
  ownedNfts: INft[];
  /**
   * Pagination token that can be passed into another request to fetch the next
   * NFTs. If there is no page key, then there are no more NFTs to fetch.
   */
  pageKey?: string;
  /** The total count of NFTs owned by the provided address. */
  totalCount: number;
}

export interface INft {
  /** The NFT title. */
  title: string;
  /** The NFT description. */
  description: string;
  /** When the NFT was last updated in the blockchain. Represented in ISO-8601 format. */
  timeLastUpdated: string;
  /** Holds an error message if there was an issue fetching metadata. */
  metadataError: string | undefined;
  /**
   * The raw metadata fetched from the metadata URL specified by the NFT. The
   * field is undefined if Alchemy was unable to fetch metadata.
   */
  rawMetadata: NftMetadata | undefined;
  /** URIs for accessing the NFT's metadata blob. */
  tokenUri: TokenUri | undefined;
  /** URIs for accessing the NFT's media assets. */
  media: Media[];

  contract: BaseNftContract;
  /** The NFT token ID as an integer string. */
  tokenId: string;
  /** The type of ERC token, if known. */
  tokenType: NftTokenType;
}

/**
 * Represents NFT metadata that holds fields. Note that since there is no
 * standard metadata format, the fields are not guaranteed to be present.
 */
export interface NftMetadata extends Record<string, any> {
  /** Name of the NFT asset. */
  name?: string;
  /** A human-readable description of the NFT asset. */
  description?: string;
  /** URL to the NFT asset image. */
  image?: string;
  /**
   * The image URL that appears along the top of the NFT asset page. This tends
   * to be the highest resolution image.
   */
  external_url?: string;
  /** Background color of the NFT item. Usually defined as a 6 character hex string. */
  background_color?: string;
  /** The traits, attributes, and characteristics for the NFT asset. */
  attributes?: Array<Record<string, any>>;
}

/**
 * Represents the URI information the NFT's metadata.
 */
export interface TokenUri {
  /**
   * URI for the location of the NFT's original metadata blob (ex: the original
   * IPFS link).
   */
  raw: string;
  /** Public gateway URI for the raw URI. Generally offers better performance. */
  gateway: string;
}

/**
 * Represents the URI information for the NFT's media assets.
 */
export interface Media {
  /**
   * URI for the location of the NFT's original metadata blob for media (ex: the
   * original IPFS link).
   */
  raw: string;
  /** Public gateway URI for the raw URI. Generally offers better performance. */
  gateway: string;
  /** URL for a resized thumbnail of the NFT media asset. */
  thumbnail?: string;
  /**
   * The media format (ex: jpg, gif, png) of the {@link gateway} and
   * {@link thumbnail} assets.
   */
  format?: string;
}

/**
 * An enum for specifying the token type on NFTs.
 */
export declare enum NftTokenType {
  ERC721 = "ERC721",
  ERC1155 = "ERC1155",
  UNKNOWN = "UNKNOWN"
}

/**
 * Alchemy representation of a base NFT contract that doesn't contain metadata.
 */
export interface BaseNftContract {
  address: string;
}
