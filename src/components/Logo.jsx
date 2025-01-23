import React from "react";
import logo from "../assets/logo.png";
function Logo({ width = "100px" }) {
  return (
    <div>
      <img src={logo} alt="Logo" style={{ height: width, width: width }} />
    </div>
  );
}

export default Logo;
