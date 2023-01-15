import { Collections } from '../components/collections/collections';
import { Container } from '../components/container/container';
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
        <Container fullWidth={true} top="medium">
          <Collections />
        </Container>
      </MainSlot>
    </div>
  );
}
