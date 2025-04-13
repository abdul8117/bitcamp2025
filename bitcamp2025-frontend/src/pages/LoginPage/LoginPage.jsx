import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    const data = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    try {
      const res = await fetch("http://127.0.0.1:5000/login", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await res.json();
      console.log("Login successful:", result);

      navigate("/groupoption");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className={styles.background}>
      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.mograFont}>
          <div className={styles.inputs}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <label
                htmlFor="email"
                style={{
                  display: "flex",
                  width: "120px",
                  justifyContent: "flex-end",
                }}
              >
                <span style={{ minWidth: "80px", textAlign: "right" }}>
                  email
                </span>
                <span style={{ paddingLeft: "3px" }}>:</span>
              </label>
              <input
                type="email"
                name="email"
                required
                style={{
                  marginLeft: "2ch",
                  backgroundColor: "#A6C48A",
                  padding: "1px",
                  border: "2px solid #6a8042",
                  borderRadius: "6px",
                  width: "500px",
                }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <label
                htmlFor="password"
                style={{
                  display: "flex",
                  width: "120px",
                  justifyContent: "flex-end",
                }}
              >
                <span style={{ minWidth: "80px", textAlign: "right" }}>
                  password
                </span>
                <span style={{ paddingLeft: "3px" }}>:</span>
              </label>
              <input
                type="password"
                name="password"
                required
                style={{
                  marginLeft: "2ch",
                  backgroundColor: "#A6C48A",
                  padding: "1px",
                  border: "2px solid #6a8042",
                  borderRadius: "6px",
                  width: "500px",
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.mograFont}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <button
              style={{
                border: "2px solid #6a8042",
                backgroundColor: "#FFFFFF",
                padding: "5px 10px",
                borderRadius: "6px",
                color: "#6a8042",
                fontSize: "1.5rem",
              }}
              type="submit"
            >
              confirm!
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
