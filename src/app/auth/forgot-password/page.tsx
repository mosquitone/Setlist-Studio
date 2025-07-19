import { Metadata } from 'next';
import ForgotPasswordClient from './ForgotPasswordClient';

export const metadata: Metadata = {
  title: 'パスワードリセット',
  description: 'パスワードをお忘れの場合は、メールアドレスを入力してリセット手順をお送りします。',
};

// Force static generation
export const dynamic = 'force-static';
export const revalidate = false;

export default function ForgotPasswordPage() {
  return <ForgotPasswordClient />;
}
