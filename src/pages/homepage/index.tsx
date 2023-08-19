import styles from './page.module.css';
import Link from 'next/link';
import React from 'react';


export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1 className={styles.title}>InfoGuru</h1>
        <h2 className={styles.subtitle}>Got documents? Got Questions? Let AI handle the rest!</h2>
        <p className={styles.paragraph}>InfoGuru lets you upload spreadsheets and have it interpret, graph, 
        and explain the data with just one click! Gone are the days of complicated data analysis.
         Our user-friendly interface ensures that anyone, regardless of their technical expertise, 
         can effortlessly navigate and visualize complex data sets. No more hours spent deciphering
         spreadsheets or writing complex code. we've simplified the process so you can focus on what
          truly matters: making data-driven decisions.
        </p>
        <Link href = "/signup">
         <button className={styles.btn}>Try it now</button>
        </Link>

        <Link href="/login"> 
          <button className={styles.login}>Login</button>
        </Link>
        <Link href ="/signup">
        <button className={styles.signup}>SignUp</button>
        </Link>
        
      </div>
    </main>
  );
}

