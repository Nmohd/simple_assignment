import React from "react";
import "./Signup.css";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    otp: "",
    phone: "",
  });
  const { firstname, lastname, email, password, phone, otp } = userData;

  const onChangeHandler = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const getOTP = async (e) => {
    try {
      e.preventDefault();
      let res = await axios.post("/api/sendotp", userData);
      alert("otp sent");
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      console.log(userData);
      let res = await axios.post("/api/signup", userData);
      console.log(res.data);
      console.log("you have been registred");
      // showAlert({
      //   type: "success",
      //   mesg: res.data.success,
      // });
      navigate("/");
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <>
      <div className="auth-form-container">
        <form className="login-form" onSubmit={onSubmitHandler}>
          <h2>Register </h2>

          <input
            value={firstname}
            type="text"
            placeholder="First Name"
            id="firstname"
            name="firstname"
            required="true"
            onChange={onChangeHandler}
          />

          <input
            value={lastname}
            type="text"
            placeholder="Last Name"
            id="lastname"
            name="lastname"
            required="true"
            onChange={onChangeHandler}
          />
          <input
            value={email}
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            required="true"
            onChange={onChangeHandler}
          />
          <input
            value={phone}
            type="phone"
            placeholder="Phone Number"
            id="phone"
            name="phone"
            required="true"
            onChange={onChangeHandler}
          />
          <input
            value={password}
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            onChange={onChangeHandler}
          />
          <h6>or Signup with One Time Password (OTP)</h6>
          <input
            value={otp}
            type="number"
            placeholder="OTP"
            id="otp"
            name="otp"
            onChange={onChangeHandler}
          />
          <button onClick={getOTP}>Get OTP</button>
          <button type="submit">Signup</button>
        </form>
      </div>
    </>
  );
};

export default Signup;
