"use client";

import React from 'react';
import styles from './LandingPage.module.css';


const LandingPage = () => {
    return (
        <div >
            <div className={styles.nav}>
                <button className={styles.signUpBtn}>Sign Up</button>
                <button className={styles.loginBtn}>Login</button>
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
                <button>Get Started</button>
            </div>
        </div>
    )
}


export default LandingPage;