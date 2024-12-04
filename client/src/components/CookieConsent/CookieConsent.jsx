import React, { useState, useEffect } from 'react';
import './CookieConsent.css';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-container">
        <div className="cookie-message">
          This website uses cookies to enhance your experience and keep you signed in. 
          By continuing to use this site, you consent to our use of cookies.
        </div>
        <button
          onClick={handleAccept}
          className="cookie-accept-button"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;