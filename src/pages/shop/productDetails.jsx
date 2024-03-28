import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from "styled-components";

function ProductDetails() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true); // Add loading state
    const location = useLocation();

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
                <div>Loading...</div> // Show loading indicator while fetching data
            ) : (
                <React.Fragment>
                    <div>Produktdetaljer ska stå här:</div>
                    {/* Render product details */}
                    <h2>{data.productName}</h2>
                    <img src={data.productImage}  alt={data.productName} />
                    <Card>
                        <div className='descriptionCard'>
                            <p className='p-color'>{data.productDescription}</p>
                        </div>
                    </Card>
                    <p>Pris: {data.price} :-</p>
                    {/* Add more details as needed */}
                </React.Fragment>
            )}
        </div>
    );
}

export default ProductDetails;

const Card = styled.div`
    .descriptionCard {
        display: flex;
        width: 400px;
        height: 500px;
        margin: 2rem;
        border: 3px solid black;
        border-radius: 15%;
        justify-content: center;
        align-items: center;
        background: blur;
    }

    .p-color {
        color: white;
        position: relative;
    }
`;