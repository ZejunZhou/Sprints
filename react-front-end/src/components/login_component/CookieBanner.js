import React from "react";
import Cookies from "js-cookie";
function CookieBanner() {
  const handleAccept = () => {
    Cookies.set("cookieConsent", true, { expires: 365 });
    document.getElementById("cookie-banner").style.display = "none";
  };
  const bannerStyle = {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    boxShadow: "0px -2px 4px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };
  return (
    <div id="cookie-banner" style={bannerStyle}>
      <p>We use cookie to improve your experience</p>
      <button onClick={handleAccept}>Accept</button>
    </div>
  );
}
export default CookieBanner;
