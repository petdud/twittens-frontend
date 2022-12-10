import { useRouter } from "next/router";
import { CollectionView } from '../../components/collection-view/collection-view';
import { HeadPage } from '../../layouts/head-page';
import { MainSlot } from "../../layouts/main-slot";
import { capitalizeFirstLetter } from "../../utils";


export default function Collection() {
  const router = useRouter();
  const slug = router.query.slug as string;

  const collectionName = capitalizeFirstLetter(slug);

  return (
    <div>
      <HeadPage 
        title={`${collectionName} frens on Twittens` }
        description={`Find and connect with your ${collectionName} frens on Twitter thanks to Twittens and ENS.`}
      />
      <div className="bg-gray-100 h-full">
        {slug && 
          <MainSlot>
            <CollectionView slug={slug} />
          </MainSlot>
        }
      </div>
    </div>
  );
}