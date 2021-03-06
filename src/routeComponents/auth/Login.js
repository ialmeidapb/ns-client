import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../../apis/api";
import Navbar from "../Navbar"
import { AuthContext } from "../../contexts/authContext";

function Login(props) {
  const authContext = useContext(AuthContext);

  const [state, setState] = useState({ password: "", email: "" });
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  function handleChange(event) {
    setState({
      ...state,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post("/login", state);
      console.log(response);

      authContext.setLoggedInUser({ ...response.data });
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({ ...response.data })
      );
      setErrors({ password: "", email: "" });
      const { _id } = response.data.user;
      props.history.push(`/profile/${_id}`);
    } catch (err) {
      console.error(err.response);
      setErrors({ ...err.response.data.errors });
    }
  }

  return (
    <div className="loginpage">
    <Navbar/>
<form onSubmit={handleSubmit}>
      <h1>Login</h1>

      <div>
        <label htmlFor="signupFormEmail">E-mail Address</label>
        <br/>
        <input
          type="email"
          name="email"
          id="signupFormEmail"
          value={state.email}
          error={errors.email}
          onChange={handleChange}
      
        />
      </div>
<br/>
      <div>
        <label htmlFor="signupFormPassword">Password</label>
        <br/>
        <input
          type="password"
          name="password"
          id="signupFormPassword"
          value={state.password}
          error={errors.password}
          onChange={handleChange}
        />
      </div>
      <br/>
    

      <div>
        <button type="submit" className="btn btn-dark bg-transparent loginbtn">Login!</button>
<br/>
        <Link to="/auth/signup">
          Don't have an account? Click here to signup!
        </Link>
      </div>
    </form>
    </div>
    
  );
}

export default Login;
