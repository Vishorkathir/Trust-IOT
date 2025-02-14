import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthenticateDevice() {
  const [deviceId, setDeviceId] = useState('');
  const [secret, setSecret] = useState('');
  const Navigate = useNavigate();

  const authenticateDevice = async () => {
    if (deviceId && secret) {
      const data = {"device_id":deviceId, "secret": secret};
      // console.log(data)
      await fetch('http://127.0.0.1:5000/authenticate', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
      }).then(response => {
        if(!response.ok) {
          alert('Failed');
        } else {
          return response.json()
        }
      }).then(data => {
        alert(data.message);
        Navigate('/Encryptdevice')
      });
    } else {
      alert('Please submit both DeviceID and Secret.');
    }
  };

  return (
    <div className='container d-block align-items-center border border-3 rounded-4 'style={{width:"400px",marginTop:"3%"}}>
      <h2  className='d-flex justify-content-center m-4' style={{fontFamily:"sans-serif"}}><b>Authenticate Device</b></h2>
      <label>Device ID:</label>
      <input
        type="text"
        value={deviceId}
        onChange={(e) => setDeviceId(e.target.value)}
        placeholder="Enter Device ID"
        className="form-control mb-2"
      />
      <label>Secret:</label>
      <input
        type="text"
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
        placeholder="Enter Secret Key"
        className="form-control mb-2"
      />
      <button onClick={authenticateDevice} className="btn btn-primary"  style={{margin:" 10px 0px 10px 0px",width:"370px"}}>Authenticate</button>
    </div>
  );
}

export default AuthenticateDevice;