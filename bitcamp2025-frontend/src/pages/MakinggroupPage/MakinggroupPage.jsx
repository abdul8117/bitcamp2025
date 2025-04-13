import { useNavigate } from "react-router-dom";
import styles from "./MakinggroupPage.module.css";

//simple MakinggroupPage

const MakinggroupPage = () => {
  const navigate = useNavigate();

  const id = Math.floor(Math.random() * 1000);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleJoinGroup = async (event) => {
    event.preventDefault();
    // Handle the logic for making a group here
    //if id is already taken, show error message
    const data = {
      groupID: id,
      groupName: event.target["group-name"].value,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/make-group", {
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
      console.log("Group created successfully:", result);

      navigate("/tasklist");
    } catch (error) {
      console.error("Error creating group:", error);
    }
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
              <p
                style={{
                  marginLeft: "2ch",
                  backgroundColor: "#B4D1EE",
                  padding: "1px",
                  border: "2px solid #FFFFFF",
                  borderRadius: "6px",
                  width: "500px",
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <span style={{ minWidth: "260px", textAlign: "right" }}>
                  {id}
                </span>
              </p>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <label
                htmlFor="groupName"
                style={{
                  display: "flex",
                  width: "120px",
                  justifyContent: "flex-end",
                }}
              >
                <span style={{ minWidth: "810px", textAlign: "right" }}>
                  group name
                </span>
                <span style={{ paddingLeft: "3px" }}>:</span>
              </label>
              <input
                type="groupName"
                name="group-name"
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
              confirm!
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default MakinggroupPage;
