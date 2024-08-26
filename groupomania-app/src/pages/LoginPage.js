import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const navigate = useNavigate(); // Initialize navigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });

    try {
      // Use axios to send a POST request for login
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      // Save user information to local storage if login is successful
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Redirect to homepage after successful login
      navigate('/home');
    } catch (error) {
      console.error('Error logging in:', error);

      // Show error message if login is unsuccessful
      setErrorMessage('Incorrect email or password. Please try again.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {errorMessage && <p className="error">{errorMessage}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
