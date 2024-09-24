import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Form.css'; // Import your custom styles

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(''); // Clear previous error messages

    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      
      // Storing the token and userId in local storage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', JSON.stringify(response.data.userId));
      
      // Logging in and navigating to the forum page
      login(response.data);
      navigate('/forum');
    } catch (error) {
      // Set error message if credentials are incorrect
      setErrorMessage('Incorrect email or password. Please try again.');
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className="form-container">
      <h1>Login</h1>

      {/* Display error message */}
      {errorMessage && <p className="error">{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        {/* Email input */}
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>

        {/* Password input */}
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>

        {/* Submit button */}
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
