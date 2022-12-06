import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { UserContext } from "../Context";
import { API_BASE_URL } from "../utils/Constants";
import Alert from "../components/Alert";

const Login = () => {
  const [user, setUser] = useContext(UserContext);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.isLoggedIn === false) return;
    if (user.isAdmin === true) {
      navigate("/admin-dashboard");
    } else {
      console.log(user);
      navigate("/dashboard");
    }
    return () => {};
  }, [user]);

  const handleSignin = async (event) => {
    try {
      event.preventDefault();
      const userData = {
        email: event.target[0].value,
        password: event.target[1].value,
      };
      const response = await axios.post(`${API_BASE_URL}/login`, userData);
      console.log(response.status);
      if (response.status === 200) {
        localStorage.setItem("token", response.data);
        setSuccess(() => "Login succesful! redirecting...");
        setTimeout(() => {
          setSuccess(null);
          const resData = jwt_decode(response.data);
          setUser({ ...resData, isLoggedIn: true });
        }, 1000);
      } else {
        setError(() => "Invalid credentials!");
        setTimeout(() => setError(null), 2000);
      }
    } catch (error) {
      setError(() => error.response.data.message);
      setTimeout(() => setError(null), 2000);
    }
  };
  return (
    <div className="flex justify-center">
      {error && <Alert message={error} type={"error"} />}
      {success && <Alert message={success} type={"success"} />}
      <div className="w-9/12 lg:w-1/4">
        <h2 className="text-3xl pb-4 text-center">Login</h2>
        <form className="border p-5" onSubmit={handleSignin}>
          <div className="flex flex-col py-3">
            <label className="p-2">Email</label>
            <input
              className="p-2 bg-slate-100"
              type="email"
              placeholder="Enter email"
              required
            />
            {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
          </div>
          <div className="flex flex-col py-3">
            <label className="p-2">Password</label>
            <input
              className="p-2 bg-slate-100"
              type="password"
              placeholder="Enter password"
              required
            />
            {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
          </div>
          <div className="flex justify-center pt-5">
            <button className="bg-green-400 p-2 rounded" type="submit">
              Signin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
