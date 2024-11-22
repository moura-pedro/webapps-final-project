import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/auth/register/Register';
import SignIn from './components/auth/signin/SignIn';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App
