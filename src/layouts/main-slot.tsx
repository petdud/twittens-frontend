import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  HomeIcon, 
  QuestionMarkCircleIcon, 
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { classNames } from '../utils';
import Link from 'next/link';
import Image from 'next/image';
import { SearchBar } from '../components/search-bar/search-bar';
import { AiOutlineRight } from 'react-icons/ai';
import { BsTwitter } from 'react-icons/bs';
import { GOOGLE_FORM_GET_LISTED, TWITTENS_TWITTER_URL } from '../core/constants';
BsTwitter

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'FAQ', href: '/faq', icon: QuestionMarkCircleIcon },
];

interface IMainSlot {
  children: JSX.Element;
}

export const MainSlot = ({children}: IMainSlot) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)



  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className='bg-gray-100 min-h-screen'>
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
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
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
                  <div className="flex flex-shrink-0 items-center px-4">
                    <Image
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt="Your Company"
                    />
                  </div>
                  <div className="mt-5 h-0 flex-1 overflow-y-auto">
                    <nav className="space-y-1 px-2">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
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
                      ))}
                    </nav>
                  </div>
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
          <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5 px-4">
            <div className="flex flex-shrink-0 items-center justify-center px-4">
              <Link href={"/"}>
                <Image
                  className=""
                  width="163"
                  height="50"
                  src="/twittens_logo.png"
                  alt="Twittens"
                />
              </Link>
            </div>
            <div className="border-t border-gray-200 mt-4 "/>



              {/* <div className="mt-2 px-3">
                <button
                  disabled
                  type="button"
                  style={{background: "#1da1f2"}}
                  className="inline-flex w-full justify-center items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Connect Twitter
                </button>
              </div> */}

              <div className="mt-5 flex flex-grow flex-col"> 
                <div>
                  <nav className="flex-1 space-y-1 px-2 pb-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name} 
                        href={item.href}
                        className={classNames(
                          'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                          'group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-gray-50 hover:text-gray-900'
                      )}>
                        <item.icon
                          className={classNames(
                            'text-gray-400 group-hover:text-gray-500',
                            'mr-3 flex-shrink-0 h-6 w-6 text-gray-400'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                        </Link>
                    ))}
                    <div className="pt-4">
                      <Link href={GOOGLE_FORM_GET_LISTED} target="_blank">
                        <button
                          type="button"
                          className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          Get listed
                          <AiOutlineRight className="ml-2" />
                        </button>
                      </Link>
                    </div>
                  </nav>
                  <div className="border-t border-gray-200 mt-3" />
                  <SearchBar />
                  <div className="border-t border-gray-200 my-6"/>
                  <div className="px-3">
                    <div className="font-semibold">Join our community:</div>
                    <div className="mt-2">
                      <Link
                        href={TWITTENS_TWITTER_URL}
                        target="_blank"
                      >
                        <button className="flex items-center gap-2 bg-white px-2 py-1 rounded-md border-solid border-2 border-sky-500 text-sky-600 hover:bg-sky-500 hover:text-white">
                        <BsTwitter /> Twitter
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

          </div>
        </div>
        <div className="flex flex-1 flex-col md:pl-64">


          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}