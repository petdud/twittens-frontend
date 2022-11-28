import Link from "next/link";
import { Card } from "../card/card";


interface ICollectionItem {
  description: string;
  image: string;
  name: string;
  path: string;
}

export const CollectionItem = ({ description, image, name, path}: ICollectionItem) => (
  <li
  className="flex justify-center"
  >
    <Link href={path}>
      <Card description={description} image={image} name={name} />
    </Link>
  </li>
)