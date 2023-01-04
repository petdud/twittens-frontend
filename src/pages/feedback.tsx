import React from 'react';
import { useRouter } from 'next/router';
import { GOOGLE_FEEDBACK_FORM } from '../core/constants';

export default function FeedbackPage() {
  const router = useRouter()

  React.useEffect(() => { router.push(GOOGLE_FEEDBACK_FORM) }, [router])

  return null;
}
