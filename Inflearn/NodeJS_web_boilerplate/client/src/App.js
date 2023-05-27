import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import UploadProductPage from './components/views/UploadProductPage/UploadProductPage'
import Auth from './hoc/auth';


function App() {
  const landingPage = Auth(LandingPage, null);
  const loginPage = Auth(LoginPage, false);
  const registerPage = Auth(RegisterPage, false);
  const uploadProductPage = Auth(UploadProductPage, true);

  return (
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
        <hr/>

      
        <Routes>
          <Route path="/" element={landingPage()}/>
          <Route path="/login" element={loginPage()}/>
          <Route path="/register" element={registerPage()}/>
          <Route path="/product/upload" element={uploadProductPage()}/>
        </Routes>
      </div>
      
      
  );
}

export default App;
