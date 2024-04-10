import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import "./Navbar.css";
import { useContext } from 'react';
import { ShopContext } from '../../context/Shop-Context';

export function Navbar() {

  const { cartItems } = useContext(ShopContext);

  const totalItemsInCart = Object.values(cartItems).reduce((total, count) => total + count, 0);
  return (
    <div className="topnav">
      <div className="links">
        <Link to="/"> Shop </Link>
        <Link to="/login"> Login/Skapa </Link>
        <Link to="/cart">
          <ShoppingCart size={32} />
          ({totalItemsInCart})
        </Link>
      </div>
    </div>
  );
}