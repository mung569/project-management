"use client";
import React from "react";
import styles from "./LoginPage.module.css";
import Link from "next/link";
import { IoMdHome } from "react-icons/io";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/todo" });
  };

  export default function LoginForm() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users") || "[]");

        const user = users.find(
          (user: any) => user.email === email && user.password === password
        );

        if (user) {
          // Successful login
          localStorage.setItem("isLoggedIn", "true");
          router.push("/todo");
        } else {
          // Invalid credentials
          setError("Invalid email or password");
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
