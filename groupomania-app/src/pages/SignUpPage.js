import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [firstName, setFirstName] = useState(''); // State for first name
  const [lastName, setLastName] = useState('');   // State for last name
  const [email, setEmail] = useState('');         // State for email
  const [password, setPassword] = useState('');   // State for password
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Signing up with:', { firstName, lastName, email, password });

    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        firstName,
        lastName,
        email,
        password
      });
      console.log('Sign-up successful:', response.data);
      navigate('/login'); // Redirect to the login page after successful sign-up
    } catch (error) {
      console.error('Error signing up:', error);
      setErrorMessage('An error occurred during sign-up. Please try again.');
    }
  };

  return (
    <div>
      <h1>Sign up</h1>
      {errorMessage && (
        <p className="error">{errorMessage}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
