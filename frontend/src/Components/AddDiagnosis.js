


import React, { useState,useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';
 

const AddDiagnosis = () => {
  const [diagnosis, setDiagnosis] = useState('');
  const [hospital, setHospital] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();
  const { Id } = useParams();
  const [files, setFiles] = useState([]);
  const [blockchainData, setBlockchainData] = useState([]);

  useEffect(() => {
    // Fetch blockchain data from the server when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/viewBlockchain');
        setBlockchainData(response.data.blockchain);
      } catch (error) {
        console.error('Error fetching blockchain data:', error);
      }
    };

    fetchData();
  }, []);


  // const handleFileChange = (e) => {
  //   setFiles([...files, e.target.files[0]]);
  // };
  const handleFileChange = (e) => {
    setFiles([...files, ...e.target.files]);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('Id', Id);
      formData.append('diagnosis', diagnosis);
      formData.append('hospital', hospital);
      formData.append('doctor', doctor);
      formData.append('date', date);

      files.forEach((file, index) => {
        formData.append(`files`, file);
      });

      const response = await axios.post('http://localhost:3001/addDiagnosis', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      if (response.data.status === 'Success') {
        
        navigate(`/newpage/${Id}`);
      }
    } catch (error) {
      console.error('Error submitting diagnosis:', error);
    }
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
        <h2 className="mb-4">Upload Diagnosis</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="diagnosis" className="form-label">
              Diagnosis:
            </label>
            <input
              type="text"
              className="form-control"
              id="diagnosis"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="hospital" className="form-label">
              Hospital:
            </label>
            <input
              type="text"
              className="form-control"
              id="hospital"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="doctor" className="form-label">
              Doctor:
            </label>
            <input
              type="text"
              className="form-control"
              id="doctor"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Date:
            </label>
            <input
              type="date"
              className="form-control"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="file" className="form-label">
              File:
            </label>
            <input type="file" className="form-control" id="file" onChange={handleFileChange} multiple />
          </div>

          <button type="button" className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddDiagnosis;




