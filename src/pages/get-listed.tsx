import React from 'react';
import { useRouter } from 'next/router';
import { GOOGLE_FORM_GET_LISTED } from '../core/routes';
import { FEATURE_FLAGS } from '../core/feature-flags';
import { Pricing } from '../components/pricing/pricing';
import { MainSlot } from '../layouts/main-slot';
import { HeadPage } from '../layouts/head-page';

export default function GetListedPage() {
  const router = useRouter()
  const redirectToGoogleForm = !FEATURE_FLAGS.ENABLE_PAID_LISTING

  React.useEffect(() => { 
    if (redirectToGoogleForm) {
      // redirect on google form
     router.push(GOOGLE_FORM_GET_LISTED) 
    }
  }, [redirectToGoogleForm, router])

  if (redirectToGoogleForm) {
    return null
  }

  return (
    <>
      <HeadPage 
        title="Get listed on Twittens!" 
        description="Learn how to get your NFT collection listed on Twittens and what are the benefits of being listed here."
      />
      <MainSlot>
        <Pricing />
      </MainSlot>
    </>
  )
}
