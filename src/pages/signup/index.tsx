import Link from 'next/link';
import styles from './page.module.css';
import { FormEvent, useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPass: '',
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const responseData = await response.json();

    if (response.ok) {
      window.location.href = "/uploadpage";
    } else {
      setErrorMessage(responseData.message || 'Signup failed.');
    }
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>InfoGuru</h1>

      <form onSubmit={onSubmit} className={styles.container}>
        <div className={styles.signup_title}>
          <h1>Sign Up</h1>
        </div>

        <label className={styles.input_title}>Name</label>
        <input
          className={styles.input}
          name='name'
          type='text'
          placeholder='Your Name/Organization Name'
          value={formData.name}
          onChange={handleInputChange}
        />

        <label className={styles.input_title}>Email</label>
        <input
          className={styles.input}
          name='email'
          type='email'
          placeholder='Your Email'
          value={formData.email}
          onChange={handleInputChange}
        />

        <label className={styles.input_title}>Password</label>
        <input
          className={styles.input}
          name='password'
          type='password'
          placeholder='********'
          value={formData.password}
          onChange={handleInputChange}
        />

        <label className={styles.input_title}>Confirm Password</label>
        <input
          className={styles.input}
          name='confirmPass'
          type='password'
          placeholder='********'
          value={formData.confirmPass}
          onChange={handleInputChange}
        />

        <button type="submit" className={styles.signup_button}>
          Create Account
        </button>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <Link href="/login">
          <button className={styles.login}>Login</button>
        </Link>
      </form>
    </main>
  );
}
