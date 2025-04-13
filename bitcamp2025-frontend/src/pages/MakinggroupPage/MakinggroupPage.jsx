import { useNavigate } from "react-router-dom";
import styles from "./MakinggroupPage.module.css";

//simple MakinggroupPage

const MakinggroupPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleJoinGroup = () => {
    // Handle the logic for making a group here
    //if id is already taken, show error message
    console.log("Making group...");
    console.log("Joining group...");
    // After joining, navigate to the task list page
    navigate("/tasklist");
};

  return (
    <div className={styles.container}>
      <h1>Making Group Page</h1>
      
      <button onClick={handleJoinGroup}>Make Group</button>
      <button onClick={handleBackClick}>Back</button>
    </div>
  );
}
export default MakinggroupPage;