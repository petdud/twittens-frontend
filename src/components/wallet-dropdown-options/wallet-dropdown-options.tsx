import { Dropdown, DropdownMenuItem } from '../dropdown/dropdown';
import { FaWallet } from 'react-icons/fa';
import Image from 'next/image';

interface IWalletDropdownOptionsProps {
  address: string;
}

export const WalletDropdownOptions = ({ address }: IWalletDropdownOptionsProps) => (
  <Dropdown name={
    <div className="flex items-center gap-2">
      <FaWallet /> View wallet
    </div>
  }>
    <DropdownMenuItem 
      name={
        <div className="flex items-center gap-2">
          <Image src="/marketplaces/opensea.png" alt="OpenSea" width={20} height={20} />
          <span>OpenSea</span>
        </div>
      }
      link={`https://opensea.io/${address}`}
    />
    <DropdownMenuItem 
      name={
        <div className="flex items-center gap-2">
          <Image src="/marketplaces/looksrare.png" alt="LooksRare" width={20} height={20} />
          <span>LooksRare</span>
        </div>
      }
      link={`https://looksrare.org/accounts/${address}`}
    />
    <DropdownMenuItem 
      name={
        <div className="flex items-center gap-2">
          <Image src="/marketplaces/rainbow.png" alt="Rainbow" width={20} height={20} />
          <span>Rainbow</span>
        </div>
      }
      link={`https://rainbow.me/${address}`}
    />
    <DropdownMenuItem 
      name={
        <div className="flex items-center gap-2">
          <Image src="/marketplaces/dappradar.png" alt="DappRadar" width={20} height={20} />
          <span>DappRadar</span>
        </div>
      }
      link={`https://dappradar.com/hub/wallet/${address}`}
    />
    <DropdownMenuItem 
      name={
        <div className="flex items-center gap-2">
          <Image src="/marketplaces/coinbase.png" alt="Coinbase" width={20} height={20} />
          <span>Coinbase</span>
        </div>
      }
      link={`https://nft.coinbase.com/${address}`}
    />
  </Dropdown>
)
