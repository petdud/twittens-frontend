import React from 'react';
import { Fragment, useState } from 'react';
import { Dialog, Switch, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  HomeIcon,
  QuestionMarkCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { classNames } from '../utils';
import Link from 'next/link';
import { SearchBar } from '../components/search-bar/search-bar';
import { AiOutlineClose, AiOutlineRight } from 'react-icons/ai';
import { FaXTwitter } from 'react-icons/fa6';
import { ImContrast } from 'react-icons/im';
import { ROUTES, SET_TWITTER_URL } from '../core/routes';
import { useThemeContext } from '../core/theme-provider';
import { MdLeaderboard, MdOutlineFeedback } from 'react-icons/md';
import { useSession, signOut } from 'next-auth/react';
import { FaDiscord } from 'react-icons/fa';
import { Divider } from '../components/divider/divider';
import { FEATURE_FLAGS } from '../core/feature-flags';
import { AiFillFolderAdd } from 'react-icons/ai';
import { HiOutlineExternalLink } from 'react-icons/hi';
import { IoIosPhotos } from 'react-icons/io';
import { Logo } from '../components/logo/logo';

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon, isActive: true },
  {
    name: 'Leaderboard',
    href: '/leaderboard',
    icon: MdLeaderboard,
    isActive: FEATURE_FLAGS.ENABLE_LEADERBOARD
  },
  { name: 'FAQ', href: '/faq', icon: QuestionMarkCircleIcon, isActive: true }
];

interface IMainSlot {
  children: JSX.Element | JSX.Element[];
}

export const MainSlot = ({ children }: IMainSlot) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen h-full dark:bg-zinc-900">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4 dark:bg-neutral-800 ">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4 px-4">
                  <div className="flex flex-shrink-0 items-center px-4 justify-start">
                    <Logo withLink={true} />
                  </div>
                  <Divider wrapperClass="mt-4" />
                  <nav className="mt-5 space-y-1 px-2">
                    {navigation.map(
                      item =>
                        item.isActive && (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-neutral-200 hover:dark:text-neutral-100 hover:dark:bg-neutral-900',
                              'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                            )}
                          >
                            <item.icon
                              className={classNames(
                                'text-gray-400 group-hover:text-gray-500',
                                'mr-4 flex-shrink-0 h-6 w-6'
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </a>
                        )
                    )}
                    <LensensLink />
                    <CastFrensLink />
                  </nav>
                  <Divider wrapperClass="my-6" />
                  <JoinCommunitySection />
                  <Divider wrapperClass="my-6" />
                  <ThemeSettings />
                  <AdminMenu />
                </div>

                <Footer />
              </Dialog.Panel>
            </Transition.Child>

            <div className="w-14 flex-shrink-0" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5 px-4 dark:bg-neutral-800 dark:border-neutral-700">
          <div className="flex flex-shrink-0 items-center px-4">
            <Logo withLink={true} />
          </div>
          <Divider wrapperClass="mt-4" />
          <div className="mt-5 flex flex-grow flex-col">
            <div>
              <nav className="flex-1 space-y-1 px-2 pb-4">
                {navigation.map(
                  item =>
                    item.isActive && (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-neutral-200',
                          'group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-50 hover:text-gray-900 hover:dark:bg-neutral-900 hover:dark:text-neutral-100'
                        )}
                      >
                        <item.icon
                          className={classNames(
                            'text-gray-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-400',
                            'mr-3 flex-shrink-0 h-6 w-6 text-gray-400 dark:text-neutral-200'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    )
                )}
                <LensensLink />
                <CastFrensLink />
              </nav>
              <Divider wrapperClass="mt-3" />
              <div className="mt-6">
                <SearchBar />
              </div>
              <Divider wrapperClass="my-6" />
              <JoinCommunitySection />
              <Divider wrapperClass="my-6" />
              <ThemeSettings />
              <AdminMenu />
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <div className="flex flex-1 flex-col md:pl-64">
        <div className="sticky top-0 z-10 bg-gray-100 pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden dark:bg-zinc-900">
          <div className="flex justify-around items-center">
            <div className="justify-start flex-1 ">
              <button
                type="button"
                className="-ml-0.5 -mt-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6 dark:text-white" aria-hidden="true" />
              </button>
            </div>
            <Logo withLink={true} />
            <div className="flex-1" />
          </div>
        </div>

        <main className="flex-1">
          {/* <MessageBanner /> */}
          {children}
        </main>
      </div>
    </div>
  );
};

const MessageBanner = () => {
  const [showBanner, setShowBanner] = useState(true);

  const handleDismiss = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="bg-yellow-100 py-2 px-4 text-sm text-yellow-800 flex justify-between border-b border-yellow-400">
      <a
        href="https://explorer.gitcoin.co/#/round/1/0x9c3b81967eafba0a451e324417dd4f3f353b997b/0x9c3b81967eafba0a451e324417dd4f3f353b997b-6"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        <p className="font-medium">
          <strong>xFrens.xyz</strong> has been accepted into the Gitcoin Grant Program for
          funding. Please support our project! 🙏
        </p>
      </a>
      <button
        type="button"
        title="Close"
        className="text-yellow-800"
        onClick={handleDismiss}
      >
        <AiOutlineClose />
      </button>
    </div>
  );
};

const LensensLink = () =>
  FEATURE_FLAGS.ENABLE_LENSENS_IN_MENU ? (
    <Link
      href={ROUTES.LENSENS}
      target="_blank"
      className={classNames(
        'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-neutral-200 justify-between',
        'group flex items-center px-2 py-1 text-sm font-medium rounded-md hover:bg-gray-50 hover:text-gray-900 hover:dark:bg-neutral-900 hover:dark:text-neutral-100'
      )}
    >
      <div className="flex items-center">
        <span className="mr-3 flex-shrink-0 h-6 w-6 text-xl" role="img" aria-label="Leaf">
          🍃
        </span>
        <span className="group-hover:text-lime-500">Lens</span>
        <span className="group-hover:text-lime-600">ens.xyz</span>
      </div>
      <HiOutlineExternalLink className="opacity-0 mr-1 group-hover:opacity-100 transition-opacity duration-200" />
    </Link>
  ) : null;

const CastFrensLink = () => (
  <Link
    href={ROUTES.CASTFRENS}
    target="_blank"
    className={classNames(
      'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-neutral-200 justify-between',
      'group flex items-center px-2 py-1 text-sm font-medium rounded-md hover:bg-gray-50 hover:text-gray-900 hover:dark:bg-neutral-900 hover:dark:text-neutral-100'
    )}
  >
    <div className="flex items-center">
      <span className="mr-3 flex-shrink-0 h-6 w-6 text-xl" role="img" aria-label="Leaf">
        💟
      </span>
      <span className="group-hover:text-purple-600 dark:group-hover:text-purple-500">
        Cast
      </span>
      <span className="group-hover:text-violet-700 dark:group-hover:text-violet-600">
        Frens.xyz
      </span>
    </div>
    <HiOutlineExternalLink className="opacity-0 mr-1 group-hover:opacity-100 transition-opacity duration-200" />
  </Link>
);

const JoinCommunitySection = () => (
  <div className="px-3">
    <div className="font-semibold text-neutral-700 dark:text-neutral-200">
      Join our community:
    </div>
    <div className="mt-2 flex flex-col">
      <Link href={ROUTES.TWITTER} target="_blank" className="cursor-pointer">
        <div className="inline-flex items-center gap-2 px-1 py-1 rounded-md text-sm text-gray-500 hover:text-gray-600 dark:text-neutral-200 hover:dark:text-neutral-50 group">
          <FaXTwitter className="group-hover:text-gray-700 dark:group-hover:text-gray-400" />{' '}
          X.com
        </div>
      </Link>
      <Link href={ROUTES.DISCORD} target="_blank" className="cursor-pointer">
        <div className="inline-flex items-center gap-2 px-1 py-1 rounded-md text-sm text-gray-500 hover:text-gray-600 dark:text-neutral-200 hover:dark:text-neutral-50 group">
          <FaDiscord className="group-hover:text-indigo-700 dark:group-hover:text-indigo-400" />{' '}
          Discord
        </div>
      </Link>
    </div>
  </div>
);

const GetListedButton = () => (
  <div className="pt-4">
    <Link href={SET_TWITTER_URL} target="_blank" type="button">
      <div className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 dark:bg-indigo-800 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        Get listed
        <AiOutlineRight className="ml-2" />
      </div>
    </Link>
  </div>
);

const RequestCollectionButton = () => (
  <div className="pt-4">
    <Link
      href={ROUTES.GET_LISTED}
      target={FEATURE_FLAGS.ENABLE_PAID_LISTING ? '' : '_blank'}
      type="button"
    >
      <div className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 dark:bg-indigo-800 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
        Add collection
        <IoIosPhotos className="ml-2" />
      </div>
    </Link>
  </div>
);

const Footer = () => (
  <>
    <Divider />
    <div className="p-4">
      <Link
        href={SET_TWITTER_URL}
        className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-2 hover:underline cursor-pointer"
        target="_blank"
      >
        <AiOutlineRight /> Get listed
      </Link>
      <Link
        href={ROUTES.GET_LISTED}
        target={FEATURE_FLAGS.ENABLE_PAID_LISTING ? '' : '_blank'}
        className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-2 hover:underline cursor-pointer"
      >
        <AiFillFolderAdd /> Request collection
      </Link>
      <Link
        href={ROUTES.FEEDBACK}
        className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm mb-2 hover:underline cursor-pointer"
        target="_blank"
      >
        <MdOutlineFeedback /> Send feedback
      </Link>
      <div className="block text-gray-500 dark:text-gray-400 text-xs">
        Created by{' '}
        <a
          href="https://www.twitter.com/petrdu"
          className="cursor-pointer text-gray-600 dark:text-gray-300 underline hover:dark:text-gray-50"
          target="_blank"
          rel="noreferrer noopener"
        >
          petrdu
        </a>
      </div>
    </div>
  </>
);

const ThemeSettings = () => {
  const { theme, setTheme } = useThemeContext();
  const isEnabled = theme === 'dark' ? true : false;

  const onChange = React.useCallback(
    (val: boolean) => {
      const theme = val ? 'dark' : 'light';
      setTheme(theme);
    },
    [setTheme]
  );

  return (
    <Switch.Group as="div" className="cursor-pointer">
      <div className="flex items-center justify-around grow">
        <Switch.Label as="span" className="ml-3">
          <div className="flex items-center gap-2">
            <span className="pr-4 text-white dark:text-neutral-200">
              <ImContrast className="text-black dark:text-white" />
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-neutral-200">
              DARK MODE
            </span>
          </div>
        </Switch.Label>
        <Switch
          checked={isEnabled}
          onChange={onChange}
          className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <span className="sr-only">Use dark mode</span>
          {/* // this */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute h-full w-full rounded-md "
          />
          <span
            aria-hidden="true"
            className={classNames(
              isEnabled ? 'bg-black' : 'bg-gray-200',
              'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out'
            )}
          />
          <span
            aria-hidden="true"
            className={classNames(
              isEnabled ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-200 bg-white dark:border-neutral-800 shadow ring-0 transition-transform duration-200 ease-in-out'
            )}
          />
        </Switch>
      </div>
    </Switch.Group>
  );
};

const AdminMenu = () => {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  return (
    <div className="mt-5">
      <Divider />
      <div className="px-3 mt-5 flex items-center">
        <div className="font-semibold dark:text-neutral-200">
          <Link href="/admin/collections" className="cursor-pointer">
            Admin panel
          </Link>
        </div>
        <div>
          <button onClick={() => signOut()} className="cursor-pointer">
            <div className="inline-flex items-center gap-2 px-1 py-1 rounded-md text-sm text-gray-600 hover:text-black dark:text-neutral-400 hover:dark:text-neutral-300">
              (Sign Out)
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
