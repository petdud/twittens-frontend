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
      <link rel="icon" href="/favicon.ico" />
      <script async defer data-website-id="91db11b4-a01b-4b14-a4ad-e5175b609163" src="https://umammprod.up.railway.app/umami.js"></script>
      {children}
    </Head>
  )
}
