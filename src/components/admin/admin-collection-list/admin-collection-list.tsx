import { useCollections } from '../../../hooks/use-collections';

export const AdminCollectionList = () => {
  const { data: collections } = useCollections();

  return (
    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700 mt-8">
      {collections?.map(({slug, name, status}) => (
        <li key={slug} className="py-4 dark:text-white flex justify-between">
          <div className="">{name}</div>
          <div>{status}</div>
        </li>
      ))}
    </ul>
  )
}