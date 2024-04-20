import Head from 'next/head';

interface IHeadPageProps {
  title: string;
  description: string;
  image?: string;
  children?: JSX.Element;
}

export const HeadPage = ({ children, title, description, image }: IHeadPageProps) => {
  const imageUrl = image || 'https://xfrens.xyz/sharing.jpg';
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content="xFrens helps you to find frens on 𝕏 social network in your favorite NFT collections."
      />
      <meta property="og:site_name" content="xFrens" />
      <meta property="og:image" content={imageUrl} />
      <meta property="twitter:site" content="@xfrensxyz" />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="og:type" content="product" />
      <meta property="twitter:image" content={imageUrl} />
      <meta property="twitter:title" content={title} />
      <meta
        property="twitter:description"
        content="xFrens helps you to find frens on 𝕏 social network in your favorite NFT collections."
      />
      <meta name="twitter:creator" content="petrdu" />
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>𝕏</text></svg>"
      />
      <script
        async
        defer
        data-website-id="91db11b4-a01b-4b14-a4ad-e5175b609163"
        src="https://umammprod.up.railway.app/umami.js"
      ></script>
      {children}
    </Head>
  );
};
