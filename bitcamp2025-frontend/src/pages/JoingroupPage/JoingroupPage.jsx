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
    <div className={styles.background}>
      <form className={styles.form} onSubmit={handleJoinGroup}>
        <div className={styles.mograFont}>
          <div className={styles.inputs}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
            <label htmlFor="groupID" style={{ display: "flex", width: "120px", justifyContent: "flex-end" }}>
              <span style={{ minWidth: "80px", textAlign: "right" }}>group ID</span>
              <span style={{ paddingLeft: "3px" }}>:</span>
            </label>
            <input
              type="groupID"
              name="groupID"
              required
              style={{
                marginLeft: "2ch",
                backgroundColor: "#B4D1EE",
                padding: "1px",
                border: "2px solid #FFFFFF",
                borderRadius: "6px",
                width: "500px"
              }}
            />
          </div>
          </div>
        </div>
        <div className={styles.mograFont}>
          <div style={{ display: "flex", justifyContent: "center", marginTop: "20px"}}>  
            <button style={{border: "2px solid #6290C3", 
            backgroundColor: "#FFFFFF", 
            padding: "5px 10px", 
            borderRadius: "6px",
            color: "#6290C3",
            fontSize: "1.5rem"}}type="submit">join!</button>
          </div>
        </div>
      </form>
    </div>
    );
}
export default JoingroupPage;