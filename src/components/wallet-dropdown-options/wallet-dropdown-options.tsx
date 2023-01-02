import { AppearanceType, Dropdown, DropdownMenuItem } from '../dropdown/dropdown';
import Image from 'next/image';

const walletProviders = [
  {
    name: "OpenSea",
    logo: "/marketplaces/opensea.png",
    link: "https://opensea.io/" // + address
  },
  {
    name: "LooksRare",
    logo: "/marketplaces/looksrare.png",
    link: "https://looksrare.org/accounts/" // + address
  },
  {
    name: "Rainbow",
    logo: "/marketplaces/rainbow.png",
    link: "https://rainbow.me/" // + address
  },
  {
    name: "DappRadar",
    logo: "/marketplaces/dappradar.png",
    link: "https://dappradar.com/hub/wallet/" // + address
  },
  {
    name: "Coinbase",
    logo: "/marketplaces/coinbase.png",
    link: "https://nft.coinbase.com/" // + address
  },
];

interface IWalletDropdownOptionsProps {
  name: string | JSX.Element;
  address: string;
  appearance?: AppearanceType
  isMarketplace?: boolean;
}

export const WalletDropdownOptions = ({ address, name, appearance, isMarketplace }: IWalletDropdownOptionsProps) => (
  <Dropdown name={
    <div className="flex items-center gap-2">
      {name}
    </div>}
    appearance={appearance}
  >
    {(isMarketplace ? walletProviders : walletProviders).map(({name, logo, link}) => (
      <DropdownMenuItem key={name} 
        name={
          <div className="flex items-center gap-2">
            <Image src={logo} alt={name} width={20} height={20} />
            <span>{name}</span>
          </div>
        }
        link={`${link}${address}`}
      />
    ))}
  </Dropdown>
)
