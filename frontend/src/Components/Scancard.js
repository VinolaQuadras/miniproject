// ScanCardPage.js

import React, { useState, useEffect } from 'react';
import { QrScanner } from 'react-qrcode-scanner';
import { useNavigate } from 'react-router-dom';

const Scancard = () => {
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  const handleScan = (data) => {
    if (data) {
      setUserId(data);
      navigateToNextPage(data);
    }
  };

  const handleError = (error) => {
    console.error('Error scanning QR code:', error);
  };

  const navigateToNextPage = (scannedData) => {
    navigate(`/home?Id=${scannedData}`);
  };


  useEffect(() => {
    // Cleanup when the component is unmounted
    return () => {
      // Additional cleanup logic if needed
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <h1>Scan Your Card</h1>
      <p>Scan the QR code here</p>
      
      <div style={{ width: '80%', margin: 'auto' }}>
        {/* Adjust the width and height as needed */}
        <QrScanner
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: '50%', height: '300px' }}  // Set a fixed height for the scanning screen
        />
      </div>
      
      {userId && (
        <div>
          <p>Scanned User ID: {userId}</p>
          <button onClick={navigateToNextPage}>Go to Next Page</button>
        </div>
      )}
    </div>
  );
};

export default Scancard;
