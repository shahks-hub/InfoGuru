
import React, { useState } from 'react';
import styles from './login-form.module.css';
import Link from 'next/link';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Redirect to dashboard upon successful login
        window.location.href = '/uploadpage'; 
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred. Please try again later.');
    }
  }

  return (
    <main className={styles.main}>
      <img
        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
        alt="logo"
        className={styles.logoimage}
      />
      <Link href="/homepage">
        <button className={styles.backbtn}>Back to Homepage</button>
      </Link>
      <h1 className={styles.loginheading}>We are The InfoGuru Team</h1>

      <h3>Please login to your account</h3>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.email}>
        <label htmlFor="email">Email address:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className={styles.password}>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          className="form-control"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button className={styles.Signinbtn} onClick={handleLogin}>
        Sign in
      </button>
      <a className={styles.textmuted} href="#!">
        Forgot password?
      </a>

      <p className={styles.noaccount}>Don't have an account?</p>
      <Link href="/signup">
        <button className={styles.signupbtn}>Sign up now!</button>
      </Link>

      <h3>We are more than just a company</h3>
      <p className={styles.desc}>
        At InfoGuru, we understand that data is the backbone of modern
        businesses. That is why we have designed our platform to streamline the
        entire process, making it easier than ever to extract valuable insights
        from your data. With our secure and reliable technology, you can trust
        that your data is in safe hands. Join the data revolution with InfoGuru
        and unlock the true potential of your data with just a click of a
        button. Experience the future of data extraction and visualization.
        welcome to InfoGuru.
      </p>
    </main>
  );
}

export default App;
