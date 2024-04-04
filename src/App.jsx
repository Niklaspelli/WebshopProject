import "./App.css";
import { Shop } from './pages/shop/Shop';
import { Cart } from './pages/cart/Cart'; 
import { Checkout } from './pages/checkout/Checkout';
import { Navbar } from './components/Navbar/Navbar';
import { Search } from './components/Search/Search';
import { Login } from './components/Login/Login';
import { Dashboard } from './components/Dashboard'
import { Register } from './components/Register';
import {SearchResult }from "./pages/searchresult/SearchResult";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ShopContextProvider } from "./context/Shop-Context";
import ProductDetails from "./pages/shop/ProductDetails";
import { AnimatePresence } from "framer-motion";


function App() {
  return (
    <AnimatePresence exitbeforeEnter>
    <div className="App">
      
        <ShopContextProvider>
      <Router>      
      <Navbar />
      <Search />  
    <Routes>
<Route path="/searchresult" element={<SearchResult />} />
<Route path="/dashboard" element={ <Dashboard />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/" element={<Shop />} />
<Route path="/productDetails/:id" element={<ProductDetails  />} />
<Route path="/cart" element={<Cart />} />
<Route path="/checkout" element={<Checkout />} />
  </Routes>
    </Router>
      </ShopContextProvider>
   </div>
   </AnimatePresence>
  );
}

export default App;