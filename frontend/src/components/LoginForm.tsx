import axios from "axios";
import { useRef, useState } from "react"
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";


const LoginForm = () => {
  const userRef: any = useRef();
  const [credentials, setCredentials] = useState({ name: '', email: '' });

  async function login(e: any) {
    e.preventDefault();
    const credentials = {
      name: userRef.current.name.value,
      email: userRef.current.email.value
    };
    try {
      const response = await axios.post('https://frontend-take-home-service.fetch.com/auth/login', credentials);
      if (response.status === 200) {
        // login success
        localStorage.setItem('userInfo', JSON.stringify(credentials));
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form ref={userRef}>
      <div className="form-group my-2">
        <label htmlFor="name" className="form-label">Name:</label>
        <input type="text" className="form-control" id="name" autoComplete="name" value={credentials.name} onChange={(e) => setCredentials((current) => current = { ...current, name: e.target.value })} />
        {/* <InputText className="w-100" type="name" id="name" autoComplete="name" /> */}
      </div>
      <div className="form-group my-2">
        <label htmlFor="email" className="form-label">Email:</label>
        <input type="email" className="form-control" id="email" autoComplete="email" value={credentials.email} onChange={(e) => setCredentials((current) => current = { ...current, email: e.target.value })} />
        {/* <InputText className="w-100" type="email" id="email" autoComplete="email" /> */}
      </div>
      <div className="form-group mt-4">
        <div className="d-flex justify-content-center">
          <Button className="rounded" label="Login" type="button" onClick={login} />
        </div>
      </div>
    </form>
  )
}

export default LoginForm