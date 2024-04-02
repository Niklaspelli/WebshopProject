import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

export const Checkout = () => {
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleShippingInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          shippingInfo,
          paymentInfo
        })
      });
      if (response.ok) {
        console.log('Order placed successfully!');
        setOrderPlaced(true);
      } else {
        console.error('Failed to place order:', response.statusText);
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div>
      {orderPlaced ? (
        <div className="checkout">
          <h2>Tack för din beställning! Skickas inom 3-5 arbetsdagar!</h2>
          <button onClick={() => navigate("/")} className="cart-button">Fortsätt Handla</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h3>Vem ska ordern skickas till?</h3>
          <div>
            <label htmlFor="name">Namn:</label>
            <input type="text" name="name" value={shippingInfo.name} onChange={handleShippingInputChange} required />
          </div>
          <div>
            <label htmlFor="address">Gatuadress, husnummer:</label>
            <input type="text" name="address" value={shippingInfo.address} onChange={handleShippingInputChange} required />
          </div>
          <div>
            <label htmlFor="city">Stad:</label>
            <input type="text" name="city" value={shippingInfo.city} onChange={handleShippingInputChange} required />
          </div>
          <div>
            <label htmlFor="postalCode">Postnummer:</label>
            <input type="text" name="postalCode" value={shippingInfo.postalCode} onChange={handleShippingInputChange} required />
          </div>
          <div>
            <label htmlFor="country">Land:</label>
            <input type="text" name="country" value={shippingInfo.country} onChange={handleShippingInputChange} required />
          </div>
          
          <h3>Betalningsinformation:</h3>
          <div>
            <label htmlFor="cardNumber">Kortnummer:</label>
            <input type="text" name="cardNumber" value={paymentInfo.cardNumber} onChange={handlePaymentInputChange} required />
          </div>
          <div>
            <label htmlFor="expiryDate">Giltighetstid:</label>
            <input type="text" name="expiryDate" value={paymentInfo.expiryDate} onChange={handlePaymentInputChange} required />
          </div>
          <div>
            <label htmlFor="cvv">CVV:</label>
            <input type="text" name="cvv" value={paymentInfo.cvv} onChange={handlePaymentInputChange} required />
          </div>

          <Card>
            <button type="submit" className='cart-button'>Skicka ordern</button>
          </Card>
        </form>
      )}
    </div>
  );
};

const Card = styled.div`
  .cart-button {
    font-size: 18px;
    width: 150px;
    height: 50px;
    background-color: rgb(19, 19, 19);
    color: white;
    border: none;
    border-radius: 8px;
    margin: 10px;
    cursor: pointer;
  }
`;
