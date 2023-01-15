import { Container } from '../components/container/container';
import { Leaderboard } from '../components/leaderboard/leaderboard';
import { HeadPage } from '../layouts/head-page';
import { MainSlot } from '../layouts/main-slot';

export default function LeaderboardPage() {

  return (
    <div>
      <HeadPage 
        title="Leaderboard for Twitter + ENS | Twittens.xyz" 
        description="Discover who are the most followed Twitter accounts within NFT collections."
      />

      <MainSlot>
        <Container top="large">
          <Leaderboard />
        </Container>
      </MainSlot>
    </div>
  );
}
