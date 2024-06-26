import React, { useCallback, useEffect, useState } from "react";
import { useCollection } from "../../../hooks/use-collection";
import { Input } from "../../controllers/input/input";
import { Switch } from "../../controllers/input/switch";
import { useRouter } from 'next/router';
import { ICloudinary, UploadWidget } from "../admin-add-collection/upload-widget";
import { CLOUDINARY_COLLECTION_FOLDER, LOCAL_API_PATHS } from "../../../core/routes";
import axios from "axios";
import { useTags } from "../../../hooks/tags/use-tags";
import { Checkbox } from "../../checkbox/checkbox";
import { capitalizeFirstLetter } from "../../../utils";

const SELECT_FROM_COLLECTION = "address,name,description,twitterUsername,discordUrl,externalUrl,totalSupply,numberOfOwners,image,isFeatured,tags";

export const AdminCollectionEdit = () => {
  const router = useRouter();
  const slug = router.query.slug as string;

  const { data, isLoading } = useCollection(slug, {
    select: SELECT_FROM_COLLECTION
  });
  const { data: tags } = useTags();
  const [isSuccessfullyUpdated, setIsSuccessfullyUpdated] = useState(false);
  const [isError, setIsError] = useState(false);
  const collection = data?.collection;

  const [collectionFields, setCollectionFields] = useState<any>({
    address: "",
    name: "",
    description: "",
    twitterUsername: "",
    discordUrl: "",
    externalUrl: "",
    totalSupply: null,
    numberOfOwners: null,
    image: "",
    isFeatured: false,
    tags: [],
  });

  const onSubmit = useCallback(async (event: any) => {
    event.preventDefault();
    const data = {
      ...collection,
      ...collectionFields
    };
    delete data.createdAt;
    delete data.updatedAt;
    try {
      const response = await axios.patch(`${LOCAL_API_PATHS.EDIT_COLLECTION}?slug=${slug}`, data);
      if (response.status === 200 || response.status === 201) {
        setIsSuccessfullyUpdated(true);
      }
    } catch(err) {
      console.log("ERROR IN EDITING COLLECTION", err);
      setIsError(true);
    }

  }, [collectionFields, collection, slug]);

  const onInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSuccessfullyUpdated(false);
    setIsError(false);
    setCollectionFields({
      ...collectionFields,
      [event.target.id]: event.target.value
    });
  }, [collectionFields]);

  const onIsFeaturedChange = useCallback((value: boolean) => {
    setCollectionFields({
      ...collectionFields,
      isFeatured: value
    });
  }, [collectionFields]);

  const onImageUploaded = useCallback((info: ICloudinary) => {
    const { format, public_id, asset_id, width, height, url, thumbnail_url } = info;
    setCollectionFields({
      ...collectionFields,
      image: {
        ...collectionFields.image,
        url, 
        thumbnailUrl: thumbnail_url,
        extension: format,
        publicId: public_id,
        id: asset_id,
        width,
        height,
      }
    });
  }, [collectionFields]);

  const onTagsChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const tags = event.target.checked ?
       [...collectionFields.tags, event.target.id] 
       : collectionFields.tags.filter((tagId: string) => tagId !== event.target.id);
      
    setCollectionFields({
      ...collectionFields,
      tags
    });
    console.log({
      ...collectionFields,
      tags
    })
  }, [collectionFields]);

  useEffect(() => {
    if (collection) {
      setCollectionFields({
        address: collection?.address || "",
        name: collection?.name || "",
        description: collection?.description || "",
        twitterUsername: collection?.twitterUsername || "",
        discordUrl: collection?.discordUrl || "",
        externalUrl: collection?.externalUrl || "",
        totalSupply: collection?.totalSupply || "",
        numberOfOwners: collection?.numberOfOwners || "",
        image: collection?.image || "",
        isFeatured: collection?.isFeatured || false,
        tags: collection?.tags || [],
      })
    }
  }, [collection])

  const onDelete = useCallback(async () => {
    await axios.delete(LOCAL_API_PATHS.DELETE_COLLECTION(slug));
  }, [slug]);

  if (isLoading) {
    return null;
  }

  if (!collection) {
    return <h1>Collection not found</h1>
  }

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-xl text-black dark:text-white font-semibold">{collection?.name}</h1>
        <button onClick={onDelete} className="px-2 py-1 bg-red-800 text-white border-gray-300 dark:border-gray-500 border rounded-md">
          Delete
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <div className="flex gap-4 mt-4">
          <div className="w-full">
            <Input label="Slug" id="slug" value={slug} disabled />
          </div>
          <div className="w-full">
            <Input label="Name" id="name" value={collectionFields.name} onChange={onInputChange} />
          </div>
        </div>

        <div className="mt-4">
          <Input label="Contract address" id="address" value={collectionFields.address} disabled />
        </div>

        <div className="mt-4">
          <Input label="Description" id="description" value={collectionFields.description} onChange={onInputChange} />
        </div>

        <div className="flex gap-4 mt-4">
          <div className="w-full">
          <Input label="Total supply" id="totalSupply" type="number" value={collectionFields.totalSupply} onChange={onInputChange} />
          </div>
          <div className="w-full">
          <Input label="Number of owners" id="numberOfOwners" type="number" value={collectionFields.numberOfOwners} onChange={onInputChange} />
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <div className="w-full">
          <Input label="Twitter username" id="twitterUsername" value={collectionFields.twitterUsername} onChange={onInputChange} />
          </div>
          <div className="w-full">
          <Input label="Discord URL" id="discordUrl" value={collectionFields.discordUrl} onChange={onInputChange} />
          </div>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {tags?.map(({_id, name}) => (
              <Checkbox 
                key={_id}
                id={_id}
                label={capitalizeFirstLetter(name)}
                onChange={onTagsChange}
                checked={collectionFields.tags?.find((tagId: string) => tagId === _id)}
              /> 
            ))}
          </div>
        </div>

        <div className="mt-4">
          <Input label="External URL" id="externalUrl" value={collectionFields.externalUrl} onChange={onInputChange} />
        </div>
        <div className="mt-4">
          <Switch label="Featured" value={!!collectionFields.isFeatured} onChange={onIsFeaturedChange} />
        </div>

        {/* statusTypes */}
        {/* chain */}
        <div className="mt-4 flex gap-3">
          <UploadWidget folder={CLOUDINARY_COLLECTION_FOLDER} onSuccess={onImageUploaded} />
          <div className="text-black dark:text-white">
            Cloudinary:
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={collectionFields.image?.url || collection.image?.thumbnailUrl} alt={collection.name} width={150} />
          </div>

          <div className="text-black dark:text-white">
            External Image:
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={collection.image?.externalUrl} alt={collection.name} width={150}/>
          </div>
        </div>
        {isSuccessfullyUpdated &&
          <div className="text-green-700">
            Collection has been successfully updated.
          </div>
        }
        {isError &&
          <div className="text-red-700">
            Something wrong happened. Please try again.
          </div>
        }
        <button
          type="submit"
          className="inline-flex mt-4 items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Submit changes
        </button>
      </form>
    </>
  )
}
