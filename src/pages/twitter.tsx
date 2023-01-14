import React from 'react';
import { useRouter } from 'next/router';
import { TWITTENS_TWITTER_URL } from '../core/routes';

export default function Twitter() {
  const router = useRouter()

  React.useEffect(() => { router.push(TWITTENS_TWITTER_URL) }, [router])

  return null;
}
