import { useNavigate } from "react-router-dom";
import styles from "./ChoosepetPage.module.css";
import { useState } from "react";

//simple Choosepet page
const ChoosepetPage = () => {
  const navigate = useNavigate();
  const [pet, setPet] = useState("");

  const handleClick = () => {

    navigate("/task");
  };

  //i set the pictures as a button but it can be done differently
  
  return (
    <div className={styles.container}>
      <h1>Choose your pet!!</h1>

      <div>
        <button onClick={() => setPet("duckling")}> image here</button>
        <button onClick={() => setPet("dove")}>image here</button>
        <button onClick={() => setPet("swan")}>image here</button>
      </div>
      
      <div>
        {pet && <h2>You have selected: {pet}</h2>}
      </div>

      <button onClick={handleClick}>Go to Task Page</button>
    </div>
  );
}
export default ChoosepetPage;