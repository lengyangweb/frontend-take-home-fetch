// import axios from 'axios';
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/apiSlice';

const LogoutButton = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutUser] = useLogoutMutation();

  async function handleLogout() {
    try {
        await logoutUser(undefined).unwrap();
        dispatch(logout());
        navigate('/');
    } catch (error: { originalStatus: number; data: string }) {
      const { originalStatus, data } = error;
      if (originalStatus === 200 && data === 'OK') {
        dispatch(logout());
        navigate('/');
        return;
      }
        console.error(error);
    }
  }

  return (
    <>
        <Button variant="outline-success" onClick={handleLogout}>
            <div className="d-flex justify-content-center align-items-center gap-2">
                <span>Logout</span>
                <i className="pi pi-sign-out"></i>
            </div>
        </Button>
    </>
  )
}

export default LogoutButton