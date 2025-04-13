import { useNavigate } from "react-router-dom";
import styles from "./GroupoptionPage.module.css";
import makeGroupImg from "../../assets/makegroup.svg";
import joinGroupImg from "../../assets/joingroup.svg";
import SimpleSlider from "../../components/SimpleSlider";

const GroupoptionPage = () => {
  const navigate = useNavigate();

  const handleClickMake = () => {
    navigate("/makinggroup");
  };

  const handleClickJoin = () => {
    navigate("/joingroup");
  };

  // Function to handle joining the specific group
  const handleJoinGroup = (ID) => {
    // join group logic here
    console.log("Group joined!");
  };

  // Function to navigate to the group page based on active index
  const handleNavigateToHouse = (activeIndex) => {
    const houseRoutes = [
      "/house/modern-villa",
      "/house/rustic-cottage",
      "/house/urban-loft",
      "/house/beach-house",
      "/house/mountain-cabin",
      "/house/luxury-estate",
    ];
    navigate(houseRoutes[activeIndex]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.Left}>
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

      <div className={styles.Right}>
        <h1 className={styles.title}>Group Option Page</h1>
        <div className={styles.sliderContainer}>
          <SimpleSlider onHouseClick={handleNavigateToHouse} />
        </div>
      </div>
    </div>
  );
};

export default GroupoptionPage;
