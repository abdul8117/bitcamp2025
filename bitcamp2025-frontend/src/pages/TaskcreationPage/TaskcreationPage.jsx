import { useNavigate } from "react-router-dom";
import styles from "./TaskcreationPage.module.css";
import { useState } from "react";

//simple Taskcreation page

const TaskcreationPage = () => {
  const navigate = useNavigate();

  // State to manage the task name
  const [task, setTask] = useState("");

  function handleInputChange(event) {
    setTask(event.target.value); // Update task state on input change
  }

  // State to manage the text in the box
  const [timeText, setTimeText] = useState("day");
  // Array of tasks to cycle through
  const time = ["every_day", "every_week", "every_month"];

  // State to manage the text in the box
  const [chargeText, setChargeText] = useState("you");
  // Array of tasks to cycle through
  const charge = ["you", "me", "them"];

  // Function to handle left arrow click
  const handleLeftArrowTime = () => {
    setTimeText((prev) => {
      const currentIndex = time.indexOf(prev);
      const newIndex = (currentIndex - 1 + time.length) % time.length; // Wrap around
      return time[newIndex];
    });
  };

  // Function to handle right arrow click
  const handleRightArrowTime = () => {
    setTimeText((prev) => {
      const currentIndex = time.indexOf(prev);
      const newIndex = (currentIndex + 1) % time.length; // Wrap around
      return time[newIndex];
    });
  };

  // Function to handle left arrow click
  const handleLeftArrowCharge = () => {
    setChargeText((prev) => {
      const currentIndex = charge.indexOf(prev);
      const newIndex = (currentIndex - 1 + charge.length) % charge.length; // Wrap around
      return charge[newIndex];
    });
  };

  // Function to handle right arrow click
  const handleRightArrowCharge = () => {
    setChargeText((prev) => {
      const currentIndex = charge.indexOf(prev);
      const newIndex = (currentIndex + 1) % charge.length; // Wrap around
      return charge[newIndex];
    });
  };

  const handleConfirmTask = async () => {
    //task confirmation logic here

    const data = {
      chore_name: task,
      repeat: timeText,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/add-chore", {
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
      console.log(result); // Handle the response as needed
    } catch (error) {
      console.error("Error:", error); // Handle the error as needed
    }
  };

  return (
    <div className={styles.mograFont}>
      <div className={styles.container}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", flexDirection: "row", gap: "8%" }}>
            <div className={styles.task}>
              <span style={{ color: "#6290C3" }}>task:</span>
            </div>
            <input
              style={{ height: "35px", width: "400px" }}
              className={styles.box}
              onChange={(e) => setTask(e.target.value)} // Update task state on input change
              placeholder="task name"
            ></input>
          </div>

          {/* Option 2 */}
          <div
            style={{
              display: "flex", // Enables Flexbox
              flexDirection: "row", // Default: horizontal alignment
              justifyContent: "flex-start", // Aligns items to the left
              alignItems: "center", // Vertically aligns items
              gap: "10px", // Adds spacing between items
            }}
          >
            <div className={styles.task}>
              <span style={{ color: "#6290C3" }}>repeat every:</span>
            </div>
            {/* Left Arrow Button */}
            <button
              style={{
                border: "none",
                background: "transparent",
                fontSize: "2rem",
                cursor: "pointer",
                color: "black",
              }}
              onClick={handleLeftArrowTime}
            >
              &#8592; {/* Left arrow symbol */}
            </button>
            <div style={{ width: "100px" }} className={styles.box}>
              <span style={{ color: "#6290C3" }}>{timeText}</span>
            </div>
            {/* Right Arrow */}
            <button
              style={{
                border: "none",
                background: "transparent",
                fontSize: "2rem",
                cursor: "pointer",
                color: "black",
              }}
              onClick={handleRightArrowTime}
            >
              &#8594; {/* Right arrow symbol */}
            </button>
          </div>

          {/* Option 3 */}
          <div
            style={{
              display: "flex", // Enables Flexbox
              flexDirection: "row", // Default: horizontal alignment
              justifyContent: "flex-start", // Aligns items to the left
              alignItems: "center", // Vertically aligns items
              gap: "10px", // Adds spacing between items
            }}
          >
            <div className={styles.task}>
              <span style={{ color: "#6290C3" }}>who is in charge of it?</span>
            </div>
            {/* Left Arrow Button */}
            <button
              style={{
                border: "none",
                background: "transparent",
                fontSize: "2rem",
                cursor: "pointer",
                color: "black",
              }}
              onClick={handleLeftArrowCharge}
            >
              &#8592; {/* Left arrow symbol */}
            </button>
            <div style={{ width: "100px" }} className={styles.box}>
              <span style={{ color: "#6290C3" }}>{chargeText}</span>
            </div>
            {/* Right Arrow */}
            <button
              style={{
                border: "none",
                background: "transparent",
                fontSize: "2rem",
                cursor: "pointer",
                color: "black",
              }}
              onClick={handleRightArrowCharge}
            >
              &#8594; {/* Right arrow symbol */}
            </button>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "100px",
              justifyContent: "center",
            }}
          >
            <button
              style={{
                borderRadius: "10px",
                background: "#6290C3",
                border: "2px solid white",
                padding: "5px",
                width: "100px",
                fontSize: "1.25rem",
              }}
              onClick={handleConfirmTask}
            >
              confirm
            </button>
            <button
              style={{
                borderRadius: "10px",
                background: "#6290C3",
                border: "2px solid white",
                padding: "5px",
                width: "100px",
                fontSize: "1.25rem",
              }}
              onClick={() => navigate(-1)}
            >
              back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskcreationPage;
