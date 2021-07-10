import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import logo from "../assets/images/logo-main.png"

import { AuthContext } from "../contexts/authContext";

function Navbar() {
  const { loggedInUser, setLoggedInUser } = useContext(AuthContext);
  const { _id } = loggedInUser.user;
  return (
    <div className="allNavbar">
      <nav className="navbar navbar-expand bg-transparent d-flex ">
        <NavLink className="navbar-brand d-inline d-flex nearsea" to="/">
          <img src={logo} style={{width:"65px", height:"40px"}}/> <p className="pt-2" >NearSea Audio</p>
        </NavLink>

        <button
          className="navbar-toggler navButton"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
          <div className="mr-3">
            {loggedInUser.user.name ? (
              <div className="loginNavbar">
                <Link to={`/profile/${_id}`} as={NavLink}>
                  <text className="loginText">Profile</text>&nbsp;{" "}
                  <text className="loginText">|</text>
                </Link>
                <Link
                  onClick={(event) => {
                    event.preventDefault();
                    // Fazendo processo de Logout
                    setLoggedInUser({ user: {}, token: "" });
                    localStorage.removeItem("loggedInUser");
                  }}
                >
                  &nbsp; <text className="loginText">Logout</text>
                </Link>
                <div variant="transparent">
                  &nbsp; &nbsp; &nbsp;
                  <img
                    src={`https://ui-avatars.com/api/?name=${loggedInUser.user.name}&size=32&background=random`}
                    className="rounded-circle"
                    alt="Profile"
                  />
                </div>
              </div>
            ) : (
              <NavLink
                className="nav-link text-white"
                activeClassName="active"
                to="/auth/login"
              >
                <button type="button" class="btn btn-primary">Login</button>
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
