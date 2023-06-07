import "./login-style.css";
import "./styles.css";
import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import CookieBanner from "./CookieBanner";

function LoginPage({ setUser, user, profile, setProfile, setIsLoggedIn }) {
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
    <div
      style={{
        color: "black",
        marginTop: 100,
        marginLeft: "auto",
        marginRight: "auto",
        minHeight: "100%",
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* <h2 style={{ text: "center" }}>Login to Sprints with Google</h2>
      <br />
      <br />
      {profile.length !== 0 ? ( // if we have login, the profile should contain the object, which we display the user information
        <div>
          <img src={profile.picture} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
        </div>
      ) : ( // else, display the login button
        <div>
        <button onClick={() => login()}>Sign in with Google 🚀 </button>
        </div>
      )}
        <CookieBanner /> */}
    </div>
  );
}

export default LoginPage;
