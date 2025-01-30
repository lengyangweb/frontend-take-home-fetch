
import { Outlet } from 'react-router-dom';
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';

function App() {

  return (
    <>
      <PrimeReactProvider>
        <Outlet />
      </PrimeReactProvider>
    </>
  )
}

export default App
