import { INft } from "../../core/nft.interface";
import { ENS_CONTRACT_ADDRESS } from "./constants";

export const getImage = (nft: INft | undefined, thumbnail?: boolean) => {
  if (!nft) return;

  // If ENS, returns the one with ENS name included
  if (nft.contract.address === ENS_CONTRACT_ADDRESS) {
    return nft?.rawMetadata?.image || nft?.rawMetadata?.image_url;
  }
  const media = nft.media[0];
  if (thumbnail && (media as any)?.thumbnail) {
    return (media as any)?.thumbnail;
  }
  const image = media?.gateway || nft?.rawMetadata?.image_url_png || nft?.rawMetadata?.image_url || nft?.rawMetadata?.image_data;
  return ipsfToImage(image);
}

const ipsfToImage = (image: string | undefined) => image?.startsWith("ipfs://") ? image.replace("ipfs://", "https://ipfs.io/ipfs/") : image;
