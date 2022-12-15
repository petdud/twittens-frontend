import { CollectionList } from '../../../components/collection-list/collection-list';
import { HeadPage } from '../../../layouts/head-page';
import { MainSlot } from '../../../layouts/main-slot';
import { useCollections } from '../../../hooks/use-collections';
import React, { FormEvent } from 'react';
import axios from 'axios';
import { IOpenSea } from '../../../core/opensea.interface';
import { Modal } from '../../../components/modal/modal';
import { ICollection } from '../../../core/collection.interface';

export default function Home() {
  const { data: collections } = useCollections();
  const [text, setText] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState<any>(null);

  const submit = React.useCallback(async () => {
    if (data) {
      console.log("DATA SUBMITTED", data)
      // const resData = await axios.post(`/api/collections/create`, data);
      setOpen(false);
      setData(null);
    }
  }, [data]);

  const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setData(null);
  }, []);

  const handleSubmit = React.useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setOpen(true);
    if (text) {
      const { data } = await axios.get(`https://api.opensea.io/api/v1/collection/${text}`)
      if (data?.collection as IOpenSea) {
        const {name, slug, description, external_url, image_url, primary_asset_contracts, stats, twitter_username, discord_url } = data.collection;
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
        } as Pick<ICollection, "name" | "slug" | "address" | "description" | "imageUrl" | "totalSupply" | "twitterUsername" | "discordUrl" | "externalUrl" >
        setData(dataToSubmit)

      }
    }
  }, [text]);

  const content = React.useMemo(() => {
    if (data) {
      return (
        <div className="text-left text-black dark:text-gray-400">
          <h2 className="text-2xl font-bold text-black  dark:text-white">{data.name}</h2>
          <div className="truncate ... pt-2">{data.description}</div>
          <div className="">
            <div className="pt-2 font-semibold text-grey-700 dark:text-white">Contract: </div>
            <span>{data.address}</span>
          </div>
          <div className="">
            <div className="pt-2 font-semibold text-grey-700 dark:text-white">Twitter username: </div>
            {data.twitter}
          </div>
          <div className="">
            <div className="pt-2 font-semibold text-grey-700 dark:text-white">Discord URL: </div>
            <span>{data.discord}</span>
          </div>
          <div className="">
            <div className="pt-2 font-semibold text-grey-700 dark:text-white">External URL: </div>
            <span>{data.url}</span>
          </div>
          <div className="">
            <div className="pt-2 font-semibold text-grey-700 dark:text-white">Total supply: </div>
            <span>{data.supply}</span>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.image_url} alt={data.name} className="pt-2 m-auto"/>
        </div>
      )
    }
  }, [data]);


  return (
    <div>
      <HeadPage 
        title="Twitten - Admin panel" 
        description="Twittens helps you to find your twitter frens in your favorite NFT collections."
      />

      <MainSlot>
        <div className="mx-auto max-w-3xl sm:px-6 lg:px-8 my-12 px-4">
          <form onSubmit={async (e) => await handleSubmit(e)} className="">
            <label htmlFor="text" className="block text-sm font-medium text-gray-700 dark:text-gray-400 pb-2">
              Add collection:
            </label>
            <input
              type="text"
              name="text"
              id="text"
              placeholder="Add a collection by slug"
              className="dark:bg-gray-800 dark:text-white dark:border-gray-700 dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              autoFocus
              onChange={onChange}
            />
            <button
              type="submit"
              disabled={!text}
              className="inline-flex mt-4 items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Preview collection
            </button>
          </form>
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700 mt-8">
            {collections?.map(({slug, name, status}) => (
              <li key={slug} className="py-4 dark:text-white flex justify-between">
                <div className="">{name}</div>
                <div>{status}</div>
              </li>
            ))}
          </ul>
        </div>
      </MainSlot>
      <Modal content={content} actionButtonContent='Add collection' actionCallback={submit} open={open} setOpen={setOpen} />
    </div>
  );
}
