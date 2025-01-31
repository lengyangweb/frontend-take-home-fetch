import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { PrimeReactProvider } from 'primereact/api';

function App() {

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
