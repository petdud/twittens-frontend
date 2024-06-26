type SafelistRequestedStats = 'requested' | 'not_requested' | 'approved' | 'verified';

interface IOpenSeaDisplayData {
  card_display_style: 'contain';
}

interface Contract {
  address: string; // "0xf9c12bd715df34c7850766a48178648ac0cb200d"
  chain: string;
}

interface IPrimaryAssetContract {
  address: string; // "0xf9c12bd715df34c7850766a48178648ac0cb200d"
  asset_contract_type: string; // "non-fungible"
  buyer_fee_basis_points: number; // 0
  created_date: string; // "2022-03-29T06:32:04.584983"
  default_to_fiat: boolean;
  description: string; // "Your permanent pass to [Permissionless](https://blockworks.co/events/permissionless) + Free access to [Blockworks Research](https://blockworks.co/get-research).\n\nPermies are Web2 workers, grinding away at their day jobs and yearning for a better future – one filled with financial freedom, world travel, and like-minded frens. While passing time browsing Blockworks' website, 555 Permies are launched down a Web3 rabbit hole and find themselves in a fully Permissionless future.\n\n[More info](https://blockworks.co/nft)\n\nA project from [Blockworks](https://blockworks.co) x [3DPrintGuy](https://twitter.com/3D_PrintGuy)"
  dev_buyer_fee_basis_points: number; // 0
  dev_seller_fee_basis_points: number; // 750
  external_link: string; // "https://blockworks.co/nft"
  image_url: string; // "https://lh3.googleusercontent.com/jtbUxjwqN-izzqI8R30u6XyN-O90JBfvmniuXUHsXjqIq1FMD-W5pkt5ym0VfXkgGPzi9ag2oOVx7qQzdgPywwa5ItYvlrbmCfgGeg=s120"
  name: string; // "Permies"
  nft_version: string; // "3.0"
  only_proxied_transfers: boolean;
  opensea_buyer_fee_basis_points: number;
  opensea_seller_fee_basis_points: number; // 250
  opensea_version: string | null;
  owner: number; // 272450720
  payout_address: string; // "0x3e2d2199ed8a2f2e588e75b6b5eb6c01f49c44ac"
  schema_name: string; // "ERC721"
  seller_fee_basis_points: number; // 1000
  symbol: string; // "PERM"
  total_supply: string; // "0"
}

export interface IOpenSeaStats {
  one_hour_volume: number;
  one_hour_change: number;
  one_hour_sales: number;
  one_hour_sales_change: number;
  one_hour_average_price: number;
  one_hour_difference: number;
  six_hour_volume: number;
  six_hour_change: number;
  six_hour_sales: number;
  six_hour_sales_change: number;
  six_hour_average_price: number;
  six_hour_difference: number;
  one_day_volume: number;
  one_day_change: number;
  one_day_sales: number;
  one_day_sales_change: number;
  one_day_average_price: number;
  one_day_difference: number;
  seven_day_volume: number;
  seven_day_change: number;
  seven_day_sales: number;
  seven_day_average_price: number;
  seven_day_difference: number;
  thirty_day_volume: number;
  thirty_day_change: number;
  thirty_day_sales: number;
  thirty_day_average_price: number;
  thirty_day_difference: number;
  total_volume: number;
  total_sales: number;
  total_supply: number;
  count: number;
  num_owners: number;
  average_price: number;
  num_reports: number;
  market_cap: number;
  floor_price: number;
}

export interface IOpenSea {
  banner_image_url: string;
  chat_url: string | null;
  collection: string; // slug
  created_date: string;
  default_to_fiat: boolean;
  description: string; // need
  dev_buyer_fee_basis_points: string;
  dev_seller_fee_basis_points: string;
  discord_url: string; // need
  display_data: IOpenSeaDisplayData;
  external_url: string; // need
  featured: boolean;
  featured_image_url: string;
  hidden: boolean;
  image_url: string; // need
  instagram_username: string;
  is_nsfw: boolean;
  is_rarity_enabled: boolean;
  is_subject_to_whitelist: boolean;
  large_image_url: string;
  medium_username: string;
  name: string; // need
  only_proxied_transfers: boolean;
  opensea_buyer_fee_basis_points: string;
  opensea_seller_fee_basis_points: string;
  payment_tokens: any[];
  payout_address: string;
  primary_asset_contracts: IPrimaryAssetContract[]; // DEPRECATED OLD v1 API - use contracts
  contracts: Contract[]; // new v2
  require_email: boolean;
  safelist_request_status: SafelistRequestedStats;
  short_description: string;
  slug: string; // DEPRECATED OLD v1 API - use collection
  stats: IOpenSeaStats;
  telegram_url: string | null;
  traits: any;
  twitter_username: string | null;
  wiki_url: string | null;
}
