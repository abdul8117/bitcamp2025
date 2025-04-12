import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>MyApp</div>
      <div className={styles.links}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/login" className={styles.link}>Login</Link>
        <Link to="/signup" className={styles.link}>Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
