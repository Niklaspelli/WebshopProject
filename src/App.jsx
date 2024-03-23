import "./App.css";
import { Shop } from './pages/shop/shop';
import { Cart } from './pages/cart/cart'; 
import { Navbar } from './components/navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {

  return (
    <div className="App">
    
      <Router>
<Navbar />
<Routes>
  <Route path="/shop" element={<Shop />} />
  <Route path="/cart" element={<Cart />} />
</Routes>
      </Router>
   </div>
  );
}

export default App;