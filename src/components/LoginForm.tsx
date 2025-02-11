import { toast } from "react-toastify";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react"
import { setCredentials } from "../slices/authSlice";
import { useLoginMutation } from "../slices/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { TError } from "./DogBreeds";


const LoginForm = () => {
  const userRef: any = useRef();
  const [credentials, setUserCredential] = useState({ name: '', email: '' });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  const { userInfo } = useSelector((state: { auth: { userInfo: { username: string; email: string }}}) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/home');
    }
  }, [userInfo, navigate]);

  async function handleLogin(e: SubmitEvent) {
    e.preventDefault();
    const credentials: {name:string; email:string} = { name: userRef.current.name.value, email: userRef.current.email.value };
    try {
      const response = await login(credentials).unwrap();
      if (!response) return;
      dispatch(setCredentials({ ...credentials }));
      navigate('/home');
    } catch (error: TError) {
      const { data, originalStatus } = error;
      if (originalStatus === 200 && data === 'OK') {
        dispatch(setCredentials({ ...credentials }));
        navigate('/home');
        return;
      }
      console.error(error);
      toast.error('Something went wrong.');
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
          <Button className="rounded" label="Login" type="button" icon="pi pi-sign-in" iconPos="right" onClick={handleLogin} />
        </div>
      </div>
    </form>
  )
}

export default LoginForm