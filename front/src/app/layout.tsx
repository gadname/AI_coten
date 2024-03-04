import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NextAuthProvider from '@/providers/NextAuth';
import { neoneon, dot } from "@/fonts/fonts"; // 簡潔にするために一行にまとめました
import { GoogleAnalytics } from "@next/third-parties/google"; // GoogleAnalyticsをインポート

const inter = Inter({ subsets: ['latin'] });

// 統合されたmetadataの定義
export const metadata: Metadata = {
  metadataBase: new URL('https://ai-coten-nu.vercel.app/'), // 本番環境のアプリ名
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

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="ja">
      <head>
        <GoogleAnalytics gaId="G-L4HRCZGH9H" /> 
      </head>
      <body className={`${inter.className} ${neoneon.variable} ${dot.variable}`} style={{ overflow: 'hidden' }}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;