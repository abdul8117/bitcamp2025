import { useNavigate } from "react-router-dom";
import styles from "./EdittaskPage.module.css";
import { useState } from "react";

//simple Edittask page

const EdittaskPage = () => {
  const navigate = useNavigate();

  // State to manage the text in the box
  const [taskText, setTaskText] = useState("do laundry");
  // Array of tasks to cycle through
  const task = ["do laundry", "clean room", "buy groceries", "exercise"];

  // State to manage the text in the box
  const [deleteText, setDeleteText] = useState("no");
  // Array of deletions to cycle through
  const deletion = ["no", "yes"];

  // State to manage the text in the box
  const [timeText, setTimeText] = useState("day");
  // Array of tasks to cycle through
  const time = ["day", "week", "month"];

  // State to manage the text in the box
  const [chargeText, setChargeText] = useState("you");
  // Array of tasks to cycle through
  const charge = ["you", "me", "them"];

  // State to manage the text in the box
  const [coverText, setCoverText] = useState("no");
  // Array of deletions to cycle through
  const cover = ["no", "yes"];

  // Function to handle left arrow click
  const handleLeftArrowTask = () => {
    setTaskText((prev) => {
      const currentIndex = task.indexOf(prev);
      const newIndex = (currentIndex - 1 + task.length) % task.length; // Wrap around
      return task[newIndex];
    });
  };

  // Function to handle right arrow click
  const handleRightArrowTask = () => {
    setTaskText((prev) => {
      const currentIndex = task.indexOf(prev);
      const newIndex = (currentIndex + 1) % task.length; // Wrap around
      return task[newIndex];
    });
  };

  // Function to handle left arrow click
  const handleLeftArrowDelete = () => {
    setDeleteText((prev) => {
      const currentIndex = deletion.indexOf(prev);
      const newIndex = (currentIndex - 1 + deletion.length) % deletion.length; // Wrap around
      return deletion[newIndex];
    });
  };

  // Function to handle right arrow click
  const handleRightArrowDelete = () => {
    setDeleteText((prev) => {
      const currentIndex = deletion.indexOf(prev);
      const newIndex = (currentIndex + 1) % deletion.length; // Wrap around
      return deletion[newIndex];
    });
  };

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

    // Function to handle left arrow click
    const handleLeftArrowCover = () => {
      setCoverText((prev) => {
        const currentIndex = cover.indexOf(prev);
        const newIndex = (currentIndex - 1 + cover.length) % cover.length; // Wrap around
        return cover[newIndex];
      });
    };
  
    // Function to handle right arrow click
    const handleRightArrowCover = () => {
      setCoverText((prev) => {
        const currentIndex = cover.indexOf(prev);
        const newIndex = (currentIndex + 1) % cover.length; // Wrap around
        return cover[newIndex];
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
          {/* Left Arrow Button */}
          <button style={{
              border: "none",
              background: "transparent",
              fontSize: "2rem",
              cursor: "pointer",
              color: "black"
              }}onClick={handleLeftArrowTask}
            >
            &#8592; {/* Left arrow symbol */}
            </button>
          <div className={styles.box}>
            <text>{taskText}</text>
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
              onClick={handleRightArrowTask}
            >
              &#8594; {/* Right arrow symbol */}
            </button>
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
              }}onClick={handleLeftArrowDelete}
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
              onClick={handleRightArrowDelete}
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
            {/* Left Arrow Button */}
            <button style={{
              border: "none",
              background: "transparent",
              fontSize: "2rem",
              cursor: "pointer",
              color: "black"
              }}onClick={handleLeftArrowTime}
            >
            &#8592; {/* Left arrow symbol */}
            </button>
              <div style={{width: "100px"}} className={styles.box}>
                <text>{timeText}</text>
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
              <text>who is in charge of it?</text>
            </div>
              {/* Left Arrow Button */}
              <button style={{
                border: "none",
                background: "transparent",
                fontSize: "2rem",
                cursor: "pointer",
                color: "black"
                }}onClick={handleLeftArrowCharge}
              >
              &#8592; {/* Left arrow symbol */}
              </button>
              <div style={{width: "100px"}} className={styles.box}>
                <text>{chargeText}</text>
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
              onClick={handleRightArrowCharge}
            >
            &#8594; {/* Right arrow symbol */}
            </button>
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
              {/* Left Arrow Button */}
              <button style={{
                border: "none",
                background: "transparent",
                fontSize: "2rem",
                cursor: "pointer",
                color: "black"
                }}onClick={handleLeftArrowCover}
              >
              &#8592; {/* Left arrow symbol */}
              </button>
              <div style={{width: "100px"}} className={styles.box}>
                <text>{coverText}</text>
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
              onClick={handleRightArrowCover}
            >
            &#8594; {/* Right arrow symbol */}
            </button>
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