import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.label}>
        <h1 className={styles.textwrapper}>🧘‍♂️ InfoGuru</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.rectangle}>
        <div className={styles.signup_title}>
        <h1>Sign Up</h1>
        </div>
        <div>
          <label className={styles.input_title}>Name</label>
        <input className={styles.input} type='name' placeholder='Your Name/Organization Name' />
      </div>
      <div>
      <label className={styles.input_title}>Email</label>
        <input className={styles.input} type='email' placeholder='Your Email' />
        </div>
        <div>
        <label className={styles.input_title}>Password</label>
        <input className={styles.input} type='password' placeholder='********' />
        </div>
        <div>
        <label className={styles.input_title}>Confirm Password</label>
        <input className={styles.input} type='password' placeholder='********' />
        </div>
        <div>
            <button className={styles.signup_button}>Sign Up</button>
        </div>
      </div>
      </div>
    </main>
  )
}
