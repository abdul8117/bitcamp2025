//simple group option page
import { useNavigate } from "react-router-dom";
import styles from "./GroupoptionPage.module.css";


//simple Groupoption page
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
      <h1>Group Option Page</h1>
      <button onClick={handleClickMake}>Make Group</button>
      <button onClick={handleClickJoin}>Join Group</button>
    </div>
  );
}
export default GroupoptionPage;