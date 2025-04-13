import { useNavigate } from "react-router-dom";
import styles from "./EdittaskPage.module.css";

//simple Edittask page

const EdittaskPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the task page
    navigate("/task");
  };

  return (
    <div className={styles.container}>
      <h1>Edit Task Page</h1>
      <button onClick={handleClick}>Go to Task Page</button>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}
export default EdittaskPage;