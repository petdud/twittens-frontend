import React from 'react';
import { useRouter } from 'next/router';
import { TWITTENS_DISCORD_URL } from '../core/constants';

export default function Discord() {
  const router = useRouter()

  React.useEffect(() => { router.push(TWITTENS_DISCORD_URL) }, [router])

  return null;
}
