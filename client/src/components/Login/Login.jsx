import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  let navigate = useNavigate();

  const [usePassword, setUsePassword] = useState(false);
  const [useOtp, setOtp] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpV, setOtpV] = useState("");


  const getOTP = async (e) => {
    try {
      e.preventDefault();
      let res = await axios.post("/api/sendotp", {phone:email});
      alert("otp sent");
    } catch (error) {
      console.error(error);
    }
  };



  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if ((email && password) || otpV) {
        if (email && password) {
          const config = {
            email: email,
            password: password,
          };
          console.log("Log in with password", config);


          let res = await axios.post("/api/login", config);
          console.log("Res data", res.data);

          localStorage.setItem(
            "token",
            JSON.stringify({ token: res.data.token })
          );
          navigate("/home");
        } else {
          const config = {
            email: email,
            otp: otpV,
          };
          // console.log()
          // handleSendOtp(email)
          let res = await axios.post("/api/login", config);
          console.log(res.data);
          localStorage.setItem(
            "token",
            JSON.stringify({ token: res.data.token })
          );
          navigate("/home");
        }
      }
    } catch (error) {
      console.error(error);
      console.log("error")
    }
  };
  const handleOtpV = (e) => {
    e.preventDefault();
  };

  return (
    <div className="auth-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Sign into your account</h2>

        <input
          value={email}
         
          type="text"
          placeholder="Phone No. or Email"
          id="email"
          name="email"
          required="true"
          onChange={(e) => setEmail(e.target.value)}
        />



        {useOtp && (
          <div>
            <input
              type="number"
              placeholder="Enter OTP"
              onChange={(e) => setOtpV(e.target.value)}
              required="true"
            />
            <button type="submit"> Verify</button>
          </div>
        )}

        {usePassword && (
          <div>
            <input
              value={password}
              type="password"
              placeholder="Enter Password"
              required="true"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit"> Login</button>
          </div>
        )}

        <div className="button--container">
          {!usePassword ? (
            <button
              
              onClick={(e) => {
                e.preventDefault();
                if (useOtp) {
                  setOtp((prev) => !prev);
                }
                return setUsePassword((prev) => !prev);
              }}
            >
              Log In with Password
            </button>
          ) : null}

          {!useOtp ? (
            <button
              
              onClick={(e) => {
                e.preventDefault();
                if (usePassword) {
                  setUsePassword((prev) => !prev);
                }
                setOtp((prev) => !prev);
                getOTP(e)
                
              }}
            >
              Log In with OTP
            </button>
          ) : null}
        </div>
        
      </form>
    </div>
  );
};

export default Login;
