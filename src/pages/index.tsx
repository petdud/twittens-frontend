import { CollectionList } from '../components/collection-list/collection-list';
import { HeadPage } from '../layouts/head-page';
import { MainSlot } from '../layouts/main-slot';

export default function Home() {
  return (
    <div>
      <HeadPage 
        title="Twittens - Find your twitter frens" 
        description="Twittens helps you to find your twitter frens in your favorite NFT collections."
      />

      <MainSlot>
        <CollectionList />
      </MainSlot>
    </div>
  );
}
