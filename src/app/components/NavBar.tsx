// NavBar.tsx
"use client";

import React from 'react';
import styles from './NavBar.module.css';

const NavBar: React.FC = () => {
  return (
    <div className={styles.navBar}>
      <div className={styles.tabs}>
        <span className={styles.tab}>Home</span>
        <span className={styles.tab}>Calendar</span>
        <span className={styles.tab}>Agenda</span>
        <span className={styles.tab}>Settings</span>
      </div>
    </div>
  );
};

export default NavBar;
