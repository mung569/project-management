"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './LandingPage.module.css';

const LandingPage = () => {
    const router = useRouter();

    return (
        <div>
            <nav className={styles.nav}>
                <button
                    className={styles.altBtn} 
                    type='button'
                    onClick={() => router.push('/todo')}>
                    Go to To-Do Page
                </button>
                <button
                    className={styles.altBtn}
                    type='button'
                    onClick={() => router.push('/calendar')}>
                    Go to Calendar
                </button>
                <button 
                    className={styles.signUpBtn}
                    type='button'
                    onClick={() => router.push('/signup')}>
                    Sign Up
                </button>
                <button 
                    className={styles.loginBtn}
                    type='button'
                    onClick={() => router.push('/login')}>
                    Login
                </button>
            </nav>
            <div className={styles.container}>
                <h2>Welcome to</h2>
                <h1>SWIFT</h1>
                <div className={styles.tagline}>
                    <h3> 
                        Where project planning can finally be&nbsp;
                        <div className={styles.easy}>easy</div>
                        !
                    </h3>
                </div>
                <button
                    type='button'
                    onClick={() => router.push('/signup')}>
                    Get Started
                </button>

            </div>
        </div>
    );
};

export default LandingPage;
