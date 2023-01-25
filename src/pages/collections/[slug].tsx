import { useRouter } from "next/router";
import { CollectionView } from '../../components/collection-view/collection-view';
import { Container } from "../../components/container/container";
import { HeadPage } from '../../layouts/head-page';
import { MainSlot } from "../../layouts/main-slot";
import { META_OG } from "../../utils";

export default function Collection() {
  const router = useRouter();
  const slug = router.query.slug as string;

  const meta = (META_OG as any)[slug];
  const collectionName = meta?.name;
  const collectionImage = meta?.ogImage;


  return (
    <div>
      <HeadPage 
        title={`${collectionName ? collectionName : "NFT friends"} on Twitter | Twittens.xyz` }
        description={`Find and connect with your ${collectionName + " NFT" || "NFT"} holders on Twitter thanks to Twittens.xyz.`}
        image={collectionImage}
      />
      <div className="bg-gray-100 h-full">
        {slug && 
          <MainSlot>
            <Container top="small" >
              <CollectionView slug={slug} />
            </Container>
          </MainSlot>
        }
      </div>
    </div>
  );
}
