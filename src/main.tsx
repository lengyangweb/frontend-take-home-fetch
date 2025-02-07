import './index.css'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import "primereact/resources/themes/saga-blue/theme.css";
import 'primeicons/primeicons.css';

import Login from './screens/Login.tsx'
import { Provider } from 'react-redux'
import { store } from './store.tsx'
import PrivateRoute from './components/PrivateRoute.tsx'
import HomeScreen from './screens/HomeScreen.tsx'
import { StrictMode } from 'react';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Login />} />
      <Route path="" element={<PrivateRoute/>}>
        <Route path='/home' element={<HomeScreen />} />
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
