import React, { useState } from 'react';
import './SignIn.css';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for cookies
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Sign in failed');
      }

      // Handle successful sign in - You'll want to update this based on your User context
      window.location.href = '/movies';
    } catch (err) {
      setError(err.message || 'An error occurred during sign in');
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h2>Sign In</h2>
        <p className="subtitle">Enter your credentials to access your account</p>
        
        <form onSubmit={handleSubmit} className="signin-form">
          <div className="signin-form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          
          <div className="signin-form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="submit-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;