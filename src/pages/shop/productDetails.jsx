import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import { ShopContext } from "../../context/Shop-Context";

function ProductDetails() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true); // Add loading state
    const location = useLocation();
    const { id, productName, price, productImage } = data;
    const { addToCart, cartItems } = useContext(ShopContext); // Access the addToCart function from the context
    const cartItemCount = cartItems[id];


    const fetchDetails = async (id) => {
        try {
            const api = await fetch(`http://localhost:3000/PRODUCTS/${id}`);
            const detailData = await api.json();
            console.log(detailData); // Log the data to see its structure
            if (Object.keys(detailData).length > 0) {
                setData(detailData);
            } else {
                console.error('No details found for ID:', id);
                setData({});
            }
        } catch (error) {
            console.error('Error fetching details:', error);
            // Handle error (e.g., display error message)
        } finally {
            setLoading(false); // Update loading state after fetch completes
        }
    };

    useEffect(() => {
        const lastPartOfLocationPath = location.pathname.split('/').slice(-1)[0];
        fetchDetails(lastPartOfLocationPath);
    }, [location]);

    return (
        <div className='main'>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <React.Fragment>
                    <h2>{productName}</h2>
                    {productImage && <img src={data.productImage} alt={data.productName} />}
                    <Card>
                        <div className='container'>
                            <div className='cardItem'>
                                <p className='p-color'>{data.productDescription}</p>
                                <p><b>Pris: {price} :-</b></p>
                                <button className="addToCartBttn" onClick={() => addToCart(id)}> Lägg till varukorg {cartItemCount > 0 && <> ({cartItemCount}) </>}
                                </button>
                            </div>
                        </div>
                    </Card>
                </React.Fragment>
            )}
        </div>
    );
}

export default ProductDetails;

const Card = styled.div`
    .container {
        display: flex;
        position: relative;
        margin: 2rem;
        justify-content: center;
       
       
    }

    .cardItem {
        height: 100%;
        width: 400px;
         background-color: white;
       box-shadow: 10px 10px black;
        border: 3px solid black;
        border-radius: 15%;
        padding: 10px;
    }

    .p-color {
        color: black;
        margin: 20px;
        display: flex;
    }

    .addToCartBttn {
        background-color: black;
        border: 2px solid rgb(19, 19, 19);
        min-width: 50px;
        padding-left: 10px;
        padding-right: 10px;
        padding-top: 10px;
        padding-bottom: 10px;
        border-radius: 15px;
    }

    .addToCartBttn:hover {
        background-color: white;
        color: black;
        cursor: pointer;
      }
`;