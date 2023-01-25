import Head from 'next/head';

interface IHeadPageProps {
  title: string;
  description: string;
  image?: string;
  children?: JSX.Element;
}

export const HeadPage = ({ children, title, description, image}: IHeadPageProps) => {
  const imageUrl = image || "https://twittens.xyz/sharing.jpg?t=a";
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
          content="Twittens helps you to find twitter frens in your favorite NFT collections."
      />
      <meta property="og:site_name" content="Twittens" />
      <meta
        property="og:image"
        content={imageUrl}
      />
      <meta property="twitter:site" content="@twittensxyz" />
      <meta
        property="twitter:card"
        content="summary_large_image"
      />
      <meta property="og:type" content="product" />
      <meta
        property="twitter:image"
        content={imageUrl}
      />
      <meta
        property="twitter:title"
        content={title}
      />
      <meta
        property="twitter:description"
          content="Twittens helps you to find twitter frens in your favorite NFT collections."
      />
      <meta name="twitter:creator" content="petrdu" />
      <link rel="icon" href="/favicon.ico" />
      <script async defer data-website-id="91db11b4-a01b-4b14-a4ad-e5175b609163" src="https://umammprod.up.railway.app/umami.js"></script>
      {children}
    </Head>
  )
}
