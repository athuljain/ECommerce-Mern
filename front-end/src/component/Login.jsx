

import { useContext, useState, useEffect } from "react";
import { myContext } from "../Context.js";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Style/Login.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const notify = () => toast("Login successful!");
  const nav = useNavigate();
  const { setUserToken,isLoggedIn, setIsLoggedIn } = useContext(myContext);

  // Local state for email, password, and login status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  // Check for token in local storage on component mount
  useEffect(() => {
    
  }, []);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        alert("Please fill in all fields");
        return;
      }
      

      const response = await axios.post(
        "http://localhost:5000/user/login",
        { email, password },
        { withCredentials: true }
      );

      const data = response.data;

      // Store user details and token in local storage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Set user token in 
      setUserToken(data.token);

      // Update login status
      setIsLoggedIn(true);

      // Notify user and navigate to home page
      notify();
      nav("/home");
      const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
    } catch (error) {
      console.log(error.response.data);
      // alert("Login failed!!!");
      toast.error("Registration failed");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-head">Login</h1>
      <input
        className="login-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        className="login-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button className="login-btn" onClick={handleLogin}>
        Login
      </button>
      <ToastContainer />
      <p>Don't have an account?</p>
      <Link to="/register">Sign Up</Link>
      {isLoggedIn && <p>You are logged in!</p>}
    </div>
  );
}
