import { MainSlot } from "../layouts/main-slot";
import { Faq } from "../components/faq/faq";
import { HeadPage } from "../layouts/head-page";

export default function FaqPage() {

  return (
    <>
      <HeadPage 
        title="FAQ for Twittens, ENS and Twitter frens | Twittens" 
        description="Twittens' frequently asked questions and answers. Find out how does Twittens work, how to list your NFT collection or how to update your Twitter account, so it will be displayed on Twittens."
      />
      <MainSlot>
        <Faq />
      </MainSlot>
    </>
  );
}
