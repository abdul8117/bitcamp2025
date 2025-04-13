import { useNavigate } from "react-router-dom";
import styles from "./TaskcreationPage.module.css";

//simple Taskcreation page

const TaskcreationPage = () => {
  const navigate = useNavigate();

  const handleConfirmTask = () => {
    //task confirmation logic here
    console.log("Task confirmed!");
  };

  return (
    <div className={styles.container}>
      <h1>Task Creation Page</h1>
      <button onClick={handleConfirmTask}>Confirm</button>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}

export default TaskcreationPage;