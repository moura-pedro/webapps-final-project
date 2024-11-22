import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-text">GROUP Nº7</span>
        </Link>
        
        <div className="navbar-auth">
          <Link to="/register" className="auth-button">
            Register
          </Link>
          <Link to="/signin" className="auth-button">
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;