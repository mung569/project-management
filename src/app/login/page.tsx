// components/LoginForm.tsx

"use client";

import React from 'react';
import styles from './LoginPage.module.css'; // Use CSS modules

const LoginForm: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add login functionality here
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.welcome}>Welcome Back To Swift</h1>
      <form onSubmit={handleSubmit}>
        <h1 className={styles.login}>Login</h1>
        <div className={styles.inputBox}>
          <input type="text" placeholder="Email" required />
          <i className='bx bx-user'></i>
        </div>
        <div className={styles.inputBox}>
          <input type="password" placeholder="Password" required />
          <i className='bx bxs-lock-alt'></i>
        </div>
        <div className={styles.rememberForgot}>
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div>
        <button type="submit" className={styles.btn}>Login</button>
      </form>
      <div className={styles.registerLink}>
          <p>Don't have an account? <a href="#">Sign up</a></p>
        </div>
    </div>
  );
};

export default LoginForm;
