
import Searched from "./searched";
import Shop from './Shop';
import { Route, Routes } from "react-router-dom";
import ShoppingCart from "../components/ShoppingCart";


function Pages() {

  return (
  
    <Routes>
     <Route path="/" element={<Shop />} />
     <Route path="/searched/:search" element={<Searched />} />
    {/*  <Route path="/items/:id" element={<Products />} /> */}
     <Route path="/cart" element={<ShoppingCart />} />
    </Routes>

  )
}

export default Pages;