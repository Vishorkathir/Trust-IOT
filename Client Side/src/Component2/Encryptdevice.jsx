import React, { useState, useEffect } from 'react';

function EncryptMessage() {
  const [message, setMessage] = useState('');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [secret, setSecret] = useState('');
  const [messages, setMessages] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticateDevice = async () => {
    if (deviceId && secret) {



      try {
        const response = await fetch('http://127.0.0.1:5000/authenticate', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            device_id: deviceId,
            secret: secret
          })
        });
        
        //conditions 

        const data = await response.json();
        if (response.ok) {
          setIsAuthenticated(true);
          fetchMessages();
          alert(data.message);
        } else {
          alert('Authentication failed');
        }

      } catch (error) {
        alert('Error during authentication');
      }

    } else {
      alert('Please provide both Device ID and Secret');
    }
  };

  //fetch the  device id
  const fetchMessages = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/messages/${deviceId}`);
      const data = await response.json();
      setMessages(data.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  //for encrypt the key value

  const encryptMessage = async () => {
    if (deviceId && message) {
      const data = {"device_id": deviceId, "message": message};
      try {
        const response = await fetch('http://127.0.0.1:5000/send', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        });
        
        const responseData = await response.json();
        alert(responseData.message);
        setMessage('');
        fetchMessages(); // Refresh messages after sending
      } catch (error) {
        alert('Failed to send message');
      }
    } else {
      alert('Please submit both DeviceID and Message.');
    }
  };

  return (
    <div className='container d-block align-items-center border border-3 rounded-4' style={{width:"400px", marginTop:"3%"}}>
      <h2 className=' ' style={{fontFamily:"sans-serif", marginLeft:"60px",marginTop:"20px"}}><b>Authenticate Message</b></h2>
      
      {!isAuthenticated ? (
        <>
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
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Enter Secret"
            className="form-control mb-2"
          />
          <button 
            onClick={authenticateDevice} 
            className="btn btn-primary" 
            style={{margin:" 10px 0px 10px 0px", width:"370px"}}
          >
            Authenticate
          </button>
        </>
      )
       : 
      (
        <>
          <div className="mb-3">
            <strong>Device ID: {deviceId}</strong>
          </div>
          <label>Message:</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
            className="form-control mb-2"
          />
          <button 
            onClick={encryptMessage} 
            className="btn btn-primary" 
            style={{margin:" 10px 0px 10px 0px", width:"370px"}}>Send Message</button>
          
          <div className="mt-4">
            <h4>Messages:</h4>
            <div className="messages-container" style={{maxHeight: "200px", overflowY: "auto"}}>
              {messages.map((msg, index) => (
                <div key={index} className="alert alert-secondary">
                  {msg}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default EncryptMessage;