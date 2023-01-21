import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { FEATURE_FLAGS } from '../../core/feature-flags';
import { ROUTES } from '../../core/routes'
import { classNames } from '../../utils'

export const HOW_DOES_IT_WORK_CONTENT = "Our website displays Twitter accounts of collection owners who have provided their Twitter handle in the primary ENS name associated with their collections. The information is publicly available on the blockchain with the user's consent.";
const LINK_CLASSNAME = "underline text-sky-600 dark:text-sky-500";

const faqs = [
  {
    id: "1",
    question: "How does Twittens works",
    answer: HOW_DOES_IT_WORK_CONTENT
  },
  {
    id: "2",
    question: "Can I get my NFT collection listed",
    answer: (
      FEATURE_FLAGS.ENABLE_PAID_LISTING ? 
      <a href={ROUTES.GET_LISTED} className={LINK_CLASSNAME} rel="noreferrer" target="_blank">Please click here for more details</a>
      :
      <>If you would like to have your NFT collection listed on Twittens, please <a href={ROUTES.GET_LISTED} className={LINK_CLASSNAME} rel="noreferrer" target="_blank">fill out this form</a>. We will review your submission and add your collection to our website as soon as possible. If you have any questions or need assistance, please don&apos;t hesitate to contact us at <a href="mailto:hi@twittens.xyz" className={LINK_CLASSNAME}>hi@twittens.xyz</a>.</>
    )
  },
  {
    id: "4",
    question: "How can I add my Twitter account",
    answer:
      <>If you&apos;re the owner of a collection and you don&apos;t see your Twitter handle on Twittens, please check that your Twitter handle is included in the ENS name associated with your collection. You can easily add your Twitter handle to your ENS name using our website <a href="https://set.twittens.xyz" className={LINK_CLASSNAME} rel="noreferrer" target="_blank">set.twittens.xyz</a>. <br/><br/>Once you&apos;ve added your Twitter handle to your ENS name, it may take up to 48 hours for it to appear on our website. If you need help or have questions, please contact us: <a href="mailto:hi@twittens.xyz" className={LINK_CLASSNAME}>hi@twittens.xyz</a>.</>
  },
  {
    id: "3",
    question: "Twitter accounts are missing in a collection",
    answer:
      <>If you notice that some Twitter accounts are missing from a collection on Twittens, please check that the corresponding collection owner has added their Twitter handle to the ENS name associated with their collection.<br/><br/>We regularly update our data from ENS text records, so if your Twitter handle is not included in your ENS name, it will not appear on our website. If you need help adding your Twitter handle to your ENS name, you can <a href={ROUTES.HOW_TO_ADD_TWITTER} className={LINK_CLASSNAME} rel="noreferrer" target="_blank">refer to this guide</a>.</>
  },
  {
    id: "5",
    question: "How can I contact you",
    answer:
      <><a href={ROUTES.DISCORD} className={LINK_CLASSNAME} rel="noreferrer" target="_blank">Discord</a>, <a href={ROUTES.TWITTER} className={LINK_CLASSNAME} rel="noreferrer" target="_blank">Twitter</a>, or drop us an email on <a href="mailto:hi@twittens.xyz" className={LINK_CLASSNAME}>hi@twittens.xyz</a></>
  },
]

interface IFaqItem {
  question: string | JSX.Element;
  answer: string | JSX.Element
}

const FaqItem = ({question, answer}: IFaqItem) => {
  return (
    <Disclosure as="div" className="pt-6">
      {({ open }) => (
        <>
          <dt className="text-lg">
            <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-400 dark:text-gray-200">
              <span className="font-medium text-gray-900 dark:text-gray-100">{question}</span>
              <span className="ml-6 flex h-7 items-center">
                <ChevronDownIcon
                  className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                  aria-hidden="true"
                />
              </span>
            </Disclosure.Button>
          </dt>
          <Disclosure.Panel as="dd" className="mt-2 pr-12">
            <p className="text-base text-gray-500 dark:text-neutral-300">{answer}</p>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export const Faq = () => {
  return (
    <div className="mx-auto max-w-7xl py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl divide-y-2 divide-gray-200 dark:divide-neutral-700">
        <h2 className="text-left text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
          Frequently asked questions
        </h2>
        <dl className="mt-6 space-y-6 divide-y divide-gray-200 dark:divide-neutral-700">
          {faqs.map(({id, question, answer}) => (
            <FaqItem key={id} question={question} answer={answer} />
          ))}
        </dl>
      </div>
    </div>
  )
}
