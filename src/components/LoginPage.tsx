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
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className={styles.inputBox}>
          <input type="text" placeholder="Username" required />
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
        <div className={styles.registerLink}>
          <p>Don't have an account? <a href="#">Register</a></p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
