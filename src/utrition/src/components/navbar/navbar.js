import React from "react";
import { Nav, NavLink, Bars, NavMenu } from "./navbarElements";

//define a NavBar component and render a navigation bar with links to various pages.
const NavBar = () => {
  return (
    <>
      <Nav>
        <NavLink to="/">
          <h1>Utrition</h1>
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/upload" activeStyle>
            Upload
          </NavLink>
          <NavLink to="/profile" activeStyle>
            Profile
          </NavLink>
          <NavLink to="/settings" activeStyle>
            Settings
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default NavBar;
