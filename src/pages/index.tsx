import Image from "next/image";
import { Collections } from '../components/collections/collections';
import { Container } from '../components/container/container';
import { MainViewHeader } from '../components/main-view-header/main-view-header';
import { MostFollowedCollectionsList } from '../components/most-followed-lists/most-followed-collections-list';
import { MostFollowedUsersList } from '../components/most-followed-lists/most-followed-users-list';
import { SearchBar } from '../components/search-bar/search-bar';
import { FEATURE_FLAGS } from "../core/feature-flags";
import { useCollections } from '../hooks/use-collections';
import { HeadPage } from '../layouts/head-page';
import { MainSlot } from '../layouts/main-slot';

const SELECT_FROM_COLLECTIONS = "name,slug,image.url,ownersWithTwitterCount,isFeatured";
const NUMBER_OF_COLLECTIONS_BEFORE_LEADERBOARD = 18;

export default function Home() {
  const { data: collections, isLoading, error } = useCollections({
    status: "active", 
    select: SELECT_FROM_COLLECTIONS,
  });

  if (error || (!isLoading && collections.length === 0)) {
    return (
      <div className="py-6">
        <MainViewHeader title="Sorry, something went wrong 🫣" />
      </div>
    )
  }
  
  return (
    <div>
      <HeadPage 
        title="Find twitter frens in NFT collections | Twittens.xyz" 
        description="Twittens helps you to find twitter frens in your favorite NFT collections."
      />

      <MainSlot>
        <Container fullWidth={true} top="medium">
          <div className="pb-4">
            <div className="flex justify-between">
              <MainViewHeader title={<div>Find your <span className="text-blue-400">Twitter</span> frens!</div>} />
              {collections.length > 0 && <div className="hidden text-right md:block mt-2 text-sm text-gray-500 dark:text-neutral-300">
                Collections: <span className="font-semibold">{collections.length}</span>
                {/* TODO: Sort it by list and not grid */}
              </div>}
            </div>
            <div className="md:hidden mt-4 mb-3">
              <SearchBar />
            </div>
          </div>
          <Collections collections={collections.slice(0, NUMBER_OF_COLLECTIONS_BEFORE_LEADERBOARD)} isLoading={isLoading} />
          <LeaderboardSection />
          <div className="pb-4"><MainViewHeader title="More collections" /></div>
          <Collections collections={collections.slice(NUMBER_OF_COLLECTIONS_BEFORE_LEADERBOARD, collections.length)} isLoading={isLoading} />
        </Container>
      </MainSlot>
    </div>
  );
}

const LeaderboardSection = () => {
  if (!FEATURE_FLAGS.ENABLE_LEADERBOARD) {
    return null;
  }

  return (
    <div className="my-12">
      <div>
        <div className="flex items-center gap-2 pb-4">
          <Image
            className="h-8 w-auto"
            width="81"
            height="25"
            src="/twittens_symbol.png"
            alt="Twittens"
          />
          <MainViewHeader title="Leaderboard" />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <MostFollowedUsersList />
        <MostFollowedCollectionsList />
      </div>
    </div>
  )
}