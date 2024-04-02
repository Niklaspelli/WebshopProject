import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

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
        throw new Error('Login failed');
      }

      const data = await response.json();
      // Check if the response contains a redirect URL
      if (data.redirect) {
        // Redirect to the specified URL
        navigate(data.redirect);
      } else {
        // Handle other cases (if needed)
      }

    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Användarnamn:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Lösenord:</label>
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





/* import  { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './login.css';

export const Login = () => {

      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [data, setData] = useState(null);
      const [isAuthenticated, setAuthenticated] = useState(false);
      const navigate = useNavigate();
    
      const handleLogin = async () => {
        try {
          const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user, pwd })
          });
          
          if (!response.ok) {
            throw new Error('Login failed');
          }
    
          const result = await response.json();
          localStorage.setItem('access_token', result.token);
          setAuthenticated(true);
        } catch (error) {
          alert(error.message || 'Login failed!');
        }
      };
    
      const handleLogout = () => {
        localStorage.removeItem('access_token');  // Remove token
        setAuthenticated(false);  // Update authentication state
        setData(null);  // Clear fetched data
      };
    
      const fetchData = async () => {
        try {
          const token = localStorage.getItem('access_token');
          const response = await fetch('http://localhost:3000/users', {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          if (!response.ok) {
            if (response.status === 401) {  // Unauthorized
              handleLogout();
              alert('Session expired. Please login again.');
              return;
            }
            throw new Error('Failed to fetch data from backend');
          }
    
          const result = await response.json();
          setData(result.data);
        } catch (error) {
          alert(error.message || 'Failed to fetch data');
        }
      };
    
      return (
        <div className="App">
          <header className="App-header">
            {isAuthenticated ?
              <>
                {data ? <p>{data}</p> : <button className="" onClick={fetchData}>Fetch Data</button>}
                <button onClick={handleLogout}>Logout</button>
              </> :
              (<div className="login-container">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="input-field" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="input-field" />
                <button onClick={handleLogin} className="login-button">Login</button>
                <button onClick={() => navigate("/register")} className="Register-button">Register</button>
              </div>)
            }
          </header>
        </div>
      );
    }


 */