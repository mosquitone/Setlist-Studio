import { Metadata } from 'next';
import VerifyEmailClient from './VerifyEmailClient';

export const metadata: Metadata = {
  title: 'メール認証',
  description: 'メールアドレスの認証を完了してください。',
};

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;

export default function VerifyEmailPage() {
  return <VerifyEmailClient />;
}
