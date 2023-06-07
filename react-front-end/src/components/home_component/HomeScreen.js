//import React from "react";
import "./Homepage.css"; // Import the styles for the homepage
import SprintsHome from "./1.png";
import Description1 from "./2.png";
import Description2 from "./3.png";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import CookieBanner from "./CookieBanner";
import { Link } from "react-router-dom";

function Homepage({ setUser, user, profile, setProfile, setIsLoggedIn }) {
  // Function enable Cookie and localSotrage, get the response from function useGooglelogin to update login status
  //using function setUser and setIsLoggedIn
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      Cookies.set("authenticated", "true");
      console.log("LOGGED IN");
      setUser(codeResponse);
      window.localStorage.setItem("user", JSON.stringify(codeResponse));
      setIsLoggedIn(true);
    },
    onError: (error) => console.log("Login Failed:", error),
  });
  // set the user information
  useEffect(() => {
    if (user) {
      var data = JSON.parse(window.localStorage.getItem("user"));
      if (data === null) {
        data = user;
      }
      // setUser(JSON.parse(window.localStorage.getItem('user')));
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${data.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${data.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
          localStorage.setItem("profile", res.data);
          Cookies.set("user_email", res.data.email);
          Cookies.set("authenticated", "true");
          Cookies.set("profile_img", res.data.picture);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <div>
      <img
        style={{ width: "100%", height: "100%", position: "relative" }}
        src={SprintsHome}
      />

      <div
        class="horizontal-center"
        style={{
          backgroundColor: "#6ae6a7",
        }}
      >
        <Link to="/">
          <button onClick={() => login()} className="button">
            SIGN IN{" "}
          </button>
        </Link>
      </div>
      <img
        style={{ width: "100%", height: "100%", position: "relative" }}
        src={Description1}
      />
      <img
        style={{ width: "100%", height: "100%", position: "relative" }}
        src={Description2}
      />

      <CookieBanner />
    </div>
  );
}

export default Homepage;
