import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserRegProvider } from "./Context/UserregContext.jsx";
import { BrowserRouter } from 'react-router-dom';



createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
      <UserRegProvider>
        <App />
      </UserRegProvider>
    </BrowserRouter>



  </StrictMode>,
);
