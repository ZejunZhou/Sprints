import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Cookies from "js-cookie";

function SPChoice() {
  if (Cookies.get("authenticated") === "true") {
    return (
      <div style={{ backgroundColor: " #f9deff", minHeight: "100vh" }}>
        <div>
          <StoryPokerChoice />
        </div>
      </div>
    );
  } else {
    console.log(Cookies.get("authenticated"));
    return (
      <div>
        <h1 style={{ color: "red" }}>Please sign into sprints to access SP!</h1>
      </div>
    );
  }
}

function StoryPokerChoice() {
  const handleClick = () => {
    console.log("link to story poker");
  };

  return (
    <div style={{ backgroundColor: " #f9deff", minHeight: "100vh" }}>
      <div className="component-div">
        <h1 className="h1SP">story poker</h1>

        <div className="button-container">
          <Link to="/storypoker">
            <button
              className="buttonStyleSP"
              style={{ margin: "30px" }}
              onClick={handleClick}
            >
              Present Question
            </button>
          </Link>
          <Link to="/storypoker/question">
            <button
              className="buttonStyleSP"
              style={{ margin: "30px" }}
              onClick={handleClick}
            >
              Answer question
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SPChoice;
