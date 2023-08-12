import React, { FormEvent, useCallback, useState } from 'react';
import axios from 'axios';
import { IOpenSea } from '../../../core/opensea.interface';
import { Modal } from '../../modal/modal';
import {
  ICollection,
  chainTypes,
  IImage,
  dataSourceTypes
} from '../../../core/collection.interface';
import { PreviewCollectionContent } from './preview-collection-content';
import { ICloudinary } from './upload-widget';
import { LOCAL_API_PATHS } from '../../../core/routes';

export type AddCollectionProps = Pick<
  ICollection,
  | 'name'
  | 'slug'
  | 'address'
  | 'description'
  | 'totalSupply'
  | 'twitterUsername'
  | 'discordUrl'
  | 'image'
  | 'externalUrl'
  | 'chain'
> | null;

export const AdminAddCollection = () => {
  const [text, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [chain, setChain] = useState<chainTypes>('eth-mainnet');
  const [dataSource, setDataSource] = useState<dataSourceTypes>('alchemy');
  const [data, setData] = useState<AddCollectionProps>(null);

  const submit = useCallback(async () => {
    if (data) {
      await axios.post(LOCAL_API_PATHS.CREATE_COLLECTION, data);
      setOpen(false);
      setData(null);
      setText('');
    }
  }, [data]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    setData(null);
  }, []);

  const onImageUploaded = useCallback(
    (info: ICloudinary) => {
      data &&
        setData((prevState: any) => {
          const { format, public_id, asset_id, width, height, url, thumbnail_url } = info;

          return {
            ...prevState,
            image: {
              ...prevState.image,
              url,
              thumbnailUrl: thumbnail_url,
              extension: format,
              publicId: public_id,
              id: asset_id,
              width,
              height
            }
          };
        });
    },
    [data]
  );

  const openPreviewDialog = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setOpen(true);
      if (text) {
        const { data } = await axios.get(
          LOCAL_API_PATHS.GET_COLLECTION_FROM_OPENSEA(text)
        );
        if (data) {
          const {
            name,
            slug,
            description,
            external_url,
            image_url,
            primary_asset_contracts,
            stats,
            twitter_username,
            discord_url
          } = data as IOpenSea;
          const contractAddress = primary_asset_contracts[0]?.address;

          const dataToSubmit = {
            name,
            slug,
            address: contractAddress,
            description,
            image: { externalUrl: image_url } as IImage, // other properties will be added on upload
            totalSupply: stats.total_supply,
            twitterUsername: twitter_username,
            discordUrl: discord_url,
            externalUrl: external_url,
            chain,
            dataSource
          };
          setData(dataToSubmit);
        }
      }
    },
    [chain, dataSource, text]
  );

  return (
    <div className="dark:bg-neutral-800 bg-white p-4 rounded-md shadow-lg">
      <form onSubmit={openPreviewDialog}>
        <label
          htmlFor="text"
          className="block text-sm font-medium text-gray-700 dark:text-gray-400 pb-2"
        >
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
        <DataSourceOptions dataSource={dataSource} setDataSource={setDataSource} />
        <button
          type="submit"
          disabled={!text}
          className="inline-flex mt-4 items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Preview collection
        </button>
      </form>
      <Modal
        content={
          data && (
            <PreviewCollectionContent
              onImageUploaded={onImageUploaded}
              contractAddress={data.address}
              data={data}
              chain={chain}
              dataSource={dataSource}
              setData={setData}
            />
          )
        }
        actionButtonContent="Add collection"
        actionCallback={submit}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

const chainOptions: { name: string; value: chainTypes }[] = [
  { name: 'ETH', value: 'eth-mainnet' },
  { name: 'MATIC', value: 'polygon-mainnet' },
  { name: 'Arbitrum', value: 'arb-mainnet' },
  { name: 'Optimism', value: 'opt-mainnet' }
];

interface IChainOptions {
  chain: chainTypes;
  setChain: React.Dispatch<React.SetStateAction<chainTypes>>;
}

const ChainOptions = ({ chain, setChain }: IChainOptions) => {
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setChain(e.target.value as chainTypes),
    [setChain]
  );

  return (
    <div className="flex items-center gap-3 mt-4">
      <label className="text-base font-medium text-gray-900 dark:text-neutral-300">
        Select chain:{' '}
      </label>
      <fieldset>
        <legend className="sr-only">Chain types</legend>
        <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-5">
          {chainOptions.map(({ name, value }) => (
            <div key={name} className="flex items-center">
              <input
                id={name}
                onChange={onChange}
                name="chain"
                type="radio"
                value={value}
                defaultChecked={chain === value}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
              <label
                htmlFor={name}
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-neutral-200 cursor-pointer"
              >
                {name}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
};

const dataSourceOptions: { name: string; value: dataSourceTypes }[] = [
  { name: 'Alchemy', value: 'alchemy' },
  { name: 'Reservior', value: 'reservoir' }
];

interface IDataSourceOptionsProps {
  dataSource: dataSourceTypes;
  setDataSource: React.Dispatch<React.SetStateAction<dataSourceTypes>>;
}

const DataSourceOptions = ({ dataSource, setDataSource }: IDataSourceOptionsProps) => {
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setDataSource(e.target.value as dataSourceTypes),
    [setDataSource]
  );

  return (
    <div className="flex items-center gap-3 mt-4">
      <label className="text-base font-medium text-gray-900 dark:text-neutral-300">
        Data source:{' '}
      </label>
      <fieldset>
        <legend className="sr-only">Data source types</legend>
        <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-5">
          {dataSourceOptions.map(({ name, value }) => (
            <div key={name} className="flex items-center">
              <input
                id={name}
                onChange={onChange}
                name="data-source"
                type="radio"
                value={value}
                defaultChecked={dataSource === value}
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
              <label
                htmlFor={name}
                className="ml-2 block text-sm font-medium text-gray-700 dark:text-neutral-200 cursor-pointer"
              >
                {name}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
};
