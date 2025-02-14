import React, { useState } from 'react';
import AuthenticateDevice from './Athenticatedevice';
import { useNavigate } from 'react-router-dom';

function RegisterDevice() {
  const [deviceId, setDeviceId] = useState('');
  const [secret, setSecret] = useState('');
 

  const Navigate = useNavigate();

  const registerDevice = async () => {
    if (deviceId && secret) {
      const data = {"device_id":deviceId, "secret": secret};
      // console.log(data)
      await fetch('http://127.0.0.1:5000/register', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(data)
      }).then(response => {
        if(!response.ok) {
          alert('Failed');
        } else {
          
          return response.json()
        }
      }).then(data => 
        alert(data.message)
      );
    } else {
      alert('Please submit both DeviceID and Secret.');
    }
  };

  const handleLogin =()=>{
    Navigate("/Encryptdevice");
    return;

  }

  return (
    <div className='container d-block align-items-center border border-3 rounded-4 ' style={{width:"400px",marginTop:"3%"}}>
      <h2 className='d-flex justify-content-center m-4' style={{fontFamily:"sans-serif"}}><b>Register Device</b></h2>
      <label>Device ID:</label>
      <input
        type="text"
        value={deviceId}//for store the data 
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
      <button onClick={registerDevice} className="btn btn-primary" style={{margin:" 5px 0px 5px 0px",width:"370px"}}>Register</button>
      <button onClick={handleLogin} className='btn btn-primary'  style={{margin:" 5px 0px 5px 0px",width:"370px"}}>Authenticate</button>
    </div>
  );
}

export default RegisterDevice;