import { useNavigate } from "react-router-dom";
import styles from "./TasklistPage.module.css";
import Navbar from "../../components/Navbar";
//simple Tasklist page
const TasklistPage = () => {
  const navigate = useNavigate();

  const handleClickTaskCreation = () => {
    // Navigate to the task page
    navigate("/taskcreation");
  };

  const handleClickEditTask = () => {
    // Navigate to the task page
    navigate("/edittask");
  };

  

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.Left}>
        <div className={styles.buttonContainer}>
          <button onClick={handleClickTaskCreation} className={styles.imageButton}>
            Create Task
          </button>
          <button onClick={handleClickEditTask} className={styles.imageButton}>
            Edit Task
          </button>
        </div>
      </div>


      <div className={styles.Right}>
        

      </div>
      <h1>Task List Page</h1>
   
      <div className={styles.taskList}>
        <h2>Your Tasks:</h2>
        <ul>
          <li>Task 1</li>
          <li>Task 2</li>
          <li>Task 3</li>
        </ul>
      </div>
    </div>
  );
}
export default TasklistPage;