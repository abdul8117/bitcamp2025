import { useNavigate } from "react-router-dom";
import styles from "./JoingroupPage.module.css";

//simple group option page

const JoingroupPage = () => {
  const navigate = useNavigate();
  //success message

  const handleJoinGroup = async (event) => {
    // Handle the logic for joining a group here
    //if id is not correct, show error message
    event.preventDefault();

    const data = {
      groupID: event.target["group-id"].value,
    };

    // Make a request to the backend to join the group
    try {
      const response = await fetch("http://127.0.0.1:5000/join-group", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log(result.message);

      navigate("/tasklist");
    } catch (error) {
      console.error("Error joining group:", error);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className={styles.background}>
      <form className={styles.form} onSubmit={handleJoinGroup}>
        <div className={styles.mograFont}>
          <div className={styles.inputs}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <label
                htmlFor="groupID"
                style={{
                  display: "flex",
                  width: "120px",
                  justifyContent: "flex-end",
                }}
              >
                <span style={{ minWidth: "80px", textAlign: "right" }}>
                  group ID
                </span>
                <span style={{ paddingLeft: "3px" }}>:</span>
              </label>
              <input
                type="groupID"
                name="group-id"
                required
                style={{
                  marginLeft: "2ch",
                  backgroundColor: "#B4D1EE",
                  padding: "1px",
                  border: "2px solid #FFFFFF",
                  borderRadius: "6px",
                  width: "500px",
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.mograFont}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <button
              style={{
                border: "2px solid #6290C3",
                backgroundColor: "#FFFFFF",
                padding: "5px 10px",
                borderRadius: "6px",
                color: "#6290C3",
                fontSize: "1.5rem",
              }}
              type="submit"
            >
              join!
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default JoingroupPage;
