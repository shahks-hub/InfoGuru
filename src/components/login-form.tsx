import React from 'react';
import styles from './login-form.module.css';

function App() {
  return (
    <main className={styles.main}>

             <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                alt="logo" className={styles.logoimage}/>
          
              <h1 className={styles.loginheading}>We are The InfoGuru Team</h1>
           

            <h3>Please login to your account</h3>

            <div className={styles.email}>
              <label htmlFor="email">Email address:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
              />
            </div>

            <div className={styles.password}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
              />
            </div>

            
              <button className={styles.Signinbtn}>Sign in</button>
              <a className={styles.textmuted} href="#!">Forgot password?</a>
            

            
              <p className={styles.noaccount}>Don't have an account?</p>
              <button className={styles.signupbtn}>
                Sign up now!
              </button>
           

              <h3>We are more than just a company</h3>
              <p className={styles.desc}>At InfoGuru, we understand that data is the backbone of modern businesses. 
              That's why we've designed our platform to streamline the entire process,
               making it easier than ever to extract valuable insights from your data. 
               With our secure and reliable technology, you can trust that your data is in safe hands.
               Join the data revolution with InfoGuru and unlock the true 
              potential of your data with just a click of a button. Experience the future of data 
              extraction and visualization – welcome to InfoGuru.
              </p>
      

    </main>
  );
}

export default App;
