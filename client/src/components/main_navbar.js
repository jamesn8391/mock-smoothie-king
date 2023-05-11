import React from "react";
import { Nav, NavLink, NavMenu } 
    from "./navbar_style";
import logoHorizontal from '../images/logo.png';
  
const MainNavbar = () => {
  return (
    <Nav>
      <div>
      <img
          src={logoHorizontal}
          alt="Smoothie King drinks"
          className = "bg-gradient-to-b from-slate-200 to-slate-50 absolute top-0 left-0"
        />
      </div>
      <NavMenu>
        <NavLink to="/CustomerView" activestyle="true">
          Customer
        </NavLink>
        <NavLink to="/inventoryView" activestyle="true">
          Manager
        </NavLink>
        <NavLink to="/Server" activestyle="true">
          Server
        </NavLink>
      </NavMenu>
    </Nav>
  );
};
  
export default MainNavbar;