import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { CollectionView } from '../../components/collection-view/collection-view';
import { Container } from "../../components/container/container";
import { ICollectionApiData } from "../../core/collection.interface";
import { API_PATHS, BASE_API_URL } from "../../core/routes";
import { HeadPage } from '../../layouts/head-page';
import { MainSlot } from "../../layouts/main-slot";

const SELECT_FROM_COLLECTION = "name";

export default function Collection({apiResponse}: {apiResponse: ICollectionApiData}) {
  const router = useRouter();
  const slug = router.query.slug as string;

  const collectionName = apiResponse.collection.name;

  return (
    <div>
      <HeadPage 
        title={`${collectionName ? collectionName : "NFT friends"} on Twitter | Twittens.xyz` }
        description={`Find and connect with your ${collectionName + " NFT" || "NFT"} frens on Twitter thanks to ENS and Twittens.xyz.`}
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
  let url = `${BASE_API_URL}${API_PATHS.COLLECTIONS}/${context.query.slug}`;

  const { data } = await axios.get(url, {
    params: {
      select: SELECT_FROM_COLLECTION
    }
  });

  return {
    props: {
      apiResponse: data,
    },
  };
}
