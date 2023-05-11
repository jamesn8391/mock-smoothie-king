import React from "react";
import { Link } from "react-router-dom";
import { StyledLink } from "../pages_styling/drinks";
import smoothieKingLogo from "../images/smoothiekinglogo_1.png";

const Home = () => {
  return (
    <div>
      {/* <h1 style={{display: 'flex', justifyContent: 'center'}}></h1> */}

      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          style={{ position: "absolute", top: "15%" }}
          src={smoothieKingLogo}
          alt="Smoothie King drinks"
          width="350"
          height="250"
        />
        <div
          style={{
            position: "absolute",
            top: "65%",
            borderRadius: "10px",
            border: "1px solid black",
            width: "20%",
            height: "20%",
            display: "flex",
            justifyContent: "center",
            backgroundImage: "linear-gradient(to right, #e53935, #f55b52)",
          }}
        >
          <StyledLink to="/Drinks">Order</StyledLink>
        </div>
      </div>

      {/* <div style={{ position: 'relative' }}>
      <img src={smoothieKingLogo} alt="SmoothieKingLogo" style={{ display: 'block', width: "50", height: "50" }} />
      <div style={{ textAlign: 'center' }}>
        <Link to="/Drinks">Drinks</Link>
      </div>
    </div> */}
    </div>
  );
};

export default Home;
