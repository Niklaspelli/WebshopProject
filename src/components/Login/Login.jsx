import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Col, Row } from "react-bootstrap";
import  Form  from "react-bootstrap/Form";


export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: username, pwd: password }), 
      });

      if (!response.ok) {
        throw new Error('Inloggning misslyckad!');
      }

      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setErrorMessage('Token not received');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Ogiltigt användarnamn eller lösenord!');
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem('token');
    if (authToken) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <Container>
      
      <Row className="justify-content-center align-items-center h-100">
        <h2>Logga in:</h2>
        <Col md={6} lg={4} className="justify-content-center"> 
        <label htmlFor="floatingInputCustom">Användarnamn:</label>
        <Form.Floating className="mb-1" inline style={{ width: '400px', display: 'justify-content-center'}}> 
       
        <Form.Control
          id="floatingInputCustom"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ backgroundColor: 'grey', color: 'white'}}
          
        />
       </Form.Floating>
         <label htmlFor="floatingInputCustom">Lösenord:</label>
       <Form.Floating className="mb-2" inline style={{ width: '400px'}}> 
       
       <Form.Control
          id="floatingInputCustom"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mr-sm-5 centered-placeholder"
          style={{ backgroundColor: 'grey', color: 'white', width: '200px;'}}
        />
       </Form.Floating>
        <div className="login-container">
          <Button style={{ backgroundColor: 'black'}}  className="login-button" type="submit" onClick={(e) => handleLogin(e)}>
        Login
      </Button>
          <Button  style={{ backgroundColor: 'black', margin: "20px"}} type="submit" onClick={() => navigate("/register")}>
        Skapa
      </Button>
        </div>
      {errorMessage && <p>{errorMessage}</p>}
      </Col>
      </Row>
    </Container>
  );
};