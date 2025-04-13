import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./EdittaskPage.module.css";

const EdittaskPage = () => {
  const navigate = useNavigate();

  // 1) Store the entire chores array and the currently selected chore
  const [chores, setChores] = useState([]);
  const [selectedTask, setSelectedTask] = useState("");

  // States for your other arrow-based logic
  const [deleteText, setDeleteText] = useState("no");
  const deletion = ["no", "yes"];

  const [timeText, setTimeText] = useState("day");
  const time = ["day", "week", "month"];

  const [chargeText, setChargeText] = useState("you");
  const charge = ["you", "me", "them"];

  const [coverText, setCoverText] = useState("no");
  const cover = ["no", "yes"];

  // 2) On mount, fetch chores from the Flask route
  useEffect(() => {
    fetch("http://127.0.0.1:5000/get-chores-in-household", {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch chores");
        }
        return res.json();
      })
      .then((data) => {
        // data is the array of chores
        setChores(data);
        console.log("Chores from server:", data);

        // Optionally set a default selected chore if you want:
        if (data.length > 0) {
          setSelectedTask(data[0].name);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // -- ARROW-BASED LOGIC FOR THE OTHER FIELDS --

  const handleLeftArrowDelete = () => {
    setDeleteText((prev) => {
      const currentIndex = deletion.indexOf(prev);
      const newIndex = (currentIndex - 1 + deletion.length) % deletion.length;
      return deletion[newIndex];
    });
  };

  const handleRightArrowDelete = () => {
    setDeleteText((prev) => {
      const currentIndex = deletion.indexOf(prev);
      const newIndex = (currentIndex + 1) % deletion.length;
      return deletion[newIndex];
    });
  };

  const handleLeftArrowTime = () => {
    setTimeText((prev) => {
      const currentIndex = time.indexOf(prev);
      const newIndex = (currentIndex - 1 + time.length) % time.length;
      return time[newIndex];
    });
  };

  const handleRightArrowTime = () => {
    setTimeText((prev) => {
      const currentIndex = time.indexOf(prev);
      const newIndex = (currentIndex + 1) % time.length;
      return time[newIndex];
    });
  };

  const handleLeftArrowCharge = () => {
    setChargeText((prev) => {
      const currentIndex = charge.indexOf(prev);
      const newIndex = (currentIndex - 1 + charge.length) % charge.length;
      return charge[newIndex];
    });
  };

  const handleRightArrowCharge = () => {
    setChargeText((prev) => {
      const currentIndex = charge.indexOf(prev);
      const newIndex = (currentIndex + 1) % charge.length;
      return charge[newIndex];
    });
  };

  const handleLeftArrowCover = () => {
    setCoverText((prev) => {
      const currentIndex = cover.indexOf(prev);
      const newIndex = (currentIndex - 1 + cover.length) % cover.length;
      return cover[newIndex];
    });
  };

  const handleRightArrowCover = () => {
    setCoverText((prev) => {
      const currentIndex = cover.indexOf(prev);
      const newIndex = (currentIndex + 1) % cover.length;
      return cover[newIndex];
    });
  };

  const handleEditingTask = () => {
    // Task editing logic here
    console.log("Task edited! Selected chore is:", selectedTask);
  };

  // 3) Render
  return (
    <div className={styles.background}>
      <div className={styles.mograFont}>
        {/* Display chores for testing (optional) */}
        <div style={{ marginTop: "1rem" }}>
          <h3>Chores in Your Household:</h3>
          <ul>
            {chores.map((chore) => (
              <li key={chore.chore_id}>{chore.name}</li>
            ))}
          </ul>
        </div>

        <div
          style={{ display: "flex", alignItems: "center" }}
          className={styles.taskContainer}
        >
          {/* 1) TASK (Now a Dropdown instead of arrows) */}
          <div
            style={{
              marginTop: "13%",
              display: "flex",
              gap: "5%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div className={styles.task}>
              <span>task:</span>
            </div>

            {/* DROPDOWN for chores */}
            <select
              className={styles.dropdown}
              value={selectedTask}
              onChange={(e) => setSelectedTask(e.target.value)}
            >
              {chores.map((chore) => (
                <option key={chore.chore_id} value={chore.name}>
                  {chore.name}
                </option>
              ))}
            </select>
          </div>

          {/* 2) Column of Four Options (delete, repeat, who, cover) */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* Option 1: Delete forever? */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <div className={styles.task}>
                <span>delete forever?</span>
              </div>
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: "2rem",
                  cursor: "pointer",
                  color: "black",
                }}
                onClick={handleLeftArrowDelete}
              >
                &#8592;
              </button>
              <div style={{ width: "100px" }} className={styles.box}>
                <span>{deleteText}</span>
              </div>
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: "2rem",
                  cursor: "pointer",
                  color: "black",
                }}
                onClick={handleRightArrowDelete}
              >
                &#8594;
              </button>
            </div>

            {/* Option 2: Repeat every? */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div className={styles.task}>
                <span>repeat every:</span>
              </div>
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
                &#8592;
              </button>
              <div style={{ width: "100px" }} className={styles.box}>
                <span>{timeText}</span>
              </div>
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
                &#8594;
              </button>
            </div>

            {/* Option 3: Who is in charge? */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div className={styles.task}>
                <span>who is in charge of it?</span>
              </div>
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
                &#8592;
              </button>
              <div style={{ width: "100px" }} className={styles.box}>
                <span>{chargeText}</span>
              </div>
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
                &#8594;
              </button>
            </div>

            {/* Option 4: Cover for them? */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div className={styles.task}>
                <span>cover for them?</span>
              </div>
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: "2rem",
                  cursor: "pointer",
                  color: "black",
                }}
                onClick={handleLeftArrowCover}
              >
                &#8592;
              </button>
              <div style={{ width: "100px" }} className={styles.box}>
                <span>{coverText}</span>
              </div>
              <button
                style={{
                  border: "none",
                  background: "transparent",
                  fontSize: "2rem",
                  cursor: "pointer",
                  color: "black",
                }}
                onClick={handleRightArrowCover}
              >
                &#8594;
              </button>
            </div>
          </div>
        </div>

        {/* Confirm / Go Back Buttons */}
        <div className={styles.container}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8%",
              width: "100%",
            }}
          >
            <button
              style={{
                borderRadius: "10px",
                background: "#6290C3",
                border: "2px solid white",
                padding: "5px",
                width: "30%",
                fontSize: "1.25rem",
              }}
              onClick={handleEditingTask}>
              confirm
            </button>
            <button
              style={{
                borderRadius: "10px",
                background: "#6290C3",
                border: "2px solid white",
                padding: "5px",
                width: "30%",
                fontSize: "1.25rem",
              }}
              onClick={() => navigate(-1)}>
              go back
            </button>
      </div>
    </div>
  );
};

export default EdittaskPage;
