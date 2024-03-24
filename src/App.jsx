import "./App.css";
import { Shop } from './pages/shop/shop';
import { Cart } from './pages/cart/cart'; 
import { Navbar } from './components/navbar';
import { Searchbar } from './components/searchbar';
import Searched from "./pages/searched";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ShopContextProvider } from "./context/shop-context";


function App() {

  return (
    <div className="App">
      
    <ShopContextProvider>
      <Router> 
        <Searchbar />
<Navbar />
<Routes>
<Route path="/searched/:search" element={<Searched />} />
  <Route path="/shop" element={<Shop />} />
  <Route path="/cart" element={<Cart />} />
</Routes>
      </Router>
      </ShopContextProvider>
   </div>
  );
}

export default App;