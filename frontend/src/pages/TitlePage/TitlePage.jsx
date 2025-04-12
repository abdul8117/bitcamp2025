



import { useNavigate } from 'react-router-dom';
import styles from './TitlePage.module.css';


// this is the title page this is what the user first sees
// make a button that when clicked, it will redirect to the login page
// make a button that when clicked, it will redirect to the signup page
// Titlepage style is in the same folder

const TitlePage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Our App</h1>
      <div className={styles.buttonGroup}>
        <button className={styles.button} onClick={() => navigate('/login')}>Login</button>
        <button className={styles.button} onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
    </div>
  );
};

export default TitlePage;
