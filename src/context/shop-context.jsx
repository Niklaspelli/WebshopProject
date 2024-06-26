import { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext(null);

export const ShopContextProvider = (props, token) => {
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/PRODUCTS')
            .then(res => res.json())
            .then(products => {
                setProducts(products.PRODUCTS);
            })
            .catch(error => {
                console.error('Error fetching products: ', error);
            });
    }, [cartItems]);

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = products.find((product) => product.id === Number(item));
                if (itemInfo) {
                    totalAmount += cartItems[item] * itemInfo.price;
                } else {
                    console.error(`Product with ID ${item} not found.`);

                }
            }
        }
        return totalAmount;
    };

    const addToCart = (itemId) => {

        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));
    };

    const removeFromCart = (itemId) => {

        setCartItems((prev) => ({
            ...prev,
            [itemId]: prev[itemId] - 1
        }));
    };

    const updateCartItemCount = (newAmount, itemId) => {

        setCartItems((prev) => ({
            ...prev,
            [itemId]: newAmount
        }));
    };

    const contextValue = {
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemCount,
        getTotalCartAmount,
    };
    console.log(cartItems)
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};