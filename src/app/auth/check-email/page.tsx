import { Metadata } from 'next';
import CheckEmailClient from './CheckEmailClient';

export const metadata: Metadata = {
  title: 'メール認証 - Setlist Studio',
  description: 'メール認証を完了してアカウントを有効化してください',
};

export default function CheckEmailPage() {
  return <CheckEmailClient />;
}
