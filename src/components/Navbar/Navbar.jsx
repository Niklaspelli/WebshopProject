import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import "./Navbar.css";

export function Navbar() {


  return (
    <div className="topnav">
      <div className="links">
        <Link to="/"> Shop </Link>
        <Link to="/login"> Login/Skapa </Link>
        <Link to="/cart"> 
          <ShoppingCart size={32} /> 
        </Link>
      </div>
    </div>
  );
}