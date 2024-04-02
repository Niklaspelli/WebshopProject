import { useState } from 'react';

export const Dashboard = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [userId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId, // Assuming userId is available in your component state
          firstName,
          lastName,
          address,
          postalCode,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log(data);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setErrMsg('Registration Failed');
    }
  };

  return (
    <div>
      {success ? (
        <p>Tack för att du har fyllt i dina uppgifter!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">Förnamn:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <label htmlFor="lastName">Efternamn:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <label htmlFor="address">Adress:</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <label htmlFor="postalCode">Postnummer:</label>
          <input
            type="text"
            id="postalCode"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
          <button type="submit">Skicka</button>
        </form>
      )}
      {errMsg && <p>{errMsg}</p>}
    </div>
  );
};