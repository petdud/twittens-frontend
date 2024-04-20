import Link from 'next/link';
import Image from 'next/image';
import { useThemeContext } from '../../core/theme-provider';

export const Logo = ({ withLink }: { withLink?: boolean }) =>
  withLink ? (
    <Link href={'/'}>
      <RenderLogo />
    </Link>
  ) : (
    <RenderLogo />
  );

const RenderLogo = () => {
  const { theme } = useThemeContext();

  return (
    <div className="flex text-black dark:text-white text-3xl items-center">
      <Image
        className="h-8 w-auto mr-3"
        width="81"
        height="25"
        src={theme === 'light' ? '/xfrens_symbol.png' : '/xfrens_symbol_dark.png'}
        alt="xFrens"
      />
      <div>
        x<span className="text-gray-600 dark:text-gray-400">Frens</span>
        <span className="text-sm">.xyz</span>
      </div>
    </div>
  );
};
