"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './LandingPage.module.css';


const LandingPage = () => {
    const router = useRouter()

    return (
        <div >
            <div className={styles.nav}>
                <button className={styles.signUpBtn}>Sign Up</button>
                <button 
                    className={styles.loginBtn}
                    type='button'
                    onClick={() => router.push('/login')}>
                    Login
                </button>
            </div>
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
                    onClick={() => router.push('/login')}>
                    Get Started
                </button>
            </div>
        </div>
    )
}


export default LandingPage;