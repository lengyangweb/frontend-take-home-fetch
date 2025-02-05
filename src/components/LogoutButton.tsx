import axios from 'axios';
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout } from '../slices/authSlice';

const LogoutButton = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
        const response = await axios.post('https://frontend-take-home-service.fetch.com/auth/logout', {}, {withCredentials: true});
        console.log(response);
        dispatch(logout());
        navigate('/');
    } catch (error) {
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