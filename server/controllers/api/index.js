import express from "express";

import bcrypt from "bcrypt";

import userModel from "../../models/Users/index.js";
import generateToken from "../../middleware/auth/generateToken.js";
import sendSMS from "../../utils/sendSMS.js";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    res.status(200).json({ success: "Router GET is UP yay" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// send otp route
// Post

router.post("/sendotp", async (req, res) => {
  try {
    const { firstname, lastname, email, password, phone } = req.body;
    console.log(req.body);

    await sendSMS({ body: "hello Your otp is 1234 ", to: phone });
    // const user = await userModel.findOne({ email });
    const userData = {
      firstname,
      lastname,
      password: "789465",
      email,
      phone,
      otp: 1234,
    };

    // user.otp = 1234;
    const user = new userModel(userData);

    await user.save();
    res.status(200).json({ success: "otp sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error from otp" });
  }
});

/*
METHOD : POST
PUBLIC
API Endpoint : /api/signup
Body : firstname, lastname, email, password,address, phone 
*/

router.post("/signup", async (req, res) => {
  try {
    // console.log("hit");
    let { firstname, lastname, email, password, phone, otp } = req.body;
    console.log(req.body);

    // //Check Duplication of Email & Mobile
    let Gotmail = await userModel.findOne({ email });
    console.log("line 59", Gotmail);

    if (otp && Gotmail) {
      if (otp != Gotmail.otp) {
        return res.status(409).json({ error: "Otp not matched" });
      } else {
        return res.status(200).json({ success: "otp verified" });
      }
    }
    if (Gotmail) {
      return res
        .status(409)
        .json({ error: "Email Already Registered. Please Login to Continue" });
    }

    const Gotphone = await userModel.findOne({ phone });
    if (Gotphone) {
      return res.status(409).json({ error: "Phone Already registered" });
    }

    // Hashing the Password:-
    req.body.password = await bcrypt.hash(req.body.password, 10);

    let userData = req.body;

    const allusers = new userModel(userData);
    console.log(allusers);
    console.log("hello67");

    await allusers.save();

    res.status(200).json({ success: "User Signed Up Succesfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error from signup" });
  }
});

/*
METHOD : POST
PUBLIC
API Endpoint : /api/login
Body : email :-
       password :-
*/

router.post("/login", async (req, res) => {
  try {
    let { email, password, otp } = req.body;
    console.log(req.body, "139");

    let userFound = await userModel.findOne({ email });

    if (!userFound) {
      return res
        .status(401)
        .json({ error: "Invalid Credentials. User not found" });
    }

    if (otp) {
      if (otp != userFound.otp) {
        return res.status(409).json({ error: "Otp not matched" });
      }
    } else {
      let matchPassword = await bcrypt.compare(
        req.body.password,
        userFound.password
      );
      // console.log(matchPassword);
      if (!matchPassword) {
        return res.status(401).json({ error: "Incorrect Password" });
      }
    }

    let payload = {
      user_id: userFound._id,
    };
    console.log(payload);
    console.log("126");

    //GENERATE A TOKEN
    const token = generateToken(payload);
    console.log(token);

    res.status(200).json({ success: "Login is Successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Verication of the token

router.get("/auth", async (req, res) => {
  try {
    let token = req.headers["auth-token"];
    if (!token) {
      return res.status(401).json({ error: "Unauthorised Access" });
    }
    let privatekey = config.get("PRIVATE_KEY");
    let payload = jwt.verify(token, privatekey);
    res.status(200).json({ success: "Authentication Successful", payload });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Unauthorised Access" });
  }
});

export default router;
