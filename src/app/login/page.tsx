'use client';

import React from "react";
import styles from "./LoginPage.module.css";
import Link from "next/link";
import { IoMdHome } from "react-icons/io";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { doCredentialLogin } from "../api/auth";
import { signIn, signOut } from "@/auth";



export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  
  const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      // Collect form data
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
  
      
      try {
        const response = await doCredentialLogin(formData);
        if (response?.error) {
          setError(response.error.message); // Handle login error
        } else {
          // Redirect or update state for successful login
          router.push("/todo");
        }
      } catch (err: any) {
        alert("Invalid credentials. Please try again.")
      } 
        
  };

  return (
    <div>
      <nav className={styles.nav}>
        <Link href="/">
          <IoMdHome className={styles.homeIcon} />
        </Link>
      </nav>
      <div className={styles.wrapper}>
        <h1 className={styles.welcome}>Welcome Back To Swift</h1>
        <form onSubmit={handleLogin}>
          <h1 className={styles.login}>Login</h1>

          <div className={styles.inputBox}>
            <input 
              type="email" 
              placeholder="Email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
            <i className="bx bx-user"></i>
          </div>

          <div className={styles.inputBox}>
            <input 
              type="password" 
              placeholder="Password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            <i className="bx bxs-lock-alt"></i>
          </div>

          <div className={styles.rememberForgot}>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" className={styles.btn}>
            Login
          </button>
        </form>
        <div className={styles.registerLink}>
          <p>
            Don't have an account? <Link href="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
    
  );
};
