import { useState } from "react";

/* import Item from './Products'; */


function ShoppingCart() {
    const [selectedItem, setSelectedItem] = useState(null);

    const handleSelectItem = (item) => {
      setSelectedItem(item);
    };
  
    return (
      <div>
        <h1>ShoppingCart</h1>
        
     
      </div>
    );
  }

export default ShoppingCart
