import styles from "./SignupPage.module.css";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const createAccount = async (event) => {
    event.preventDefault();

    // make a request to the backend to create an account
    const data = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };

    try {
      const res = await fetch("http://127.0.0.1:5000/signup", {
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
      console.log("Account created successfully:", result);

      // Redirect to the home page after successful signup
      navigate("/choosepet");
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  return (
    <div className={styles.background}>
      <form className={styles.form} onSubmit={createAccount}>
      <div className={styles.inputs}>
        <div className={styles.mograFont}>

          {/* username text and input box */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
              <label htmlFor="username" style={{ display: "flex", width: "120px", justifyContent: "flex-end" }}>
                <span style={{ minWidth: "80px", textAlign: "right" }}>username</span>
                <span style={{ paddingLeft: "3px" }}>:</span>
              </label>
            <input
              type="text" name="name" required style={{
                marginLeft: "2ch",
                backgroundColor: "#A6C48A",
                padding: "1px",
                border: "2px solid #6a8042",
                borderRadius: "6px",
                width: "500px"
              }}
            />
          </div>

          {/* email text and input box */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
            
            <label htmlFor="email" style={{ display: "flex", width: "120px", justifyContent: "flex-end" }}>
              <span style={{ minWidth: "80px", textAlign: "right" }}>email</span>
              <span style={{ paddingLeft: "3px" }}>:</span>
            </label>
            
            <input
              type="text" name="name" required style={{
                marginLeft: "2ch",
                backgroundColor: "#A6C48A",
                padding: "1px",
                border: "2px solid #6a8042",
                borderRadius: "6px",
                width: "500px"
              }}
            />
          </div>

          {/* password text and input box */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <label 
              htmlFor="password" 
              style={{ display: "flex", width: "120px", justifyContent: "flex-end" }}>
              <span style={{ minWidth: "80px", textAlign: "right" }}>password</span>
              <span style={{ paddingLeft: "3px" }}>:</span>
            </label>
            <input
              type="password" name="password"
              style={{
                marginLeft: "2ch",
                backgroundColor: "#A6C48A",
                padding: "1px",
                border: "2px solid #6a8042",
                borderRadius: "6px",
                width: "500px"
              }}
            />
          </div>
          
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px"}}>  
            <button style={{border: "2px solid #6a8042", 
            backgroundColor: "#FFFFFF", 
            padding: "5px 10px", 
            borderRadius: "6px",
            color: "#6a8042",
            fontSize: "1.5rem"}}type="submit">confirm!</button>
            </div>
          </div>
          
      </div>
        
      </form>
    </div>
  );
};

export default SignupPage;
