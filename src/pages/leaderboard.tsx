import { Container } from '../components/container/container';
import { Leaderboard } from '../components/leaderboard/leaderboard';
import { HeadPage } from '../layouts/head-page';
import { MainSlot } from '../layouts/main-slot';

export default function LeaderboardPage() {
  return (
    <div>
      <HeadPage
        title="Leaderboard for 𝕏 + ENS | xFrens.xyz"
        description="Discover who are the most followed 𝕏 accounts within NFT collections."
        image="https://xfrens.xyz/sharing.jpg"
      />

      <MainSlot>
        <Container top="large">
          <Leaderboard />
        </Container>
      </MainSlot>
    </div>
  );
}
