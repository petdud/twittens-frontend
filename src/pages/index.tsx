import React from "react";
import Image from "next/image";
import { Collections } from '../components/collections/collections';
import { Container } from '../components/container/container';
import { FeaturedList } from "../components/featured-list/featured-list";
import { MainViewHeader } from '../components/main-view-header/main-view-header';
import { MostFollowedCollectionsList } from '../components/most-followed-lists/most-followed-collections-list';
import { MostFollowedUsersList } from '../components/most-followed-lists/most-followed-users-list';
import { SearchBar } from '../components/search-bar/search-bar';
import { ICollection } from "../core/collection.interface";
import { FEATURE_FLAGS } from "../core/feature-flags";
import { useThemeContext } from "../core/theme-provider";
import { useCollections } from '../hooks/use-collections';
import { HeadPage } from '../layouts/head-page';
import { MainSlot } from '../layouts/main-slot';

const BADGE_ID = "Dk4MTI3Njc5MzI2N";
const SELECT_FROM_COLLECTIONS = "name,slug,image.url,ownersWithTwitterCount,isFeatured";
const NUMBER_OF_COLLECTIONS_BEFORE_LEADERBOARD = 12;

const NUMBER_OF_COLLECTIONS_BEFORE_FEATURED_SECTION = 12 + 12;
const MAX_FEATURED_SECTION_LIST_ITEMS = 7;

const ARTBLOCKS_COLLECTIONS = [
  "chromie-squiggle-by-snowfro", 
  "fidenza-by-tyler-hobbs",
  "ringers-by-dmitri-cherniak",
  "gazers-by-matt-kane", 
  "memories-of-qilin-by-emily-xie",
  "the-harvest-by-per-kristian-stoveland",
  "friendship-bracelets-by-alexis-andre"
];

const AI_COLLECTIONS = [
  "genesis-by-claire-silver", 
  "podgans-by-pindar-van-arman",
  "brain-loops-by-gene-kogan",
  "life-in-west-america-by-roope-rainisto", 
  "chimerical-stories-by-entangled-others-sofia-cresp",
  "0xai-genesis",
  "bytegans"
];

const ART_COLLECTIONS = [
  "right-click-share", 
  "nouns",
  "terraforms",
  "proof-moonbirds", 
  "world-of-women-nft",
  "thememes6529",
  "degods"
];

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
        title="Discover NFT collection holders on Twitter | Twittens.xyz" 
        description="Twittens helps you to find NFT collection holders on Twitter, so you can connect and make new frens."
      />

      <MainSlot>
        <Container fullWidth={true} top="medium">
          <div className="pb-4">
            <div className="flex justify-between">
              <MainViewHeader title={<div>Find new <span className="text-blue-400">Twitter</span> frens!</div>} />
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
          {!isLoading && collections.length > NUMBER_OF_COLLECTIONS_BEFORE_LEADERBOARD
            ?
            <>
              <div className="pb-4 mt-8">
                <MainViewHeader title="More collections" />
              </div>
              <Collections collections={collections.slice(NUMBER_OF_COLLECTIONS_BEFORE_LEADERBOARD, NUMBER_OF_COLLECTIONS_BEFORE_FEATURED_SECTION)} />
            </> 
            : null
          }
          <FeaturedSection collections={collections} isLoading={isLoading} />
          {!isLoading && collections.length > NUMBER_OF_COLLECTIONS_BEFORE_FEATURED_SECTION
            ?
            <>
              <div className="pb-4 mt-8">
                <MainViewHeader title="More collections" />
              </div>
              <Collections collections={collections.slice(NUMBER_OF_COLLECTIONS_BEFORE_FEATURED_SECTION, collections.length)} />
            </> 
            : null
          }
        </Container>
        <Footer/>
      </MainSlot>
    </div>
  );
}

interface IFeaturedSectionProps {
  collections: ICollection[];
  isLoading: boolean;
}

const FeaturedSection = ({collections, isLoading}: IFeaturedSectionProps) => {
  if (!FEATURE_FLAGS.ENABLE_FEATURE_SECTION_HOMEPAGE) {
    return null;
  }
  
  const artBlocks = collections.filter((collection) => ARTBLOCKS_COLLECTIONS.includes(collection.slug));
  const artBlocksItems = artBlocks.slice(0, MAX_FEATURED_SECTION_LIST_ITEMS).map(collection => ({
      image: collection.image?.url,
      name: collection.name,
      slug: collection.slug,
      stat: collection.ownersWithTwitterCount
  }));

  const ai = collections.filter((collection) => AI_COLLECTIONS.includes(collection.slug));
  const aiItems = ai.slice(0, MAX_FEATURED_SECTION_LIST_ITEMS).map(collection => ({
      image: collection.image?.url,
      name: collection.name,
      slug: collection.slug,
      stat: collection.ownersWithTwitterCount
  }));
  
  const featured = collections.filter((collection) => ART_COLLECTIONS.includes(collection.slug));
  const featuredItems = featured.slice(0, MAX_FEATURED_SECTION_LIST_ITEMS).map(collection => ({
      image: collection.image?.url,
      name: collection.name,
      slug: collection.slug,
      stat: collection.ownersWithTwitterCount
  }));
  

  return (
    <div className="mt-12">
      <div>
        <div className="flex items-center gap-2 pb-4">
          <MainViewHeader title="Featured Section" />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <FeaturedList isLoading={isLoading} title="ArtBlocks" items={artBlocksItems} />
        <FeaturedList isLoading={isLoading} title="AI Art" items={aiItems} />
        <div className="hidden lg:block">
          <FeaturedList isLoading={isLoading} title="Others" items={featuredItems} />
        </div>
      </div>
    </div>
  )
}

const LeaderboardSection = () => {
  if (!FEATURE_FLAGS.ENABLE_LEADERBOARD) {
    return null;
  }

  return (
    <div className="mt-12">
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

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="mx-auto px-16 pb-6">
        <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-6">
          <p className="text-xs leading-5 text-gray-500">&copy; {currentYear} Twittens</p>
          <FooterAlchemyLogo />
        </div>
      </div>
    </footer>
  );
}

const FooterAlchemyLogo = () => {
  const { theme } = useThemeContext();
  let ALCHEMY_URL = `https://alchemyapi.io/?r=badge:${BADGE_ID}`;
  const ALCHEMY_ANALYTICS_URL = `https://analytics.alchemyapi.io/analytics`;
  const imageUrl = theme === "dark" ? "https://static.alchemyapi.io/images/marketing/badge.png" : "https://static.alchemyapi.io/images/marketing/badgeLight.png";

  const logBadgeClick = () => {
    fetch(`${ALCHEMY_ANALYTICS_URL}/badge-click`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        badge_id: BADGE_ID,
      }),
    });
    window.open(ALCHEMY_URL, '_blank')?.focus();
  }

  const logBadgeView = () => {
    fetch(`${ALCHEMY_ANALYTICS_URL}/badge-view`, {
    method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        badge_id: BADGE_ID,
      }),
    });
  }

  const isBadgeInViewpoint = (bounding: any) => {
    return (
      bounding.top >= 0
      && bounding.left >= 0
      && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight)
      && bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  React.useEffect(() => {
    var intervalId = setInterval(() => {
      const badge = document.getElementById('badge-button');
      if (badge && isBadgeInViewpoint(badge.getBoundingClientRect())) {
        logBadgeView();
        clearInterval(intervalId);
      }
    }, 2000);
  });

  return (
    <a href="#">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        onClick={logBadgeClick}
        id="badge-button"
        style={{width:"180px", height: "auto"}}
        src={imageUrl}
        alt="Alchemy Supercharged" 
      />
    </a>
  )
}