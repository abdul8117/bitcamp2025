import { useNavigate } from "react-router-dom";
import styles from "./EdittaskPage.module.css";
import { useState } from "react";

//simple Edittask page

const EdittaskPage = () => {
  const navigate = useNavigate();

  // State to manage the text in the box
  // const [taskText, setTaskText] = useState("do laundry");
  // Array of tasks to cycle through
  // const tasks = ["do laundry", "clean room", "buy groceries", "exercise"];

  // State to manage the text in the box
  const [deleteText, setDeleteText] = useState("no");
  // Array of tasks to cycle through
  const deletion = ["no", "yes"];

  // Function to handle left arrow click
  const handleLeftArrow = () => {
    setDeleteText((prev) => {
      const currentIndex = deletion.indexOf(prev);
      const newIndex = (currentIndex - 1 + deletion.length) % deletion.length; // Wrap around
      return deletion[newIndex];
    });
  };

  // Function to handle right arrow click
  const handleRightArrow = () => {
    setDeleteText((prev) => {
      const currentIndex = deletion.indexOf(prev);
      const newIndex = (currentIndex + 1) % deletion.length; // Wrap around
      return deletion[newIndex];
    });
  };

  const handleEditingTask = () => {
    //task editing logic here
    console.log("Task edited!");
  };

  //multiple buttons need to be added 
  //it don't even have to be a button
  return (
    <div className={styles.mograFont}>

      <div style={{display: "flex", alignItems: "center"}} className={styles.taskContainer}>
        {/* task */}
        <div style={{marginTop: "13%", display: "flex", gap: "5%",justifyContent: "center"}}>
          <div className={styles.task}>
            <text>task:</text>
          </div>
          <div className={styles.box}>
            <text>do laundry</text>
          </div>
        </div>

        <div style={{display: "flex", flexDirection: "column"}}>

          {/* Option 1 */}
          <div
            style={{
              display: "flex", // Enables Flexbox
              flexDirection: "row", // Default: horizontal alignment
              justifyContent: "flex-start", // Aligns items to the left
              alignItems: "center", // Vertically aligns items
            }}
          >
            <div className={styles.task}>
              <text>delete forever?</text>
            </div>
            {/* Left Arrow Button */}
            <button style={{
              border: "none",
              background: "transparent",
              fontSize: "2rem",
              cursor: "pointer",
              color: "black"
              }}onClick={handleLeftArrow}
            >
            &#8592; {/* Left arrow symbol */}
            </button>
              <div style={{width: "100px"}} className={styles.box}>
                <text>{deleteText}</text>
            </div>
            {/* Right Arrow */}
            <button
              style={{
                border: "none",
                background: "transparent",
                fontSize: "2rem",
                cursor: "pointer",
                color: "black"
              }}
              onClick={handleRightArrow}
            >
              &#8594; {/* Right arrow symbol */}
            </button>
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
              <text>repeat every:</text>
            </div>
              <div style={{width: "100px"}} className={styles.box}>
                <text>week</text>
            </div>
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
              <text>who is in charge of it?</text>
            </div>
              <div style={{width: "100px"}} className={styles.box}>
                <text>you</text>
            </div>
          </div>

          {/* Option 4 */}
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
              <text>cover for them?</text>
            </div>
              <div style={{width: "100px"}} className={styles.box}>
                <text>no</text>
            </div>
          </div>

        </div>
        
      </div>
        
      <div className={styles.container}>
        <div style={{ display: "flex", justifyContent: "center", gap: "8%", width: "100%"}}>
          <button style={{borderRadius: "10px", background: "#6290C3", border: "2px solid white", padding: "5px", width: "30%", fontSize: "1.25rem"}} onClick={handleEditingTask}>confirm</button>
          <button style={{borderRadius: "10px", background: "#6290C3", border: "2px solid white", padding: "5px", width: "30%", fontSize: "1.25rem"}} onClick={() => navigate(-1)}>go back</button>
        </div>
      </div>
    </div>
  );
}
export default EdittaskPage;