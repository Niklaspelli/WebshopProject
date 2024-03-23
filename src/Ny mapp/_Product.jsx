import React from "react";
const BASE_API_URL = "http://localhost:3000/products";

const Product = ({
  productId,
  productTitle,
  productPrice,
  productDescription,
}) => {
  return (
    <>
    <p>Från productFilen</p>
        <div>
          <h4>{productTitle}</h4>
          <p>{productDescription}</p>
          <div>
            <p>
              ₹ {productPrice}
            </p>
            <p> 
           {productId}
            </p>
          </div>
        </div>
    
    </>
  );
};

export default Product;