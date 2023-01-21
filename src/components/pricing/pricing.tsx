import React from 'react';
import Image from "next/image";
import { CheckIcon } from '@heroicons/react/24/outline'
import { classNames } from '../../utils';
import { HOW_DOES_IT_WORK_CONTENT } from '../faq/faq';
import { ROUTES } from '../../core/routes';

const linkClassName = "underline text-black dark:text-white";

const features = [
  'Have your NFT collection listed on homepage',
  'Compete in the leaderboard section',
  'Daily updates of the collection and its users',
  'Get featured on homepage for one week',
  'Get notified when new twitter account appears on Twittens',
  'Work with us on more insight',
  'Have fun connecting your community!',
];

const faqs = [
  {
    id: 1,
    question: "How does it work?",
    answer: (
      <>
        {HOW_DOES_IT_WORK_CONTENT}
      </>
    )
  },
  {
    id: 2,
    question: 'Can we get listed for free?',
    answer: (
      <>
        We are open to sponsor a listing for a community that is not listed yet. If you are interested, please <a href={ROUTES.DISCORD} target="_blank" rel="noreferrer" className={linkClassName}>connect with us on Discord</a>. We&apos;ll also consider listing a community for free if it is a charity, community without revenue (no royalties) or a project that contributes greatly to the adoption of web3. We&apos;ll also list notable communities with strong public interest for free for you to enjoy.
      </>
    ),
  },
  {
    id: 3,
    question: "Why do we have to pay?",
    answer: (
      <>
        We&apos;ll use the fund to continue developing this product and adding new features that helps NFT communities to connect and discover new opportunities. A part of it will also go for covering the cost of updating the data of all communities. We don&apos;t know how else we could monetize this project and we think it&apos;ll be fun for a community to get together and contribute to get listed.
      </>
    )
  },

  {
    id: 4,
    question: 'What is Leaderboard?',
    answer: (
      <>
        Leaderboard is a section where you can see which collections and users have the most followers on Twitter. Only communities listed on Twittens are included in the leaderboard as it would be otherwise impossible to keep it up to date. <br /><a href="https://twittens.xyz/leaderboard" target="_blank" rel="noreferrer" className={linkClassName}>Twittens Leaderboard</a>
      </>
    )
  },

]

export const Pricing = () => {

  return (
    <div className="bg-white">

      <div className="bg-gradient-to-b from-blue-50 via-white to-white dark:from-neutral-900 dark:via-black dark:to-black">
        {/* Pricing section with single price and feature list */}
        <div className="mx-auto max-w-7xl py-16 px-6 sm:py-24 lg:px-8">
          <div className="pb-16 xl:flex xl:items-center xl:justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                <span className="text-gray-900 dark:text-white">Get listed for </span>
                <span className="text-blue-600">0.1 ETH</span>
                <span className="text-gray-900 dark:text-white"> or equivalent</span>
              </h1>
              <p className="mt-5 text-xl text-gray-500 dark:text-gray-400">
                Join forces with your <span className="font-bold text-neutral-800 dark:text-neutral-100">NFT community</span> and grow your Twitter presence.
              </p>
            </div>
            <a
              href={ROUTES.DISCORD}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-full items-center justify-center rounded-md border border-transparent dark:bg-white bg-black py-3 px-5 text-base font-medium text-white dark:text-black hover:bg-blue-700 sm:mt-10 sm:w-auto xl:mt-0"
            >
              Get listed today
            </a>
          </div>
          <div className="border-t border-gray-200 pt-16 xl:grid xl:grid-cols-3 xl:gap-x-8">
            <div>
              <div className="flex items-center gap-2 text-lg font-semibold text-neutral-400">
                <Image
                  className="h-8 w-auto"
                  width="81"
                  height="25"
                  src="/twittens_symbol.png"
                  alt="Twittens"
                />
                <span>ENS + Twitter = Twittens </span>
              </div>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">Connect your community!</p>
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
                Get together 10 community members to chip-in 0.01 ETH each and get listed on Twittens. Start building and connecting your community with the help of Twittens!
              </p>
            </div>
            <div className="mt-4 sm:mt-8 md:mt-10 md:grid md:grid-cols-2 md:gap-x-8 xl:col-span-2 xl:mt-0">
              <ul role="list" className="divide-y divide-gray-200">
                {features.slice(0, 4).map((feature, featureIdx) => (
                  <li key={feature} className={classNames(featureIdx === 0 ? 'md:py-0 md:pb-4' : '', 'py-4 flex')}>
                    <CheckIcon className="h-6 w-6 flex-shrink-0 text-green-500" aria-hidden="true" />
                    <span className="ml-3 text-base text-gray-500 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <ul role="list" className="divide-y divide-gray-200 border-t border-gray-200 md:border-t-0">
                {features.slice(4).map((feature, featureIdx) => (
                  <li
                    key={feature}
                    className={classNames(featureIdx === 0 ? 'md:border-t-0 md:py-0 md:pb-4' : '', 'py-4 flex')}
                  >
                    <CheckIcon className="h-6 w-6 flex-shrink-0 text-green-500" aria-hidden="true" />
                    <span className="ml-3 text-base text-gray-500 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Branded FAQ */}
      <div className="bg-slate-100 dark:bg-neutral-900">
        <div className="mx-auto max-w-7xl py-16 px-6 sm:py-24 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">Frequently asked questions</h2>
          <div className="mt-6 border-t border-blue-400 border-opacity-25 pt-10">
            <dl className="space-y-10 md:grid md:grid-cols-2 md:grid-rows-2 md:gap-x-8 md:gap-y-12 md:space-y-0">
              {faqs.map((item) => (
                <div key={item.id}>
                  <dt className="text-lg font-medium leading-6 text-neutral-800 dark:text-white">{item.question}</dt>
                  <dd className="mt-2 text-base text-neutral-400 dark:text-blue-200">{item.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* CTA section */}
      {/* <div className="bg-white dark:bg-black">
        <div className="mx-auto max-w-7xl py-12 px-6 lg:flex lg:items-center lg:justify-between lg:py-24 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-700 sm:text-4xl">
            <span className="block">Ready to be listed?</span>
            <span className="block text-neutral-500">Let us know on Discord!</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href={ROUTES.DISCORD}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-transparent dark:bg-white bg-black py-3 px-5 text-base font-medium dark:text-black text-white"
              >
                Get started
              </a>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
