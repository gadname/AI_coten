import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NextAuthProvider from '@/providers/NextAuth';

const inter = Inter({ subsets: ['latin'] });

// 統合されたmetadataの定義
export const metadata: Metadata = {
  metadataBase: new URL('https://ai-coten.vercel.app/'), // 本番環境のアプリ名
  title: 'Gallery.ai',
  description: 'Gallery.aiはAI画像生成&デジタル個展サービスです',
  openGraph: {
    title: 'Gallery.ai',
    description: 'Gallery.aiはAI画像生成&デジタル個展サービスです',
  },
  twitter: {
    title: 'Gallery.ai',
    description: 'Gallery.aiはAI画像生成&デジタル個展サービスです',
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
