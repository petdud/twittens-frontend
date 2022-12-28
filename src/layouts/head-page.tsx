import Head from 'next/head';

interface IHeadPageProps {
  title: string;
  description: string;
  children?: JSX.Element;
}

export const HeadPage = ({children, title, description}: IHeadPageProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content="Find twitter frens in NFT communities" />
      <meta
        property="og:description"
          content={description}
      />
      <meta
        property="og:image"
        content="https://twittens.xyz/sharing.jpg"
      />
      <meta property="twitter:creator" content="@twittensxyz" />
      <meta
        property="twitter:card"
        content="https://twittens.xyz/sharing.jpg"
      />
      <link rel="icon" href="/favicon.ico" />
      <script async defer data-website-id="91db11b4-a01b-4b14-a4ad-e5175b609163" src="https://umammprod.up.railway.app/umami.js"></script>
      {children}
    </Head>
  )
}
