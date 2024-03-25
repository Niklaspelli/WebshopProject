
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import "./navbar.css";

export function Navbar() {
  return (
    <div className="topnav">
      <div className="links">
        
        <Link to="/"> Shop </Link>
        <Link to="/login"> Login </Link>
        <Link to="/cart"> 
        <ShoppingCart size={32} /> 
        </Link>
      </div>
    </div>

  );
}
