import React from "react";
import { Nav, NavLink, Bars, NavMenu } from "./navbarElements";

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
          <NavLink to="/signin" activeStyle>
            Signin
          </NavLink>
          {/* Create NavLink for signin page */}
        </NavMenu>
      </Nav>
    </>
  );
};

export default NavBar;
