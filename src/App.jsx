import "./App.css";
import { Shop } from './pages/shop/shop';
import { Cart } from './pages/cart/cart'; 
import { Checkout } from './pages/checkout/checkout';
import { Navbar } from './components/navbar';
import { Search } from './Search';
import { Login } from './components/login';
import { Dashboard } from './components/dashboard'
import { Register } from './components/register';
import {SearchResult }from "./pages/searchresult/SearchResult";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ShopContextProvider } from "./context/shop-context";
import ProductDetails from "./pages/shop/productDetails";



function App() {

  return (
    <div className="App">
      
    <ShopContextProvider>
      <Router> 
      
<Navbar />
<Search />  
<Routes>
<Route path="/searchresult" element={<SearchResult />} />
<Route path="/dashboard" element={<Dashboard />} />
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
  );
}

export default App;