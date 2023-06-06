import { SELECT_FROM_COLLECTIONS } from '..';
import { MainViewHeader } from '../../components/main-view-header/main-view-header';
import { useCollections } from '../../hooks/use-collections';
import { Container } from '../../components/container/container';
import { HeadPage } from '../../layouts/head-page';
import { MainSlot } from '../../layouts/main-slot';
import { Collections } from '../../components/collections/collections';

export default function CollectionsPage() {
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
        title="All NFT collections on Twittens | Twittens.xyz" 
        description="Discover all NFT collections on Twittens and find their twitter members."
      />

      <MainSlot>
        <Container top="large">
          <Collections collections={collections} isLoading={isLoading} />
        </Container>
      </MainSlot>
    </div>
  );
}
