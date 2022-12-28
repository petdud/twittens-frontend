import { MainSlot } from "../layouts/main-slot";
import { Faq } from "../components/faq/faq";
import { HeadPage } from "../layouts/head-page";

export default function FaqPage() {

  return (
    <div>
      <HeadPage 
        title="FAQ for Twittens, ENS and Twitter frens | Twittens" 
        description="Twittens' frequently asked questions and answers. Find out about Twittens work, how to add your NFT collection to Twittens or how to update your Twitter, so it will be displayed here."
      />
      <MainSlot>
        <Faq />
      </MainSlot>
    </div>
  );
}
