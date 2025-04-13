import { useNavigate } from "react-router-dom";
import styles from "./TaskcreationPage.module.css";
import { useState, useEffect } from "react";

//simple Taskcreation page

const TaskcreationPage = () => {
  const arrowButtonStyle = {
    border: "none",
    background: "transparent",
    fontSize: "2rem",
    cursor: "pointer",
    color: "black",
  };

  const actionButtonStyle = {
    borderRadius: "10px",
    background: "#6290C3",
    border: "2px solid white",
    padding: "5px",
    width: "100px",
    fontSize: "1.25rem",
  };

  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

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

  useEffect(() => {
    // Fetch household members
    fetch("http://127.0.0.1:5000/get-household-members", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setMembers(data);
        if (data.length > 0) setSelectedMember(data[0].user_id);
      });
  }, []);

  // Replace chargeText state and arrow handlers with:
  const handleMemberChange = (e) => {
    setSelectedMember(e.target.value);
  };

  return (
    <div className={styles.mograFont}>
      <div className={styles.container}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Task Name Input */}
          <div style={{ display: "flex", flexDirection: "row", gap: "8%" }}>
            <div className={styles.task}>
              <span style={{ color: "#6290C3" }}>task:</span>
            </div>
            <input
              style={{ height: "35px", width: "400px" }}
              className={styles.box}
              onChange={(e) => setTask(e.target.value)}
              placeholder="task name"
            />
          </div>

          {/* Recurrence Selection */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div className={styles.task}>
              <span style={{ color: "#6290C3" }}>repeat every:</span>
            </div>
            <button style={arrowButtonStyle} onClick={handleLeftArrowTime}>
              &#8592;
            </button>
            <div style={{ width: "100px" }} className={styles.box}>
              <span style={{ color: "#6290C3" }}>{timeText}</span>
            </div>
            <button style={arrowButtonStyle} onClick={handleRightArrowTime}>
              &#8594;
            </button>
          </div>

          {/* Assignment Selection */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div className={styles.task}>
              <span style={{ color: "#6290C3" }}>assign to:</span>
            </div>
            <select
              value={selectedMember}
              onChange={handleMemberChange}
              className={styles.memberSelect}
            >
              {members.map((member) => (
                <option key={member.user_id} value={member.user_id}>
                  {member.name}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "100px",
              justifyContent: "center",
            }}
          >
            <button style={actionButtonStyle} onClick={handleConfirmTask}>
              confirm
            </button>
            <button style={actionButtonStyle} onClick={() => navigate(-1)}>
              back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskcreationPage;
