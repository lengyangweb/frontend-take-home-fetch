import axios from 'axios';
import { useState } from 'react';
import { logout } from './slices/authSlice';
import { ToastContainer } from 'react-toastify';
import { PrimeReactProvider } from 'primereact/api';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const [interval, setIdleInterval] = useState<any>();
  const dispath = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state: any) => state.auth);

  useState(() => {
    if (userInfo) setIdleInterval((current: any) => current = setInterval(async() => await validateToken(), (10000))); // run every 10 seconds to validate token
  })

  async function validateToken() {
    try {
      const response = await axios.get(`https://frontend-take-home-service.fetch.com/dogs/breeds`, { withCredentials: true });
      // token is still valid
    } catch (error) {
      console.error(error); // if we 
      clearInterval(interval);
      navigate('/');
      dispath(logout())
    }
  }

  return (
    <>
      <PrimeReactProvider>
        <Outlet />
        <ToastContainer />
      </PrimeReactProvider>
    </>
  )
}

export default App
