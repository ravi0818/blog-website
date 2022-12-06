import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../Context";
import { API_BASE_URL } from "../utils/Constants";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

const Register = () => {
  const [user, setUser] = useContext(UserContext);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const handleSignup = async (event) => {
    try {
      event.preventDefault();
      if (event.target[2].value !== event.target[3].value) {
        alert("Password not matching!");
        return;
      }
      const newUser = {
        name: event.target[0].value,
        email: event.target[1].value,
        password: event.target[2].value,
      };
      const response = await axios.post(`${API_BASE_URL}/register`, newUser);
      console.warn("response", response);
      if (response.status === 201) {
        localStorage.setItem("token", response.data);
        setSuccess(() => "Signup succesful! redirecting...");
        setTimeout(() => {
          setSuccess(null);
          const resData = jwt_decode(response.data);
          setUser({ ...resData, isLoggedIn: true });
          navigate("/login");
        }, 1000);
      } else {
        setError(() => "Something went wrong!");
        setTimeout(() => setError(null), 1000);
      }
    } catch (error) {
      setError(() => error.response.data.message);
      setTimeout(() => setError(null), 1000);
    }
  };
  return (
    <div className="flex justify-center">
      {error && <Alert message={error} type={"error"} />}
      {success && <Alert message={success} type={"success"} />}
      <div className="w-9/12 lg:w-1/4">
        <h2 className="text-3xl pb-4 text-center">Create Account</h2>
        <form className="border p-5" onSubmit={handleSignup}>
          <div className="flex flex-col py-3">
            <label className="p-2">Name</label>
            <input
              className="p-2 bg-slate-100"
              type="text"
              placeholder="Enter full name"
              required
            />
            {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}
          </div>
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
              placeholder="Enter new password"
              required
            />
            {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
          </div>
          <div className="flex flex-col py-3">
            <label className="p-2">Confirm password</label>
            <input
              className="p-2 bg-slate-100"
              type="password"
              placeholder="Confirm new password"
              required
            />
            {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text> */}
          </div>
          <div className="flex justify-center pt-5">
            <button className="bg-green-400 p-2 rounded" type="submit">
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
