import React, { useState, useEffect } from "react";
import { hour_needed } from "./QuestionPage.js";
import "./style.css";
import { SERVER_URL } from "../../configdata.js";
import { question2 } from "./QuestionPage.js";

const ResultsPage = () => {
  const [results, setResults] = useState([]);

  const fetchSPQuestion = (queryString) => {
    return fetch(SERVER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "anything",
      },
      body: JSON.stringify({
        hostname: "db2",
        portnum: "3306",
        query: "select * from SP;",
        user: "root",
        password: "mc",
        database: "AGDev43",
      }),
    })
      .then((response) => response.json())
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchSPQuestion().then((data) => setResults(data));
  }, []);

  return (
    <div style={{ backgroundColor: " #f9deff", minHeight: "100vh" }}>
      <div className="component-div">
        <h1 className="h1SP">Results</h1>
        <h2 className="h2SP">User story: {question2}</h2>
        {results.map((result, index) => (
          <div key={index}>
            <h2 className="h2Results">
              {result.Email}: {result.Answer}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;
