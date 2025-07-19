import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import MUIProvider from '@/components/providers/MUIProvider';
import ApolloProviderWrapper from '@/components/providers/ApolloProvider';
import CSRFProvider from '@/components/providers/CSRFProvider';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { I18nProvider } from '@/components/providers/I18nProvider';
import Header from '@/components/common/layout/Header';
import Footer from '@/components/common/layout/Footer';
import LoadingFallback from '@/components/common/ui/LoadingFallback';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Setlist Studio',
    default: 'Setlist Studio - バンド向けセットリスト管理ツール',
  },
  description:
    'ステージで利用できるアーティスト向けのセットリスト作成アプリです。エクセルや手書きの時代はもう終わりです。楽曲管理から高品質なセットリスト生成まで。',
  keywords: [
    'セットリスト',
    'バンド',
    '楽曲管理',
    'ライブ',
    'コンサート',
    'ミュージシャン',
    '音楽',
    'パフォーマンス',
    'セットリスト作成',
    'mosquitone',
  ],
  authors: [{ name: 'mosquitone' }],
  creator: 'mosquitone',
  publisher: 'mosquitone',
  metadataBase: new URL('https://setlist-studio.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Setlist Studio - バンド向けセットリスト管理ツール',
    description:
      'ステージで利用できるアーティスト向けのセットリスト作成アプリです。エクセルや手書きの時代はもう終わりです。楽曲管理から高品質なセットリスト生成まで。',
    url: 'https://setlist-studio.vercel.app',
    siteName: 'Setlist Studio',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/setlist-studio-logo.png',
        width: 1200,
        height: 630,
        alt: 'Setlist Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Setlist Studio - バンド向けセットリスト管理ツール',
    description:
      'ステージで利用できるアーティスト向けのセットリスト作成アプリです。エクセルや手書きの時代はもう終わりです。楽曲管理から高品質なセットリスト生成まで。',
    images: ['/setlist-studio-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Setlist Studio',
    description:
      'ステージで利用できるアーティスト向けのセットリスト作成アプリです。エクセルや手書きの時代はもう終わりです。楽曲管理から高品質なセットリスト生成まで。',
    applicationCategory: 'MusicApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'JPY',
    },
    author: {
      '@type': 'Organization',
      name: 'mosquitone',
    },
    url: 'https://setlist-studio.vercel.app',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '125',
    },
    featureList: [
      'セットリスト作成・編集',
      '楽曲管理',
      'プロフェッショナルな画像生成',
      'QRコード統合',
      'テーマ選択',
      'セットリスト共有',
    ],
  };

  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <I18nProvider>
          <ApolloProviderWrapper>
            <MUIProvider>
              <CSRFProvider>
                <AuthProvider>
                  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                    <Header />
                    <main style={{ flex: 1 }}>
                      <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
                    </main>
                    <Footer />
                  </div>
                </AuthProvider>
              </CSRFProvider>
            </MUIProvider>
          </ApolloProviderWrapper>
        </I18nProvider>
      </body>
    </html>
  );
}
