import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Collections } from '../components/collections/collections';
import { Container } from '../components/container/container';
import { FeaturedList } from '../components/featured-list/featured-list';
import { MainViewHeader } from '../components/main-view-header/main-view-header';
import { MostFollowedCollectionsList } from '../components/most-followed-lists/most-followed-collections-list';
import { MostFollowedUsersList } from '../components/most-followed-lists/most-followed-users-list';
import { SearchBar } from '../components/search-bar/search-bar';
import { ICollection } from '../core/collection.interface';
import { FEATURE_FLAGS } from '../core/feature-flags';
import { useThemeContext } from '../core/theme-provider';
import { useCollections } from '../hooks/use-collections';
import { HeadPage } from '../layouts/head-page';
import { MainSlot } from '../layouts/main-slot';
import {
  ProfileListByNames,
  ProfileListByCollectionTag
} from '../components/profile-list/profile-list';

const BADGE_ID = 'Dk4MTI3Njc5MzI2N';
export const SELECT_FROM_COLLECTIONS =
  'name,slug,image.url,ownersWithTwitterCount,ownersWithLensCount,isFeatured,tags,createdAt';

const RECOMMENDED_TWITTER_ACC = [
  'duda.eth',
  'snowfro.eth',
  'gmoney.eth',
  'osf.eth',
  'brantly.eth',
  'superphiz.eth',
  'serenae.eth',
  'barmstrong.eth',
  'noun12.eth'
];

const MAX_FEATURED_SECTION_LIST_ITEMS = 7;

const FEATURED_COLLECTIONS = [
  'cryptopunks',
  'boredapeyachtclub',
  'world-of-women-nft',
  'chromie-squiggle-by-snowfro',
  'proof-moonbirds',
  'cryptoarte',
  'pudgypenguins',
  'doodles-official',
  'clonex',
  'degods',
  'azuki'
];

const ART_COLLECTIONS = [
  'right-click-share',
  'nouns',
  'terraforms',
  'vv-checks',
  'world-of-women-nft',
  'thememes6529',
  'proof-moonbirds'
];

export default function Home() {
  const {
    data: collections,
    isLoading,
    error
  } = useCollections({
    status: 'active',
    select: SELECT_FROM_COLLECTIONS
  });

  const collectionCategories = React.useMemo(() => {
    const categories = {
      artblocks: [] as ICollection[],
      ai: [] as ICollection[],
      art: [] as ICollection[],
      historical: [] as ICollection[],
      membership: [] as ICollection[],
      memes: [] as ICollection[],
      music: [] as ICollection[],
      recommended: [] as ICollection[]
    };
    collections.map(collection => {
      if (collection.isFeatured) {
        categories.recommended.push(collection);
        return;
      }
      collection.tags?.map(tag => {
        switch (tag.name) {
          case 'artblocks':
            categories.artblocks.push(collection);
            break;
          case 'ai':
            categories.ai.push(collection);
            break;
          case 'art':
            categories.art.push(collection);
            break;
          // case 'bluechip':
          //   categories.recommended.push(collection);
          //   break;
          case 'memes':
            categories.memes.push(collection);
            break;
          case 'membership':
            categories.membership.push(collection);
            break;
          case 'historical':
            categories.historical.push(collection);
            break;
          case 'music':
            categories.music.push(collection);
            break;
        }
      });
    });
    FEATURED_COLLECTIONS.map(slug => {
      const collection = collections.find(collection => collection.slug === slug);
      if (collection) {
        categories.recommended.push(collection);
      }
    });

    return categories;
  }, [collections]);

  if (error || (!isLoading && collections.length === 0)) {
    return (
      <div className="py-6">
        <MainViewHeader title="Sorry, something went wrong 🫣" />
      </div>
    );
  }

  return (
    <div>
      <HeadPage
        title="Find NFT collectors on Twitter | Twittens.xyz"
        description="Twittens helps you to find NFT collection holders on Twitter, so you can connect and make new frens."
      />

      <MainSlot>
        <Container fullWidth={true} top="medium">
          <div className="pb-4">
            <HeroBanner />
            <div className="md:hidden mt-4">
              <SearchBar />
            </div>
          </div>

          <Collections
            title="Featured Collections"
            collections={collectionCategories.recommended}
            isLoading={isLoading}
            isHorizontal={true}
          />

          <ProfileListByNames
            title={'Collectors & builders'}
            names={RECOMMENDED_TWITTER_ACC}
          />

          <Collections
            title="ArtBlocks Collections"
            collections={collectionCategories.artblocks}
            isLoading={isLoading}
            isHorizontal={true}
          />

          <ProfileListByCollectionTag title={'Generative Art Collectors'} tag="gen-art" />

          <LeaderboardSection />

          <Collections
            title="AI Collections"
            collections={collectionCategories.ai}
            isLoading={isLoading}
            isHorizontal={true}
          />

          <ProfileListByCollectionTag title={'AI Art Collectors'} tag="ai" />

          <Collections
            title="Art Collections"
            collections={collectionCategories.art}
            isLoading={isLoading}
            isHorizontal={true}
          />

          <Collections
            title="Membership Collections"
            collections={collectionCategories.membership}
            isLoading={isLoading}
            isHorizontal={true}
          />

          <FeaturedSection collections={collections} isLoading={isLoading} />

          <Collections
            title="Memes Collections"
            collections={collectionCategories.memes}
            isLoading={isLoading}
            isHorizontal={true}
          />

          <ProfileListByCollectionTag title={'Memes NFT Collectors'} tag="memes" />

          <Collections
            title="Historical Collections"
            collections={collectionCategories.historical}
            isLoading={isLoading}
            isHorizontal={true}
          />

          <ProfileListByCollectionTag
            title={'Historical NFT Collectors'}
            tag="historical"
          />

          <Collections
            title="Music Collections"
            collections={collectionCategories.music}
            isLoading={isLoading}
            isHorizontal={true}
          />

          {/* <ProfileListByCollectionTag title={'Music NFT Collectors'} tag="music" /> */}
        </Container>
        <Footer />
      </MainSlot>
    </div>
  );
}

interface IFeaturedSectionProps {
  collections: ICollection[];
  isLoading: boolean;
}

const FeaturedSection = ({ collections, isLoading }: IFeaturedSectionProps) => {
  if (!FEATURE_FLAGS.ENABLE_FEATURE_SECTION_HOMEPAGE) {
    return null;
  }

  const newCollections = collections
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .reduce((acc: any[], collection, idx) => {
      if (idx < MAX_FEATURED_SECTION_LIST_ITEMS) {
        acc.push({
          image: collection.image?.url,
          name: collection.name,
          slug: collection.slug,
          stat: collection.ownersWithTwitterCount
        });
      }
      return acc;
    }, []);

  const mostTwitterMembers = collections
    .sort((a, b) => b.ownersWithTwitterCount - a.ownersWithTwitterCount)
    .reduce((acc: any[], collection, idx) => {
      if (idx < MAX_FEATURED_SECTION_LIST_ITEMS) {
        acc.push({
          image: collection.image?.url,
          name: collection.name,
          slug: collection.slug,
          stat: collection.ownersWithTwitterCount
        });
      }
      return acc;
    }, []);

  const featured = collections.filter(collection =>
    ART_COLLECTIONS.includes(collection.slug)
  );
  const featuredItems = featured
    .slice(0, MAX_FEATURED_SECTION_LIST_ITEMS)
    .map(collection => ({
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
        <FeaturedList
          isLoading={isLoading}
          title="Latest Additions"
          items={newCollections}
        />
        <FeaturedList
          isLoading={isLoading}
          title="Most Members"
          items={mostTwitterMembers}
        />
        <div className="hidden lg:block">
          <FeaturedList isLoading={isLoading} title="Others" items={featuredItems} />
        </div>
      </div>
    </div>
  );
};

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
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="mx-auto px-16 pb-6">
        <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-6">
          <p className="text-xs leading-5 text-gray-500 hover:underline">
            &copy; {currentYear}{' '}
            <Link href="https://twitter.com/petrdu" target="_blank">
              petrdu & twittens.xyz
            </Link>
          </p>
          <FooterAlchemyLogo />
        </div>
      </div>
    </footer>
  );
};

const FooterAlchemyLogo = () => {
  const { theme } = useThemeContext();
  let ALCHEMY_URL = `https://alchemyapi.io/?r=badge:${BADGE_ID}`;
  const ALCHEMY_ANALYTICS_URL = `https://analytics.alchemyapi.io/analytics`;
  const imageUrl =
    theme === 'dark'
      ? 'https://static.alchemyapi.io/images/marketing/badge.png'
      : 'https://static.alchemyapi.io/images/marketing/badgeLight.png';

  const logBadgeClick = () => {
    fetch(`${ALCHEMY_ANALYTICS_URL}/badge-click`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        badge_id: BADGE_ID
      })
    });
    window.open(ALCHEMY_URL, '_blank')?.focus();
  };

  const logBadgeView = () => {
    fetch(`${ALCHEMY_ANALYTICS_URL}/badge-view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        badge_id: BADGE_ID
      })
    });
  };

  const isBadgeInViewpoint = (bounding: any) => {
    return (
      bounding.top >= 0 &&
      bounding.left >= 0 &&
      bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  };

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
        style={{ width: '180px', height: 'auto' }}
        src={imageUrl}
        alt="Alchemy Supercharged"
      />
    </a>
  );
};

const HeroBanner = () => (
  <div className="flex justify-between flex-col">
    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
      Find new <span className="text-blue-400">Twitter</span> frens!
    </p>
    <p className="mt-2 text-base md:text-xl leading-8 text-gray-600 dark:text-gray-300 ">
      Twittens helps you to find NFT collectors on Twitter, so you can connect & make new
      frens.
    </p>
  </div>
);
