import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react"; 
import styles from './Header.module.css';

interface HeaderProps {
  color?: string; // 色を指定するためのオプショナルプロパティ
}

const Header: React.FC<HeaderProps> = ({ color = 'white' }) => { 
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('Home'); // 例として'Home'をアクティブなリンクとして設定
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = (path: string) => {
    window.location.href = path;
  };
  const navLinks = [
    { id: 2, title: 'Gallery', path: '/three' },
    { id: 3, title: 'Share', path: '/contact' },
    // 他のナビゲーションリンク
  ];

  return (
    <nav className={`fixed top-0 w-full z-10 py-5 ${scrolled ? "bg-primary" : "bg-transparent"}`}>
      <div className='max-w-7xl mx-auto px-4 flex justify-between items-center'>
        <div onClick={() => navigate('/')} className='cursor-pointer flex items-center gap-2'>
          {/* 画像のパスは適宜調整してください */}
          <img src="/logo.png" className='w-20 h-20 object-contain' />
          <p className={`${styles.text} ${styles.textWhite} ${styles.text40px} ${styles.fontBold}`}>
            <span className='sm:block hidden' style={{ color }}>Gallery.ai</span>
          </p>
        </div>
        <div className='hidden sm:flex flex-row gap-0'>
        {navLinks.map((nav) => (
            <div key={nav.id} onClick={() => navigate(nav.path)} className={`${styles.navLink} text-[18px] font-medium cursor-pointer`} style={{ color }}>
              {nav.title}
            </div>
          ))}
          {/* ログイン/ログアウトボタンの表示 */}
          {session ? (
            <button onClick={() => signOut()} className={`${styles.navLink} text-[18px] font-medium cursor-pointer`} style={{ color }}>
              LOGOUT
            </button>
          ) : (
            <button onClick={() => signIn()} className={`${styles.navLink} text-[18px] font-medium cursor-pointer`} style={{ color }}>
              LOGIN
            </button>
          )}
        </div>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? "/close.svg" : "/menu.svg"}
            
            className='w-[28px] h-[28px] object-contain cursor-pointer'
            onClick={() => setToggle(!toggle)}
          />
          {/* モバイルメニュー */}
          <div className={`${!toggle ? "hidden" : "flex"} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
        <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
        {navLinks.map((nav) => (
            <Link key={nav.id} href={nav.path}>
              <div className={`text-white text-[18px] font-medium cursor-pointer ${active === nav.title ? "underline" : ""}`}
                 onClick={() => setActive(nav.title)}>
                {nav.title}
              </div>
            </Link>
          ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

