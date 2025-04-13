import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TitlePage.module.css";

// Import Bootstrap globally in your index.js (not here)
import duck from "../../assets/duck.svg";
import yellowDuckling from "../../assets/yellowduckling.svg";
import bird from "../../assets/bird.svg";

function TitlePage() {
  const navigate = useNavigate();

  return (
    <div className={styles.landingContainer}>
      {/* TOP SECTION */}
      <div className="text-center mt-5">
        {/* Big stylized title using Bootstrap's display class */}
        <h1
          className={`display-3 text-success ${styles.mograFont}`}
          style={{ fontSize: "8rem" }}
        >
          ~The Nest~
        </h1>

        {/* Buttons side by side */}
        <div className="d-inline-flex gap-3 mt-3">
          <button onClick={() => navigate("/login")} className="btn btn-outline-success btn-lg">
            <p className={styles.mograFont} style={{ margin: 0 }}>login</p>
          </button>
          <button onClick={() => navigate("/signup")} className="btn btn-outline-success btn-lg">
            <p className={styles.mograFont} style={{ margin: 0 }}>sign up</p>
          </button>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="bg-success d-flex justify-content-center align-items-center p-3">
        <img src={duck} alt="Duck" className={styles.animal} />
        <img
          src={yellowDuckling}
          alt="Yellow Duckling"
          className={styles.animal}
        />
        {/* For the last one, we might not want margin-right */}
        <img src={bird} alt="Bird" style={{ maxHeight: "80px" }} />
      </div>
    </div>
  );
}

export default TitlePage;
