import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TasklistPage.module.css";
import Navbar from "../../components/Navbar";
import duckling from "../../assets/yellowduckling.svg";
import dove from "../../assets/bird.svg";
import swan from "../../assets/duck.svg";

const TasklistPage = () => {
  const navigate = useNavigate();
  //useState for the pet
  const [userpet, setuserPet] = useState(null);
  //list of household pets by fetching so start with empty array
  const [houseHoldPet, setHouseHoldPet] = useState([]);
  //add the household pets with the svg imports
  useEffect(() => {
    setHouseHoldPet([
      { id: 1, name: "Duckling", svg: duckling },
      { id: 2, name: "Dove", svg: dove },
      { id: 3, name: "Swan", svg: swan },
      { id: 4, name: "Swan", svg: swan },
    ]);

    setuserPet(swan);
  }, []);

  const [tasks, setTasks] = useState([
    { id: 1, name: "Task 1", completed: false },
    { id: 2, name: "Task 2", completed: false },
    { id: 3, name: "Task 3", completed: false },
    { id: 4, name: "Task 4", completed: false },
  ]);

  const handleFetchUserPet = () => {
    // Fetch user's pet from backend
    //if fetched pet is =="duckling", "dove", "swan" then show the corresponding SVG
    setuserPet("duckling");
    // setPet("dove");
    // setPet("swan");

  };

  const handleHouseHoldPet = () => {
    // Fetch user's pet from backend
    //if fetched pet is =="duckling", "dove", "swan" then show the corresponding SVG
    // setPet("dove");
    // setPet("swan");

  };
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
    // handle backend logic: update task completion status
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    // handle backend logic: delete task from database
  };

  const rotationDegrees = {
    Duckling: 15,
    Dove: -10,
    Swan: 5,
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
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
                      onClick={() => handleDeleteTask(task.id)}> ❌
                    </button>
                  )}
                </li>
              ))}
            </ul>

            <div className={styles.buttonContainer}>
              <button onClick={handleClickTaskCreation} className={styles.imageButton}>
                Create Task
              </button>
              <button onClick={handleClickEditTask} className={styles.imageButton}>
                Edit Task
              </button>
            </div>
          </div>
        </div>

        <div className={styles.Right}>
          <h1 className={styles.title}>Task List Page</h1>

          <div className={styles.Nest}>
            <div className={styles.petContainer}>
              {houseHoldPet.map((pet) => (
                <img
                  key={pet.id}
                  src={pet.svg}
                  alt={pet.name}
                  className={styles.petImage}
                  style={{ transform: `rotate(${rotationDegrees[pet.name]}deg)` }}
                />
              ))}
                <img
                  src={userpet}
                  alt="Pet"
                  className={styles.petImage }
                />


            </div>
          </div>
          


        </div>

        </div>

      </div>
  );
};

export default TasklistPage;
