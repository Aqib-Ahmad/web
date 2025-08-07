import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
const Login = () => {
  const [emailId, setEmailId] = useState("aqib@gmail.com");
  const [password, setPassword] = useState("Aqib@123");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const handleLogin = async () => {
    try {
      var res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      navigate("/");
    } catch (error) {
      setError(error?.response?.data);
    }
  };
  return (
    <>
      <div className="card card-border bg-base-300 w-96 m-auto my-3">
        <div className="card-body">
          <h2 className="card-title justify-center text-3xl">Login </h2>
          <div>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Enter your EmailId</legend>
                <input
                  type="email"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  className="input"
                  placeholder="Email"
                />
              </fieldset>
            </div>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Enter your password</legend>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                  placeholder="Password"
                />
              </fieldset>
            </div>
          </div>
          <p className="text-red-600">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
