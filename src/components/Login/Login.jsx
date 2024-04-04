import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="login-container">
          <button type="submit" className="login-button">Login</button>
          <button onClick={() => navigate("/register")} className="Register-button">Skapa</button>
        </div>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};