import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { Container, Button, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";

export const Checkout = ({ setCartProducts, cartProducts, totalAmount }) => {
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
      const orderData = {
        shippingInfo: shippingInfo,
        paymentInfo: paymentInfo,
        cartProducts: cartProducts,
        totalAmount: totalAmount
      };

      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        console.log('Order placed successfully!');
        setOrderPlaced(true);
        setCartProducts([]);
      } else {
        console.error('Failed to place order:', response.statusText);
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <Container>
      {orderPlaced ? (
        <div className="checkout">
          <h2>Tack för din beställning! Skickas inom 3-5 arbetsdagar!</h2>
          <button onClick={() => navigate("/")} className="cart-button">Fortsätt Handla</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <Row className="justify-content-center align-items-center h-100">
            <h3>Vem ska ordern skickas till?</h3>
            <Col md={6} lg={4} className="justify-content-center">

              <label htmlFor="floatingInputCustom">Namn:</label>
              <Form.Floating
                className="mb-1"
                inline style={{ width: '400px', display: 'justify-content-center' }}>

                <Form.Control
                  id="floatingInputCustom"
                  type="text" name="name"
                  value={shippingInfo.name}
                  onChange={handleShippingInputChange}
                  style={{ backgroundColor: 'grey', color: 'white' }}
                  required

                />
              </Form.Floating>
              <label htmlFor="floatingInputCustom">Gatuadress, husnummer:</label>
              {/*    <label htmlFor="address">Gatuadress, husnummer:</label> */}
              <Form.Floating
                className="mb-1"
                inline style={{ width: '400px', display: 'justify-content-center' }}>

                <Form.Control
                  id="floatingInputCustom"
                  type="text"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleShippingInputChange}
                  style={{ backgroundColor: 'grey', color: 'white' }}
                  required

                />
              </Form.Floating>
              <label htmlFor="floatingInputCustom">Stad:</label>
              {/*    <label htmlFor="address">Gatuadress, husnummer:</label> */}
              <Form.Floating
                className="mb-1"
                inline style={{ width: '400px', display: 'justify-content-center' }}>

                <Form.Control
                  id="floatingInputCustom"
                  type="text"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleShippingInputChange}
                  style={{ backgroundColor: 'grey', color: 'white' }}
                  required
                />
              </Form.Floating>


              <label htmlFor="floatingInputCustom">Postnummer:</label>
              <Form.Floating
                className="mb-1"
                inline style={{ width: '400px', display: 'justify-content-center' }}>

                <Form.Control
                  id="floatingInputCustom"
                  type="text" name="postalCode"
                  value={shippingInfo.postalCode}
                  onChange={handleShippingInputChange}
                  style={{ backgroundColor: 'grey', color: 'white' }}
                  required
                />
              </Form.Floating>
              <label htmlFor="floatingInputCustom">Land:</label>
              <Form.Floating
                className="mb-1"
                inline style={{ width: '400px', display: 'justify-content-center' }}>

                <Form.Control
                  id="floatingInputCustom"
                  type="text"
                  name="country"
                  value={shippingInfo.country}
                  onChange={handleShippingInputChange}
                  style={{ backgroundColor: 'grey', color: 'white' }}
                  required
                />
              </Form.Floating>
              <h3>Betalningsinformation:</h3>
              <label htmlFor="floatingInputCustom">Kortnummer:</label>
              <Form.Floating className="mb-1" inline style={{ width: '400px', display: 'justify-content-center' }}>

                <Form.Control
                  id="floatingInputCustom"
                  type="text"
                  name="cardNumber"
                  value={paymentInfo.cardNumber}
                  onChange={handlePaymentInputChange}
                  style={{ backgroundColor: 'grey', color: 'white' }}
                  required
                />
              </Form.Floating>
              <label htmlFor="floatingInputCustom">Giltighetstid:</label>
              <Form.Floating className="mb-1" inline style={{ width: '400px', display: 'justify-content-center' }}>

                <Form.Control
                  id="floatingInputCustom"
                  type="text"
                  name="expiryDate"
                  value={paymentInfo.expiryDate}
                  onChange={handlePaymentInputChange}
                  style={{ backgroundColor: 'grey', color: 'white' }}
                  required
                />
              </Form.Floating>

              <label htmlFor="floatingInputCustom">CVV:</label>
              <Form.Floating
                className="mb-1"
                inline style={{ width: '400px', display: 'justify-content-center' }}>

                <Form.Control
                  id="floatingInputCustom"
                  type="text"
                  name="cvv"
                  value={paymentInfo.cvv}
                  onChange={handlePaymentInputChange}
                  style={{ backgroundColor: 'grey', color: 'white' }}
                  required
                />
              </Form.Floating>

            </Col>
          </Row>
          <Card>
            <button type="submit" className='cart-button'>Skicka ordern</button>
            <button onClick={() => navigate("/")} className="cart-button">Fortsätt Handla</button>
          </Card>
        </form>
      )}

    </Container>
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
