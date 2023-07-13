import React from "react";
import { NavLink } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      LandingPage
      <header className="list__menu">
        <NavLink to="/aboutus">About us</NavLink>
        <br />
        <NavLink to="/wrapper">Adminka</NavLink>
      </header>
    </div>
  );
}

export default LandingPage;
