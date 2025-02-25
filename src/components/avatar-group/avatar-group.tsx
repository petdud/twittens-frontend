import Link from 'next/link';
import { classNames } from '../../utils';

export interface IAvatarGroupProps {
  items: IAvatarGroupItemProps[];
  maxItems?: number;
  placeholderInherited?: boolean;
  size?: number;
  scroll?: boolean;
  closer?: boolean;
  disableLinks?: boolean;
}

export interface IAvatarGroupItemProps {
  imageUrl: string;
  name: string;
  link?: string;
}

export const AvatarGroup = ({
  closer,
  items,
  maxItems,
  size = 6,
  placeholderInherited,
  scroll,
  disableLinks
}: IAvatarGroupProps) => {
  const number = maxItems ? items.length - maxItems : undefined;
  const ringClass =
    size > 6
      ? 'ring-2 ring-slate-100 dark:ring-neutral-600'
      : 'ring-1 ring-slate-100 dark:ring-neutral-600';

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div
      className={classNames(
        scroll ? 'overflow-x-auto hide-scrollbar' : 'overflow-x-hidden',
        'flex items-center space-x-2'
      )}
    >
      <div
        className={classNames(
          closer ? '-space-x-2' : '-space-x-1',
          'flex flex-shrink-0 p-1'
        )}
      >
        {((maxItems && items.slice(0, maxItems)) || items).map(
          ({ imageUrl, link, name }) =>
            link && !disableLinks ? (
              <WithLink key={name} link={link}>
                <AvatarItem
                  imageUrl={imageUrl}
                  name={name}
                  size={size}
                  ringClass={ringClass}
                />
              </WithLink>
            ) : (
              <AvatarItem
                key={name}
                imageUrl={imageUrl}
                name={name}
                size={size}
                ringClass={ringClass}
              />
            )
        )}
        {!!number && number > 0 && (
          <Placeholder
            number={number > 99 ? 99 : number}
            placeholderInherited={placeholderInherited}
            size={size}
            ringClass={ringClass}
          />
        )}
      </div>
    </div>
  );
};

const WithLink = ({ link, children }: { link: string; children: React.ReactNode }) => (
  <Link href={link} target="_blank" className="cursor-pointer">
    {children}
  </Link>
);

interface IAvatarItemProps {
  imageUrl: string;
  name: string;
  size: number;
  ringClass: string;
}

const AvatarItem = ({ imageUrl, name, size, ringClass }: IAvatarItemProps) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    className={classNames(
      `h-${size} w-${size}`,
      'max-w-none rounded-full bg-neutral-300 dark:bg-neutral-500',
      ringClass
    )}
    title={name}
    src={imageUrl}
    alt={name}
  />
);

interface IPlaceholderProps {
  number: number;
  placeholderInherited?: boolean;
  size: number;
  ringClass: string;
}

const Placeholder = ({
  number,
  placeholderInherited,
  size,
  ringClass
}: IPlaceholderProps) =>
  placeholderInherited ? (
    <span
      className={classNames(
        `h-${size} w-${size}`,
        'relative z-100 inline-flex items-center justify-center rounded-full bg-gray-100 dark:bg-neutral-900 p-2',
        ringClass
      )}
    >
      <span className="font-light text-xs leading-none text-black dark:text-white">
        +{number}
      </span>
    </span>
  ) : (
    <span
      className={`flex-shrink-0 text-xs font-medium leading-${size} text-gray-600 dark:text-gray-400 pl-2`}
    >
      +{number}
    </span>
  );
