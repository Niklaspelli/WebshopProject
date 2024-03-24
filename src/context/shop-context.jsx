import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3500/PRODUCTS') 
            .then(res => res.json())
            .then(products => {
                setProducts(products);
            })
            .catch(error => {
                console.error('Error fetching products: ', error);
            });
    }, []);

    const addToCart = (itemId) => {
        // Update cartItems state to add the item with the specified itemId
        setCartItems(prev => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));
    };

    const contextValue = { cartItems, addToCart };
console.log(cartItems)
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};