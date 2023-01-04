import React from 'react';
import { useRouter } from 'next/router';
import { HOW_TO_ADD_TWITTER_TO_ENS } from '../core/constants';

export default function HowToAddTwitter() {
  const router = useRouter()

  React.useEffect(() => { router.push(HOW_TO_ADD_TWITTER_TO_ENS) }, [router])

  return null;
}
