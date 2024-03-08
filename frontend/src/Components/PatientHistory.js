


import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';
import './PatientHistory.css';

const PatientHistory = () => {
  const [patientReports, setPatientReports] = useState([]);
  const { Id } = useParams();

  useEffect(() => {
    // Fetch patient reports based on the Id from the URL
    axios
      .get(`http://localhost:3001/getPatientHistory/${Id}`)
      .then((result) => {
        if (result.data.status === 'Success') {
          setPatientReports(result.data.reports);
        } else {
          // Handle error
          console.error(result.data.message);
        }
      })
      .catch((err) => console.log(err));
  }, [Id]);

  const handleViewFile = (fileData, contentType) => {
    // Decode the Base64 data
    const decodedData = atob(fileData);

    // Convert the decoded data to a Uint8Array
    const uint8Array = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; i++) {
      uint8Array[i] = decodedData.charCodeAt(i);
    }

    // Create a Blob from the Uint8Array
    const blob = new Blob([uint8Array], { type: contentType });

    // Create a URL for the Blob and open it in a new window
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-title">PATIENT PRIME</div>
        <div className="navbar-right">
          <Link className="btn btn-primary mx-1" to={`/home?Id=${Id}`}>
            Log Out
          </Link>
        </div>
      </div>
      <br />
      

      <div className="container mt-5">
        <h2 className="mb-4">Patient History</h2>
        <ul className="list-group">
          {patientReports.map((report, index) => (
            <li key={index} className="list-group-item">
              <div>
                <strong>Diagnosis:</strong> {report.diagnosis}
              </div>
              <div>
                <strong>Hospital:</strong> {report.hospital}
              </div>
              <div>
                <strong>Doctor:</strong> {report.doctor}
              </div>
              <div>
                <strong>Date:</strong> {report.date}
              </div>
              <div>
                <strong>Reports:</strong>
                {report.files && report.files.map((file, fileIndex) => (
                  <button
                    key={fileIndex}
                    className="btn btn-primary"
                    onClick={() => handleViewFile(file.data, file.contentType)}
                  >
                    View File {fileIndex + 1}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PatientHistory;

