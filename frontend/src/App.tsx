
import { Outlet } from 'react-router-dom';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import { ToastContainer } from 'react-bootstrap';

function App() {

  return (
    <>
      <PrimeReactProvider>
        <ToastContainer />
        <Outlet />
      </PrimeReactProvider>
    </>
  )
}

export default App
