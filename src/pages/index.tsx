import { CollectionList } from '../components/collection-list/collection-list';
import { HeadPage } from '../layouts/head-page';
import { MainSlot } from '../layouts/main-slot';

export default function Home() {
  return (
    <div>
      <HeadPage 
        title="Find twitter frens in NFT collections | Twittens.xyz" 
        description="Twittens helps you to find twitter frens in your favorite NFT collections."
      />

      <MainSlot>
        <CollectionList />
      </MainSlot>
    </div>
  );
}
