import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const handleLogin = async () => {
    try {
      const res = await axios.post(
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
  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/profile");
    } catch (error) {
      setError(error?.response?.data);
    }
  };
  return (
    <>
      <div className="card card-border bg-base-300 w-96 m-auto my-3">
        <div className="card-body">
          <h2 className="card-title justify-center text-3xl">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          <div>
            <div>
              {!isLoginForm && (
                <div>
                  <div>
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">First Name</legend>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="input"
                        placeholder="First Name"
                      />
                    </fieldset>
                  </div>
                  <div>
                    <fieldset className="fieldset">
                      <legend className="fieldset-legend">Last Name</legend>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="input"
                        placeholder="Last Name"
                      />
                    </fieldset>
                  </div>
                </div>
              )}
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
          <p
            onClick={() => setIsLoginForm(!isLoginForm)}
            className="cursor-pointer hover:text-blue-700"
          >
            {!isLoginForm
              ? "Exsisting User? Login Here"
              : "New user? SignUp here "}
          </p>
          <p className="text-red-600">{error}</p>
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignup}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
