import React from 'react';
import { useRouter } from 'next/router';
import { GOOGLE_FORM_GET_LISTED } from '../core/constants';

export default function GetListedPage() {
  const router = useRouter()

  React.useEffect(() => { router.push(GOOGLE_FORM_GET_LISTED) }, [router])

  return null;
}
