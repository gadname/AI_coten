'use client';
import Share from '../components/Share';
import Header from '../components/Header';
import Robot from '../components/Robot';
import type { Metadata } from 'next';


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

function SomeComponent() {
  return (
    <div>
      <Header />
      <Share />
      {/* <Robot /> */}
      
      {/* Other components */}
      
    </div>
  );
}
export default SomeComponent;