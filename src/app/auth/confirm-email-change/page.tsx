import { Metadata } from 'next';
import ConfirmEmailChangeClient from './ConfirmEmailChangeClient';

export const metadata: Metadata = {
  title: 'メールアドレス変更確認',
  description: 'メールアドレスの変更を確認してください。',
};

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;

export default function ConfirmEmailChangePage() {
  return <ConfirmEmailChangeClient />;
}
