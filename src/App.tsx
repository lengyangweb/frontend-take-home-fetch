import { useEffect, useState } from 'react';
import { logout } from './slices/authSlice';
import { ToastContainer } from 'react-toastify';
import { PrimeReactProvider } from 'primereact/api';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetBreedsMutation } from './slices/apiSlice';

function App() {
  const [interval, setIdleInterval] = useState<number>();

  const [getBreeds] = useGetBreedsMutation();
  const dispath = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state: { auth: { userInfo: { username: string; email: string } } }) => state.auth);

  useEffect(() => setIdleTime, [userInfo]);

  function setIdleTime() {
    if (userInfo) setIdleInterval(setInterval(async() => await validateToken(), (10000))); // run every 10 seconds to validate token
  }

  async function validateToken() {
    try {
      const url = `https://frontend-take-home-service.fetch.com/dogs/breeds`;
      const result = await getBreeds(url).unwrap();
      console.log(result.data);
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
