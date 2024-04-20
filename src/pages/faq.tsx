import { MainSlot } from '../layouts/main-slot';
import { Faq } from '../components/faq/faq';
import { HeadPage } from '../layouts/head-page';

export default function FaqPage() {
  return (
    <>
      <HeadPage
        title="FAQ for xFrens, ENS and Twitter frens | xFrens"
        description="xFrens' frequently asked questions and answers. Find out how does xFrens work, how to list your NFT collection or how to update your Twitter account, so it will be displayed on xFrens."
      />
      <MainSlot>
        <Faq />
      </MainSlot>
    </>
  );
}
