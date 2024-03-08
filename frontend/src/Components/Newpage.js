

// export default Newpage;
import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

const Newpage = () => {
  const [patientDetails, setPatientDetails] = useState({});
  const [userType, setUserType] = useState('');
  const { Id } = useParams();
  
  const location = useLocation();
  const role = new URLSearchParams(location.search).get('role');
  
  
  

  useEffect(() => {
    const fetchData = async () => {
      console.log('Id:', Id);
      try {
        if (!Id) {
          console.error('Error: User ID is undefined.');
          return;
        }
  
        const result = await axios.get(`http://localhost:3001/getUserData/${Id}`);
        console.log('API response:', result.data);
  
        if (result.data.status === 'Success') {
          const patient = result.data.patient; // Use patient instead of user
  
          // Add a check to ensure that 'patient' is defined
          if (patient) {
            setPatientDetails({
              Id: patient.Id,
              name: patient.name,
              dob: patient.dob,
              age: patient.age,
              address: patient.address,
              phone: patient.phone,
              // Add other properties as needed
            });
            setUserType(result.data.role || role);
          } else {
            console.error('Error: User data is undefined.');
          }
        } else {
          console.error(result.data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchData();
  }, [Id, role]);
  
  
  
  

  

  return (
    <>
          <div className="navbar">
  <div className="navbar-title">PATIENT PRIME</div>
  <div className="navbar-right">
    
    <Link className="btn btn-primary mx-1" to={`/home?Id=${Id}`}>Log Out</Link>
  </div>
</div>
<br/>

    <div className="container mt-5">
      <h2 className="mb-4">Patient Details</h2>
      {patientDetails && (
      <ul className="list-group">
        <li className="list-group-item">
          <strong>ID:</strong> {patientDetails.Id}
        </li>
        <li className="list-group-item">
          <strong>Name:</strong> {patientDetails.name}
        </li>
        <li className="list-group-item">
          <strong>DOB:</strong> {patientDetails.dob}
        </li>
        <li className="list-group-item">
          <strong>Age:</strong> {patientDetails.age}
        </li>
        <li className="list-group-item">
          <strong>Address:</strong> {patientDetails.address}
        </li>
        <li className="list-group-item">
          <strong>Phone No:</strong> {patientDetails.phone}
        </li>
        {/* Add other details as needed */}
      </ul>
        )}
      <div className="mt-4">
        <Link to={`/patient-history/${Id}`} className="btn btn-primary me-2">
          View User History
        </Link>
        {userType === 'doctor' ? (
          <Link to={`/add-diagnosis/${Id}?role=${userType}`} className="btn btn-success">
            Add a New Diagnosis
          </Link>
        ) : (
          <button className="btn btn-success" disabled>
            Add a New Diagnosis (Disabled for Patients)
          </button>
        )}
      </div>
      </div>
      {/* ... (existing code) */}
    </>
  );
};

export default Newpage;

