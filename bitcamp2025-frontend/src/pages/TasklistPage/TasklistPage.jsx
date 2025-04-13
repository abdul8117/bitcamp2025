import { useNavigate } from "react-router-dom";
import styles from "./TasklistPage.module.css";

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
      <h1>Task List Page</h1>
      <button onClick={handleClickTaskCreation}>Create Task</button>
      <button onClick={handleClickEditTask}>Edit Task</button>
      <button onClick={() => navigate(-1)}>Back</button>
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