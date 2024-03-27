import "./App.css";
import { Shop } from './pages/shop/shop';
import { Cart } from './pages/cart/cart'; 
import { Navbar } from './components/navbar';
import { Search } from './Search';
import { Login } from './components/login';
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
<Route path="/login" element={<Login />} />
  <Route path="/" element={<Shop />} />
  <Route path="/productDetails/:id" element={<ProductDetails />} />
  <Route path="/cart" element={<Cart />} />
</Routes>
      </Router>
      </ShopContextProvider>
   </div>
  );
}

export default App;