"use client";

import React from 'react';
import styles from './Signup.module.css'; 
import Link from 'next/link';

const LoginForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.register}>Register for Swift</h1>
      <form onSubmit={handleSubmit}>
        <h1 className={styles.signup}>Sign Up</h1>
        
        <div className={styles.inputBox}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="Enter your email" required />
          <i className='bx bx-user'></i>
        </div>

        
        <div className={styles.inputBox}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" placeholder="Enter a username" required />
          <i className='bx bx-user'></i>
        </div>

        
        <div className={styles.inputBox}>
          <label htmlFor="password">Password</label>
          <input  id="password" type="password" placeholder="Enter your password" required />
          <i className='bx bxs-lock-alt'></i>
        </div>

        <button type="submit" className={styles.btn}>Register</button>
      </form>
      <div className={styles.registerLink}>
          <p>Already have an account? <Link href="/login">Log In</Link></p>
        </div>
    </div>
  );
};

export default LoginForm;
