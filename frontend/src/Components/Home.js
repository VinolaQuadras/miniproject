
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import patientImage from '../Components/Images/patient.png';
import doctorImage from '../Components/Images/doctor.jpg';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to access current location

  const handlePatientClick = () => {
    // Navigate to the login page for patients
    navigate(`/login${location.search}`); // Append the current query parameters
  };

  const handleDoctorClick = () => {
    // Navigate to the Doctor login page for doctors
    navigate(`/doctorlogin${location.search}`); // Append the current query parameters
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2 style={{ color: 'grey', fontStyle: 'italic' }}>Welcome to </h2>
    <h1 style={{ color: 'blue', fontWeight: 'bold' }}>PATIENT PRIME</h1>
    <br/>
    <br/>
      <h1>Are you a </h1>
      <div onClick={handlePatientClick} style={{ display: 'inline-block', marginRight: '20px', cursor: 'pointer' }}>
        <img src={patientImage} alt="patient" style={{ width: '200px', height: '200px' }} />
        <p>Patient</p>
      </div>
      <div onClick={handleDoctorClick} style={{ display: 'inline-block', cursor: 'pointer' }}>
        <img src={doctorImage} alt="Doctor" style={{ width: '200px', height: '200px' }} />
        <p>Doctor</p>
      </div>
    </div>
  );
};

export default Home;

