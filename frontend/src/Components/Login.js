
// export default Login;
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import hospitalImage from '../Components/Images/hospital.png';
import './Login.css'
const Login = () => {
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const Id = new URLSearchParams(location.search).get('Id'); // Extract Id from query parameter

  console.log('Login component. Id:', Id);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3001/login', { Id, password })
      .then((result) => {
        if (result.data.status === 'Success') {
          //const userId = result.data.userId;
          navigate(`/newpage/${Id}?role=patient`);
        } else {
          setLoginError('Incorrect password. Please try again!');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid">
      <div className="login-container row justify-content-center align-items-center min-vh-100">
        <div className="login-form-container col-md-6 d-flex justify-content-center align-items-center">
          <form onSubmit={handleSubmit} className="login-form">
            <center>
              <div className="col-md-6 d-flex justify-content-center align-items-center">
                <img src={hospitalImage} alt="Hospital" className="img-fluid" />
              </div>
            </center>
            <h2 className="mb-4">Login</h2>
            <div className="form-group mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
          {loginError && <p className="text-danger">{loginError}</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
