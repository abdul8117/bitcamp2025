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
      navigate("/home");
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Sign Up</h2>
      <form className={styles.form} onSubmit={createAccount}>
        <input type="text" name="name" placeholder="Full Name" />
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default SignupPage;
