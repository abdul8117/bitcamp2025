import styles from './LoginPage.css';

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form className={styles.form}>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginPage;
