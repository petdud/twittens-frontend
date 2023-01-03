import { AppearanceType, Dropdown, DropdownMenuItem } from '../dropdown/dropdown';
import Image from 'next/image';

const PREFIX_IMAGE_PATH = "/marketplaces";

const marketplaceProviders = [
  {
    name: "OpenSea",
    logo: `${PREFIX_IMAGE_PATH}/opensea.png`,
    getLink: (_address: string, slug: string) => `https://opensea.io/collection/${slug}`,
  },
  {
    name: "LooksRare",
    logo: `${PREFIX_IMAGE_PATH}/looksrare.png`,
    getLink: (address: string, _slug: string) => `https://looksrare.org/collections/${address}`,
  },
  {
    name: "Rarible",
    logo: `${PREFIX_IMAGE_PATH}/rarible.png`,
    getLink: (address: string, _slug: string) => `https://rarible.com/collection/${address}`,
  },
  {
    name: "Coinbase",
    logo: `${PREFIX_IMAGE_PATH}/coinbase.png`,
    getLink: (address: string, _slug: string) => `https://nft.coinbase.com/collection/ethereum/${address}`,
  },
  {
    name: "Sudoswap",
    logo: `${PREFIX_IMAGE_PATH}/sudoswap.png`,
    getLink: (address: string, _slug: string) => `https://sudoswap.xyz/#/browse/buy/${address}`,
  },
  {
    name: "Blur",
    logo: `${PREFIX_IMAGE_PATH}/blur.png`,
    getLink: (address: string, _slug: string) => `https://blur.io/collection/${address}`,
  },
  {
    name: "DappRadar",
    logo: `${PREFIX_IMAGE_PATH}/dappradar.png`,
    getLink: (_address: string, slug: string) => `https://dappradar.com/hub/nft-collection/${slug}`,
  },
];

const walletProviders = [
  {
    name: "OpenSea",
    logo: `${PREFIX_IMAGE_PATH}/opensea.png`,
    link: "https://opensea.io/" // + address
  },
  {
    name: "Rainbow",
    logo: `${PREFIX_IMAGE_PATH}/rainbow.png`,
    link: "https://rainbow.me/" // + address
  },
  {
    name: "DappRadar",
    logo: `${PREFIX_IMAGE_PATH}/dappradar.png`,
    link: "https://dappradar.com/hub/wallet/" // + address
  },
  {
    name: "LooksRare",
    logo: `${PREFIX_IMAGE_PATH}/looksrare.png`,
    link: "https://looksrare.org/accounts/" // + address
  },
  {
    name: "Coinbase",
    logo: `${PREFIX_IMAGE_PATH}/coinbase.png`,
    link: "https://nft.coinbase.com/" // + address
  },
  {
    name: "Rarible",
    logo: `${PREFIX_IMAGE_PATH}/rarible.png`,
    link: "https://rarible.com/user/" // + address
  },
];

interface IWalletDropdownOptionsProps {
  name: string | JSX.Element;
  address: string;
  appearance?: AppearanceType
}

export const WalletDropdownOptions = ({ address, name, appearance }: IWalletDropdownOptionsProps) => (
  <Dropdown name={
    <div className="flex items-center gap-2">
      {name}
    </div>}
    appearance={appearance}
  >
    {walletProviders.map(({name, logo, link}) => (
      <DropdownMenuItem key={name} 
        name={
          <div className="flex items-center gap-2">
            <Image src={logo} alt={name} width={20} height={20} />
            <span>{name}</span>
          </div>
        }
        link={`${link}${address}`}
        isExternal={true}
      />
    ))}
  </Dropdown>
)

interface IMarketplaceDropdownOptionsProps {
  name: string | JSX.Element;
  address: string;
  appearance?: AppearanceType;
  slug: string;
}

export const MarketplaceDropdownOptions = ({ appearance, address, name, slug }: IMarketplaceDropdownOptionsProps) => (
  <Dropdown name={
    <div className="flex items-center gap-2">
      {name}
    </div>}
    appearance={appearance}
  >
    {marketplaceProviders.map(({name, logo, getLink}) => (
      <DropdownMenuItem key={name} 
        name={
          <div className="flex items-center gap-2">
            <Image src={logo} alt={name} width={20} height={20} />
            <span>{name}</span>
          </div>
        }
        link={getLink(address, slug)}
        isExternal={true}
      />
    ))}
  </Dropdown>
)
