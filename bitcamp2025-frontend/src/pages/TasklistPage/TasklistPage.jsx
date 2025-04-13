import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TasklistPage.module.css";
import Navbar from "../../components/Navbar";

// Import your SVGs
import duckling from "../../assets/yellowduckling.svg";
import dove from "../../assets/bird.svg";
import swan from "../../assets/duck.svg";

const TasklistPage = () => {
  const navigate = useNavigate();

  // State to store household pets
  const [houseHoldPet, setHouseHoldPet] = useState([]);

  // State for tasks
  const [tasks, setTasks] = useState([
    { id: 1, name: "Task 1", completed: false },
    { id: 2, name: "Task 2", completed: false },
    { id: 3, name: "Task 3", completed: false },
    { id: 4, name: "Task 4", completed: false },
  ]);

  // Helper object for selecting the correct SVG
  const petImages = {
    duckling: duckling,
    dove: dove,
    swan: swan,
  };

  // Optional rotation for each pet type
  const rotationDegrees = {
    duckling: 15,
    dove: -10,
    swan: 5,
  };

  // Fetch the household pets on mount
  useEffect(() => {
    async function fetchHouseHoldPet() {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/get-pets-of-household",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch household pets");
        }
        const pets = await response.json();
        // pets should be array of objects:
        // e.g. [{pet_id:1, user_id:5, user_name:"Alice", pet_type:"duckling"}, ...]
        console.log(pets);
        setHouseHoldPet(pets);
      } catch (error) {
        console.error(error);
      }
    }
    fetchHouseHoldPet();
  }, []);

  // Handlers for tasks
  const handleClickTaskCreation = () => {
    navigate("/taskcreation");
  };

  const handleClickEditTask = () => {
    navigate("/edittask");
  };

  const handleToggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        {/* LEFT SIDE: Task List */}
        <div className={styles.Left}>
          <div className={styles.ToDoList}>
            <h2>Your To-Do List</h2>
            <ul className={styles.taskList}>
              {tasks.map((task) => (
                <li key={task.id} className={styles.taskItem}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleComplete(task.id)}
                    />
                    <span className={task.completed ? styles.completed : ""}>
                      {task.name}
                    </span>
                  </label>
                  {task.completed && (
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      ❌
                    </button>
                  )}
                </li>
              ))}
            </ul>

            <div className={styles.buttonContainer}>
              <button
                onClick={handleClickTaskCreation}
                className={styles.imageButton}
              >
                Create Task
              </button>
              <button
                onClick={handleClickEditTask}
                className={styles.imageButton}
              >
                Edit Task
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Household Pets */}
        <div className={styles.Right}>
          <h1 className={styles.title}>Task List Page</h1>
          <div className={styles.Nest}>
            <div className={styles.petContainer}>
              {houseHoldPet.map((pet) => {
                // pick the correct svg & rotation
                const imgSrc = petImages[pet[3]];
                const rotate = rotationDegrees[pet[3]] || 0;

                return (
                  <img
                    key={pet[0]}
                    src={imgSrc}
                    alt={pet.pet_type}
                    className={styles.petImage}
                    style={{ transform: `rotate(${rotate}deg)` }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasklistPage;
