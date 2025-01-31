import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { Button } from "primereact/button";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";


const LoginForm = () => {
  const userRef: any = useRef();
  const [credentials, setUserCredential] = useState({ name: '', email: '' });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/home');
    }
  }, [userInfo, navigate]);

  async function handleLogin(e: any) {
    e.preventDefault();
    const credentials: {name:string; email:string} = { name: userRef.current.name.value, email: userRef.current.email.value };
    try {
      const response = await axios.post('https://frontend-take-home-service.fetch.com/auth/login', credentials, { withCredentials: true });
      if (response.status !== 200) return toast.error(`Unable to login`);
      dispatch(setCredentials({ ...credentials }));
      navigate('/home');
      localStorage.setItem('userInfo', JSON.stringify(credentials));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form ref={userRef}>
      <div className="form-group my-2">
        <label htmlFor="name" className="form-label">Name:</label>
        <input type="text" className="form-control" id="name" autoComplete="name" value={credentials.name} onChange={(e) => setUserCredential((current) => current = { ...current, name: e.target.value })} />
      </div>
      <div className="form-group my-2">
        <label htmlFor="email" className="form-label">Email:</label>
        <input type="email" className="form-control" id="email" autoComplete="email" value={credentials.email} onChange={(e) => setUserCredential((current) => current = { ...current, email: e.target.value })} />
      </div>
      <div className="form-group mt-4">
        <div className="d-flex justify-content-center">
          <Button className="rounded" label="Login" type="button" onClick={handleLogin} />
        </div>
      </div>
    </form>
  )
}

export default LoginForm