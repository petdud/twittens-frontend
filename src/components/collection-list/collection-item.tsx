import Link from "next/link";
import { Card } from "../card/card";


interface ICollectionItem {
  imageUrl: string;
  name: string;
  path: string;
  isFeatured: boolean;
  description?: string;
}

export const CollectionItem = ({ description, isFeatured, imageUrl, name, path}: ICollectionItem) => (
  <li
    className="flex justify-center relative top-0 hover:-top-1 transition top-ease delay-200"
  >
    <Link href={path}>
      <Card description={description} imageUrl={imageUrl} name={name} isFeatured={isFeatured} />
    </Link>
  </li>
)
