
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import React from 'react';
import { Router, Routes, Route, useNavigate, Link } from 'react-router-dom';
// import Registration from './component/Registerform';
// import LoginPage from "./component/LoginPage";
import RegisterDevice from './Component2/Registerdevice';
import Athenticatedevice from './Component2/Athenticatedevice';
import Encryptdevice from './Component2/Encryptdevice'; 









function App() {






  return (
    <Routes>
      {/* <Route path='/Registerform' element={<Registration />} />
      <Route path='/LoginPage' element={<LoginPage />} /> */}
      <Route path="/" element={<Welcome />} />
      <Route path="/RegisterDevice" element={<RegisterDevice/>}/>
      <Route path="/Athenticatedevice" element={<Athenticatedevice/>}/>
      <Route path="/Encryptdevice" element={<Encryptdevice/>}/>
     
      
    </Routes>

  )


  function Welcome() {

    const navigate = useNavigate();

    const handleClick = () => {
      navigate('/Registerdevice');


    };

    return (
      <>

        <div className='align-center' style={{ marginLeft: "45%", marginTop: "20%", color: "blue" ,backgroundColor:""}}>
          <h2>
            Encrypt Now
          </h2>




          <div className='p-3' style={{ marginLeft: "4%" }}>

            <button type="button" className="btn btn-primary" onClick={handleClick}>
              Get Start
            </button>
          </div>

        </div>





      </>)
  }





}

export default App;


