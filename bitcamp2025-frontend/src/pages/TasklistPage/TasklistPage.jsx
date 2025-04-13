import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TasklistPage.module.css";
import Navbar from "../../components/Navbar";

const TasklistPage = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([
    { id: 1, name: "Task 1", completed: false },
    { id: 2, name: "Task 2", completed: false },
    { id: 3, name: "Task 3", completed: false },
  ]);

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
          <h1>Task List Page</h1>
        </div>
        
        </div>

      </div>
  );
};

export default TasklistPage;
