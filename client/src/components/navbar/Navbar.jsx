import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/signout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        logout();
        navigate('/');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-text">GROUP Nº7</span>
        </Link>
        
        <div className="navbar-auth">
          {!user ? (
            <>
              <Link to="/register" className="auth-button">
                Register
              </Link>
              <Link to="/signin" className="auth-button">
                Sign In
              </Link>
            </>
          ) : (
            <div className="user-menu">
              <span className="welcome-text">Welcome, {user.username}!</span>
              <button onClick={handleLogout} className="auth-button">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;