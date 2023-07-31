import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1 className={styles.title}>InfoGuru</h1>
        <h2 className={styles.subtitle}>Got documents? Got Questions? Let AI handle the rest</h2>
        <p className={styles.paragraph}>InfoGuru lets you upload spreadsheets and have it interpret, graph, and explain the data without having to move a finger.</p>
        <button className={styles.btn}>Try it now</button>
        <button className ={styles.login}>Login</button>
        <button className ={styles.signup}>SignUp</button>
      </div>
    </main>
  );
}
