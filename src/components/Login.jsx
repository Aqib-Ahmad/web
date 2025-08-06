import React, { useState } from "react";
import axios from "axios";
const Login = () => {
  const [emailId, setEmailId] = useState("aqib@gmail.com");
  const [password, setPassword] = useState("Aqib@123");
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/login",
        {
          emailId,
          password,
        },
        { withCredentials: true } // it is important
      );
    } catch (error) {
      console.log(error);
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
