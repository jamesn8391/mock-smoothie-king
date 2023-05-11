import React from "react";
import { Nav, NavLink, NavMenu, DropDownLink } from "./navbar_style";
import './manager_navbar.css';
import logoHorizontal from '../images/logo.png';

const ManagerNavbar = () => {
  return (
    <Nav>
      <div>
      <img
          src={logoHorizontal}
          alt="Smoothie King drinks"
          class = "bg-gradient-to-b from-slate-200 to-slate-50 absolute top-0 left-0"
        />
      </div>
       
      <NavMenu>
        <NavLink to="/CustomerView" activestyle="true">
          Home
        </NavLink>

        <NavLink to="/inventoryView" activestyle="true">
          Inventory
        </NavLink>

        <div class="dropdown">
          <button class = "w-20 ps-4">Reports</button>
          <i class="arrow down"></i>
          <div class="dropdown-content">
            <DropDownLink to="/salesReport">Sales</DropDownLink>
            <DropDownLink to="/restockReport">Restock</DropDownLink>
            <DropDownLink to="/excessReport">Excess</DropDownLink>
            <DropDownLink to="/xzReport">X-Z</DropDownLink>
          </div>
        </div>
      </NavMenu>
    </Nav>
  );
};

export default ManagerNavbar;
