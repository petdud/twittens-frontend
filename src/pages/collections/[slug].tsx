import { GetServerSidePropsContext } from "next";
import { CollectionView } from '../../components/collection-view/collection-view';
import { Container } from "../../components/container/container";
import { HeadPage } from '../../layouts/head-page';
import { MainSlot } from "../../layouts/main-slot";
import { META_OG } from "../../utils";

interface ICollectionProps {
  slug: string, 
  meta: {
    name: string,
    ogImage?: string
  }
}

export default function Collection(
  { slug, meta }: ICollectionProps
) {
  const collectionName = meta?.name;
  const collectionImage = meta?.ogImage;

  return (
    <div>
      <HeadPage 
        title={`${collectionName ? collectionName : "NFT"} holders on Twitter | Twittens.xyz` }
        description={`Discover and connect with ${collectionName + " " || ""}NFT holders on Twitter thanks to Twittens.xyz and ENS.`}
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const meta = (META_OG as any)?.[context.query.slug as string];
  
  return {
    props: {
      slug: context.query.slug,
      ...(meta && { meta }),
    },
  };
}
