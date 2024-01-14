// front/src/app/components/Footer.tsx
'use client';
import React from 'react';


const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-2">
          <div className="text-4xl text-indigo-400" />
          <span className="text-xl font-bold">PairDev</span>
        </div>
        <nav className="flex justify-center items-center space-x-6">
          <a href="/terms" className="flex flex-col items-center">
            <div className="text-2xl text-indigo-400" />
            <span className="mt-1">利用規約</span>
          </a>
          <a href="/privacy" className="flex flex-col items-center">
            <div className="text-2xl text-indigo-400" />
            <span className="mt-1">プライバシーポリシー</span>
          </a>
          <a href="/contact" className="flex flex-col items-center">
            <div className="text-2xl text-indigo-400" />
            <span className="mt-1">連絡先</span>
          </a>
        </nav>
        <div className="text-sm">
          <p>&copy; {new Date().getFullYear()} PairDev. All rights reserved.</p>
          <p>ロボットによって構築された未来</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;