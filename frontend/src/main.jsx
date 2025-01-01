import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { Authcontextprovider } from './Contextapi/Authcontext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Authcontextprovider>
        <App />

      </Authcontextprovider>

    </BrowserRouter>

  </StrictMode>,
)
