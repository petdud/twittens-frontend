import Head from 'next/head';

interface IHeadPageProps {
  title: string;
  description: string;
}

export const HeadPage = ({title, description}: IHeadPageProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
      <script async defer data-website-id="71f3f4a6-7fc8-4af2-b7c0-2b0e3ecbd5fd" src="https://twittens-lytics.up.railway.app/umami.js"></script>
    </Head>
  )
}
