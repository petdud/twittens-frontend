import Link from "next/link";
import { Card } from "../card/card";


interface ICollectionItem {
  description: string;
  image: string;
  name: string;
  path: string;
  isFeatured: boolean;
}

export const CollectionItem = ({ description, isFeatured, image, name, path}: ICollectionItem) => (
  <li
    className="flex justify-center relative top-0 hover:-top-1 transition top-ease delay-200"
  >
    <Link href={path}>
      <Card description={description} image={image} name={name} isFeatured={isFeatured} />
    </Link>
  </li>
)
