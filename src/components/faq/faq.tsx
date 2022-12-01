import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { GOOGLE_FORM_GET_LISTED, HOW_TO_ADD_TWITTER_TO_ENS, TWITTENS_TWITTER_URL } from '../../core/constants'
import { classNames } from '../../utils'

const LINK_CLASSNAME = "underline text-sky-800";

const faqs = [
  {
    id: "1",
    question: "How does Twittens works",
    answer:
      "Displayed twitter accounts on our website are from collection owners who filled their twitter text record in their ENS names. The data are publicly available on the blockchain with user consent."
  },
  {
    id: "2",
    question: "Can I get my NFT collection listed",
    answer:
      <>Yes, please <a href={GOOGLE_FORM_GET_LISTED} className={LINK_CLASSNAME} rel="noreferrer" target="_blank">fill-in this form</a>. It might take us 2-4 weeks to add your collection. We might speed it up if you would like to contribute or get your collection featured: In that case, drop us an email on hi@twittens.xyz.</>
  },
  {
    id: "3",
    question: "Twitter accounts are missing in a collection",
    answer:
      <>We update our data every 24 hours and the Twitter accounts are from the twitter text records from ENS names. <a href={HOW_TO_ADD_TWITTER_TO_ENS} className={LINK_CLASSNAME} rel="noreferrer" target="_blank">Here is a guide how to add a twitter account to an ENS name</a>.</>
  },
  {
    id: "4",
    question: "I don't see my Twitter in a collection that I own",
    answer:
      <>Please make sure your twitter account is added in your ENS name text records. <a href={HOW_TO_ADD_TWITTER_TO_ENS} className={LINK_CLASSNAME} rel="noreferrer" target="_blank">Here is a guide how to do it</a>. Once done, please wait up to 48 hours to be displayed in our website.</>
  },
  {
    id: "5",
    question: "How can I contact you",
    answer:
      <><a href={TWITTENS_TWITTER_URL} className={LINK_CLASSNAME} rel="noreferrer" target="_blank">Twitter</a>, Discord or drop us an email on hi@twittens.xyz</>
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
            <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-400">
              <span className="font-medium text-gray-900">{question}</span>
              <span className="ml-6 flex h-7 items-center">
                <ChevronDownIcon
                  className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                  aria-hidden="true"
                />
              </span>
            </Disclosure.Button>
          </dt>
          <Disclosure.Panel as="dd" className="mt-2 pr-12">
            <p className="text-base text-gray-500">{answer}</p>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

export const Faq = () => {
  return (
    <div className="mx-auto max-w-7xl py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl divide-y-2 divide-gray-200">
        <h2 className="text-left text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Frequently asked questions
        </h2>
        <dl className="mt-6 space-y-6 divide-y divide-gray-200">
          {faqs.map(({id, question, answer}) => (
            <FaqItem key={id} question={question} answer={answer} />
          ))}
        </dl>
      </div>
    </div>
  )
}
