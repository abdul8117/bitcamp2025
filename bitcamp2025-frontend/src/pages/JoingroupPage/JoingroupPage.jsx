import { useNavigate } from "react-router-dom";
import styles from "./JoingroupPage.module.css";

//simple group option page



const JoingroupPage = () => {
    const navigate = useNavigate();
    //success message

  

    const handleJoinGroup = () => {
        // Handle the logic for joining a group here
        //if id is not correct, show error message
        console.log("Joining group...");
        // After joining, navigate to the task list page
        navigate("/tasklist");
    };

  

    const handleBackClick = () => {
      navigate(-1);
    };

    return (
        <div className={styles.container}>
            <h1>Join Group</h1>
            <button onClick={handleJoinGroup}>Join Group</button>
            <button onClick={handleBackClick}>Back</button>
   

        </div>
    );
}
export default JoingroupPage;