// NavBar.tsx
"use client";

import React from 'react';
import styles from './NavBar.module.css';
import { useRouter } from 'next/navigation';

const NavBar: React.FC = () => {
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/");
  };

  return (
    <div className={styles.navBar}>
      <div className={styles.tabs}>
      <span className={styles.tab} onClick={handleSignOut}>
          Sign Out
        </span>
        <span className={styles.tab}
          onClick={() => router.push('/calendar')}>
            Calendar
        </span>
        <span className={styles.tab}
          onClick={() => router.push('/todo')}>
            Agenda
        </span>
        <span className={styles.tab}>Settings</span>
      </div>
    </div>
  );
};

export default NavBar;
