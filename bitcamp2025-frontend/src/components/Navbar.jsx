import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';


const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className={styles.navbar}>
      <button className={styles.button} onClick={() => navigate(-1)}>Back</button>
      <div className={styles.mograFont}>The Nest</div>
      <div className={styles.links}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/login" className={styles.link}>Login</Link>
        <Link to="/signup" className={styles.link}>Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
