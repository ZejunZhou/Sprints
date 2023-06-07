import React from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom"; // import BrowserRouter from react-router-dom
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
//import App from './App';
import reportWebVitals from "./reportWebVitals";
//import NavBar from './NavBar';
import Home from "./Home";
import { CookiesProvider } from "react-cookie";

const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(
  <Router>
    <CookiesProvider>
      <GoogleOAuthProvider clientId="186388187474-cn3i4m9g8d8ak5g8vh4r7id5s7d2r2o4.apps.googleusercontent.com">
        <React.StrictMode>
          <Home />
        </React.StrictMode>
      </GoogleOAuthProvider>
    </CookiesProvider>
  </Router>,
);

reportWebVitals();
