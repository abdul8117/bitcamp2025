import styles from './SignupPage.css';

const SignupPage = () => {
  return (
    <div className={styles.container}>
      <h2>Sign Up</h2>
      <form className={styles.form}>
        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default SignupPage;
