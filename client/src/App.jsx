import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Home from './pages/home/Home';
import Register from './pages/auth/register/Register';
import SignIn from './pages/auth/signin/SignIn';
import UserAccount from './pages/userAccount/UserAccount';
import Navbar from './components/navbar/Navbar';
import CookieConsent from './components/CookieConsent/CookieConsent';
import './App.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/account" element={<UserAccount />} />
        </Routes>
        <CookieConsent />
      </Router>
    </UserProvider>
  );
}

export default App;