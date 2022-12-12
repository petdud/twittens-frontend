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
    </Head>
  )
}
