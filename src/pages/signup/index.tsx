"use client"
import Image from 'next/image'
import styles from './page.module.css'
import { FormEvent } from 'react'

export default function Home() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    const data = new FormData(event.target as HTMLFormElement);
    event.preventDefault();
    console.log(data.get("name"))

    const payload = {
      name: data.get('name'), 
    email: data.get('email'), 
    password: data.get('password'), 
    confirmPass: data.get('confirmPass')}

    const response = await fetch('/api/signup', { method: 'POST', body: JSON.stringify(payload),    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }})

    console.log(response.text)

  }
  return (
    <main className={styles.main}>
      <div>
        <h1 className={styles.title}>🧘‍♂️ InfoGuru </h1>
          <h1 className={styles.signup_wrapper}>Login</h1>
      </div>
      <form onSubmit={onSubmit} className={styles.container}>
        <div className={styles.signup_title}>
        <h1>Sign Up</h1>
        </div>
        <div>
          <label className={styles.input_title}>Name</label>
        <input className={styles.input} name='name' type='name' placeholder='Your Name/Organization Name' />
      </div>
      <div>
      <label className={styles.input_title}>Email</label>
        <input className={styles.input} name='email' type='email' placeholder='Your Email' />
        </div>
        <div>
        <label className={styles.input_title}>Password</label>
        <input className={styles.input} name='password' type='password' placeholder='********' />
        </div>
        <div>
        <label className={styles.input_title}>Confirm Password</label>
        <input className={styles.input} name='confirmPass' type='password' placeholder='********' />
        </div>
        <div>
            <button className={styles.signup_button}>Sign Up</button>
        </div>
      </form>
    </main>
  )
}
