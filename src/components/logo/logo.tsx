import Link from 'next/link';

export const Logo = ({ withLink }: { withLink: boolean }) =>
  withLink ? (
    <Link href={'/'}>
      <RenderLogo />
    </Link>
  ) : (
    <RenderLogo />
  );

const RenderLogo = () => (
  <div className="text-black dark:text-white text-3xl">
    x<span className="text-gray-600 dark:text-gray-400">Frens</span>
    <span className="text-sm">.xyz</span>
  </div>
);
