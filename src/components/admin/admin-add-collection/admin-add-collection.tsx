import React, { FormEvent, useCallback, useState } from 'react';
import axios from 'axios';
import { IOpenSea } from '../../../core/opensea.interface';
import { Modal } from '../../modal/modal';
import { ICollection, chainTypes } from '../../../core/collection.interface';
import { useGetCollectionOwners } from '../../../hooks/use-get-collection-owners';

type AddCollectionProps = Pick<ICollection, "name" | "slug" | "address" | "description" | "imageUrl" | "totalSupply" | "twitterUsername" | "discordUrl" | "externalUrl" | "chain"> | null;

export const AdminAddCollection = () => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const [chain, setChain] = useState<chainTypes>("eth-mainnet");
  const [data, setData] = useState<AddCollectionProps>(null);

  const submit = useCallback(async () => {
    if (data) {
      await axios.post(`/api/collections/create`, data);
      setOpen(false);
      setData(null);
      setText("");
    }
  }, [data]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setData(null);
  }, []);

  const openPreviewDialog = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setOpen(true);
    if (text) {
      const { data } = await axios.get(`https://api.opensea.io/api/v1/collection/${text}`)
      if (data?.collection) {
        const {name, slug, description, external_url, image_url, primary_asset_contracts, stats, twitter_username, discord_url } = data.collection as IOpenSea;
        const contractAddress = primary_asset_contracts[0].address

        const dataToSubmit = {
          name,
          slug,
          address: contractAddress, 
          description,
          imageUrl: image_url,
          totalSupply: stats.total_supply,
          twitterUsername: twitter_username,
          discordUrl: discord_url,
          externalUrl: external_url,
          chain
        }
        setData(dataToSubmit)
      }
    }
  }, [chain, text]);

  return (
    <div className="dark:bg-neutral-800 bg-white p-4 rounded-md shadow-lg">
      <form onSubmit={openPreviewDialog}>
        <label htmlFor="text" className="block text-sm font-medium text-gray-700 dark:text-gray-400 pb-2">
          Add collection:
        </label>
        <input
          type="text"
          name="text"
          id="text"
          placeholder="Add a collection by slug"
          className="dark:bg-neutral-900 dark:text-white dark:border-neutral-500 dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          autoFocus
          onChange={onChange}
        />
        <ChainOptions chain={chain} setChain={setChain} />
        <button
          type="submit"
          disabled={!text}
          className="inline-flex mt-4 items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Preview collection
        </button>
      </form>
      <Modal content={data && <PreviewContent contractAddress={data.address} data={data} chain={chain} />} actionButtonContent='Add collection' actionCallback={submit} open={open} setOpen={setOpen} />
    </div>
  );
}

const chainOptions: {name: string, value: chainTypes}[] = [
  { name: 'ETH', value: "eth-mainnet" },
  { name: 'MATIC', value: "polygon-mainnet" },
]

interface IChainOptions {
  chain: chainTypes;
  setChain: React.Dispatch<React.SetStateAction<chainTypes>>;
}

const ChainOptions = ({chain, setChain}: IChainOptions) => {
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => 
    setChain(e.target.value as chainTypes), [setChain]);

  return (
    <div className="flex items-center gap-3 mt-4">
      <label className="text-base font-medium text-gray-900 dark:text-neutral-300">Select chain: </label> 
      <fieldset>
        <legend className="sr-only">Chain types</legend>
        <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-5">
          {chainOptions.map(({name, value}) => (
            <div key={name} className="flex items-center">
              <input
                id={name}
                onChange={onChange}
                name="notification-method"
                type="radio"
                value={value}
                defaultChecked={chain === value}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
              <label htmlFor={name} className="ml-2 block text-sm font-medium text-gray-700 dark:text-neutral-200 cursor-pointer">
                {name}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  )
}


interface IPreviewContent {
  contractAddress: string;
  chain: chainTypes;
  data: AddCollectionProps;
}

const PreviewContent = ({contractAddress, chain, data}: IPreviewContent) => {
  const { data: owners, isLoading } = useGetCollectionOwners(contractAddress, chain);
  
  if (!data) {
    return null;
  }

  const {
    name,
    description,
    address,
    twitterUsername,
    discordUrl,
    externalUrl,
    totalSupply,
    imageUrl
  } = data;

  const dataItemClassName = "pt-2 font-semibold text-grey-700 dark:text-white";

  return (
    <div className="text-left text-black dark:text-gray-400">
      <h2 className="text-2xl font-bold text-black  dark:text-white">{name}</h2>
      <div className="truncate ... pt-2">{description}</div>
      <div>
        <span className={dataItemClassName}>Total supply: </span>
        <span>{totalSupply}</span>
      </div>
      <div>
        <span className={dataItemClassName}>Owners: </span>
        {isLoading && <span className="text-yellow-700 font-semibold">Loading... please wait</span>}
        {!isLoading && (!owners || owners.length === 0) && <span className="text-red-700 font-semibold">Something wrong, no owners found on API</span>}
        {owners && owners.length > 0 && owners.length > 10000 && <span className="text-red-700 font-semibold">{owners.length} - is that correct?</span>}
        {owners && owners.length > 0 && owners.length <= 10000 && <span className="text-green-700 font-semibold">{owners.length}</span>}
      </div>
      <div>
        <div className={dataItemClassName}>Contract: </div>
        <span>{address}</span>
      </div>
      <div>
        <div className={dataItemClassName}>External URL: </div>
        <span>{externalUrl}</span>
      </div>
      <div>
        <span className={dataItemClassName}>Twitter username: </span>
        {twitterUsername}
      </div>
      <div>
        <span className={dataItemClassName}>Discord URL: </span>
        <span>{discordUrl}</span>
      </div>
      <div>
        <span className={dataItemClassName}>Chain: </span>
        <span>{chain}</span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={imageUrl} alt={name} className="pt-2 m-auto"/>
    </div>
  )
}
