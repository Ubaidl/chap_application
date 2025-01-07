import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Authcontextprovider } from './Contextapi/Authcontext.jsx';
import { SocketContextProvider } from './Contextapi/SocketContext'; // Import SocketContextProvider

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <Authcontextprovider>
      <SocketContextProvider> {/* Wrap the app with SocketContextProvider */}
        <App />
      </SocketContextProvider>
    </Authcontextprovider>
  </BrowserRouter>

);
