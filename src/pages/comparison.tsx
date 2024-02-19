import { Comparison } from '../components/comparison/comparison';
import { Container } from '../components/container/container';
import { HeadPage } from '../layouts/head-page';
import { MainSlot } from '../layouts/main-slot';

export default function ComparisonPage() {
  return (
    <div>
      <HeadPage
        title="Find collectors from selected collections | xFrens.xyz"
        description="Find 𝕏 accounts who hold multiple selected collections on xFrens."
      />

      <MainSlot>
        <Container top="large">
          <Comparison />
        </Container>
      </MainSlot>
    </div>
  );
}
