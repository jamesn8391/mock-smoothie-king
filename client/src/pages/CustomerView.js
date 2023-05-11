import React, { useState, useEffect } from "react";
import { StyledLink } from "../pages_styling/drinks";
import smoothieKingLogo from "../images/smoothiekinglogo_1.png";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const CustomerView = () => {
  const navigate = useNavigate();
  const base_url = process.env.REACT_APP_PRERELEASE_PORT;
  var userEmail;
  const login = useGoogleLogin({
    onSuccess: async (respose) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${respose.access_token}`,
            },
          }
        );
        userEmail = res.data.email;
      } catch (err) {
        console.log(err);
      }
      let backendUrl = base_url + "/user/get/" + userEmail;
      const response = await axios.get(backendUrl).catch((error) => {
        this.setState({ errorMessage: error.message });
        console.error("There was an error!", error);
      });
      const userPrivileges = response.data[0].access; //get what privileges user has from node backend
      Cookies.set("userPrivileges", userPrivileges);
      if (userPrivileges === "Manager") {
        //navigate to corresponding page depending on privileges
        navigate("/inventoryView");
      } else if (userPrivileges === "Server") {
        navigate("/Server");
      } else {
        navigate("/drinks");
      }
    },
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          style={{ position: "absolute", top: "15%" }}
          src={smoothieKingLogo}
          alt="Smoothie King drinks"
          width="350"
          height="250"
        />
        <div></div>
        <div className="absolute content-center align-middle flex py-[45vh]">
          <div className="bg-red-600 rounded-2xl">
            <StyledLink to="/Drinks">Order</StyledLink>
          </div>
        </div>
      </div>
      <button
        className="absolute top-2 right-2 flex top bg-red-400 p-4 rounded-xl text-slate-100"
        onClick={login}
      >
        Employee login
      </button>
    </div>
  );
};

export default CustomerView;
