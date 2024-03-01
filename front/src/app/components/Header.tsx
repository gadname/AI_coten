import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { useSession, signIn, signOut } from "next-auth/react"; 
import styles from './Header.module.css';
import Login from '../components/Login'
import Logout from '../components/Logout'

interface HeaderProps {
  color?: string; 
}

const Header: React.FC<HeaderProps> = ({ color = 'white' }) => { 
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
  ];

  return (
    <nav className={`fixed top-10 w-full z-10 py-10 ${scrolled ? "bg-primary" : "bg-transparent"}`}>
      <div className='max-w-7xl mx-auto px-4 flex justify-between items-center'>
        <div onClick={() => navigate('/')} className='cursor-pointer flex items-center gap-2'>
          <img src="/image/logo.svg" alt="Logo" className={styles.customLogo} />
          <p className={`${styles.text} ${styles.text40px} ${styles.fontBold}`}>
            <span className={`${styles.slogan}`} style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,.6) 8%, rgba(255,255,255,.1) 120%, rgba(255,255,255,.2) 92%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Gallery.ai</span>
          </p>
        </div>

        {/* トグルボタンを全てのビューポートサイズで表示 */}
        <img
          src={toggle ? "/close.svg" : "/menu.svg"}
          className={`w-[28px] h-[28px] object-contain cursor-pointer ${styles.iconGlow}`} 
          onClick={() => setToggle(!toggle)}
        />

        {/* メニュー */}
        <div className={`${!toggle ? "hidden" : "flex"} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl ${styles.navContainer} `}>
          <ul className='list-none flex justify-end items-start flex-1 flex-col gap-4'>
            {navLinks.map((nav) => (
              <Link key={nav.id} href={nav.path}>
                <div className={styles.navLink}>
                  {nav.title}
                </div>
              </Link>
            ))}
            {session ? (
              <li>
                <Logout />
              </li>
            ) : (
              <li>
                <Login />
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
