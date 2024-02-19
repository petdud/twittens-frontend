import React from 'react';
import { useRouter } from 'next/router';
import { XFRENS_TWITTER_URL } from '../core/routes';

export default function Twitter() {
  const router = useRouter();

  React.useEffect(() => {
    router.push(XFRENS_TWITTER_URL);
  }, [router]);

  return null;
}
