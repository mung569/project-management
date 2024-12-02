"use client";

import React from 'react';
import styles from './Signup.module.css'; 
import Link from 'next/link';
import { useState } from "react";
import { IoMdHome } from "react-icons/io";
import { useRouter } from "next/navigation";

  interface SignupFormProps {
    onSignup: (email: string, username: string, password: string) => void;
}
export default function SignupForm({ onSignup }: SignupFormProps) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // Local storage method
      /*
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      const userExists = users.some((user: any) => user.username === username);
      if (userExists) {
          alert("Username is already taken!");
          return;
      }

      users.push({ email, username, password });
      localStorage.setItem("users", JSON.stringify(users));
      */

      try {
        // Send POST request to backend for registration
        const response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, username, password }),
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong');
        }

  
        // Redirect to login page
        router.push('/login');
        //router.push('/');
      } catch (err: any) {
        alert('Failed to register. Please try again.');
      }
};

  return (
    <div>
      <nav className={styles.nav}>
        <Link href='./'><IoMdHome className={styles.homeIcon} /></Link>
      </nav>
      <div className={styles.wrapper}>
        <h1 className={styles.register}>Register for Swift</h1>
        <form onSubmit={handleSignup}>
          <h1 className={styles.signup}>Sign Up</h1>
          
          <div className={styles.inputBox}>
            <label htmlFor="email">Email</label>
            <input 
              id="email" 
              type="email" 
              placeholder="Enter your email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
            <i className='bx bx-user'></i>
          </div>

          
          <div className={styles.inputBox}>
            <label htmlFor="username">Username</label>
            <input 
              id="username" 
              type="text" 
              placeholder="Enter a username" 
              required 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              />
            <i className='bx bx-user'></i>
          </div>

          
          <div className={styles.inputBox}>
            <label htmlFor="password">Password</label>
            <input  
              id="password" 
              type="password" 
              placeholder="Enter your password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            <i className='bx bxs-lock-alt'></i>
          </div>

          <button type="submit" className={styles.btn}>Register</button>
        </form>
        <div className={styles.registerLink}>
            <p>Already have an account? <Link href="/login">Log In</Link></p>
          </div>
      </div>
    </div>
  );
}
