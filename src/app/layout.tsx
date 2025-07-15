import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    template: '%s | AI Hub Directory',
    default: 'AI Hub Directory - Discover AI Tools',
  },
  description:
    'AI 구독 서비스들을 체계적으로 정리하고 비교할 수 있는 원스톱 플랫폼',
  keywords: [
    'AI',
    'subscription',
    'tools',
    'directory',
    '인공지능',
    '구독서비스',
  ],
  openGraph: {
    title: 'AI Hub Directory',
    description: 'Discover the best AI tools for your needs',
    url: 'https://aihub-directory.com',
    siteName: 'AI Hub Directory',
    images: '/og-image.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
