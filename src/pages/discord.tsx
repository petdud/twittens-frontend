import React from 'react';
import { useRouter } from 'next/router';
import { XFRENS_DISCORD_URL } from '../core/routes';

export default function Discord() {
  const router = useRouter();

  React.useEffect(() => {
    router.push(XFRENS_DISCORD_URL);
  }, [router]);

  return null;
}
