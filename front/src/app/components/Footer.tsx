import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from './Header.module.css'; // Headerのスタイルを適用する場合

const Footer = () => {
  return (
    <footer className={`fixed bottom-0 w-full z-10 py-10 bg-transparent`}>
      <div className='max-w-7xl mx-auto px-4 flex flex-col items-center'>
        <div className='mb-4 cursor-pointer'>
        </div>
        <nav className={`flex gap-6 mb-3 ${styles.text} ${styles.textWhite}`}>
          <Link href="/" data-testid="privacy-policy">
            <div className="hover:opacity-50 transition-all duration-100">プライバシーポリシー</div>
          </Link>
          <Link href="/" data-testid="terms-of-service">
            <div className="hover:opacity-50 transition-all duration-100">利用規約</div>
          </Link>
          <Link href="/faq" data-testid="faq">
            <div className="hover:opacity-50 transition-all duration-100">よくあるご質問</div>
          </Link>
        </nav>
        <small className={`text-xs md:text-base ${styles.textWhite}`}>© 2024 Gallery.ai</small>
      </div>
    </footer>
  );
};

export default Footer;