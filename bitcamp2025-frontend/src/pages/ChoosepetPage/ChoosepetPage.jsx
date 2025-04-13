import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ChoosepetPage.module.css";

// Example imports of your SVG assets
import welcomeBanner from "../../assets/welcome-new-user.svg";
import duckling from "../../assets/yellowduckling.svg";
import dove from "../../assets/bird.svg";
import swan from "../../assets/duck.svg";

const ChoosepetPage = () => {
  const navigate = useNavigate();
  const [pet, setPet] = useState("");

  const handlePetClick = (chosenPet) => {
    setPet(chosenPet);
  };

  const handleContinue = async () => {
    // Navigate to your next page

    // make request to backend to save the pet choice
    // endpoint is set-pet
    // method is POST

    const data = {
      pet_type: pet,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/set-pet", {
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
      console.log("Pet choice saved:", result);

      navigate("/groupoption");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* The top white banner is just an SVG that already says: "WELCOME NEW USER!" */}
      <img
        src={welcomeBanner}
        alt="Welcome New User"
        className={styles.bannerImage}
      />

      {/* Below the banner, show the "Choose your pet" text */}
      <h2 className={styles.chooseText}>Choose your pet</h2>

      {/* Pet buttons/images */}
      <div className={styles.petContainer}>
        <button
          className={styles.petButton}
          onClick={() => handlePetClick("duckling")}
        >
          <img src={duckling} alt="Duckling" className={styles.petImage} />
        </button>

        <button
          className={styles.petButton}
          onClick={() => handlePetClick("dove")}
        >
          <img src={dove} alt="Dove" className={styles.petImage} />
        </button>

        <button
          className={styles.petButton}
          onClick={() => handlePetClick("swan")}
        >
          <img src={swan} alt="Swan" className={styles.petImage} />
        </button>
      </div>

      {/* Show chosen pet (if any) */}
      {pet && <h3 className={styles.selectedPet}>You have selected: {pet}</h3>}

      {/* Continue button */}
      <button
        className={styles.continueButton}
        onClick={handleContinue}
        style={{ borderRadius: "8px" }}
        disabled={!pet} // Disable if no pet is selected
      >
        Continue
      </button>
    </div>
  );
};

export default ChoosepetPage;
