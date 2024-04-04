import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Dashboard = ({ token }) => {
  const [userData, setUserData] = useState(null);
  const [setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch('http://localhost:3000/users', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await userResponse.json();
        setUserData(userData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  useEffect(() => {
    console.log(userData);
  }, [userData]);
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Kundkonto</h2>
      {userData && (
        <p>Välkommen, {userData.id}!</p>
      )}
      <button onClick={handleLogout}>Log Out</button>
      <p>Tanken är att man ska kunna se sina gamla odrar här!</p>
    </div>
  );
};