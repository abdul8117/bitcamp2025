import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TasklistPage.module.css";
import Navbar from "../../components/Navbar";

// Import your SVGs
import duckling from "../../assets/yellowduckling.svg";
import dove from "../../assets/bird.svg";
import swan from "../../assets/duck.svg";
import swangif from "../../assets/swan.gif";

const TasklistPage = () => {
  const navigate = useNavigate();
  const [houseHoldPet, setHouseHoldPet] = useState([]);
  const [tasks, setTasks] = useState([]);

  // Fetch chores function
  const fetchChores = () => {
    fetch("http://127.0.0.1:5000/get-household-chores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch chores");
        return res.json();
      })
      .then((data) => {
        setTasks(
          data.map((chore) => ({
            ...chore,
            completed: chore.completion_status, // Add proper completion status from your API
          }))
        );
      })
      .catch((error) => console.error("Fetch error:", error));
  };

  // Initial fetch
  useEffect(() => {
    // Fetch pets
    const fetchPets = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5000/get-pets-of-household",
          { credentials: "include" }
        );
        if (!response.ok) throw new Error("Failed to fetch pets");
        setHouseHoldPet(await response.json());
      } catch (error) {
        console.error(error);
      }
    };

    fetchPets();
    fetchChores(); // Initial chores fetch
  }, []);

  // Helper object for selecting the correct SVG
  const petImages = {
    duckling: duckling,
    dove: dove,
    swan: swan,
  };
  const petGifs = {
    duckling: swangif, // You'll need to import/create duckling GIF
    dove: swangif, // You'll need to import/create dove GIF
    swan: swangif,
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

  useEffect(() => {
    fetch("http://127.0.0.1:5000/get-household-chores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch chores");
        }
        return res.json();
      })
      .then((data) => {
        // data should be an array of objects
        // e.g. [{task_id: 1, user_id: 7, user_name: "Alice", description: "Wash dishes"}, ...]
        console.log("Chores from server:", data);
        // set your state for tasks
        setTasks(data);
      })
      .catch((error) => {
        console.error(error);
      });
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

  // Handlers
  const handleComplete = (assignmentId) => {
    fetch("http://127.0.0.1:5000/complete-chore", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ assignment_id: assignmentId }),
    })
      .then(() => fetchChores()) // Refresh after completion
      .catch((error) => console.error("Completion error:", error));
  };

  const handleRotateAssignments = () => {
    fetch("http://127.0.0.1:5000/rotate-assignments", {
      method: "POST",
      credentials: "include",
    })
      .then(() => fetchChores()) // Refresh after rotation
      .catch((error) => console.error("Rotation error:", error));
  };

  // Update the pet image rendering in the return statement
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        {/* Left Side - Task List */}
        <div className={styles.Left}>
          <div className={styles.ToDoList}>
            <h2>Your To-Do List</h2>
            <ul className={styles.taskList}>
              {tasks.map((chore) => (
                <li key={chore.chore_id} className={styles.taskItem}>
                  <div className={styles.taskInfo}>
                    <h3>{chore.chore_name}</h3>
                    <p>{chore.description}</p>
                    <div className={styles.taskMeta}>
                      <span>Frequency: {chore.frequency}</span>
                      <span>
                        Assigned to: {chore.assigned_to?.name || "Unassigned"}
                      </span>
                      <span>
                        Next due:{" "}
                        {new Date(chore.next_due).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className={styles.taskActions}>
                    {!chore.completed && (
                      <button
                        className={styles.completeButton}
                        onClick={() => handleComplete(chore.assignment_id)}
                      >
                        Complete
                      </button>
                    )}
                    <button
                      className={styles.editButton}
                      onClick={() => navigate(`/edittask/${chore.chore_id}`)}
                    >
                      Edit
                    </button>
                    {chore.completed && (
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDeleteTask(chore.chore_id)}
                      >
                        ❌
                      </button>
                    )}
                  </div>
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
                onClick={handleRotateAssignments}
                className={styles.rotateButton}
              >
                Rotate Assignments
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Household Pets */}
        <div className={styles.Right}>
          <h1 className={styles.title}>Household Members</h1>
          <div className={styles.Nest}>
            <div className={styles.petContainer}>
              {houseHoldPet.map((pet) => (
                <img
                  key={pet.pet_id}
                  src={
                    isHovering ? petGifs[pet.pet_type] : petImages[pet.pet_type]
                  }
                  alt={pet.pet_type}
                  className={styles.petImage}
                  style={{
                    transform: `rotate(${
                      rotationDegrees[pet.pet_type] || 0
                    }deg)`,
                    margin: "10px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasklistPage;
