import axios from "axios";
import {useNavigate,useLocation} from "react-router-dom";
import React, { useState } from 'react';
import './Login.css';
import hospitalImage from '../Components/Images/hospital.png'; // Import the image

const DoctorLogin = () => {
  const [license, setLicense] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError]=useState();
  const navigate = useNavigate();
  const location = useLocation();
  const Id = new URLSearchParams(location.search).get('Id'); 

  const handleSubmit = (e) => {
    // e.preventDefault();
    // console.log('License:', license);
    // console.log('Password:', password);
    e.preventDefault();
    axios.post('http://localhost:3001/doctorlogin',{ license, password })
    .then(result=>{
            //console.log(result)
        if(result.data.status === "Success"){
                    //const userId= result.data.userId
                    navigate(`/newpage/${Id}?role=doctor`)
                }
            
        else{
                setLoginError("Incorrect password.Please try again!")
            }
  })
        .catch(err=>console.log(err))
  };

  return (
    
    <div className=" container-fluid">
      <div className="login-container row justify-content-center align-items-center min-vh-100">
        
        <div className="login-form-container col-md-6 d-flex justify-content-center align-items-center">
          <form onSubmit={handleSubmit} className="login-form">
            <center>
          <div className=" col-md-6 d-flex justify-content-center align-items-center">
          <img src={hospitalImage} alt="Student" className="img-fluid" />
        </div>
        </center>
            <h2 className="mb-4">Verify</h2>
            <div className="form-group mb-3">
              <label htmlFor="license" className="form-label">License No:</label>
              <input
                type="license"
                id="license"
                className="form-control"
                value={license}
                onChange={(e) => setLicense(e.target.value)}
                placeholder="Enter your license No"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
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
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
          {loginError && <p className="text-danger">{loginError}</p>}
        </div>
      </div>
    </div>
    
  );
};

export default DoctorLogin;
