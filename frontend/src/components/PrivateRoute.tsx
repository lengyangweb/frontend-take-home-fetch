import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Menubar from './Menubar';

const PrivateRoute = () => {
  const { userInfo } = useSelector((state:any) => state.auth);

  return userInfo ? (
    <>
      <Menubar />
      <Outlet />
    </>
  ) : <Navigate to='/' replace />
}

export default PrivateRoute