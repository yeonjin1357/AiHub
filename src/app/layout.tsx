import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/auth-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    template: '%s | AIMOA',
    default: 'AIMOA - Discover AI Tools',
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
    title: 'AIMOA',
    description: 'Discover the best AI tools for your needs',
    url: 'https://aimoa.com',
    siteName: 'AIMOA',
    images: '/og-image.png',
  },
  icons: {
    icon: '/logos/favicon/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
