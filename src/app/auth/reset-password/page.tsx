import { Metadata } from 'next';
import ResetPasswordClient from './ResetPasswordClient';

export const metadata: Metadata = {
  title: 'パスワードリセット',
  description: 'アカウントの新しいパスワードを設定してください。',
};

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;

export default function ResetPasswordPage() {
  return <ResetPasswordClient />;
}
