import { useContext } from "react";
import { ShopContext } from "../../context/Shop-Context";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Shop.css';



export const Product = ({ data }) => {
  const notify = () => toast.success('Produkten tillagd i varukorgen!', {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    // eslint-disable-next-line no-undef

  });
  const { id, productName, price, productImage } = data;
  const { addToCart, cartItems } = useContext(ShopContext);

  const cartItemCount = cartItems[id];

  return (

    <div className="card">

      <h2>{productName}</h2>
      <Link to={`/productDetails/${id}`}>
        <img src={productImage} className="itemImage" />
      </Link>
      <p>Pris: {price}:-</p>
      <button className="addToCartBttn" onClick={() => {
        addToCart(id); // Call addToCart function
        notify();     // Call notify function
      }}>
        Lägg till varukorg {cartItemCount > 0 && <> ({cartItemCount}) </>
        }
      </button>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"

      />
    </div>
  );
};