import { useCallback } from "react";
import { useCollection } from "../../../hooks/use-collection";
import { Input } from "../../controllers/input/input";
import { Switch } from "../../controllers/input/switch";

interface IAdminCollectionEditProps {
  slug: string;
}

export const AdminCollectionEdit = ({slug}: IAdminCollectionEditProps) => {
  const { data, isLoading } = useCollection(slug);
  const collection = data?.collection;

  const onSubmit = useCallback((event: any) => {
    console.log(event);
  }, []);

  if (isLoading) {
    return null;
  }

  if (!collection) {
    return <h1>Collection not found</h1>
  }

  const {
    name,
    description,
    address,
    twitterUsername,
    discordUrl,
    externalUrl,
    totalSupply,
    numberOfOwners,
    image,
    isFeatured,
  } = collection;

  return (
    <form onSubmit={onSubmit}>
      <div className="flex gap-4 mt-4">
        <div className="w-full">
          <Input label="Slug" id="slug" value={slug} />
        </div>
        <div className="w-full">
          <Input label="Name" id="name" value={name} />
        </div>
      </div>

      <div className="mt-4">
        <Input label="Contract address" id="contract" value={address} disabled={true} />
      </div>

      <div className="mt-4">
        <Input label="Description" id="description" value={description} />
      </div>

      <div className="flex gap-4 mt-4">
        <div className="w-full">
        <Input label="Total supply" id="supply" type="number" value={totalSupply} />
        </div>
        <div className="w-full">
        <Input label="Number of owners" id="owners" type="number" value={numberOfOwners} />
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <div className="w-full">
        <Input label="Twitter username" id="twitter" value={twitterUsername || undefined} />
        </div>
        <div className="w-full">
        <Input label="Discord URL" id="discord" value={discordUrl || undefined} />
        </div>
      </div>

      <div className="mt-4">
        <Input label="External URL" id="url" value={externalUrl || undefined} />
      </div>
      <div className="mt-4">
        <Switch label="Featured" value={!!isFeatured} />
      </div>
      {/* images */}
      {/* statusTypes */}
      {/* chain */}

      <button
        type="submit"
        className="inline-flex mt-4 items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Submit changes
      </button>
    </form>
  )
}
