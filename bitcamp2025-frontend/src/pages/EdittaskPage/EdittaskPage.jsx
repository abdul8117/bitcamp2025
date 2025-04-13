import { useNavigate } from "react-router-dom";
import styles from "./EdittaskPage.module.css";

//simple Edittask page

const EdittaskPage = () => {
  const navigate = useNavigate();

  const handleEditingTask = () => {
    //task editing logic here
    console.log("Task edited!");
  };

  //multiple buttons need to be added 
  //it don't even have to be a button
  return (
    <div className={styles.container}>
      <h1>Edit Task Page</h1>
      <button onClick={handleEditingTask}>EditingTask</button>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}
export default EdittaskPage;