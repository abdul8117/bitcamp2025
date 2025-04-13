import { useNavigate } from "react-router-dom";
import styles from "./GroupoptionPage.module.css";
import makeGroupImg from "../../assets/makegroup.svg"; // replace with your actual image paths
import joinGroupImg from "../../assets/joingroup.svg";
import Slider from "../../components/Slider";

const GroupoptionPage = () => {
  const navigate = useNavigate();

  const handleClickMake = () => {
    navigate("/makinggroup");
  };

  const handleClickJoin = () => {
    navigate("/joingroup");
  };

  return (
    <div className={styles.container}>
      <div className ={styles.Left}>

      <div className={styles.buttonContainer}>
        <img
          src={makeGroupImg}
          alt="Make Group"
          onClick={handleClickMake}
          className={styles.imageButton}
        />
        <img
          src={joinGroupImg}
          alt="Join Group"
          onClick={handleClickJoin}
          className={styles.imageButton}
        />
      </div>
      </div>

      <div className ={styles.Right}>
        <div className ={styles.sliderContainer}>
        <Slider />
        </div>
        
        
      </div>
      <h1 className={styles.title}>Group Option Page</h1>

    </div>
  );
};

export default GroupoptionPage;
