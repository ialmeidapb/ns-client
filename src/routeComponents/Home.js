import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar"
import logoMain from "../assets/images/near-sea.png"
import "../assets/styles/index.css"

function Home() {
  return (
    <div>
    
      <section className="section1 pb-5">
      <Navbar/>
  <div className="d-flex justify-content-center align-content-center">
  <img src={logoMain} className="logoMain"></img>
</div>
      </section>
        {/* <Link className="btn btn-lg btn-primary" to="/auth/signup">
          Signup here!
        </Link> */}
      </div>
  );
}

export default Home;
